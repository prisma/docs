const config = {
  gatsby: {
    pathPrefix: '/docs',
    siteUrl: 'https://www.prisma.io',
  },
  header: {
<<<<<<< HEAD
    logoLink: 'https://www.prisma.io',
=======
    logoLink: 'https://www.prisma.io/docs',
>>>>>>> c027d1171fafb1c28e1b4797d9e2374863529b07
    title: 'Prisma',
    links: [
      { name: 'Install', link: 'https://www.prisma.io/docs/getting-started/quickstart' },
      { name: 'Guides', link: 'https://www.prisma.io/docs' },
      {
        name: 'Reference',
        link: 'https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/api',
      },
      { name: 'Blog', link: 'https://www.prisma.io/blog/' },
      { name: 'Community', link: 'https://www.prisma.io/community/' },
      { name: 'FAQ', link: 'https://www.prisma.io/more/faq' },
    ],
    search: {
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  siteMetadata: {
    title: 'Prisma - Database tools for modern application development',
    description:
      'Prisma replaces traditional ORMs and can be used to build GraphQL servers, REST APIs, microservices & more.',
    keywords: 'Docs, prisma, 2.0',
    twitter: {
      site: '@prisma',
      creator: '@prisma',
    },
    og: {
      site_name: 'Prisma',
      type: 'website',
      image: {
        alt: 'Database tools for modern developers',
        height: '630',
        type: 'image/png',
        url: '/images/og-image.png',
        width: '1200',
      },
    },
  },
  footer: {
    logoLink: 'https://www.prisma.io/docs',
    title: 'Prisma',
    products: [
      { name: 'Prisma Client', link: 'https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/crud' },
      { name: 'Prisma 1 Cloud', link: 'https://app.prisma.io/login' },
      // { name: 'Nexus', link: 'https://www.nexusjs.org/' },
      // { name: 'Prisma Admin', link: '/' },
      // { name: 'Prisma Enterprise', link: '/' },
    ],
    community: [
      { name: 'Meet the community', link: 'https://www.prisma.io/community' },
      { name: 'Slack', link: 'https://slack.prisma.io/' },
      { name: 'Github', link: 'https://github.com/prisma' },
      { name: 'Discussions', link: 'https://github.com/prisma/prisma2/discussions' },
      { name: 'GraphQL Meetup', link: 'https://www.meetup.com/graphql-berlin/' },
      { name: 'TypeScript Meetup', link: 'https://www.meetup.com/TypeScript-Berlin/' },
    ],
    resources: [
      { name: 'Docs', link: 'https://www.prisma.io/docs' },
<<<<<<< HEAD
      { name: 'Get started', link: 'https://www.prisma.io/docs/getting-started/quickstart' },
=======
      { name: 'Get started', link: '/getting-started/quickstart' },
>>>>>>> c027d1171fafb1c28e1b4797d9e2374863529b07
      {
        name: 'API Reference',
        link: 'https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/generating-prisma-client',
      },
      { name: 'Examples', link: 'https://github.com/prisma/prisma-examples' },
      { name: 'How to GraphQL', link: 'https://www.howtographql.com/' },
      { name: 'PostgreSQL Tutorial', link: 'https://www.prisma.io/tutorials/?tag=postgresql' },
    ],
    company: [
      { name: 'About', link: 'https://www.prisma.io/about' },
      { name: 'Jobs', link: 'https://www.prisma.io/jobs' },
      { name: 'Blog', link: 'https://www.prisma.io/blog/' },
      {
        name: 'Terms & Privacy',
        link: 'https://gist.github.com/nikolasburk/c0f34b0cc50d3403e2e0d40c0e6510aa',
      },
    ],
    newsletter: {
      text: 'Stay up to date with the latest features and changes to Prisma',
    },
    findus: {
      twitterLink: 'https://twitter.com/prisma',
      youtubeLink: 'https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w',
      fbLink: 'https://www.facebook.com/prisma.io',
      slackLink: 'https://slack.prisma.io/',
      gitLink: 'https://github.com/prisma',
    },
  },
};

module.exports = config;
