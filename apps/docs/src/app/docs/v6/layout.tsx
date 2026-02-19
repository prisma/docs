import { baseOptions } from "@/lib/layout.shared";
import { VersionSwitcher } from "@/components/version-switcher";
import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import { DocsLayout } from "@/components/layout/notebook";
import { sourceV6 } from "@/lib/source";
import { DiscordIcon } from "@/components/icons/discord";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const source = sourceV6;
  const { nav, ...base } = baseOptions();

  const v6Links: LinkItemType[] = [
    {
      text: 'Getting Started',
      url: '/docs/v6',
    },
    {
      text: 'ORM',
      url: '/docs/v6/orm',
      active: 'nested-url',
    },
    {
      text: 'Postgres',
      url: '/docs/v6/postgres',
      active: 'nested-url',
    },
    {
      text: 'Accelerate',
      url: '/docs/v6/accelerate',
      active: 'nested-url',
    },
    {
      text: 'Optimize',
      url: '/docs/v6/optimize',
      active: 'nested-url',
    },
    {
      text: 'Guides',
      url: '/docs/v6/guides',
      active: 'nested-url',
    },
    {
      text: 'Platform',
      url: '/docs/v6/platform',
      active: 'nested-url',
    },
    {
      text: 'AI',
      url: '/docs/v6/ai',
      active: 'nested-url',
    },
    {
      type: 'icon',
      label: 'Join Discord',
      icon: <DiscordIcon />,
      text: 'Discord',
      url: 'https://pris.ly/discord?utm_source=docs&utm_medium=header',
    },
  ];

  const navbarLinks: LinkItemType[] = [
    ...v6Links,
    {
      type: "custom",
      children: <VersionSwitcher currentVersion={"v6"} />,
    },
  ];

  return (
    <DocsLayout
      {...base}
      links={navbarLinks}
      nav={{ ...nav }}
      sidebar={{ collapsible: false }}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}

