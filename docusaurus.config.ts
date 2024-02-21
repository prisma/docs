import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Prisma Docs',
  tagline: 'Get started with Prisma in the official documentation, and learn more about all Prisma\'s features with reference documentation, guides, and more.',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://prisma.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Docs',
      logo: {
        srcDark: 'img/logo-white.svg',
        alt: 'Prisma logo',
        src: 'img/logo.svg',
        href: "https://prisma.io/",
        target: "_self"
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'index',
          position: 'left',
          label: '/docs',
          className: 'logo-link',
        },
        {
          type: 'docSidebar',
          sidebarId: 'gettingStarted',
          position: 'left',
          label: 'Get Started',
          className: 'indigo first-item',
        },
        {
          type: 'docSidebar',
          sidebarId: 'ormSidebar',
          position: 'left',
          className: 'indigo',
          label: 'ORM',
        },
        {
          type: 'docSidebar',
          sidebarId: 'accelerateSidebar',
          position: 'left',
          className: 'teal',
          label: 'Accelerate',
        },
        {
          type: 'docSidebar',
          sidebarId: 'pulseSidebar',
          position: 'left',
          className: 'teal',
          label: 'Pulse',
        },
        {
          type: 'docSidebar',
          sidebarId: 'ormSidebar',
          position: 'left',
          label: 'ORM',
        },
        {
          type: 'docSidebar',
          sidebarId: 'accelerateSidebar',
          position: 'left',
          label: 'Accelerate',
        },
        {
          type: 'docSidebar',
          sidebarId: 'pulseSidebar',
          position: 'left',
          label: 'Pulse',
        },
        {
          href: 'https://github.com/prisma/docs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    algolia: {
      appId: 'MK4LNFW4EO',
      apiKey: 'd8ae0173fc0d9170b085840d0c95f389',
      indexName: 'docs-prod', // this is probably wrong but don't really know what to do about it right now
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Products',
          items: [
            {
              label: 'Client',
              href: 'https://prisma.io/client',
            },
            {
              label: 'Migrate',
              href: 'https://prisma.io/migrate',
            },
            {
              label: 'Accelerate',
              href: 'https://prisma.io/accelerate',
            },
            {
              label: 'Pulse',
              href: 'https://prisma.io/pulse',
            },
            {
              label: 'Pricing',
              href: 'https://prisma.io/pricing',
            },
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'Docs',
              to: '/',
            },
            {
              label: 'Get Started',
              to: '/getting-started',
            },
            {
              label: 'Prisma Examples',
              href: 'https://github.com/prisma/prisma-examples',
            },
          ],
        },
        {
          title: 'Use Cases',
          items: [
            {
              label: 'Customer Stories',
              href: 'https://www.prisma.io/showcase',
            },
            {
              label: 'Enterprise',
              href: 'https://www.prisma.io/enterprise',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About',
              href: 'https://prisma.io/about',
            },
            {
              label: 'Blog',
              to: 'https://prisma.io/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Prisma Data, Inc. Built with Docusaurus.`,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
