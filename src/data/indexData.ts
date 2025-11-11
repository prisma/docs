export const ProductLinkData = {
  t_orm: {
    title: "Talk to your database, seamlessly",
    eyebrow: "ORM",
    description: "Prisma ORM lets you query your database with an ergonomic TypeScript client",
    link: "/orm",
    icon: "fa-regular fa-database",
  },
  t_postgres: {
    title: "A DB with next-gen performance",
    eyebrow: "Postgres",
    description:
      "Prisma Postgres has bare-metal performance, with the ease of a serverless database — without cold starts.",
    link: "/postgres",
    icon: "fa-regular fa-chart-pyramid",
  },
  t_studio: {
    title: "See your data in style",
    eyebrow: "Studio",
    description: "Prisma Studio makes it easy to explore your data visually",
    link: "/orm/tools/prisma-studio",
    icon: "fa-regular fa-table",
  },
  t_accelerate: {
    title: "Supercharge your <br /> app's speed",
    eyebrow: "Accelerate",
    description:
      "Prisma Accelerate provides caching and connection pooling, making your database available everywhere",
    link: "/accelerate",
    icon: "fa-regular fa-bolt",
  },
  t_optimize: {
    title: "Your queries, smarter",
    eyebrow: "Optimize",
    description: "Prisma Optimize gives you AI-powered insights on potential issues in your code",
    link: "/optimize",
    icon: "fa-regular fa-magnifying-glass-chart",
  },
  t_platform: {
    title: "Manage your workspaces <br/>and projects",
    eyebrow: "Platform Console",
    description:
      "Manage your Prisma Data Platform projects, account settings, workspaces and billing",
    link: "/platform",
    icon: "fa-regular fa-laptop-code",
  },
};

export const CommunityLinksData = [
  {
    id: "X",
    title: "X",
    icon: "fa-brands fa-x-twitter",
    link: "https://pris.ly/x?utm_source=docs&utm_medium=community_links",
    linkText: "Follow us on X",
  },
  {
    id: "yt",
    title: "Youtube",
    icon: "fa-brands fa-youtube",
    link: "https://pris.ly/youtube?utm_source=docs&utm_medium=community_links",
    linkText: "Follow us on Youtube",
  },
  {
    id: "discord",
    title: "Discord",
    icon: "fa-brands fa-discord",
    link: "https://pris.ly/discord?utm_source=docs&utm_medium=community_links",
    linkText: "Join our community",
  },
  {
    id: "github",
    title: "GitHub",
    icon: "fa-brands fa-github",
    link: "https://pris.ly/github?utm_source=docs&utm_medium=community_links",
    linkText: "Contribute in GitHub",
  },
];

export const get_help = [
  {
    icon: "fa-regular fa-gear-code",
    title: "ORM Issues & Requests",
    description: "Found a bug, or want to request something new? Let us know.",
    links: [
      {
        icon: "fa-brands fa-github",
        link: "https://github.com/prisma/prisma/issues/new?assignees=&labels=kind/bug&projects=&template=bug_report.yml",
        label: "Report a bug",
      },
      {
        icon: "fa-brands fa-github",
        link: "https://github.com/prisma/prisma/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=",
        label: "Request a new feature",
      },
    ],
  },
  {
    icon: "fa-regular fa-comments-question-check",
    title: "Community Support",
    description:
      "Support for customers on our <b>Starter plan</b> is provided through our <b>community channels.</b>",
    links: [
      {
        icon: "fa-brands fa-discord",
        link: "https://pris.ly/discord",
        label: "Join our Discord",
      },
    ],
  },
  {
    icon: "fa-regular fa-headset",
    title: "Prisma Support",
    description:
      "Support for customers in our <b>Pro</b> or <b>Business</b> plan is provided by the Platform Console.",
    links: [
      {
        link: "https://console.prisma.io/login?utm_source=website&utm_medium=default&utm_campaign=login",
        label: "Submit a ticket",
      },
    ],
  },
];

