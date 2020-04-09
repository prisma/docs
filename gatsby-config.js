const config = require('./config');
require("dotenv").config()

module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    keywords: config.siteMetadata.keywords,
    header: config.header,
    siteUrl: config.gatsby.siteUrl,
    footer: config.footer,
    docsLocation: config.siteMetadata.docsLocation
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-image',
    'gatsby-plugin-styled-components',
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: require(`./src/utils/algolia`)
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    // 'gatsby-plugin-offline', // it causes infinite loop issue with workbox
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        decks: [],
        defaultLayouts: {
          default: require.resolve('./src/layouts/articleLayout.tsx'),
        },
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-sectionize',
          'gatsby-remark-check-links',
          {
            resolve: `gatsby-remark-images`,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/content`,
        ignore: ['**/.tsx*'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
  ],
};
