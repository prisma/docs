import { source } from '@/lib/source';
import { baseOptions, links } from '@/lib/layout.shared';
import { VersionSwitcherNavItem } from '@/components/version-switcher-nav';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import { DocsLayout } from '@/components/layout/notebook';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { nav, ...base } = baseOptions();

  const navbarLinks: LinkItemType[] = [
    ...links,
    {
      type: 'custom',
      children: <VersionSwitcherNavItem />,
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
