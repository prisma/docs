export const Promo = () => {
  type PromoOptions = {
    text: string;
    link: string;
    linkText: string;
  }[];

  const promoOptions: PromoOptions = [
    {
      text: 'Want to speed up your queries?',
      link: 'https://prisma.io/accelerate',
      linkText: 'Try out Prisma Accelerate ⚡️',
    },
    {
      text: 'Real-time apps made easy',
      link: 'https://prisma.io/pulse',
      linkText: 'Try out Prisma Pulse 💗',
    },
  ];

  let promo = promoOptions[Math.floor(Math.random() * promoOptions.length)];

  return (
    <div className="sidebar-promo">
      <p>
        {promo.text} <a href={promo.link}>{promo.linkText}</a>
      </p>
    </div>
  );
};
