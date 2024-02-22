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
          customCss: ['./src/css/custom.css', './src/css/all.css', './src/css/theming.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
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
          href: 'https://github.com/prisma/docs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://console.prisma.io/login?utm_source=docs&utm_medium=login',
          position: 'right',
          label: "Login",
          className: 'navbar-login-btn internal teal-btn',
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
              label: 'ORM',
              href: 'https://prisma.io/orm',
              target: "_self",
              class: "internal footer__link-item"
            },
            {
              label: 'Accelerate',
              href: 'https://prisma.io/accelerate',
              target: "_self",
              class: "internal footer__link-item"
            },
            {
              label: 'Pulse',
              href: 'https://prisma.io/pulse',
              target: "_self",
              class: "internal footer__link-item"
            },
            {
              label: 'Pricing',
              href: 'https://prisma.io/pricing',
              target: "_self",
              class: "internal footer__link-item"
            },
          ],
        },
        {
          title: 'Resources',
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
            {
              label: 'Prisma in your stack',
              href: 'https://prisma.io/stack',
              target: "_self",
              class: "internal footer__link-item"
            },
            {
              label: 'Ecosystem',
              href: 'https://prisma.io/ecosystem',
              target: "_self",
              class: "internal footer__link-item"
            },
            {
              label: 'Tutorials',
              href: 'https://prisma.io/learn',
              target: "_self",
              class: "internal footer__link-item"
            },
            {
              label: 'Playground',
              href: 'https://playground.prisma.io/',
            },
            {
              label: 'Customer stories',
              href: 'https://prisma.io/showcase',
              target: "_self",
              class: "internal footer__link-item"
            },
            {
              label: 'Data Platform status',
              href: 'https://www.prisma-status.com/',
            },
            {
              label: 'VS Code Extension',
              href: 'https://marketplace.visualstudio.com/items?itemName=Prisma.prisma',
            },
          ],
        },
        {
          title: 'Contact us',
          items: [
            {
              label: 'Community',
              href: 'https://www.prisma.io/community',
              target: "_self",
              class: "internal footer__link-item"
            },
            {
              label: 'Support',
              href: 'https://www.prisma.io/support',
              target: "_self",
              class: "internal footer__link-item"
            },
            {
              label: 'Enterprise',
              href: 'https://www.prisma.io/enterprise',
              target: "_self",
              class: "internal footer__link-item"
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About',
              href: 'https://prisma.io/about',
              target: "_self",
              class: "internal footer__link-item",
            },
            {
              label: 'Blog',
              to: 'https://prisma.io/blog',
              target: "_self",
              class: "internal footer__link-item",
            },
            {
              label: 'Data DX',
              to: 'https://www.datadx.io/',
            },
            {
              label: 'Careers',
              to: 'https://prisma.io/careers',
              target: "_self",
              class: "internal footer__link-item",
            },
            {
              label: 'Events',
              to: 'https://prisma.io/events',
              target: "_self",
              class: "internal footer__link-item",
            },
            {
              label: 'Causes',
              to: 'https://prismaio.notion.site/Prisma-Causes-0c9e1ddc0f5942edaba355692cfee69f',
            },
            {
              label: 'OSS Friends',
              to: 'https://prisma.io/oss-friends',
              target: "_self",
              class: "internal footer__link-item",
            },
            {
              label: 'Terms & Privacy',
              to: 'https://prismaio.notion.site/Terms-Privacy-5b5b9938b3a941ccb2ad97eaf5524c07',
            },
            {
              label: 'Service Level Agreement',
              to: 'https://pris.ly/sla',
            },
          ],
        },
        {
          items: [
            {
              label: ' ',
              href: "https://discord.gg/KQyTW2H5ca",
              class: "fa-brands fa-discord internal"
            },
            {
              label: ' ',
              href: "https://discord.gg/KQyTW2H5ca",
              class: "fa-brands fa-x-twitter internal"
            },
            {
              label: ' ',
              href: "https://discord.gg/KQyTW2H5ca",
              class: "fa-brands fa-youtube internal"
            },
            {
              label: ' ',
              href: "https://discord.gg/KQyTW2H5ca",
              class: "fa-brands fa-slack internal"
            },
            {
              label: ' ',
              href: "https://discord.gg/KQyTW2H5ca",
              class: "fa-brands fa-github internal"
            },
          ]
        }
      ],
      logo: {
        srcDark: 'img/logo-white.svg',
        alt: 'Prisma logo',
        src: 'img/logo-white.svg',
        href: "https://prisma.io/",
        target: "_self",
      },
      copyright: `© ${new Date().getFullYear()} Prisma Data, Inc.`,
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
