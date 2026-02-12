import { source, sourceV6 } from "./source";

export type BadgeType = "early-access" | "deprecated" | "preview";

// Create a map of page URLs to their badge values
export function getPageBadges(version: "v7" | "v6" = "v7"): Map<string, BadgeType> {
  const versionSource = version === "v6" ? sourceV6 : source;
  const badges = new Map<string, BadgeType>();

  // Get all pages from the source
  const pages = versionSource.getPages();

  for (const page of pages) {
    const badge = page.data.badge as BadgeType | undefined;
    if (badge) {
      badges.set(page.url, badge);
    }
  }

  return badges;
}