export const tabs = [
  {
    icon: "fa-solid fa-chart-pyramid",
    label: "Use Prisma Postgres",
    description:
      "Get started with your favorite framework and Prisma Postgres. <b>With Prisma Postgres</b> you get an instant, fully hosted high-performance database that includes built-in caching, scales to zero, and integrates deeply with Prisma ORM and Prisma Studio—all backed by a generous free tier.",
    list: [
      {
        url: "/guides/nextjs",
        image: "/img/technologies/nextjs.svg",
        tech: "Nextjs",
      },
      {
        url: "/guides/nuxt",
        image: "/img/technologies/nuxtjs.svg",
        tech: "Nuxtjs",
      },
      {
        url: "/guides/react-router-7",
        image: "/img/technologies/reactrouter.svg",
        tech: "React Router",
      },
      {
        url: "/guides/solid-start",
        image: "/img/technologies/solidstart.svg",
        tech: "SolidStart",
      },
      {
        url: "/guides/tanstack-start",
        image: "/img/technologies/tanstack.png",
        tech: "TanStack",
      },
    ],
    link: {
      url: "/getting-started/prisma-postgres/import-from-existing-database-postgresql",
      label: "How to migrate to Prisma Postgres",
      icon: "fa-regular fa-book-open",
    },
  },
  {
    icon: "fa-solid fa-database",
    label: "Bring your own database",
    description:
      "<b>Already have a database?</b> With Prisma ORM and Prisma Data Platform, you can supercharge your existing stack. Add connection pooling and caching with generous free tiers.",
    list: [
      {
        url: "/getting-started/prisma-orm/add-to-existing-project/postgresql",
        image: "/img/technologies/postgresqlsimple.svg",
        tech: "PostgreSQL",
      },
      {
        url: "/getting-started/prisma-orm/add-to-existing-project/planetscale",
        image: "/img/technologies/planetscale.svg",
        imageDark: "/img/technologies/planetscaledark.svg",
        tech: "Planetscale",
      },
      {
        url: "/getting-started/prisma-orm/add-to-existing-project/sql-server",
        image: "/img/technologies/sqlserver.svg",
        tech: "SQL Server",
      },
      {
        url: "/getting-started/prisma-orm/add-to-existing-project/mysql",
        image: "/img/technologies/mysqlsimple.svg",
        tech: "MySQL",
      },
      {
        url: "/getting-started/prisma-orm/add-to-existing-project/mongodb",
        image: "/img/technologies/mongodbsimple.svg",
        imageDark: "/img/technologies/mongodbsimple.svg",
        tech: "MongoDB",
      },
    ],
    link: {
      url: "/getting-started/prisma-orm/add-to-existing-project/postgresql",
      label: "How to migrate to Prisma ORM",
      icon: "fa-regular fa-book-open",
    },
  },
];

export const how_do_i = [
  {
    title: "Get started with Prisma & AI?",
    description:
      "Learn how to get started with Prisma and AI, from setting up Prisma ORM in tools like ChatGPT, Cursor, Windsurf, GitHub Copilot and Tabnine to using the Prisma MCP server for database automation. Explore step-by-step guides, real-world examples with Next.js, and integrations with Vercel AI SDK and Firebase Studio. Build faster, stay type-safe, and connect Prisma Postgres with thousands of apps to power your AI-driven workflows.",
    url: "/ai",
  },
  {
    title: "Model my schema?",
    description:
      "The Prisma Schema (or schema for short) is the main method of configuration for your Prisma ORM setup. It consists of the following parts: Data sources: Specify the details of the data sources Prisma ORM should connect to (e.g. a PostgreSQL database) Generators: Specifies what clients should be generated based on the data model (e.g. Prisma Client)",
    // tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-schema/overview",
    // time: 15
  },
  {
    title: "Cache my queries?",
    description:
      "Prisma Postgres comes with a built-in global cache (enabled by Prisma Accelerate) that helps you speed up your database queries. You can cache results on a per-query level using the cacheStrategy option in any Prisma ORM query, e.g.:",
    // tags: ["guides", "schema", "orm"],
    url: "/postgres/database/caching",
    // time: 15
  },
  {
    title: "Integrate with an existing DB?",
    description:
      "Baselining is the process of initializing a migration history for a database that: ✔ Existed before you started using Prisma Migrate ✔ Contains data that must be maintained (like production), which means that the database cannot be reset. Baselining tells Prisma Migrate to assume that one or more migrations have already been applied. This prevents generated migrations from failing when they try to create tables and fields that already exist.",
    // tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-migrate/workflows/baselining",
    // time: 15
  },
  {
    title: "Make CRUD routes?",
    description:
      "This page describes how to perform CRUD operations with your generated Prisma Client API. CRUD is an acronym that stands for: Create Read Update Delete Refer to the Prisma Client API reference documentation for detailed explanations of each method.",
    // tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-client/queries/crud",
    // time: 15
  },
  {
    title: "Get started with models?",
    description:
      "The data model definition part of the Prisma schema defines your application models (also called Prisma models). Models: Represent the entities of your application domain Map to the tables (relational databases like PostgreSQL) or collections (MongoDB) in your database Form the foundation of the queries available in the generated Prisma Client API",
    // tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-schema/data-model/models",
  },
  {
    title: "Filter and sort?",
    description:
      "Prisma Client supports filtering with the where query option, and sorting with the orderBy query option. Filtering Prisma Client allows you to filter records on any combination of model fields, including related models, and supports a variety of filter conditions.",
    // tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-client/queries/filtering-and-sorting",
    // time: 15
  },
  {
    title: "Query relations?",
    description:
      "A key feature of Prisma Client is the ability to query relations between two or more models. Relation queries include: Nested reads (sometimes referred to as eager loading) via select and include Nested writes with transactional guarantees Filtering on related records Prisma Client also has a fluent API for traversing relations.",
    // tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-client/queries/relation-queries",
    // time: 15
  },
  {
    title: "Migrate my schema?",
    description:
      "When working in a team, managing database schema changes can be challenging. This guide shows you how to effectively collaborate on schema changes using Prisma Migrate, ensuring that all team members can safely contribute to and incorporate schema changes.",
    // tags: ["guides", "schema", "orm"],
    url: "/guides/implementing-schema-changes",
    // time: 15
  },
  {
    title: "Generate Prisma Client?",
    description:
      "Prisma Client is a generated database client that's tailored to your database schema. By default, Prisma Client is generated into the node_modules/.prisma/client folder, but we highly recommend you specify an output location.",
    // tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-client/setup-and-configuration/generating-prisma-client",
    // time: 15
  },
];
