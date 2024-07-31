export const ProductLinkData = {
  porm: {
    title: "Build with Prisma ORM",
    eyebrow: "Build",
    description:
      "Open source Node.js and TypeScript ORM with an intuitive data model, automated migrations, type-safety, and auto-completion.",
    links: [
      {
        url: "/orm",
        title: "ORM",
      },
      {
        url: "/orm/tools/prisma-studio",
        title: "Studio",
      },
    ],
  },
  poptimize: {
    title: "Consistent Performance",
    eyebrow: "Fortify",
    description: "Ensure that your database and queries are running at peak performance and efficiency. Easily handle connections to your database and scale with your traffic.",
    links: [
      {
        url: "https://www.prisma.io/blog/prisma-optimize-early-access",
        title: "Optimize",
      },
      {
        url: "/accelerate/what-is-accelerate",
        title: "Accelerate",
      },
    ],
  },
  pdp: {
    title: "Grow as your app evolves",
    eyebrow: "Grow",
    description:
      "Expand your application capabilities with global database caching, connection pooling, and real-time database subscriptions.",
    links: [
      {
        url: "/accelerate",
        title: "Prisma Accelerate",
      },
      {
        url: "/pulse",
        title: "Prisma Pulse",
      },
    ],
  },
};

export const ORMCardLinkData = {
  components: {
    title: "ORM Components",
    description: "Learn about the building blocks of Prisma ORM.",
    links: [
      {
        url: "/orm/prisma-schema",
        title: "Prisma Schema",
      },
      {
        url: "/orm/reference/prisma-schema-reference",
        title: "Schema reference",
      },
      {
        url: "/orm/prisma-client",
        title: "Prisma Client",
      },
      {
        url: "/orm/reference/prisma-client-reference",
        title: "Client API reference",
      },
      {
        url: "/orm/tools/prisma-cli",
        title: "Prisma CLI",
      },
      {
        url: "/orm/reference/prisma-cli-reference",
        title: "Prisma CLI reference",
      },
      {
        url: "/orm/prisma-migrate",
        title: "Prisma Migrate",
      },
      {
        url: "/orm/reference/error-reference",
        title: "Error message reference",
      },
    ],
  },

  reference: {
    title: "Reference",
    description: "Understand the usage and API surface of our products.",
    links: [
      {
        url: "/accelerate/api-reference",
        title: "Accelerate API reference",
      },
      
      {
        url: "/pulse/api-reference",
        title: "Pulse API reference",
      },
      {
        url: "/platform",
        title: "Platform",
      },
      {
        url: "/platform/platform-cli/commands",
        title: "Platform CLI commands",
      },
    ],
  },
};

export const ORMGeneralLinkData = [
  {
    title: `CRUD`,
    description: "How to perform CRUD operations with your generated Prisma Client API. ",
    url: "/orm/prisma-client/queries/crud",
    icon: "fa-solid fa-arrow-right-arrow-left",
  },
  {
    title: `Prisma ORM in your stack`,
    description:
      "Use Prisma ORM to build a GraphQL or REST API, or as part of a fullstack application.",
    url: "/orm/overview/prisma-in-your-stack",
    icon: "fa-solid fa-server",
  },
  {
    title: `Adopting Prisma ORM`,
    description: "Migrate to Prisma ORM from other ORMs.",
    url: "/orm/more/migrating-to-prisma",
    icon: "fa-solid fa-download",
  },
  {
    title: `Deployment guides`,
    description:
      "Deploy Node.js applications with Prisma Client to platforms like Vercel, AWS Lambda, Netlify and Heroku.",
    url: "/orm/prisma-client/deployment",
    icon: "fa-solid fa-book",
  },
  {
    title: `Accelerate`,
    description: "Set up connection pooling and global caching in your app with Accelerate.",
    url: "/accelerate/getting-started",
    icon: "fa-solid fa-bolt",
  },
  {
    title: `Pulse`,
    description: "React to changes in your database with Pulse.",
    url: "/pulse/getting-started",
    icon: "fa-solid fa-signal-stream",
  },
  {
    title: `Platform`,
    description:
      "Explore how to use the Platform to easily manage your projects and collaborate within your team.",
    url: "/platform/about",
    icon: "fa-solid fa-chart-simple",
  },
  {
    title: `Platform CLI commands`,
    description:
      "Learn how to access the Platform using the integrated commands in the Prisma CLI.",
    url: "/platform/platform-cli/commands",
    icon: "fa-solid fa-terminal",
  },
];

