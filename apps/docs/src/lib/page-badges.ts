import { source } from "./source";

export type BadgeType = "early-access" | "deprecated" | "preview";

export function getPageBadges(version: "v7" | "v6" = "v7"): Map<string, BadgeType> {
  const badges = new Map<string, BadgeType>();
  const pages = source.getPages();

  for (const page of pages) {
    const isV6 = page.url.startsWith("/orm/v6");
    if ((version === "v6" && !isV6) || (version === "v7" && isV6)) continue;
    const badge = page.data.badge as BadgeType | undefined;
    if (badge) {
      badges.set(page.url, badge);
    }
  }

  return badges;
}
