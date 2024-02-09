import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.prisma.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'prisma', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  scripts: [
    // FA script
    {
      src: 'https://kit.fontawesome.com/1772ab679c.js',
      crossOrigin: 'anonymous',
    },
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
          customCss: ['./src/css/custom.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [{ charSet: 'utf-8' }, { httpEquiv: 'x-ua-compatible', content: 'ie=edge' }],
    image: '/images/logo.svg',
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Prisma Logo',
        src: '/images/logo.svg',
      },
      items: [
        {
          to: '/getting-started',
          label: 'Get Started',
          position: 'left',
        },
        {
          to: '/orm',
          label: 'ORM',
          position: 'left',
        },
        {
          to: '/accelerate',
          label: 'Accelerate',
          position: 'left',
        },
        {
          to: '/pulse',
          label: 'Pulse',
          position: 'left',
        },
        {
          to: '/platform',
          label: 'Platform',
          position: 'left',
        },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        // { to: '/blog', label: 'Blog', position: 'left' },
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
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