export const GeneralLinks_Build = [
  {
    title: `CRUD`,
    description: "How to perform CRUD operations with your generated Prisma Client API. ",
    url: "/orm/prisma-client/queries/crud",
    icon: "fa-solid fa-arrow-right-arrow-left",
  },
  {
    title: `Prisma ORM in your stack`,
    description:
      "Use Prisma ORM to build a GraphQL or REST API, or as part of a fullstack application.",
    url: "/orm/overview/prisma-in-your-stack",
    icon: "fa-solid fa-server",
  },
  {
    title: `Adopting Prisma ORM`,
    description: "Migrate to Prisma ORM from other ORMs.",
    url: "/orm/more/migrating-to-prisma",
    icon: "fa-solid fa-download",
  },
  {
    title: `Deployment guides`,
    description:
      "Deploy Node.js applications with Prisma Client to platforms like Vercel, AWS Lambda, Netlify and Heroku.",
    url: "/orm/prisma-client/deployment",
    icon: "fa-solid fa-book",
  },

]

export const GeneralLinks_Fortify = [
  {
    title: `Recommendations`,
    description: "Detect missing indexes, uncover queries performing full table-scans causing unnecessary resource consumption.",
    url: "/platform/about",
    icon: "fa-solid fa-signal-stream",
  },
  {
    title: `Recordings`,
    description: "Learn how to debug and isolate different sets of queries into distinct sessions",
    url: "/platform/about",
    icon: "fa-solid fa-signal-stream",
  },

]


export const GeneralLinks_Grow = [
  {
    title: `Database set up with Pulse`,
    description: "Use Prisma Pulse to  trigger events and actions in real-time.",
    url: "/pulse/getting-started",
    icon: "fa-solid fa-signal-stream",
  },
  {
    title: `Connection pooling`,
    description: "Process more queries without exhausting the available database connections.",
    url: "/accelerate/connection-pooling",
    icon: "fa-solid fa-signal-stream",
  },
  {
    title: `Database Caching`,
    description: "Learn how to use Accelerate's global database caching.",
    url: "/accelerate/caching",
    icon: "fa-solid fa-signal-stream",
  },
  {
    title: `Database events`,
    description:
      "Explore how to create, update, and delete events.",
    url: "/pulse/database-events",
    icon: "fa-solid fa-chart-simple",
  },
]

export const DatabaseData = [
  {
    title: "PostgreSQL",
    icon: "/img/technologies/postgresqlsimple.svg",
    darkIcon: "/img/technologies/postgresqldark.svg",
    url: "/orm/overview/databases/postgresql",
  },
  {
    title: "MySQL",
    icon: "/img/technologies/mysqlsimple.svg",
    darkIcon: "/img/technologies/mysqlsimple.svg",
    url: "/orm/overview/databases/mysql",
  },
  {
    title: "SQL Server",
    icon: "/img/technologies/sqlserver.svg",
    darkIcon: "/img/technologies/sqlserver.svg",
    url: "/orm/overview/databases/sql-server",
  },
  {
    title: "SQLite",
    icon: "/img/technologies/sqlite.svg",
    darkIcon: "/img/technologies/sqlite.svg",
    url: "/orm/overview/databases/sqlite",
  },
  {
    title: "MongoDB",
    icon: "/img/technologies/mongodbsimple.svg",
    darkIcon: "/img/technologies/mongodbsimple.svg",
    url: "/orm/overview/databases/mongodb",
  },
  {
    title: "CockroachDB",
    icon: "/img/technologies/cockroachdb.svg",
    darkIcon: "/img/technologies/cockroachdbdark.svg",
    url: "/orm/overview/databases/cockroachdb",
  },
  {
    title: "PlanetScale",
    icon: "/img/technologies/planetscale.svg",
    darkIcon: "/img/technologies/planetscaledark.svg",
    url: "/orm/overview/databases/planetscale",
  },
  {
    title: "MariaDB",
    icon: "/img/technologies/mariadb.svg",
    darkIcon: "/img/technologies/mariadbdark.svg",
    url: "/orm/overview/databases/mysql",
  },
];

export const CommunityLinksData = [
  {
    id: "discord",
    title: "Discord",
    description:
      "Chat in real-time, hang out, and share ideas with community members and our team.",
    icon: "fa-brands fa-discord",
    link: "https://pris.ly/discord",
    linkText: "Join our server",
  },
  {
    id: "github",
    title: "GitHub",
    description:
      "Browse the Prisma ORM source code, send feedback, or join the discussion on GitHub.",
    icon: "fa-brands fa-github",
    link: "https://github.com/prisma",
    linkText: "Contribute in GitHub",
  },
  {
    id: "X",
    title: "X",
    description: "Stay up-to-date, join the discussion, and connect with the community on X.",
    icon: "fa-brands fa-x-twitter",
    link: "https://twitter.com/prisma",
    linkText: "Follow us on X",
  },
];
