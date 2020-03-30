const config = require('./config');
module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    keywords: config.siteMetadata.keywords,
    header: config.header,
    // logo: { link: config.header.logoLink ? config.header.logoLink : '/', image: config.header.logo }, // backwards compatible
    // headerTitle: config.header.title,
    footer: config.footer,
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
      options: {
        appId: config.header.search.algoliaAppId,
        apiKey: config.header.search.apiKey,
        queries,
        chunkSize: 10000, // default: 1000
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
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: {
                tsx: 'tsx',
              },
              aliases: {},
            },
          },
          'gatsby-remark-sectionize',
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
