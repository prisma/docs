import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import { VersionSwitcher } from "@/components/version-switcher";
import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { LATEST_VERSION } from "@/lib/version";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { nav, ...base } = baseOptions();

  const navbarLinks: LinkItemType[] = [
    {
      type: "custom",
      children: <VersionSwitcher currentVersion={LATEST_VERSION} />,
    },
  ];

  return (
    <DocsLayout
      {...base}
      links={navbarLinks}
      nav={{ ...nav, mode: "top" }}
      sidebar={{ collapsible: false }}
      tabMode="navbar"
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}

