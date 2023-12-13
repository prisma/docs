import type { GatsbyConfig } from 'gatsby'
import docsConfig from './config'
require('dotenv').config({
  path: `.env`,
})

let plugins: any = [
  'gatsby-plugin-image',
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-smoothscroll',
  'gatsby-plugin-catch-links',
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: ['.mdx', '.md'],
      gatsbyRemarkPlugins: [
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
          resolve: `gatsby-remark-image-custom`,
          options: {
            disableBgImageOnAlpha: true,
            quality: 100,
          },
        },
        {
          resolve: 'gatsby-remark-to-absoluteurl',
          options: {
            redirects: docsConfig.redirects,
          },
        },
        {
          resolve: 'gatsby-remark-check-links-numberless',
          options: {
            // Do not surface links to these pages as broken:
            exceptions: [
              '/orm/more/upgrade-guides/upgrade-from-prisma-1/schema-incompatibilities-postgresql',
              '/orm/more/upgrade-guides/upgrade-from-prisma-1/upgrading-the-prisma-layer-postgresql',
              '/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql',
              '/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql',
              '/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-planetscale',
              '/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-planetscale',
              '/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-planetscale',
              '/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-planetscale',
              '/getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb',
              '/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb',
              '/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-cockroachdb',
              '/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-cockroachdb',
              '/getting-started/setup-prisma/add-to-existing-project/relational-databases/baseline-your-database-typescript-cockroachdb',
            ],
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
          options: {
            destinationDir: 'static',
          },
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: 'GTM-KCGZPWB',
      includeInDevelopment: false,
      defaultDataLayer: { website: 'docs' },
    },
  },
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      entryLimit: 5000,
      excludes: [
        // Remove these from sitemap for SEO purposes as they're redirected
        `/getting-started/quickstart`,
        `/getting-started/setup-prisma/add-to-existing-project`,
        `/getting-started/setup-prisma/start-from-scratch-prisma-migrate`,
        `/getting-started/setup-prisma/start-from-scratch-sql`,
      ],
      resolvePagePath: (page: any) => {
        return page.path.replace(/\/$/, '')
      },
    },
  },
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      policy: [
        {
          userAgent: '*',
          disallow: ['/', '/*?query=*', '/*?page=*', '/*&query=*', '/*&page=*'],
        },
      ],
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/images/`,
    },
    __key: 'images',
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: `docs`,
      path: `${__dirname}/content`,
    },
    __key: 'pages',
  },
  'gatsby-plugin-meta-redirect',
  'gatsby-plugin-page-list',
  'gatsby-plugin-lost-pixel',
]

if (process.env.INDEX_ALGOLIA === 'true') {
  if (process.env.GATSBY_ALGOLIA_APP_ID) {
    // only set this up when we actually need it
    const algoliaPlugin = {
      resolve: 'gatsby-algolia-indexer',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        adminKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
        searchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        types: [`Mdx`],
      },
      __key: 'search',
    }

    plugins.push(algoliaPlugin)

    console.log(
      'INDEX_ALGOLIA is `true`, and GATSBY_ALGOLIA_APP_ID is set, so pushing algoliaPlugin to list of plugins to trigger search indexing.'
    )
  } else {
    console.warn('INDEX_ALGOLIA === true, but GATSBY_ALGOLIA_APP_ID is undefined.')
  }
} else {
  console.log('INDEX_ALGOLIA not `true`, not pushing algoliaPlugin to skip any search indexing.')
}

const config: GatsbyConfig = {
  pathPrefix: process.env.ADD_PREFIX === 'true' ? docsConfig.gatsby.pathPrefix : '/',
  // trailingSlash: 'never',
  siteMetadata: {
    pathPrefix: docsConfig.gatsby.pathPrefix,
    title: docsConfig.siteMetadata.title,
    titlePrefix: docsConfig.gatsby.titlePrefix,
    titleSuffix: docsConfig.gatsby.titleSuffix,
    description: docsConfig.siteMetadata.description,
    keywords: docsConfig.siteMetadata.keywords,
    twitter: docsConfig.siteMetadata.twitter,
    og: docsConfig.siteMetadata.og,
    header: docsConfig.header,
    siteUrl: docsConfig.gatsby.siteUrl,
    footer: docsConfig.footer,
    docsLocation: docsConfig.siteMetadata.docsLocation,
    redirects: docsConfig.redirects,
    homepage: docsConfig.homepage,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins,
}

export default config
