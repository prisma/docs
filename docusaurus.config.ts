import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const DOCUSAURUS_BASE_URL = process.env.DOCUSAURUS_BASE_URL ?? '/';

const config: Config = {
  title: 'Prisma Documentation',
  tagline:
    "Get started with Prisma in the official documentation, and learn more about all Prisma's features with reference documentation, guides, and more.",
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://www.prisma.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: DOCUSAURUS_BASE_URL ?? '/',

  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  customFields: {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
  },
  scripts: [
    // kapa.ai script
    {
      src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
      defer: true,
      'data-website-id': '1b51bb03-43cc-4ef4-95f1-93288a91b560',
      'data-project-name': 'Prisma',
      'data-project-color': '#2D3748',
      'data-project-logo': 'https://www.prisma.io/docs/ai_logo.png',
      'data-button-text': 'Ask AI',
      'data-modal-example-questions':
        "How can I setup relations in my schema file?,What is the difference between the 'migrate dev' and 'db push' commands?,Which cache strategy should I use for my query with Prisma Accelerate?,How can I subscribe to database events with Prisma Pulse?",
      'data-button-image': 'https://www.prisma.io/docs/ai_button.svg',
      'data-button-text-color': '#71E8DF',
      'data-button-bg-color': '#2D3748',
      'data-button-border': '2px',
      'data-button-border-color': '#71e8df',
      'data-button-border-style': 'solid',
      'data-button-box-shadow':
        'drop-shadow(0px 0.724px 1.251px rgba(14, 18, 28, 0.02)) drop-shadow(0px 1.608px 2.909px rgba(14, 18, 28, 0.04)) drop-shadow(0px 2.793px 5.225px rgba(14, 18, 28, 0.06)) drop-shadow(0px 4.55px 8.671px rgba(14, 18, 28, 0.07)) drop-shadow(0px 7.485px 14.285px rgba(14, 18, 28, 0.08)) drop-shadow(0px 13.358px 24.966px rgba(14, 18, 28, 0.09)) drop-shadow(0px 33px 54px rgba(14, 18, 28, 0.07))',
    },
    // OneTrust Cookies Consent Notice start for prisma.io
    {
      src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
      'data-document-language': 'true',
      'data-domain-script': '22c2e2c0-3df0-4958-8672-1194370ee230',
    },
  ],
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      'classic',
      {
        gtag: {
          trackingID: 'G-YS7QHR40SL',
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: 'GTM-KCGZPWB',
        },
        sitemap: {
          // @ts-ignore
          changefreq: 'daily',
          priority: 0.7,
          ignorePatterns: [
            '/search',
            // Remove these from sitemap for SEO purposes as they're redirected
            '/getting-started/quickstart',
            '/getting-started/setup-prisma/add-to-existing-project',
            '/getting-started/setup-prisma/start-from-scratch-prisma-migrate',
            '/getting-started/setup-prisma/start-from-scratch-sql',
          ],
          filename: 'sitemap.xml',
        },
        docs: {
          routeBasePath: '/',
          path: 'content',
          sidebarPath: './sidebars.ts',
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/prisma/docs/tree/main',
        },
        blog: false,
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/admonition.css',
            './src/css/docsearch.css',
            './src/css/all.css',
            './src/css/theming.css',
            './src/css/prism.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: '/docs/social/docs-social.png',
    navbar: {
      logo: {
        srcDark: 'img/logo-white.svg',
        alt: 'Prisma logo',
        src: 'img/logo.svg',
        href: 'https://www.prisma.io/',
        target: '_self',
      },
      items: [
        {
          to: DOCUSAURUS_BASE_URL === '/' ? DOCUSAURUS_BASE_URL : '/docs',
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
          href: 'https://github.com/prisma/',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://console.prisma.io/login?utm_source=docs&utm_medium=login',
          position: 'right',
          label: 'Login',
          className: 'navbar-login-btn internal teal-btn',
        },
      ],
    },
    algolia: {
      appId: 'MF58UJZ648',
      apiKey: 'fd3d0a05bfe5d280348060ca5ea416be',
      indexName: 'prisma',
      contextualSearch: false,
      replaceSearchResultPathname: {
        from: '/docs/',
        to: DOCUSAURUS_BASE_URL,
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {
              label: 'ORM',
              href: 'https://www.prisma.io/orm',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Accelerate',
              href: 'https://www.prisma.io/data-platform/accelerate',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Pulse',
              href: 'https://www.prisma.io/data-platform/pulse',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Pricing',
              href: 'https://www.prisma.io/pricing',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Changelog',
              href: 'https://www.prisma.io/changelog',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Docs',
              to: DOCUSAURUS_BASE_URL === '/' ? DOCUSAURUS_BASE_URL : '/docs',
            },
            {
              label: 'Get started',
              to: '/getting-started',
            },
            {
              label: 'prisma-examples',
              href: 'https://github.com/prisma/prisma-examples',
            },
            {
              label: 'Prisma in your stack',
              href: 'https://www.prisma.io/stack',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Ecosystem',
              href: 'https://www.prisma.io/ecosystem',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Tutorials',
              href: 'https://www.prisma.io/learn',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Playground',
              href: 'https://playground.prisma.io/',
            },
            {
              label: 'Customer stories',
              href: 'https://www.prisma.io/showcase',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Data guide',
              href: 'https://www.prisma.io/dataguide',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Data Platform status',
              href: 'https://www.prisma-status.com/',
            },
            {
              label: 'VS Code extension',
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
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Support',
              href: 'https://www.prisma.io/support',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Enterprise',
              href: 'https://www.prisma.io/enterprise',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Partners',
              href: 'https://www.prisma.io/partners',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About',
              href: 'https://www.prisma.io/about',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Blog',
              to: 'https://www.prisma.io/blog',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Data DX',
              href: 'https://www.datadx.io/',
            },
            {
              label: 'Careers',
              to: 'https://www.prisma.io/careers',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Events',
              to: 'https://www.prisma.io/events',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Causes',
              href: 'https://prismaio.notion.site/Prisma-Causes-0c9e1ddc0f5942edaba355692cfee69f',
            },
            {
              label: 'OSS Friends',
              to: 'https://www.prisma.io/oss-friends',
              target: '_self',
              customProps: {
                internal: true,
              },
            },
            {
              label: 'Terms & Privacy',
              href: 'https://prismaio.notion.site/Terms-Privacy-5b5b9938b3a941ccb2ad97eaf5524c07',
            },
            {
              label: 'Service Level Agreement',
              href: 'https://pris.ly/sla',
            },
          ],
        },
        {
          items: [
            {
              label: ' ',
              href: 'https://discord.gg/KQyTW2H5ca',
              customProps: {
                icon: 'fa-brands fa-discord',
                internal: true,
              },
            },
            {
              label: ' ',
              href: 'https://x.com/prisma',
              customProps: {
                icon: 'fa-brands fa-x-twitter',
                internal: true,
              },
            },
            {
              label: ' ',
              href: 'https://www.youtube.com/prismadata',
              customProps: {
                icon: 'fa-brands fa-youtube',
                internal: true,
              },
            },
            {
              label: ' ',
              href: 'https://pris.ly/whatsapp',
              customProps: {
                icon: 'fa-brands fa-whatsapp',
                internal: true,
              },
            },
            {
              label: ' ',
              href: 'https://github.com/prisma',
              customProps: {
                icon: 'fa-brands fa-github',
                internal: true,
              },
            },
          ],
        },
      ],
      logo: {
        srcDark: 'img/logo-white.svg',
        alt: 'Prisma logo',
        src: 'img/logo-white.svg',
        href: 'https://www.prisma.io/',
        target: '_self',
      },
      copyright: `© ${new Date().getFullYear()} Prisma Data, Inc.`,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['json', 'bash'],
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-added-line added-line code-highlight',
          line: 'add-next-line',
          block: { start: 'add-start', end: 'add-end' },
        },
        {
          className: 'theme-code-block-deleted-line deleted-line code-highlight',
          line: 'delete-next-line',
          block: { start: 'delete-start', end: 'delete-end' },
        },
        {
          className: 'theme-code-block-edited-line edited-line code-highlight',
          line: 'edit-next-line',
          block: { start: 'edit-start', end: 'edit-end' },
        },
        {
          className: 'theme-code-block-highlighted-line highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
