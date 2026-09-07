import { createSearchAPI } from "fumadocs-core/search/server";
import index from "./search-index";

const labels = { website: "Website", docs: "Docs", blog: "Blog" };
// Fumadocs builds and reuses an in-memory ZBSearch index lazily on the first query.
const engines = new Map<string, ReturnType<typeof createSearchAPI>>();
export async function searchWebsite(query: string) {
  const source = "website";
  if (!query.trim() || !/[\p{L}\p{N}]/u.test(query)) return [];
  if (!engines.has(source)) {
    engines.set(
      source,
      createSearchAPI("simple", {
        indexes: index
          .filter((page) => page.source === source)
          .map((page) => ({
            title: page.title,
            description: page.description,
            content: page.keywords,
            url: page.url,
            breadcrumbs: [
              labels[page.source as keyof typeof labels],
              ...page.url.split("/").filter(Boolean).slice(1, -1),
            ].filter((label): label is string => typeof label === "string"),
          })),
        search: { limit: 30, tolerance: 1, boost: { title: 5 } },
      }),
    );
  }
  return engines.get(source)!.search(query.trim().slice(0, 200));
}
