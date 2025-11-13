import fs from "node:fs";
import path from "node:path";
import { themes as prismThemes } from "prism-react-renderer";

import type { Config, RouteConfig } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type { PluginOptions } from "@signalwire/docusaurus-plugin-llms-txt/public";

const DOCUSAURUS_BASE_URL = process.env.DOCUSAURUS_BASE_URL ?? "/";

const config: Config = {
  future: {
    v4: true,
  },
  title: "Prisma Documentation",
  tagline:
    "Get started with Prisma in the official documentation, and learn more about all Prisma's features with reference documentation, guides, and more.",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://www.prisma.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: DOCUSAURUS_BASE_URL,

  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  onBrokenMarkdownLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  customFields: {},
  scripts: [
    // kapa.ai script
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      async: true,
      "data-website-id": "1b51bb03-43cc-4ef4-95f1-93288a91b560",
      "data-project-name": "Prisma",
      "data-project-color": "#2D3748",
      "data-user-analytics-fingerprint-enabled": "true",
      "data-project-logo": "https://www.prisma.io/docs/ai_logo.png",
      "data-button-text": "Ask AI",
      "data-modal-example-questions":
        "How can I setup relations in my Prisma Schema?,What is the difference between the 'migrate dev' and 'db push' commands?,Which cache strategy should I use for my query with Prisma Accelerate?",
      "data-button-image": "https://www.prisma.io/docs/ai_button.svg",
      "data-button-width": "64px",
      "data-button-height": "64px",
      "data-button-border-radius": "8px",
      "data-button-border": "2px solid #71e8df",
      "data-button-text-color": "#71E8DF",
      "data-button-bg-color": "#2D3748",
      "data-button-border-color": "#71e8df",
      "data-button-border-style": "solid",
      "data-button-text-font-size": "1rem",
      "data-button-box-shadow":
        "drop-shadow(0px 0.724px 1.251px rgba(14, 18, 28, 0.02)) drop-shadow(0px 1.608px 2.909px rgba(14, 18, 28, 0.04)) drop-shadow(0px 2.793px 5.225px rgba(14, 18, 28, 0.06)) drop-shadow(0px 4.55px 8.671px rgba(14, 18, 28, 0.07)) drop-shadow(0px 7.485px 14.285px rgba(14, 18, 28, 0.08)) drop-shadow(0px 13.358px 24.966px rgba(14, 18, 28, 0.09)) drop-shadow(0px 33px 54px rgba(14, 18, 28, 0.07))",
    },
    // Tolt script
    {
      src: "https://cdn.tolt.io/tolt.js",
      async: true,
      "data-tolt": "fda67739-7ed0-42d2-b716-6da0edbec191",
    },
    // Common Room
    {
      src: "https://cdn.cr-relay.com/v1/site/cc8b954c-5f74-4254-a72a-e0d61048bd58/signals.js",
      async: true,
    },
    {
      async: true,
      id: "cookieyes",
      type: "text/javascript",
      src: "https://cdn-cookieyes.com/client_data/96980f76df67ad5235fc3f0d/script.js",
    },
  ],
  plugins: [
    "docusaurus-plugin-sass",
    [
      path.resolve(__dirname, "client-plugins", "posthog-docusaurus"),
      {
        // these are safe to have in version control
        apiKey: "phc_cmc85avbWyuJ2JyKdGPdv7dxXli8xLdWDBPbvIXWJfs",
        appUrl: "https://proxyhog.prisma-data.net",
        person_profiles: "identified_only",
        enableInDevelopment: false,
      },
    ],
    [
      "@signalwire/docusaurus-plugin-llms-txt",
      {
        // Enable with defaults
        generate: {
          enableMarkdownFiles: true,
          enableLlmsFullTxt: false,
        },
        include: {
          includeBlog: false,
          includePages: false,
          includeDocs: true,
        },
      } satisfies PluginOptions,
    ],
    async function pluginLlmsTxt(context) {
      return {
        name: "llms-txt-plugin",
        loadContent: async () => {
          const { siteDir } = context;
          const contentDir = path.join(siteDir, "content");
          const allMdx: string[] = [];

          // recursive function to get all mdx files
          const getMdxFiles = async (dir: string) => {
            const entries = await fs.promises.readdir(dir, { withFileTypes: true });

            for (const entry of entries) {
              const fullPath = path.join(dir, entry.name);
              if (entry.isDirectory()) {
                await getMdxFiles(fullPath);
              } else if (entry.name.endsWith(".mdx")) {
                const content = await fs.promises.readFile(fullPath, "utf8");

                // extract title from frontmatter if it exists
                const titleMatch = content.match(
                  /^---\n(?:.*\n)*?title:\s*["']?([^"'\n]+)["']?\n(?:.*\n)*?---\n/
                );
                const title = titleMatch ? titleMatch[1] : "";

                // Get the relative path for URL construction
                const relativePath = path.relative(contentDir, fullPath);

                // Convert file path to URL path by:
                // 1. Removing numeric prefixes (like 100-, 01-, etc.)
                // 2. Removing the .mdx extension
                let urlPath = relativePath
                  .replace(/^\d+-/, "")
                  .replace(/\/\d+-/g, "/")
                  .replace(/\.mdx$/, "");

                // Construct the full URL
                const fullUrl = `https://www.prisma.io/docs/${urlPath}`;

                // strip frontmatter
                const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, "");

                // combine title and content with URL
                const contentWithTitle = title
                  ? `# ${title}\n\nURL: ${fullUrl}\n${contentWithoutFrontmatter}`
                  : contentWithoutFrontmatter;

                allMdx.push(contentWithTitle);
              }
            }
          };

          await getMdxFiles(contentDir);
          return { allMdx };
        },
        postBuild: async ({ content, routes, outDir }) => {
          const { allMdx } = content as { allMdx: string[] };

          // Write concatenated MDX content
          const concatenatedPath = path.join(outDir, "llms-full.txt");
          await fs.promises.writeFile(concatenatedPath, allMdx.join("\n---\n\n"));

          // we need to dig down several layers:
          // find PluginRouteConfig marked by plugin.name === "docusaurus-plugin-content-docs"
          const docsPluginRouteConfig = routes.filter(
            (route) => route.plugin.name === "docusaurus-plugin-content-docs"
          )[0];

          // docsPluginRouteConfig has a routes property has a record with the path "/" that contains all docs routes.
          const allDocsRouteConfig = docsPluginRouteConfig.routes?.filter(
            (route) => route.path === DOCUSAURUS_BASE_URL
          )[0];

          // A little type checking first
          if (!allDocsRouteConfig?.props?.version) {
            return;
          }

          // this route config has a `props` property that contains the current documentation.
          const currentVersionDocsRoutes = (
            allDocsRouteConfig.props.version as Record<string, unknown>
          ).docs as Record<string, Record<string, unknown>>;

          // for every single docs route we now parse a path (which is the key) and a title
          const docsRecords = Object.entries(currentVersionDocsRoutes).map(([path, record]) => {
            return `- [${record.title}](${path}): ${record.description}`;
          });

          // Build up llms.txt file
          const llmsTxt = `# ${context.siteConfig.title}\n\n## Docs\n\n${docsRecords.join("\n")}`;

          // Write llms.txt file
          const llmsTxtPath = path.join(outDir, "llms.txt");
          await fs.promises.writeFile(llmsTxtPath, llmsTxt);
        },
      };
    },
  ],
  presets: [
    [
      "classic",
      {
        ...(process.env.GT_CONTAINER_ID && {
          googleTagManager: {
            containerId: process.env.GT_CONTAINER_ID,
          },
        }),
        sitemap: {
          ignorePatterns: [
            "/search",
            // Remove these from sitemap for SEO purposes as they're redirected
            "/getting-started/quickstart",
            "/getting-started/setup-prisma/add-to-existing-project",
            "/getting-started/setup-prisma/start-from-scratch-prisma-migrate",
            "/getting-started/setup-prisma/start-from-scratch-sql",
          ],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.map((item) => {
              if (item.url.endsWith("/docs/")) {
                item.url = item.url.slice(0, -1); // remove trailing slash
              }
              return item;
            });
          },
        },
        docs: {
          routeBasePath: "/",
          path: "content",
          sidebarPath: "./sidebars.ts",
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/prisma/docs/tree/main",
        },
        blog: false,
        theme: {
          customCss: [
            "./src/css/custom.css",
            "./src/css/admonition.css",
            "./src/css/all.css",
            "./src/css/theming.css",
            "./src/css/prism.css",
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    image: "/docs/social/docs-social.png",
    metadata: [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@prisma" },
      { name: "twitter:creator", content: "@prisma" },
    ],
    navbar: {
      logo: {
        srcDark: "img/logo-white.svg",
        alt: "Prisma logo",
        src: "img/logo.svg",
        href: "https://www.prisma.io/",
        target: "_self",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "gettingStarted",
          position: "left",
          label: "Get Started",
          className: "indigo first-item",
        },
        {
          type: "docSidebar",
          sidebarId: "prismaPostgresSidebar",
          className: "teal",
          position: "left",
          label: "Postgres",
        },
        {
          type: "docSidebar",
          sidebarId: "ormSidebar",
          position: "left",
          className: "indigo",
          label: "ORM",
        },
        {
          type: "docSidebar",
          sidebarId: "guidesSidebar",
          className: "teal",
          position: "left",
          label: "Guides",
        },
        {
          type: "dropdown",
          label: "More",
          className: "teal",
          position: "left",
          items: [
            {
              className: "indigo",
              to: "/postgres/database/prisma-studio",
              label: "Studio",
              sub: "Explore and manipulate your data",
              icon: "fa-regular fa-table",
            },
            {
              type: "docSidebar",
              sidebarId: "optimizeSidebar",
              className: "teal",
              label: "Optimize",
              sub: "AI-driven query analysis",
              icon: "fa-regular fa-magnifying-glass-chart",
            },
            {
              type: "docSidebar",
              sidebarId: "accelerateSidebar",
              className: "teal",
              label: "Accelerate",
              sub: "Make your database global",
              icon: "fa-regular fa-bolt",
            },
            {
              type: "docSidebar",
              className: "teal",
              sidebarId: "aiSidebar",
              label: "Prisma + AI",
              sub: "Build faster with Prisma + AI",
              icon: "fa-regular fa-robot",
            },
          ],
        },
        {
          href: "https://pris.ly/github?utm_source=docs&utm_medium=navbar",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          href: "https://console.prisma.io/login?utm_source=docs&utm_medium=login",
          position: "right",
          label: "Log in",
          className: "navbar-login-btn internal teal-btn",
        },
      ],
    },
    algolia: {
      appId: "MF58UJZ648",
      apiKey: "aae3f55d59a198896509e9fbb30618e7",
      indexName: "prisma",
      contextualSearch: true,
      replaceSearchResultPathname: {
        from: "/docs/",
        to: DOCUSAURUS_BASE_URL,
      },
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "socials",
          items: [
            {
              label: " ",
              href: "https://pris.ly/discord?utm_source=docs&utm_medium=footer",
              customProps: {
                icon: "fa-brands fa-discord",
                internal: true,
              },
            },
            {
              label: " ",
              href: "https://pris.ly/x?utm_source=docs&utm_medium=footer",
              customProps: {
                icon: "fa-brands fa-x-twitter",
                internal: true,
              },
            },
            {
              label: " ",
              href: "https://pris.ly/youtube?utm_source=docs&utm_medium=footer",
              customProps: {
                icon: "fa-brands fa-youtube",
                internal: true,
              },
            },
            {
              label: " ",
              href: "https://pris.ly/whatsapp?utm_source=docs&utm_medium=footer",
              customProps: {
                icon: "fa-brands fa-whatsapp",
                internal: true,
              },
            },
            {
              label: " ",
              href: "https://pris.ly/github?utm_source=docs&utm_medium=footer",
              customProps: {
                icon: "fa-brands fa-github",
                internal: true,
              },
            },
          ],
        },
        {
          title: "Product",
          items: [
            {
              label: "ORM",
              href: "https://www.prisma.io/orm",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Studio",
              href: "https://www.prisma.io/studio",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Optimize",
              href: "https://www.prisma.io/optimize",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Accelerate",
              href: "https://www.prisma.io/accelerate",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Postgres",
              href: "https://www.prisma.io/postgres",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Pricing",
              href: "https://www.prisma.io/pricing",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Changelog",
              href: "https://www.prisma.io/changelog",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Data Platform status",
              href: "https://www.prisma-status.com/",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Docs",
              to: DOCUSAURUS_BASE_URL,
            },
            {
              label: "Ecosystem",
              href: "https://www.prisma.io/ecosystem",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Playground",
              href: "https://playground.prisma.io/",
            },
            {
              label: "ORM Benchmarks",
              href: "https://benchmarks.prisma.io/",
            },
            {
              label: "Customer stories",
              href: "https://www.prisma.io/showcase",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Data guide",
              href: "https://www.prisma.io/dataguide",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
          ],
        },
        {
          title: "Contact us",
          items: [
            {
              label: "Community",
              href: "https://www.prisma.io/community",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Support",
              href: "https://www.prisma.io/support",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Enterprise",
              href: "https://www.prisma.io/enterprise",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Partners",
              href: "https://www.prisma.io/partners",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "OSS Friends",
              to: "https://www.prisma.io/oss-friends",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About",
              href: "https://www.prisma.io/about",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Blog",
              to: "https://www.prisma.io/blog",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Data DX",
              href: "https://www.datadx.io/",
            },
            {
              label: "Careers",
              to: "https://www.prisma.io/careers",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
            {
              label: "Privacy Policy",
              href: "https://pris.ly/privacy",
              customProps: {
                dropdown: "legal",
              },
            },
            {
              label: "Terms of Service",
              href: "https://pris.ly/terms",
              customProps: {
                dropdown: "legal",
              },
            },
            {
              label: "Service Level Agreement",
              href: "https://pris.ly/sla",
              customProps: {
                dropdown: "legal",
              },
            },
            {
              label: "Event Code of Conduct",
              href: "https://pris.ly/code-conduct",
              customProps: {
                dropdown: "legal",
              },
            },
            {
              label: "Security & Compliance",
              href: "https://trust.prisma.io/",
              target: "_self",
              customProps: {
                internal: true,
              },
            },
          ],
        },
      ],
      logo: {
        srcDark: "img/logo-white.svg",
        alt: "Prisma logo",
        src: "img/logo-white.svg",
        href: "https://www.prisma.io/",
        target: "_self",
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
      additionalLanguages: ["json", "bash"],
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: "theme-code-block-added-line added-line code-highlight",
          line: "add-next-line",
          block: { start: "add-start", end: "add-end" },
        },
        {
          className: "theme-code-block-deleted-line deleted-line code-highlight",
          line: "delete-next-line",
          block: { start: "delete-start", end: "delete-end" },
        },
        {
          className: "theme-code-block-edited-line edited-line code-highlight",
          line: "edit-next-line",
          block: { start: "edit-start", end: "edit-end" },
        },
        {
          className: "theme-code-block-highlighted-line highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "theme-code-block-stronger-line stronger-line",
          line: "stronger-next-line",
          block: { start: "stronger-start", end: "stronger-end" },
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
