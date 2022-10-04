const path = require('path')
const config = require('./config')
require('dotenv').config()

const gatsbyRemarkPlugins = [
  'gatsby-remark-sectionize',
  'gatsby-remark-normalize-paths',
  {
    resolve: `gatsby-remark-autolink-headers`,
    options: {
      icon: `<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 6.33337H15.5" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.5 11.6666H15.5" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.75 1L5 17" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 1L10.25 17" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>`,
      className: `title-link`,
      enableCustomId: true,
    },
  },
  {
    resolve: `gatsby-remark-images`,
    options: {
      disableBgImageOnAlpha: true,
    },
  },
  {
    resolve: require.resolve('./plugins/gatsby-remark-to-absoluteurl'),
    options: {
      redirects: config.redirects,
    },
  },
  {
    resolve: require.resolve('./plugins/gatsby-remark-check-links-numberless'),
    options: {
      // Do not surface links to these pages as broken:
      exceptions: [
        '/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres',
        '/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres',
        '/guides/upgrade-guides/upgrade-from-prisma-1/schema-incompatibilities-postgres',
        '/guides/upgrade-guides/upgrade-from-prisma-1/upgrading-the-prisma-layer-postgres',
        '/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-planetscale',
        '/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-planetscale',
        '/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-planetscale',
        '/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-planetscale',
        '/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb',
      ],
    },
  },
  {
    resolve: 'gatsby-remark-copy-linked-files',
    options: {
      destinationDir: 'static',
    },
  },
]

const algoliaPlugin = {
  resolve: require.resolve('./plugins/gatsby-algolia-indexer'),
  options: {
    appId: process.env.GATSBY_ALGOLIA_APP_ID,
    adminKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
    searchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    types: [`Mdx`],
  },
}

let plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-typescript',
  'gatsby-image',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-smoothscroll',
  'gatsby-plugin-catch-links',
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      sitemapSize: 5000,
      exclude: [
        // Remove these from sitemap for SEO purposes as they're redirected
        `/getting-started/quickstart`,
        `/getting-started/setup-prisma/add-to-existing-project`,
        `/getting-started/setup-prisma/start-from-scratch-prisma-migrate`,
        `/getting-started/setup-prisma/start-from-scratch-sql`,
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      policy: [
        {
          userAgent: '*',
          disallow: '/',
          disallow: '/*?query=*',
          disallow: '/*?page=*',
          disallow: '/*&query=*',
          disallow: '/*&page=*',
        },
      ],
    },
  },
  // 'gatsby-plugin-offline', // it causes infinite loop issue with workbox
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      defaultLayouts: {
        default: require.resolve('./src/layouts/articleLayout.tsx'),
      },
      extensions: ['.mdx', '.md'],
      gatsbyRemarkPlugins,
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
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-meta-redirect',
  'gatsby-plugin-page-list',
  {
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: 'GTM-KCGZPWB',
      includeInDevelopment: false,
      defaultDataLayer: { website: 'docs' },
    },
  },
]

if (process.env.INDEX_ALGOLIA === 'true') {
  if (process.env.GATSBY_ALGOLIA_APP_ID) {
    plugins = [...plugins, algoliaPlugin]
  } else {
    console.warn('INDEX_ALGOLIA === true, but GATSBY_ALGOLIA_APP_ID is undefined.')
  }
}

module.exports = {
  // The line below has been disabled so that both PR previews and production use the same paths
  // pathPrefix: process.env.ADD_PREFIX === 'true' ? config.gatsby.pathPrefix : '/',
  pathPrefix: process.env.ADD_PREFIX === 'true' ? config.gatsby.pathPrefix : '/',
  siteMetadata: {
    pathPrefix: config.gatsby.pathPrefix,
    title: config.siteMetadata.title,
    titlePrefix: config.gatsby.titlePrefix,
    titleSuffix: config.gatsby.titleSuffix,
    description: config.siteMetadata.description,
    keywords: config.siteMetadata.keywords,
    twitter: config.siteMetadata.twitter,
    og: config.siteMetadata.og,
    header: config.header,
    siteUrl: config.gatsby.siteUrl,
    footer: config.footer,
    docsLocation: config.siteMetadata.docsLocation,
    redirects: config.redirects,
    homepage: config.homepage,
  },
  plugins,
}
