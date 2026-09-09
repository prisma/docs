import type { ComponentProps } from "react";
import { source } from "@/lib/source";
import { authLinks, baseOptions, links } from "@/lib/layout.shared";
import type { LinkItemType } from "@/components/layout/link-item";
import { DocsLayout } from "@/components/layout/notebook";
import { StatusIndicator } from "@/components/status-indicator";
import { cn } from "@prisma-docs/ui/lib/cn";
import { getPageBadges } from "@/lib/page-badges";
import { BadgeProvider, SidebarBadgeItem } from "@/components/sidebar-badge-provider";
import { getOrmVersions } from "@/lib/version";
import { VersionSwitcher } from "@/components/version-switcher";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { nav, ...base } = baseOptions();

  const navbarLinks: LinkItemType[] = [...links, ...authLinks];

  const badges = Object.fromEntries(getPageBadges());
  const ormVersions = getOrmVersions(source.pageTree);
  const pageUrls = source.getPages().map((page) => page.url);

  return (
    <BadgeProvider badges={badges}>
      <DocsLayout
        {...base}
        links={navbarLinks}
        nav={{ ...nav }}
        sidebar={{
          collapsible: false,
          banner: <VersionSwitcher versions={ormVersions} availablePathnames={pageUrls} />,
          components: { Item: SidebarBadgeItem },
          footer: ({ className, ...props }: ComponentProps<"div">) => (
            <div className={cn("flex flex-col p-4 pt-2 gap-3", className)} {...props}>
              <StatusIndicator />
            </div>
          ),
        }}
        tree={source.pageTree}
      >
        {children}
      </DocsLayout>
    </BadgeProvider>
  );
}
