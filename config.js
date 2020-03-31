const config = {
  gatsby: {
    pathPrefix: '/',
  },
  header: {
    logoLink: '/',
    title: 'Prisma',
    links: [
      { name: 'Install', link: '/' },
      { name: 'Guides', link: '/' },
      { name: 'Reference', link: '/' },
      { name: 'Blog', link: 'https://www.prisma.io/blog/' },
      { name: 'Community', link: 'https://www.prisma.io/community/' },
      { name: 'FAQ', link: '/' },
    ],
    search: {
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  siteMetadata: {
    title: 'Prisma2.0 | Docs',
    description: 'Documentation built with mdx. Powering prisma 2.0',
    keywords: 'Docs, prisma, 2.0',
  },
  footer: {
    logoLink: '/',
    title: 'Prisma',
    products: [
      { name: 'Prisma Client', link: '/reference/tools-and-interfaces/prisma-client/crud' },
      { name: 'Prisma 1 Cloud', link: 'https://app.prisma.io/login' },
      { name: 'Nexus', link: 'https://www.nexusjs.org/' },
      // { name: 'Prisma Admin', link: '/' },
      // { name: 'Prisma Enterprise', link: '/' },
    ],
    community: [
      { name: 'Meet the community', link: '/community' },
      { name: 'Slack', link: 'https://slack.prisma.io/' },
      { name: 'Github', link: 'https://github.com/prisma' },
      { name: 'Discussions', link: 'https://github.com/prisma/prisma2/discussions' },
      { name: 'GraphQL Meetup', link: 'https://www.meetup.com/graphql-berlin/' },
      { name: 'TypeScript Meetup', link: 'https://www.meetup.com/TypeScript-Berlin/' },
    ],
    resources: [
      { name: 'Docs', link: '/' },
      { name: 'Get started', link: '/getting-started/quickstart' },
      { name: 'API Reference', link: '/reference/tools-and-interfaces/prisma-client/generating-prisma-client' },
      { name: 'Examples', link: 'https://github.com/prisma/prisma-examples' },
      { name: 'How to GraphQL', link: 'https://www.howtographql.com/' },
      { name: 'PostgreSQL Tutorial', link: '/tutorials/?tag=postgresql' },
    ],
    company: [
      { name: 'About', link: 'https://www.prisma.io/about' },
      { name: 'Jobs', link: 'https://www.prisma.io/jobs' },
      { name: 'Blog', link: 'https://www.prisma.io/blog/' },
      { name: 'Terms & Privacy', link: 'https://gist.github.com/nikolasburk/c0f34b0cc50d3403e2e0d40c0e6510aa' },
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
