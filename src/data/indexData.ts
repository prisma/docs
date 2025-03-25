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
    description: "Stay up-to-date, join the discussion, and connect with the community on X.",
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
    description:
      "Chat in real-time, hang out, and share ideas with community members and our team.",
    icon: "fa-brands fa-discord",
    link: "https://pris.ly/discord?utm_source=docs&utm_medium=community_links",
    linkText: "Join our server",
  },
  {
    id: "github",
    title: "GitHub",
    description:
      "Browse the Prisma ORM source code, send feedback, or join the discussion on GitHub.",
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
        link: "/",
        label: "Report a bug"
      },
      {
        icon: "fa-brands fa-github",
        link: "/",
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
        link: "pris.ly/discord",
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
        url: "/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
        image: "/img/technologies/nextjs.svg",
        tech: "Nextjs"
      },
      {
        url: "/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
        image: "/img/technologies/nuxtjs.svg",
        tech: "Nuxtjs"
      },
      {
        url: "/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
        image: "/img/technologies/reactrouter.svg",
        tech: "React Router"
      },
      {
        url: "/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
        image: "/img/technologies/redwood.svg",
        tech: "Redwood"
      },
      {
        url: "/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
        image: "/img/technologies/sveltekit.svg",
        tech: "Sveltekit"
      },
    ]
  },
  {
    icon: "fa-solid fa-database",
    label: "Bring your own database",
    description: "<b>Already have a database?</b> With Prisma ORM and Prisma Data Platform, you can supercharge your existing stack. Add connection pooling and caching with generous free tiers.",
    list: [
      {
        url: "/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
        image: "/img/technologies/nextjs.svg",
        tech: "Nextjs"
      },
      {
        url: "/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
        image: "/img/technologies/nuxtjs.svg",
        tech: "Nuxtjs"
      },
      {
        url: "/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
        image: "/img/technologies/reactrouter.svg",
        tech: "React Router"
      },
      {
        url: "/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
        image: "/img/technologies/redwood.svg",
        tech: "Redwood"
      },
      {
        url: "/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
        image: "/img/technologies/sveltekit.svg",
        tech: "Sveltekit"
      },
    ]
  }
];

export const how_do_i = [
  {
    title: "Migrate my schema?",
    description: "Prisma's metrics feature gives you detailed insights into how Prisma interacts with your database. In this tutorial, you will learn how to use metrics to monitor your database using Prisma, Prometheus and Grafana.",
    tags: ["guides", "schema", "orm"],
    url: "/",
    time: 15
  },
  {
    title: "Cache my queries?",
    description: "Prisma Postgres comes with a built-in global cache (enabled by Prisma Accelerate) that helps you speed up your database queries. You can cache results on a per-query level",
    tags: ["guides", "schema", "orm"],
    url: "/",
    time: 15
  },
  {
    title: "Integrate with an existing DB?",
    description: "Baselining is the process of initializing a migration history for a database that existed before you started using Prisma Migrate and contains data",
    tags: ["guides", "schema", "orm"],
    url: "/",
    time: 15
  }
];