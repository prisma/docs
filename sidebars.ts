import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// workaround suggested by Docusaurus team: https://github.com/facebook/docusaurus/issues/9902#issuecomment-1972125804
type SidebarConfig = SidebarsConfig[string];
type OnlyArray<Type> = Type extends unknown[] ? Type : never;
type SidebarItemConfigArray = OnlyArray<SidebarConfig>;
type SidebarItemConfig = SidebarItemConfigArray[number];

const platformCategory: SidebarItemConfig = {
  type: 'category',
  label: 'Platform',
  collapsed: false,
  collapsible: false,
  items: [
    'platform/index',
    'platform/about',
    {
      type: 'category',
      label: 'Concepts',
      collapsed: false,
      collapsible: false,
      link: {
        type: 'generated-index',
        title: 'Concepts',
        slug: '/platform/concepts',
      },
      items: [{ type: 'autogenerated', dirName: '500-platform/20-concepts' }]
    },
    'platform/maturity-levels',
    'platform/limits',
    'platform/support',
    {
      type: 'category',
      collapsible: false,
      collapsed: false,
      label: 'Platform CLI',
      link: {
        type: 'generated-index',
        title: 'Platform CLI',
        slug: '/platform/platform-cli',
      },
      items: [{ type: 'autogenerated', dirName: '500-platform/60-platform-cli' }],
    },
  ],
};

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  index: ['index'],
  gettingStarted: [
    {
      type: 'category',
      collapsed: false,
      collapsible: false,
      label: 'Get Started',
      items: [
        'getting-started/index',
        {
          type: 'doc',
          id: 'getting-started/quickstart',
          label: 'Quickstart',
          customProps: {
            badge: "5 Min"
          }
        },
        {
          type: 'category',
          label: 'Set up Prisma ORM',
          collapsed: false,
          collapsible: false,
          items: [{
            type: 'category',
            label: "Start from scratch",
            items: [
              {
                type: 'category',
                label: 'Relational databases',
                customProps: {
                  badge: '15 Min'
                },
                link: {
                  type: 'generated-index',
                  title: 'Relation databases',
                  slug: '/getting-started/setup-prisma/start-from-scratch/relational-databases',
                },
                items: [{
                  type: 'autogenerated',
                  dirName: '100-getting-started/02-setup-prisma/100-start-from-scratch/110-relational-databases',
                }]
              },
              {
                type: 'category',
                label: 'MongoDB',
                customProps: {
                  badge: '15 Min'
                },
                link: {
                  type: 'generated-index',
                  title: 'MongoDB',
                  slug: '/getting-started/setup-prisma/start-from-scratch/mongodb',
                },
                items: [{
                  type: 'autogenerated',
                  dirName: '100-getting-started/02-setup-prisma/100-start-from-scratch/120-mongodb',
                }]
              }
            ]
          },
          {
            type: 'category',
            label: "Add to existing project",
            items: [
              {
                type: 'category',
                label: 'Relational databases',
                customProps: {
                  badge: '15 Min'
                },
                link: {
                  type: 'generated-index',
                  title: 'Relation databases',
                  slug: '/getting-started/setup-prisma/add-to-existing-project/relational-databases',
                },
                items: [{
                  type: 'autogenerated',
                  dirName: '100-getting-started/02-setup-prisma/200-add-to-existing-project/110-relational-databases',
                }]
              },
              {
                type: 'category',
                label: 'MongoDB',
                customProps: {
                  badge: '15 Min'
                },
                link: {
                  type: 'generated-index',
                  title: 'MongoDB',
                  slug: '/getting-started/setup-prisma/add-to-existing-project/mongodb',
                },
                items: [{
                  type: 'autogenerated',
                  dirName: '100-getting-started/02-setup-prisma/200-add-to-existing-project/120-mongodb',
                }]
              }
            ]
          }]
        }
      ]
    }
  ],
  ormSidebar: [{
    type: 'category',
    label: 'ORM',
    collapsed: false,
    collapsible: false,
    items: [
      'orm/orm-index',
      {
        type: 'category',
        label: 'Overview',
        collapsed: false,
        collapsible: false,
        link: {
          type: 'generated-index',
          title: 'Overview',
          slug: '/orm/overview',
        },
        items: [{
          type: 'autogenerated',
          dirName: '200-orm/050-overview',
        }]
      },
      {
        type: 'category',
        label: 'Prisma Schema',
        collapsed: false,
        collapsible: false,
        link: {
          type: 'generated-index',
          title: 'Prisma Schema',
          slug: '/orm/prisma-schema',
        },
        items: [{
          type: 'autogenerated',
          dirName: '200-orm/100-prisma-schema'
        }]
      },
      {
        type: 'category',
        label: 'Prisma Client',
        collapsed: false,
        collapsible: false,
        link: {
          type: 'generated-index',
          title: 'Prisma Client',
          slug: '/orm/prisma-client',
        },
        items: [{
          type: 'autogenerated',
          dirName: '200-orm/200-prisma-client'
        }]
      },
      {
        type: 'category',
        label: 'Prisma Migrate',
        collapsed: false,
        collapsible: false,
        link: {
          type: 'generated-index',
          title: 'Prisma Migrate',
          slug: '/orm/prisma-migrate',
        },
        items: [{
          type: 'autogenerated',
          dirName: '200-orm/300-prisma-migrate'
        }]
      },
      {
        type: 'category',
        label: 'Tools',
        collapsed: false,
        collapsible: false,
        link: {
          type: 'generated-index',
          title: 'Tools',
          slug: '/orm/tools',
        },
        items: [{
          type: 'autogenerated',
          dirName: '200-orm/400-tools'
        }]
      },
      {
        type: 'category',
        label: 'Reference',
        collapsed: false,
        collapsible: false,
        link: {
          type: 'generated-index',
          title: 'Reference',
          slug: '/orm/reference',
        },
        items: [{
          type: 'autogenerated',
          dirName: '200-orm/500-reference'
        }]
      },
      {
        type: 'category',
        label: 'More',
        collapsed: false,
        collapsible: false,
        link: {
          type: 'generated-index',
          title: 'More',
          slug: '/orm/more',
        },
        items: [{
          type: 'autogenerated',
          dirName: '200-orm/800-more'
        }]
      }
    ]
  }],
  accelerateSidebar: [
    {
      type: 'category',
      label: 'Accelerate',
      collapsed: false,
      collapsible: false,
      items: [{ type: 'autogenerated', dirName: '300-accelerate' }]
    },
    platformCategory,
  ],
  pulseSidebar: [
    {
      type: 'category',
      label: 'Pulse',
      collapsible: false,
      collapsed: false,
      items: [{ type: 'autogenerated', dirName: '400-pulse' }]
    },
    platformCategory,
  ],
  aboutSidebar: [{
    type: 'autogenerated',
    dirName: '600-about'
  }],
};

export default sidebars;
