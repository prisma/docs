export const Promo = () => {
  type PromoOptions = {
    text: string;
    link: string;
    color: "teal" | "indigo";
  }[];

  const promoOptions: PromoOptions = [
    {
      text: `Get a Postgres db in 3 clicks →`,
      link: "https://pris.ly/sidebar-promo/pg-3-clicks",
      color: "teal",
    },
    {
      text: `Try Prisma Postgres, our serverless db`,
      link: "https://pris.ly/sidebar-promo/pg-from-prisma",
      color: "indigo",
    },
    {
      text: `Try Prisma Postgres. No cold starts, just hot queries.`,
      link: "https://pris.ly/sidebar-promo/hot-queries",
      color: "teal",
    },
    {
      text: `Yes, we have a database! Try Prisma Postgres →`,
      link: "https://pris.ly/sidebar-promo/yes-ppg",
      color: "indigo",
    },
    {
      text: `Running a serverless backend? You need a managed connection pool.`,
      link: "https://pris.ly/sidebar-promo/managed-connection-pool",
      color: "teal",
    },
    {
      text: `Want to decrease global latency for your db queries?`,
      link: "https://pris.ly/sidebar-promo/make-your-db-global",
      color: "teal",
    },
    {
      text: `Need your database queries to be 1000x faster?`,
      link: "https://pris.ly/sidebar-promo/queries-1000x-faster",
      color: "teal",
    },
    {
      text: `Implement query caching in just a few lines of code →`,
      link: "https://pris.ly/sidebar-promo/caching-few-lines-of-code",
      color: "teal",
    },
    {
      text: `Using Raycast? Try our "docs search" extension. `,
      link: "https://pris.ly/sidebar-promo/raycast-extension",
      color: "indigo",
    },
    {
      text: `Try the MCP server with your favorite AI tool →`,
      link: "https://pris.ly/sidebar-promo/mcp",
      color: "indigo",
    },
  ];

  let promo = promoOptions[Math.floor(Math.random() * promoOptions.length)];

  return (
    <a className={`sidebar-promo sidebar-promo-${promo.color}`} href={promo.link} target="_blank">
      {promo.text}
    </a>
  );
};
