const siteConfig = {
  gatsby: {
    pathPrefix: '/docs',
    siteUrl: 'https://www.prisma.io',
    titlePrefix: '',
    titleSuffix: ' | Prisma Docs',
  },
  redirects: [
    // Added this object for redirect because gatsby filters through the redirects key in gatsby-browser.js.
    // This object will create a "dummy" page in percy, creating a 404 page of `/foo/index`
    {
      from: '/foo',
      to: '/bar',
    },
  ],
  header: {
    secondLevelHeaderMenuItems: [
      {
        text: 'Get Started',
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
        text: 'Prisma Data Platform',
        to: '/data-platform',
        type: 'bucket',
        bucketName: '/800-data-platform',
      },
      { text: 'About', to: '/about', type: 'bucket', bucketName: '/600-about' },
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
      gettingStarted: '/docs/getting-started',
      readyToRun: 'https://github.com/prisma/prisma-examples',
      slack: 'https://slack.prisma.io/',
      git: 'https://github.com/prisma',
      buttons: [
        {
          text: 'Getting started',
          url: 'getting-started',
          special: true,
          icon: 'DoubleArrow',
        },
        {
          text: 'Example projects',
          url: 'https://github.com/prisma/prisma-examples',
          special: false,
          icon: null,
        },
      ],
    },

    GeneralLinkData: [
      {
        categoryName: 'Overview',
        icon: 'OverviewIcon',
        links: [
          {
            text: 'What is Prisma',
            url: '/docs/concepts/overview/what-is-prisma',
            codeBlock: false,
          },
          {
            text: 'Why Prisma?',
            url: '/docs/concepts/overview/why-prisma',
            codeBlock: false,
          },
          {
            text: 'Should you use Prisma?',
            url: '/docs/concepts/overview/should-you-use-prisma',
            codeBlock: false,
          },
          {
            text: 'Prisma in your stack',
            url: '/docs/concepts/overview/prisma-in-your-stack',
            codeBlock: false,
          },
          {
            text: 'Under the hood',
            url: '/docs/concepts/components/prisma-engines',
            codeBlock: false,
          },
        ],
      },
      {
        categoryName: 'Components',
        icon: 'ComponentsIcon',
        links: [
          {
            text: 'Prisma schema',
            url: '/docs/concepts/components/prisma-schema',
            codeBlock: false,
          },
          {
            text: 'Prisma Client',
            url: '/docs/concepts/components/prisma-client',
            codeBlock: false,
          },
          {
            text: 'Prisma Migrate',
            url: '/docs/concepts/components/prisma-migrate',
            codeBlock: false,
          },
          {
            text: 'Introspection',
            url: '/docs/concepts/components/introspection',
            codeBlock: false,
          },
          {
            text: 'Prisma CLI',
            url: '/docs/concepts/components/prisma-cli',
            codeBlock: false,
          },
          {
            text: 'Prisma Studio',
            url: '/docs/concepts/components/prisma-studio',
            codeBlock: false,
          },
          {
            text: 'Preview features',
            url: '/docs/concepts/components/preview-features',
            codeBlock: false,
          },
        ],
      },
      {
        categoryName: 'Database Connectors',
        icon: 'DatabaseIcon',
        links: [
          {
            text: 'PostgreSQL',
            url: '/docs/concepts/database-connectors/postgresql',
            codeBlock: false,
          },
          {
            text: 'MySQL',
            url: '/docs/concepts/database-connectors/mysql',
            codeBlock: false,
          },
          {
            text: 'MongoDB',
            url: '/docs/concepts/database-connectors/mongodb',
            codeBlock: false,
          },
          {
            text: 'SQL Server',
            url: '/docs/concepts/database-connectors/sql-server',
            codeBlock: false,
          },
          {
            text: 'SQLite',
            url: '/docs/concepts/database-connectors/sqlite',
            codeBlock: false,
          },
          {
            text: 'CockroachDB',
            url: '/docs/concepts/database-connectors/cockroachdb',
            codeBlock: false,
          },
        ],
      },
      {
        categoryName: 'More',
        icon: 'MoreIcon',
        links: [
          {
            text: 'Editor setup',
            url: '/docs/guides/development-environment/editor-setup',
            codeBlock: false,
          },
          {
            text: 'Codemod',
            url: '/docs/guides/upgrade-guides/upgrading-versions/codemods',
            codeBlock: false,
          },
          {
            text: 'Telemetry',
            url: '/docs/concepts/more/telemetry',
            codeBlock: false,
          },
          {
            text: 'Comparing Prisma',
            url: '/docs/concepts/more/comparisons',
            codeBlock: false,
          },
        ],
      },
    ],
    GuideText: 'Guides for building and deploying applications with Prisma.',

    GuideLinkData: [
      {
        title: 'Developing with Prisma Migrate',
        color: '#48BB78',
        small: false,
        content: 'Get started with Prisma Migrate.',
        url: '/docs/guides/database/developing-with-prisma-migrate',
      },
      {
        title: 'Performance and optimization',
        color: '#38B2AC',
        small: true,
        content: 'Tune your queries and monitor your application.',
        url: '/docs/guides/performance-and-optimization',
      },
      {
        title: 'Working with your database',
        color: '#4299E1',
        small: true,
        content:
          'Guides for common database workflow such as configuring constraints or cascading deletes.',
        url: '/docs/guides/database',
      },
      {
        title: 'Adopting Prisma',
        color: '#9F7AEA',
        small: true,
        content: 'Migrate to Prisma from other ORMs.',
        url: '/docs/guides/migrate-to-prisma',
      },
      {
        title: 'Upgrading to Prisma',
        color: '#ED64A6',
        small: true,
        content: 'Upgrade to Prisma from Prisma 1 or Graphcool.',
        url: '/docs/guides/upgrade-guides',
      },
      {
        title: 'Deploying Prisma apps',
        color: '#667EEA',
        small: false,
        content:
          'Deploy a Node.js application with Prisma Client to platforms like Vercel, AWS Lambda, Netlify, and Heroku.',
        url: '/docs/guides/deployment',
      },
    ],
    ReferenceText:
      'Reference documentation for Prisma Client, the Prisma Schema Language (PSL), the Prisma CLI, and supported database providers.',

    ReferenceLinkData: [
      {
        categoryName: 'Prisma Reference',
        mainUrl: 'reference',
        icon: 'Schema',
        links: [
          {
            text: 'Prisma Client API reference',
            url: '/docs/reference/api-reference/prisma-client-reference',
            codeBlock: false,
          },
          {
            text: 'Prisma schema reference',
            url: '/docs/reference/api-reference/prisma-schema-reference',
            codeBlock: false,
          },
          {
            text: 'Prisma error reference',
            url: '/docs/reference/api-reference/error-reference',
            codeBlock: false,
          },
        ],
      },
      {
        categoryName: 'CLI Commands',
        mainUrl: '/docs/reference/api-reference/command-reference',
        icon: 'CLI',
        links: [
          {
            text: 'introspect',
            url: '/docs/reference/api-reference/command-reference#introspect',
            codeBlock: true,
          },
          {
            text: 'migrate',
            url: '/docs/reference/api-reference/command-reference#prisma-migrate',
            codeBlock: true,
          },
          {
            text: 'db',
            url: '/docs/reference/api-reference/command-reference#db',
            codeBlock: true,
          },
        ],
      },
      {
        categoryName: 'Database',
        mainUrl: 'reference/database-reference',
        icon: 'DbLink',
        links: [
          {
            text: 'Features matrix',
            url: '/docs/reference/database-reference/database-features',
            codeBlock: false,
          },
          {
            text: 'Connection URLs',
            url: '/docs/reference/database-reference/connection-urls',
            codeBlock: false,
          },
          {
            text: 'Supported databases',
            url: '/docs/reference/database-reference/supported-databases',
            codeBlock: false,
          },
        ],
      },
    ],

    MoreUsefulLinks: [
      {
        text: `What's new in Prisma docs`,
        url: '/docs/about/prisma-docs/whats-new-in-prisma-docs',
        codeBlock: false,
      },
      {
        text: 'About the docs ',
        url: '/docs/about/prisma-docs/about-the-docs',
        codeBlock: false,
      },
      {
        text: 'Prisma style guide',
        url: '/docs/about/prisma-docs/style-guide',
        codeBlock: false,
      },
      {
        text: 'Ask a question on Github',
        url: '/docs/support#ask-a-question-about-prisma',
        codeBlock: false,
      },
      {
        text: 'Create a bug report',
        url: '/docs/support#create-a-bug-report-for-prisma',
        codeBlock: false,
      },
      {
        text: 'Submit a feature request',
        url: '/docs/support#submit-a-feature-request',
        codeBlock: false,
      },
      {
        text: 'Slack',
        url: 'https://slack.prisma.io/',
        codeBlock: false,
      },
      {
        text: 'FAQ',
        url: '/docs/about/prisma/faq',
      },
      {
        text: 'Limitations',
        url: '/docs/about/prisma/limitations',
        codeBlock: false,
      },
      {
        text: 'Community',
        url: 'https://www.prisma.io/community',
        codeBlock: false,
      },
      {
        text: 'Roadmap',
        url: '/docs/about/prisma/roadmap',
        codeBlock: false,
      },
      {
        text: 'ORM Releases and maturity levels',
        url: '/docs/about/prisma/releases',
        codeBlock: false,
      },
      {
        text: 'Platform Releases and maturity levels',
        url: '/docs/about/prisma/platform-releases',
        codeBlock: false,
      },
    ],
  },
  siteMetadata: {
    title: 'Prisma Documentation | Concepts, Guides, and Reference',
    description:
      "Get started with Prisma in the official documentation, and learn more about all Prisma's features with reference documentation, guides, and more.",
    keywords: 'Docs, prisma, 2.0',
    docsLocation: 'https://github.com/prisma/docs/tree/main/content',
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
    sentimentUrl: '/docs/api/sentiment',
    feedbackUrl: '/docs/api/feedback',
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

export default siteConfig
