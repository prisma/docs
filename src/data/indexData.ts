export const ProductLinkData = {
  porm: {
    title: 'Build with Prisma ORM',
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
    title: 'Grow as your app evolves',
    icon: 'triangle',
    description:
      'Expand your application capabilities with global database caching, connection pooling and real-time database events.',
    links: [
      {
        url: 'accelerate',
        title: 'Prisma Accelerate',
      },
      {
        url: 'pulse',
        title: 'Prisma Pulse',
      },
    ],
  },
}

export const ORMCardLinkData = {
  components: [
    {
      url: 'orm/prisma-schema',
      title: 'Prisma Schema',
    },
    {
      url: 'orm/tools/prisma-cli',
      title: 'Prisma CLI',
    },
    {
      url: 'orm/prisma-client',
      title: 'Prisma Client',
    },
    {
      url: 'orm/tools/prisma-studio',
      title: 'Prisma Studio',
    },
    {
      url: 'orm/prisma-migrate',
      title: 'Prisma Migrate',
    },
  ],
  reference: [
    {
      url: 'orm/reference/prisma-client-reference',
      title: 'Prisma Client API reference',
    },
    {
      url: 'orm/reference/prisma-schema-reference',
      title: 'Prisma schema reference',
    },
    {
      url: 'orm/reference/error-reference',
      title: 'Error message reference',
    },
    {
      url: 'orm/reference/prisma-cli-reference',
      title: 'Prisma CLI reference',
    },
  ],
}

export const ORMGeneralLinkData = [
  {
    title: `What is Prisma ORM`,
    description: 'An overview of what Prisma ORM is and how it works.',
    url: 'orm/overview/introduction/what-is-prisma',
    icon: 'fa-regular fa-question',
  },
  {
    title: `CRUD`,
    description: 'How to perform CRUD operations with your generated Prisma Client API. ',
    url: 'orm/prisma-client/queries/crud',
    icon: 'fa-solid fa-arrow-right-arrow-left',
  },
  {
    title: `Prisma ORM in your stack`,
    description:
      'Use Prisma ORM to build a GraphQL or REST API, or as part of a fullstack application.',
    url: 'orm/overview/prisma-in-your-stack',
    icon: 'fa-solid fa-server',
  },
  {
    title: `Preview features`,
    description: 'Available preview features and how to enable them.',
    url: 'orm/reference/preview-features',
    icon: 'fa-solid fa-eye',
  },
  {
    title: `Adopting Prisma ORM`,
    description: 'Migrate to Prisma ORM from other ORMs.',
    url: 'orm/more/migrating-to-prisma',
    icon: 'fa-solid fa-download',
  },
  {
    title: `Deployment guides`,
    description:
      'Deploy Node.js applications with Prisma Client to platforms like Vercel, AWS Lambda, Netlify and Heroku.',
    url: 'orm/prisma-client/deployment',
    icon: 'fa-solid fa-book',
  },
]

export const DatabaseData = [
  {
    title: 'PostgreSQL',
    icon: "postgresqlsimple",
    darkIcon: "postgresqldark",
    url: 'orm/overview/databases/postgresql',
  },
  {
    title: 'MySQL',
    icon: "mysqlsimple",
    darkIcon: "mysqlsimple",
    url: 'orm/overview/databases/mysql',
  },
  {
    title: 'SQL Server',
    icon: "sqlserver",
    darkIcon: "sqlserver",
    url: 'orm/overview/databases/sql-server',
  },
  {
    title: 'SQLite',
    icon: "sqlite",
    darkIcon: "sqlite",
    url: 'orm/overview/databases/sqlite',
  },
  {
    title: 'MongoDB',
    icon: "mongodbsimple",
    darkIcon: "mongodbsimple",
    url: 'orm/overview/databases/mongodb',
  },
  {
    title: 'CockroachDB',
    icon: "cockroachdb",
    darkIcon: "cockroachdbdark",
    url: 'orm/overview/databases/cockroachdb',
  },
  {
    title: 'Planetscale',
    icon: "planetscale",
    darkIcon: "planetscaledark",
    url: 'orm/overview/databases/planetscale',
  },
  {
    title: 'MariaDB',
    icon: "mariadb",
    darkIcon: "mariadbdark",
    url: 'orm/overview/databases/mysql',
  },
]

export const CommunityLinksData = [
  {
    id: 'discord',
    title: 'Discord',
    description:
      'Chat in real-time, hang out, and share ideas with community members and our team.',
    icon: 'fa-brands fa-discord',
    link: 'https://pris.ly/discord',
    linkText: 'Join our server',
  },
  {
    id: 'github',
    title: 'GitHub',
    description:
      'Browse the Prisma ORM source code, send feedback, or join the discussion on GitHub.',
    icon: 'fa-brands fa-github',
    link: 'https://github.com/prisma',
    linkText: 'Contribute in GitHub',
  },
  {
    id: 'X',
    title: 'X',
    description: 'Stay up-to-date, join the discussion, and connect with the community on X.',
    icon: 'fa-brands fa-x-twitter',
    link: 'https://twitter.com/prisma',
    linkText: 'Follow us on X',
  },
]
