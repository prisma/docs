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
      gettingStarted: 'getting-started',
      readyToRun: 'https://github.com/prisma/prisma-examples',
      slack: 'https://slack.prisma.io/',
      discord: 'https://pris.ly/discord',
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
    ORMPlatformLinkData: {
      porm: {
        title: 'Prisma ORM',
        icon: 'database',
        description:
          'Open source Node.js and TypeScript ORM with an intuitive data model, automated migrations, type-safety, and auto-completion.',
        links: [
          {
            url: 'getting-started',
            title: 'Getting started',
          },
          {
            url: 'https://github.com/prisma/prisma-examples',
            title: 'Example projects',
            external: true,
          },
        ],
      },
      pdp: {
        title: 'Prisma Data Platform',
        icon: 'triangle',
        description:
          'An ecosystem of tools empowering teams to build data-heavy, global-first applications.',
        links: [
          {
            url: 'data-platform/accelerate',
            title: 'Prisma Accelerate',
          },
          {
            url: 'data-platform/pulse',
            title: 'Prisma Pulse',
          },
        ],
      },
    },
    GeneralLinkData: [
      {
        title: `What is Prisma`,
        description: 'An overview of what Prisma ORM is and how it works.',
        url: 'concepts/overview/what-is-prisma',
        icon: 'fa-regular fa-question',
      },
      {
        title: `CRUD`,
        description: 'How to perform CRUD operations with your generated Prisma Client API. ',
        url: 'concepts/components/prisma-client/crud',
        icon: 'fa-solid fa-arrow-right-arrow-left',
      },
      {
        title: `Prisma in your stack`,
        description:
          'Use Prisma to build a GraphQL or REST API, or as part of a fullstack application.',
        url: 'concepts/overview/prisma-in-your-stack',
        icon: 'fa-solid fa-server',
      },
      {
        title: `Preview features`,
        description: 'Available preview features and how to enable them.',
        url: 'concepts/components/preview-features',
        icon: 'fa-solid fa-eye',
      },
      {
        title: `Adopting Prisma`,
        description: 'Migrate to Prisma from other ORMs.',
        url: 'guides/migrate-to-prisma',
        icon: 'fa-solid fa-download',
      },
      {
        title: `Deployment guides`,
        description:
          'Deploy Node.js applications with Prisma Client to platforms like Vercel, AWS Lambda, Netlify and Heroku.',
        url: 'guides/deployment',
        icon: 'fa-solid fa-book',
      },
    ],
    CommunityLinksData: [
      {
        id: 'slack',
        title: 'Slack',
        description: 'Engage with a vibrant community of developers and companies adopting Prisma',
        icon: 'fa-brands fa-slack',
        link: 'https://slack.prisma.io/',
        linkText: 'Join our channel',
      },
      {
        id: 'github',
        title: 'GitHub',
        description:
          'Browse the Prisma source code, send feedback, or join the discussion on GitHub.',
        icon: 'fa-brands fa-github',
        link: 'https://github.com/prisma',
        linkText: 'Contribute in GitHub',
      },
      {
        id: 'discord',
        title: 'Discord',
        description:
          'Chat in real-time, hang out, and share ideas with community members and our team.',
        icon: 'fa-brands fa-discord',
        link: 'https://pris.ly/discord',
        linkText: 'Join our server',
      },
    ],
    CardLinks: {
      components: [
        {
          url: 'concepts/components/prisma-schema',
          title: 'Prisma Schema',
        },
        {
          url: 'concepts/components/prisma-cli',
          title: 'Prisma CLI',
        },
        {
          url: 'concepts/components/prisma-client',
          title: 'Prisma Client',
        },
        {
          url: 'concepts/components/prisma-studio',
          title: 'Prisma Studio',
        },
        {
          url: 'concepts/components/prisma-migrate',
          title: 'Prisma Migrate',
        },
      ],
      reference: [
        {
          url: 'reference/api-reference/prisma-client-reference',
          title: 'Prisma Client API reference',
        },
        {
          url: 'reference/api-reference/prisma-schema-reference',
          title: 'Prisma schema reference',
        },
        {
          url: 'reference/api-reference/error-reference',
          title: 'Error message reference',
        },
        {
          url: 'reference/api-reference/command-reference',
          title: 'Prisma CLI reference',
        },
      ],
    },
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
    SpecialPaths: ['prisma-cli', 'deployment', 'sql-views'],
  },
  feedback: {
    sentimentUrl: '/docs/api/sentiment',
    feedbackUrl: '/docs/api/feedback',
  },
  footer: {
    newsletter: {
      text: 'Stay up to date with the latest features and changes to Prisma',
    },
  },
}

export default siteConfig
