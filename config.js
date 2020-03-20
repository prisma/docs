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
      { name: 'Blog', link: '/' },
	  { name: 'Community', link: '/' },
	  { name: 'FAQ', link: '/' }
	]
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
      { name: 'Prisma Client', link: '/' },
      { name: 'Prisma Migrate', link: '/' },
      { name: 'Prisma Admin', link: '/' },
      { name: 'Prisma Cloud', link: '/' },
      { name: 'Prisma Enterprise', link: '/' },
    ],
    community: [
      { name: 'Meet the community', link: '/' },
      { name: 'Prisma Day', link: '/' },
      { name: 'Slack', link: '/' },
      { name: 'Spectrum', link: '/' },
      { name: 'GraphQL Conf', link: '/' },
    ],
    resources: [
      { name: 'Docs', link: '/' },
      { name: 'Get started', link: '/' },
      { name: 'Tutorials', link: '/' },
      { name: 'Examples', link: '/' },
    ],
    company: [
      { name: 'About', link: '/' },
      { name: 'Jobs', link: '/' },
      { name: 'Blog', link: '/' },
      { name: 'TOS', link: '/' },
    ],
    newsletter: {
      text: 'Stay up to date with the latest features and changes to Prisma',
    },
	findus: 
	{
      twitterLink: '/',
      youtubeLink: '/',
      fbLink: '/',
      slackLink: '/',
      gitLink: '/',
    },
  },
};

module.exports = config;
