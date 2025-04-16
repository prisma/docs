import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// workaround suggested by Docusaurus team: https://github.com/facebook/docusaurus/issues/9902#issuecomment-1972125804
type SidebarConfig = SidebarsConfig[string];
type OnlyArray<Type> = Type extends unknown[] ? Type : never;
type SidebarItemConfigArray = OnlyArray<SidebarConfig>;
type SidebarItemConfig = SidebarItemConfigArray[number];

const platformCategory: SidebarItemConfig = {
  type: "category",
  label: "Platform",
  collapsed: false,
  collapsible: false,
  link: {
    type: "doc",
    id: "platform/index",
  },
  className: "firstTitle",
  items: [{ type: "autogenerated", dirName: "500-platform" }],
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
  gettingStarted: [
    {
      type: "category",
      collapsed: false,
      collapsible: false,
      label: "Get Started",
      link: {
        type: "doc",
        id: "getting-started/index",
      },
      className: "firstTitle",
      items: [
        "getting-started/index",
        {
          type: "doc",
          id: "getting-started/quickstart-prismaPostgres",
          label: "Quickstart",
        },
        {
          type: "doc",
          id: "getting-started/quickstart-sqlite",
          label: "Quickstart",
          className: "hidden-sidebar",
        },
        {
          type: "category",
          label: "Prisma ORM",
          collapsed: false,
          collapsible: false,
          link: {
            type: "doc",
            id: "getting-started/setup-prisma/index",
          },
          items: [
            {
              type: "category",
              label: "Start from scratch",
              link: {
                type: "doc",
                id: "getting-started/setup-prisma/start-from-scratch/index",
              },
              items: [
                {
                  type: "category",
                  label: "Relational databases",
                  customProps: {
                    badge: "15 Min",
                  },
                  link: {
                    type: "doc",
                    id: "getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-prismaPostgres",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-prismaPostgres",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-mysql",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-planetscale",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-cockroachdb",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-node-postgresql",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-node-mysql",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-node-planetscale",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-node-sqlserver",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/relational-databases-node-cockroachdb",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "autogenerated",
                      dirName:
                        "100-getting-started/02-setup-prisma/100-start-from-scratch/110-relational-databases",
                    },
                  ],
                },
                {
                  type: "category",
                  label: "MongoDB",
                  customProps: {
                    badge: "15 Min",
                  },
                  link: {
                    type: "doc",
                    id: "getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/mongodb-node-mongodb",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "autogenerated",
                      dirName:
                        "100-getting-started/02-setup-prisma/100-start-from-scratch/120-mongodb",
                    },
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "Add to existing project",
              link: {
                type: "doc",
                id: "getting-started/setup-prisma/add-to-existing-project/index",
              },
              items: [
                {
                  type: "category",
                  label: "Relational databases",
                  customProps: {
                    badge: "15 Min",
                  },
                  link: {
                    type: "doc",
                    id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-mysql",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-planetscale",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-sqlserver",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-cockroachdb",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-node-postgresql",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-node-mysql",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-node-planetscale",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-node-sqlserver",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/relational-databases-node-cockroachdb",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "autogenerated",
                      dirName:
                        "100-getting-started/02-setup-prisma/200-add-to-existing-project/110-relational-databases",
                    },
                  ],
                },
                {
                  type: "category",
                  label: "MongoDB",
                  customProps: {
                    badge: "15 Min",
                  },
                  link: {
                    type: "doc",
                    id: "getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/mongodb-node-mongodb",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "doc",
                      id: "getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb",
                      className: "hidden-sidebar",
                    },
                    {
                      type: "autogenerated",
                      dirName:
                        "100-getting-started/02-setup-prisma/200-add-to-existing-project/120-mongodb",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "category",
          collapsed: false,
          collapsible: false,
          label: "Prisma Postgres",
          link: {
            type: "doc",
            id: "getting-started/prisma-postgres/index",
          },
          items: [
            "getting-started/prisma-postgres/from-the-cli",
            "getting-started/prisma-postgres/upgrade-from-early-access",
            {
              type: "category",
              collapsible: false,
              label: "Import from existing database",
              link: {
                type: "doc",
                id: "getting-started/prisma-postgres/import-from-existing-database-postgresql",
              },
              items: [
                {
                  type: "doc",
                  id: "getting-started/prisma-postgres/import-from-existing-database-postgresql",
                  className: "hidden-sidebar",
                },
                {
                  type: "doc",
                  id: "getting-started/prisma-postgres/import-from-existing-database-mysql",
                  className: "hidden-sidebar",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  ormSidebar: [
    {
      type: "category",
      label: "ORM",
      collapsed: false,
      collapsible: false,
      link: {
        type: "doc",
        id: "orm/orm-index",
      },
      className: "firstTitle",
      items: [{ type: "autogenerated", dirName: "200-orm" }],
    },
  ],
  accelerateSidebar: [
    {
      type: "category",
      label: "Accelerate",
      collapsed: false,
      collapsible: false,
      link: {
        type: "doc",
        id: "accelerate/index",
      },
      className: "firstTitle",
      items: [{ type: "autogenerated", dirName: "300-accelerate" }],
    },
    platformCategory,
  ],
  optimizeSidebar: [
    {
      type: "category",
      label: "Optimize",
      collapsible: false,
      collapsed: false,
      link: {
        type: "doc",
        id: "optimize/index",
      },
      className: "firstTitle",
      items: [{ type: "autogenerated", dirName: "700-optimize" }],
    },
    platformCategory,
  ],
  prismaPostgresSidebar: [
    {
      type: "category",
      label: "Postgres",
      collapsible: false,
      collapsed: false,
      link: {
        type: "doc",
        id: "postgres/index",
      },
      className: "firstTitle",
      items: [{ type: "autogenerated", dirName: "250-postgres" }],
    },
    platformCategory,
  ],
  platformSidebar: [platformCategory],
  aboutSidebar: [
    {
      type: "category",
      label: "About",
      collapsed: false,
      collapsible: false,
      link: {
        type: "doc",
        id: "about/index",
      },
      className: "firstTitle",
      items: [{ type: "autogenerated", dirName: "600-about" }],
    },
  ],
  guidesSidebar: [
    {
      type: "category",
      label: "Guides",
      collapsible: false,
      collapsed: false,
      link: {
        type: "doc",
        id: "guides/index",
      },
      className: "firstTitle",
      items: [
        {
          type: "category",
          label: "Framework Guides",
          collapsed: false,
          collapsible: false,
          items: [
            "guides/turborepo",
            "guides/nextjs",
            "guides/nuxt",
            "guides/tanstack-start",
            "guides/react-router-7",
            "guides/solid-start",
            "guides/sveltekit",
          ].sort(),
        },
        {
          type: "category",
          label: "Database Guides",
          collapsed: false,
          collapsible: false,
          items: [
            "guides/cloudflare-d1",
            "guides/data-migration",
            "guides/implementing-schema-changes",
            "guides/multiple-databases",
          ],
        },
        {
          type: "category",
          label: "Tool Guides",
          collapsed: false,
          collapsible: false,
          items: ["guides/docker", "guides/use-prisma-in-pnpm-workspaces", "guides/data-dog"],
        },
        {
          type: "category",
          label: "Migration Guides",
          collapsed: false,
          collapsible: false,
          items: [
            "guides/migrate-from-typeorm",
            "guides/migrate-from-sequelize",
            "guides/migrate-from-mongoose",
            "guides/migrate-from-drizzle",
          ],
        },
      ],
    },
  ],
};

export default sidebars;
