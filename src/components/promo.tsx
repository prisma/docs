export const Promo = () => {
  type PromoOptions = {
    text: string;
    link: string;
    color: "teal" | "indigo";
  }[];

  const promoOptions: PromoOptions = [
    {
      text: `Need to sync data instantly to your applications?`,
      link: "https://pris.ly/sidebar-promo/sync-data-to-apps",
      color: "indigo",
    },
    {
      text: `Running a serverless backend? You need a managed connection pool.`,
      link: "https://pris.ly/sidebar-promo/managed-connection-pool",
      color: "teal",
    },
    {
      text: `Want to make your database perform globally?`,
      link: "https://pris.ly/sidebar-promo/make-your-db-global",
      color: "teal",
    },
    {
      text: `Need your database queries to be 1000x faster?`,
      link: "https://pris.ly/sidebar-promo/queries-1000x-faster",
      color: "teal",
    },
    {
      text: `Interested in query caching in just a few lines of code?`,
      link: "https://pris.ly/sidebar-promo/caching-few-lines-of-code",
      color: "teal",
    },
    {
      text: `Easily identify and fix slow SQL queries in your app.`,
      link: "https://pris.ly/sidebar-promo/identify-fix-sql-queries",
      color: "teal",
    },
    {
      text: `Looking to uncover inefficient database operations?`,
      link: "https://pris.ly/sidebar-promo/inefficient-db-operations",
      color: "indigo",
    },
    {
      text: `Curious about the SQL queries Prisma ORM generates?`,
      link: "https://pris.ly/sidebar-promo/sql-queries-in-orm",
      color: "teal",
    },
    {
      text: `Need to improve app performance? Get tailored recommendations.`,
      link: "https://pris.ly/sidebar-promo/tailored-recommendations",
      color: "teal",
    },
    {
      text: `Your db queries could be faster? Let Optimize figure out why. `,
      link: "https://pris.ly/sidebar-promo/faster-db-queries",
      color: "teal",
    },
    {
      text: `Using Raycast? Try our "docs search" extension. `,
      link: "https://pris.ly/sidebar-promo/raycast-extension",
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
