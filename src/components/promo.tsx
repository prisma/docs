export const Promo = () => {
  type PromoOptions = {
    text: string;
    link: string;
    color: "teal" | "indigo";
  }[];

  const promoOptions: PromoOptions = [
    {
      text: `Want real-time updates from your database without manual polling?`,
      link: 'https://prisma.io/data-platform/pulse?utm_medium=sidebar-promo&utm_source=docs&utm_campaign=real-time-updates-without-polling',
      color: 'teal',
    },
    {
      text: `Need to sync data instantly to your applications?`,
      link: 'https://prisma.io/data-platform/pulse?utm_medium=sidebar-promo&utm_source=docs&utm_campaign=sync-data-to-apps',
      color: 'indigo',
    },
    {
      text: `Want to react to database changes in your app, as they happen?`,
      link: 'https://prisma.io/data-platform/pulse?utm_medium=sidebar-promo&utm_source=docs&utm_campaign=react-to-database-changes',
      color: 'teal',
    },
    {
      text: `Working on real-time interactions in your distributed systems?`,
      link: 'https://prisma.io/data-platform/pulse?utm_medium=sidebar-promo&utm_source=docs&utm_campaign=real-time-interactions-distributed-systems',
      color: 'indigo',
    },
    {
      text: `Working on critical workflows triggered by changes in your db?`,
      link: 'https://prisma.io/data-platform/pulse?utm_medium=sidebar-promo&utm_source=docs&utm_campaign=critical-workflows-triggered-by-db',
      color: 'indigo',
    },
    {
      text: `Need your database queries to be 1000x faster?`,
      link: 'https://prisma.io/data-platform/accelerate?utm_medium=sidebar-promo&utm_source=docs&utm_campaign=queries-1000x-faster',
      color: 'teal',
    },
    {
      text: `Working on highly scaleable serverless or edge applications?`,
      link: 'https://prisma.io/data-platform/accelerate?utm_medium=sidebar-promo&utm_source=docs&utm_campaign=scaleable-serverless-edge-apps',
      color: 'indigo',
    },
    {
      text: `Want to to enhance response times while reducing database load?`,
      link: 'https://prisma.io/data-platform/accelerate?utm_medium=sidebar-promo&utm_source=docs&utm_campaign=enhance-response-times-reduce-load',
      color: 'teal',
    },
    {
      text: `Interested in query caching in just a few lines of code?`,
      link: 'https://prisma.io/data-platform/accelerate?utm_medium=sidebar-promo&utm_source=docs&utm_campaign=caching-few-lines-of-code',
      color: 'teal',
    },
    {
      text: `Does your serverless architecture handle global scaling effectively?`,
      link: 'https://prisma.io/data-platform/accelerate?utm_medium=sidebar-promo&utm_source=docs&utm_campaign=serverless-architecture-global-scaling',
      color: 'indigo',
    },
  ];

  let promo = promoOptions[Math.floor(Math.random() * promoOptions.length)];

  return (
    <a className={`sidebar-promo sidebar-promo-${promo.color}`} href={promo.link}>
        {promo.text}
    </a>
  );
};
