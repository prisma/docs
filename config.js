const config = {
  gatsby: {
    pathPrefix: '/docs',
    siteUrl: 'https://www.prisma.io',
    titlePrefix: '',
    titleSuffix: ' | Prisma Docs',
  },
  redirects: [
    {
      from: '/reference/tools-and-interfaces/prisma-schema/prisma-schema-file',
      to: '/reference/tools-and-interfaces/prisma-schema',
    },
    {
      from: '/reference/tools-and-interfaces/prisma-schema',
      to: '/concepts/components/prisma-schema',
    },
    {
      from: '/reference/tools-and-interfaces/prisma-client/api',
      to: '/concepts/components/prisma-client',
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
        to: '/getting-started',
        type: 'bucket',
        bucketName: '/100-getting-started',
      },
      {
        text: 'Concepts',
        to: '/concepts',
        type: 'bucket',
        bucketName: '/200-concepts',
      },
      {
        text: 'Guides',
        to: '/guides',
        type: 'bucket',
        bucketName: '/300-guides',
      },
      {
        text: 'Reference',
        to: '/reference',
        type: 'bucket',
        bucketName: '/400-reference',
      },
      {
        text: 'Support',
        to: '/support',
        type: 'bucket',
        bucketName: '/500-support',
      },
      { text: 'About', to: '/about', type: 'bucket', bucketName: '/600-about' },
      { text: 'Prisma 1 Docs', to: 'https://v1.prisma.io/docs/1.34', type: 'external-link' },
    ],
    search: {
      indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
    },
  },
  homepage: {
    SummaryLinkData: {
      gettingStarted: '/getting-started',
      readyToRun: 'https://github.com/prisma/prisma-examples',
      slack: 'https://slack.prisma.io/',
      git: 'https://github.com/prisma',
      buttons: [
        {
          text: 'Quick start',
          url: '/getting-started/quickstart-typescript',
          special: true,
          icon: 'DoubleArrow',
        },
        {
          text: 'Set up prisma',
          url: '/getting-started/setup-prisma',
          special: false,
          icon: null,
        },
        {
          text: 'Examples',
          url: 'https://github.com/prisma/prisma-examples',
          special: false,
          icon: null,
        },
      ],
    },
    
    GeneralLinkData:[
      {
        categoryName: 'Overview',
        icon:'OverviewIcon',
        links: [
          {
            text: 'What is Prisma',
            url: '/concepts/overview/what-is-prisma',
          },
          {
            text: 'Why Prisma?',
            url: '/concepts/overview/why-prisma',
          },
          {
            text: 'Prisma in your stack',
            url: '/concepts/overview/prisma-in-your-stack',
          },
          {
            text: 'Under the hood ',
            url: '/concepts/overview/under-the-hood',
          },
        ],
      },
      {
        categoryName: 'Components',
        icon: 'ComponentsIcon',
        links: [
          {
            text: 'Prisma schema',
            url: '/concepts/components/prisma-schema',
          },
          {
            text: 'Prisma Client',
            url: '/concepts/components/prisma-client',
          },
          {
            text: 'Prisma Migrate',
            url: '/concepts/components/prisma-migrate',
          },
          {
            text: 'Introspection',
            url: '/concepts/components/introspection',
          },
          {
            text: 'Prisma CLI',
            url: '/concepts/components/prisma-cli',
          },
          {
            text: 'Prisma Studio',
            url: '/concepts/components/prisma-studio',
          },
          {
            text: 'Preview features',
            url: '/concepts/components/preview-features',
          },
        ],
      },
      {
        categoryName: 'Database Connectors',
        icon: 'DatabaseIcon',
        links: [
          {
            text: 'PostgreSQL',
            url: '/concepts/database-connectors/postgresql',
          },
          {
            text: 'MySQL',
            url: '/concepts/database-connectors/mysql',
          },
          {
            text: 'SQLite',
            url: '/concepts/database-connectors/sqlite',
          },
          {
            text: 'SQL Server',
            url: '/concepts/database-connectors/microsoft-sql-server',
          },
        ],
      },
      {
        categoryName: 'More',
        icon: 'MoreIcon',
        links: [
          {
            text: 'Support and help articles',
            url: '/support',
          },
          {
            text: 'Telemetry',
            url: '/concepts/more/telemetry',
          },
        ],
      },
    ],
    GuideText: 'Guides for building and deploying applications with Prisma.',
    
    GuideLinkData : [
      {
        title: 'Spotlight: Transaction guide',
        color: '#48BB78',
        small: false,
        content: 'Explore techniques for handling transactions with Prisma Client.',
        url: '/guides/prisma-guides/prisma-client-transactions-guide',
      },
      {
        title: 'Using Prisma',
        color: '#38B2AC',
        small: true,
        content: 'How to integrate Prisma into your stack.',
        url: '/guides/prisma-guides',
      },
      {
        title: 'Database workflows',
        color: '#4299E1',
        small: true,
        content: 'Guides for common database workflow such as configuring constraints or cascading deletes.',
        url: '/guides/general-guides/database-workflows/foreign-keys',
      },
      {
        title: 'Adopting Prisma',
        color: '#9F7AEA',
        small: true,
        content: 'Migrate to Prisma from other ORMs.',
        url: '/guides/migrate-to-prisma',
      },
      {
        title: 'Upgrading to Prisma',
        color: '#ED64A6',
        small: true,
        content: 'Upgrade to Prisma from Prisma 1 or Graphcool.',
        url: '/guides/upgrade-guides',
      },
      {
        title: 'Deploying Prisma apps',
        color: '#667EEA',
        small: false,
        content: 'Deploy a Node.js application with Prisma Client to platforms like Vercel, AWS Lambda, Netlify, and Heroku.',
        url: '/guides/deployment',
      }
    ],
    ReferenceText: 'Reference documentation for Prisma Client, the Prisma Schema Language (PSL), the Prisma CLI, and supported database providers.',
    
    ReferenceLinkData : [
      {
        categoryName: 'Prisma Schema API',
        mainUrl: '/reference/api-reference/prisma-schema-reference',
        icon: 'Schema',
        links: [
          {
            text: 'datasource',
            url: '/reference/api-reference/prisma-schema-reference#datasource',
            codeBlock: true,
          },
          {
            text: 'generator',
            url: '/reference/api-reference/prisma-schema-reference#generator',
            codeBlock: true,
          },
          {
            text: 'model',
            url: '/reference/api-reference/prisma-schema-reference#model',
            codeBlock: true,
          },
        ],
      },
      {
        categoryName: 'CLI Commands',
        mainUrl: '/reference/api-reference/command-reference',
        icon: 'CLI',
        links: [
          {
            text: 'introspect',
            url: '/reference/api-reference/command-reference#introspect',
            codeBlock: true,
          },
          {
            text: 'migrate',
            url: '/reference/api-reference/command-reference#prisma-migrate-preview',
            codeBlock: true,
          },
          {
            text: 'db',
            url: '/reference/api-reference/command-reference#db',
            codeBlock: true,
          },

        ],
      },
      {
        categoryName: 'Database',
        mainUrl: '/reference/database-reference',
        icon: 'DbLink',
        links: [
          {
            text: 'Features matrix',
            url: '/reference/database-reference/database-features',
            codeBlock: false,
          },
          {
            text: 'Connection URLs',
            url: '/reference/database-reference/connection-urls',
            codeBlock: false,
          },
          {
            text: 'Supported databases',
            url: '/reference/database-reference/supported-databases',
            codeBlock: false,
          },
        ],
      },
    ],
    
    MoreUsefulLinks : [
      {
        text: `What's new in Prisma docs`,
        url: '',
      },
      {
        text: 'About the docs ',
        url: '',
      },
      {
        text: 'Prisma style guide',
        url: '',
      },
      {
        text: 'Ask a question on Github',
        url: '',
      },
      {
        text: 'Create a bug report',
        url: '',
      },
      {
        text: 'Submit a feature request',
        url: '',
      },
      {
        text: 'Slack',
        url: 'https://slack.prisma.io/',
      },
      {
        text: 'FAQ',
        url: '',
      },
      {
        text: 'Limitations',
        url: '',
      },
      {
        text: 'Community',
        url: '',
      },
      {
        text: 'Roadmap',
        url: '',
      },
      {
        text: 'Releases and maturity levels',
        url: '',
      },
    ]
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
    function_name: 'https://prisma2-docs.netlify.app/.netlify/functions/index',
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
