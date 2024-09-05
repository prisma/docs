export const ProductLinkData = {
  porm: {
    title: "Build with Prisma ORM",
    //eyebrow: "Build",
    description:
      "Start with <b>Prisma ORM</b> — Node.js and TypeScript ORM with an intuitive data model, automated migrations, type-safety, and auto-completion. <br>Use <b>Prisma Studio</b> to explore and manipulate your data.",
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
    title: "Optimize your queries",
    //eyebrow: "Fortify",
    description: "Use <b>Prisma Optimize</b> to generate insights and get recommendations to improve your database queries, making your app run faster.",
    links: [
      {
        url: "/optimize",
        title: "Optimize",
      },
    ],
  },
  pdp: {
    title: "Grow and evolve your app",
    //eyebrow: "Grow",
    description:
      "Scale your database connections and cache your database results at the edge with <b>Prisma Accelerate</b>. <br>Add <b>Prisma Pulse</b> to your app to react to database changes with type-safe model subscriptions.",
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
    title: "ORM Components and Reference",
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
    title: "Platform Reference",
    description: "Understand the usage and API surface of our platform products built on top of Prisma ORM.",
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

];

export const GeneralLinks_Fortify = [
  {
    title: `Set up Optimize`,
    description: "Start analyzing your queries and generate insights to improve your queries. ",
    url: "/optimize/getting-started",
    icon: "fa-solid fa-magnifying-glass-chart",
  },
  {
    title: `Recommendations`,
    description: "Explore the different recommendations such as indexing issues, excessive data retrieval, and inefficient query patterns.",
    url: "/optimize/recommendations",
    icon: "fa-solid fa-chart-simple",
  },
  {
    title: `AI Explainer`,
    description: "Understand the recommendations easier by asking questions to our AI.",
    url: "/optimize/ai-explainer",
    icon: "fa-solid fa-message-bot",
  },
];


export const GeneralLinks_Grow = [
  {
    title: `Connection pooling`,
    description: "Adjust pool size, configure timeouts, and enable autoscaling to improve performance. .",
    url: "/accelerate/connection-pooling",
    icon: "fa-solid fa-bolt",
  },
  {
    title: `Database Caching`,
    description: "How to improve query performance by configuring cache behavior using TTL and SWR.",
    url: "/accelerate/caching",
    icon: "fa-solid fa-bolt",
  },
  {
    title: `React to database changes`,
    description: "Use Pulse to stream database events to your app in real-time. ",
    url: "/pulse/getting-started",
    icon: "fa-solid fa-signal-stream",
  },
];

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
