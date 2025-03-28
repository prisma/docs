export const ProductLinkData = {
  t_orm: {
    title: "Talk to your database, seamlessly",
    eyebrow: "ORM",
    description:
      "Prisma ORM lets you query your database with an ergonomic TypeScript client.",
    link: "/orm",
    icon: "fa-regular fa-database",
  },
  t_postgres: {
    title: "A DB with next-gen performance",
    eyebrow: "Postgres",
    description:
      "Prisma Postgres is a PostgreSQL database with maximum performance and minimum wait time.",
    link: "/postgres",
    icon: "fa-regular fa-chart-pyramid",
  },
  t_studio: {
    title: "See your data in style",
    eyebrow: "Studio",
    description:
      "Prisma Studio makes it easy to explore your data visually.",
    link: "/orm/tools/prisma-studio",
    icon: "fa-regular fa-table",
  },
  t_accelerate: {
    title: "Supercharge your <br /> app's speed",
    eyebrow: "Accelerate",
    description:
      "Prisma Accelerate provides caching and connection pooling, making your database available everywhere.",
    link: "/accelerate",
    icon: "fa-regular fa-bolt",
  },
  t_optimize: {
    title: "Your queries, smarter.",
    eyebrow: "Optimize",
    description:
      "Prisma Optimize gives you AI-powered insights on potential issues in your code.",
    link: "/optimize",
    icon: "fa-regular fa-magnifying-glass-chart",
  },
  t_platform: {
    title: "Manage your workspaces <br/>and projects",
    eyebrow: "Platform Console",
    description:
      "Manage your Prisma Data Platform projects, account settings, workspaces and billing.",
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
    linkText: "Join our server",
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
        label: "Report a bug"
      },
      {
        icon: "fa-brands fa-github",
        link: "https://github.com/prisma/prisma/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=",
        label: "Request a new feature"
      }
    ]      
  },
  {
    icon: "fa-regular fa-comments-question-check",
    title: "Community Support",
    description: "Support for customers on our <b>Starter plan</b> is provided through our <b>community channels.</b>",
    links: [
      {
        icon: "fa-brands fa-discord",
        link: "pris.ly/discord",
        label: "Join our Discord"
      }
    ]      
  },
  {
    icon: "fa-regular fa-headset",
    title: "Prisma Support",
    description: "Support for customers in our <b>Pro</b> or <b>Business</b> plan is provided by the Platform Console.",
    links: [
      {
        link: "https://console.prisma.io/login?utm_source=website&utm_medium=default&utm_campaign=login",
        label: "Submit a ticket"
      }
    ]      
  }
]

export const tabs = [
  {
    icon: "fa-solid fa-chart-pyramid",
    label: "Use Prisma Postgres",
    description: "Get started with your favorite framework and Prisma Postgres. <b>With Prisma Postgres you'll</b> get a hosted database immediately that comes standard with caching, connection pooling, real-time events, and access control all with a generous free tier.",
    list: [
      {
        url: "/guides/nextjs",
        image: "/img/technologies/nextjs.svg",
        tech: "Nextjs"
      },
      {
        url: "/guides/nuxt",
        image: "/img/technologies/nuxtjs.svg",
        tech: "Nuxtjs"
      },
      {
        url: "/guides/react-router-7",
        image: "/img/technologies/reactrouter.svg",
        tech: "React Router"
      },
      {
        url: "/guides/solid-start",
        image: "/img/technologies/solidstart.svg",
        tech: "SolidStart"
      },
      {
        url: "/guides/tanstack-start",
        image: "/img/technologies/tanstack.png",
        tech: "TanStack"
      },
    ],
    link: {
      url: "/getting-started/prisma-postgres/import-from-existing-database-postgresql",
      label: "How to migrate to Prisma Postgres",
      icon: "fa-regular fa-book-open"
    }
  },
  {
    icon: "fa-solid fa-database",
    label: "Bring your own database",
    description: "<b>Already have a database?</b> With Prisma ORM and Prisma Data Platform, you can supercharge your existing stack. Add connection pooling and caching with generous free tiers.",
    list: [
      {
        url: "/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql",
        image: "/img/technologies/postgresqlsimple.svg",
        tech: "PostgreSQL"
      },
      {
        url: "/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-planetscale",
        image: "/img/technologies/planetscale.svg",
        imageDark: "/img/technologies/planetscaledark.svg",
        tech: "Planetscale"
      },
      {
        url: "/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-sqlserver",
        image: "/img/technologies/sqlserver.svg",
        tech: "SQL Server"
      },
      {
        url: "/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-mysql",
        image: "/img/technologies/mysqlsimple.svg",
        tech: "MySQL"
      },
      {
        url: "/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-cockroachdb",
        image: "/img/technologies/cockroachdb.svg",
        imageDark: "/img/technologies/cockroachdbdark.svg",
        tech: "CockroachDB"
      }
    ],
    link: {
      url: "/getting-started/setup-prisma/add-to-existing-project",
      label: "How to migrate to Prisma ORM",
      icon: "fa-regular fa-book-open"
    }
  }
];

export const how_do_i = [
  {
    title: "Model my schema?",
    description: "Prisma's metrics feature gives you detailed insights into how Prisma interacts with your database. In this tutorial, you will learn how to use metrics to monitor your database using Prisma, Prometheus and Grafana.",
    tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-schema/overview",
    time: 15
  },
  {
    title: "Cache my queries?",
    description: "Prisma Postgres comes with a built-in global cache (enabled by Prisma Accelerate) that helps you speed up your database queries. You can cache results on a per-query level",
    tags: ["guides", "schema", "orm"],
    url: "/postgres/caching",
    time: 15
  },
  {
    title: "Integrate with an existing DB?",
    description: "Baselining is the process of initializing a migration history for a database that existed before you started using Prisma Migrate and contains data",
    tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-migrate/workflows/baselining",
    time: 15
  },
  {
    title: "Make CRUD routes?",
    description: "This page describes how to perform CRUD operations with your generated Prisma Client API. CRUD is an acronym that stands for: Create Read Update Delete",
    tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-client/queries/crud",
    time: 15
  },
  {
    title: "Get started with models?",
    description: "The data model definition part of the Prisma schema defines your application models (also called Prisma models). Models: Represent the entities",
    tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-schema/data-model/models",
  },
  {
    title: "Filter and sort?",
    description: "Prisma Client supports filtering with the where query option, and sorting with the orderBy query option.",
    tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-client/queries/filtering-and-sorting",
    time: 15
  },
  {
    title: "Query relations?",
    description: "A key feature of Prisma Client is the ability to query relations between two or more models. Relation queries include: Nested reads",
    tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-client/queries/relation-queries",
    time: 15
  },
  {
    title: "Migrate my schema?",
    description: "When working in a team, managing database schema changes can be challenging. This guide shows you how to effectively collaborate on schema changes",
    tags: ["guides", "schema", "orm"],
    url: "/guides/implementing-schema-changes",
    time: 15
  },
  {
    title: "Generate Prisma Client?",
    description: "Prisma Client is an auto-generated database client that's tailored to your database schema. By default, Prisma Client is generated into the",
    tags: ["guides", "schema", "orm"],
    url: "/orm/prisma-client/setup-and-configuration/generating-prisma-client",
    time: 15
  }
];