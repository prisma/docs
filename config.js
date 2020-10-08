const config = {
  gatsby: {
    pathPrefix: '/docs',
    siteUrl: 'https://www.prisma.io',
    titlePrefix: '',
    titleSuffix: ' | Prisma Documentation',
  },
  redirects: [
    {
      from: '/reference/tools-and-interfaces/prisma-schema/prisma-schema-file',
      to: '/reference/tools-and-interfaces/prisma-schema',
    },
    {
      from: '/reference/tools-and-interfaces/prisma-client/api',
      to: '/reference/tools-and-interfaces/prisma-client',
    },
    {
      from: '/reference/tools-and-interfaces/prisma-schema/models',
      to: '/reference/tools-and-interfaces/prisma-schema/data-model#defining-models',
    },
  ],
  header: {
    secondLevelHeaderMenuItems: [
      {
        text: 'Getting Started',
        to: '/learn-prisma',
        type: 'bucket',
        bucketName: '/01-learn-prisma',
      },
      {
        text: 'Concepts',
        to: '/reference',
        type: 'bucket',
        bucketName: '/03-reference',
      },
      {
        text: 'Guides',
        to: '/guides-and-tutorials',
        type: 'bucket',
        bucketName: '/02-guides-and-tutorials',
      },
      {
        text: 'Reference',
        to: '/api-ref',
        type: 'bucket',
        bucketName: '/02-api-ref',
      },
      { text: 'FAQ', to: '/faq', type: 'bucket', bucketName: '/03-faq' },
      { text: 'Prisma 1 Docs', to: 'https://www.prisma.io/docs/1.34', type: 'external-link' },
    ],
    search: {
      indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
    },
  },
  siteMetadata: {
    title: 'Prisma - Database tools for modern application development',
    description:
      'Prisma replaces traditional ORMs and can be used to build GraphQL servers, REST APIs, microservices & more.',
    keywords: 'Docs, prisma, 2.0',
    docsLocation: 'https://github.com/prisma/docs/tree/master/content',
    twitter: {
      site: '@prisma',
      creator: '@prisma',
      image: '/social/docs-social.png',
    },
    og: {
      site_name: 'Prisma',
      type: 'website',
      image: {
        alt: 'Database tools for modern developers',
        height: '630',
        type: 'image/png',
        url: '/social/docs-social.png',
        width: '1200',
      },
    },
  },
  feedback: {
    function_name: 'https://prisma2.netlify.app/.netlify/functions/index',
  },
  sidebar: {
    tablet_menu_split: ['04-guides', '05-more'], // Slugs for top level folders which should appear in right pane on tablet
  },
  footer: {
    newsletter: {
      text: 'Stay up to date with the latest features and changes to Prisma',
    },
  },
}

module.exports = config
