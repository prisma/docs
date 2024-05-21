export const Promo = () => {
  type PromoOptions = {
    text: string;
    link: string;
    color: "teal" | "indigo";
  }[];

  const promoOptions: PromoOptions = [
    {
      text: `Want real-time updates from your database without manual polling?`,
      link: 'https://pris.ly/sidebar-promo/real-time-updates-without-polling',
      color: 'teal',
    },
    {
      text: `Need to sync data instantly to your applications?`,
      link: 'https://pris.ly/sidebar-promo/sync-data-to-apps',
      color: 'indigo',
    },
    {
      text: `Want to react to database changes in your app, as they happen?`,
      link: 'https://pris.ly/sidebar-promo/react-to-database-changes',
      color: 'teal',
    },
    {
      text: `Working on real-time interactions in your distributed systems?`,
      link: 'https://pris.ly/sidebar-promo/real-time-interactions-distributed-systems',
      color: 'indigo',
    },
    {
      text: `Working on critical workflows triggered by changes in your db?`,
      link: 'https://pris.ly/sidebar-promo/critical-workflows-triggered-by-db',
      color: 'indigo',
    },
    {
      text: `Need your database queries to be 1000x faster?`,
      link: 'https://pris.ly/sidebar-promo/queries-1000x-faster',
      color: 'teal',
    },
    {
      text: `Working on highly scaleable serverless or edge applications?`,
      link: 'https://pris.ly/sidebar-promo/scaleable-serverless-edge-apps',
      color: 'indigo',
    },
    {
      text: `Want to to enhance response times while reducing database load?`,
      link: 'https://pris.ly/sidebar-promo/enhance-response-times-reduce-load',
      color: 'teal',
    },
    {
      text: `Interested in query caching in just a few lines of code?`,
      link: 'https://pris.ly/sidebar-promo/caching-few-lines-of-code',
      color: 'teal',
    },
    {
      text: `Does your serverless architecture handle global scaling effectively?`,
      link: 'https://pris.ly/sidebar-promo/serverless-architecture-global-scaling',
      color: 'indigo',
    },
    {
      text: `Easily identify and fix slow SQL queries in your app.`,
      link: 'https://pris.ly/sidebar-promo/identify-fix-sql-queries',
      color: 'teal',
    },
    {
      text: `Looking to uncover inefficient database operations?`,
      link: 'https://pris.ly/sidebar-promo/inefficient-db-operations',
      color: 'indigo',
    },
    {
      text: `Curious about the SQL queries Prisma ORM generates?`,
      link: 'https://pris.ly/sidebar-promo/sql-queries-in-orm',
      color: 'teal',
    },
  ];

  let promo = promoOptions[Math.floor(Math.random() * promoOptions.length)];

  return (
    <a className={`sidebar-promo sidebar-promo-${promo.color}`} href={promo.link} target="_blank">
        {promo.text}
    </a>
  );
};
