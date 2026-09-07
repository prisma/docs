import Mixedbread from "@mixedbread/sdk";
import type { SortedResult } from "fumadocs-core/search";
import { searchWebsite } from "./website-search";

type Source = "all" | "website" | "docs" | "blog";
const sources = new Set<string>(["all", "website", "docs", "blog"]);
type Chunk = {
  type?: string;
  text?: string | null;
  file_id?: string;
  chunk_index?: number;
  generated_metadata?: Record<string, unknown> | null;
};

function slugger(value: string): string {
  if (typeof value !== "string") return "";
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_\s-]/g, "")
    .replace(/\s+/g, "-");
}

function removeMd(md: string): string {
  if (typeof md !== "string") return "";
  try {
    return (
      md
        .replace(/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/gm, "")
        .replace(/^([\s\t]*)([*\-+]|\d+\.)\s+/gm, "$1")
        .replace(/\n={2,}/g, "\n")
        .replace(/^[=-]{2,}\s*$/gm, "")
        .replace(/~{3}.*\n/g, "")
        .replace(/```[^\n]*\n([\s\S]*?)```/g, (_: string, c: string) => c.trim())
        .replace(/~~/g, "")
        .replace(/\[\^.+?\](: .*?$)?/g, "")
        .replace(/\s{0,2}\[.*?\]: .*?$/g, "")
        .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/gm, "")
        .replace(/!\[(.*?)\][[(].*?[\])]/g, "")
        .replace(/\[([\s\S]*?)\]\s*[([].*?[)\]]/g, "$1")
        .replace(/^(\n)?\s{0,3}>\s?/gm, "$1")
        .replace(/^(\n)?\s{0,}#{1,6}\s*( (.+))? +#+$|^(\n)?\s{0,}#{1,6}\s*( (.+))?$/gm, "$1$3$4$6")
        .replace(/([*]+)(\S)(.*?\S)??\1/g, "$2$3")
        .replace(/(^|\W)([_]+)(\S)(.*?\S)??\2($|\W)/g, "$1$3$4$5")
        .replace(/(`{3,})(.*?)\1/gm, "$2")
        .replace(/`(.+?)`/g, "$1")
        .replace(/~(.*?)~/g, "$1")
        // Remove any remaining angle brackets so malformed HTML-like input
        // cannot survive as executable-looking text in search results.
        .replace(/[<>]/g, "")
    );
  } catch {
    return md;
  }
}

function extractHeadingTitle(text: string): string {
  const t = text.trim();
  return t.startsWith("#") ? removeMd(t.split("\n")[0]?.trim() ?? "") : "";
}

// These are the existing Mixedbread stores; do not replace them with a local index.
const stores = { docs: "web-search", blog: "blog-search" };
function resultFromChunk(item: Chunk): SortedResult | undefined {
  const metadata = item.generated_metadata;
  if (!metadata) return;
  const blog = typeof metadata.slug === "string" && !!metadata.slug;
  const raw = blog ? metadata.slug : metadata.url;
  if (typeof raw !== "string" || !raw || raw === "#") return;
  let path: string;
  try {
    const url = new URL(
      raw.startsWith("/") || /^https?:\/\//.test(raw) ? raw : `/${raw}`,
      "https://www.prisma.io",
    );
    if (url.origin !== "https://www.prisma.io") return;
    path = url.pathname;
  } catch {
    return;
  }
  if (/^\/(?:docs\/)?eclipse(?:\/|$)/.test(path)) return;
  const source = blog ? "blog" : "docs";
  if (!new RegExp(`^/${source}(?:/|$)`).test(path)) path = `/${source}${path}`;
  path = path.replace(/^\/docs\/orm\/latest(?=\/|$)/, "/docs/orm");
  if (path.length > 1) path = path.replace(/\/$/, "");
  const title = blog ? metadata.metaTitle || metadata.title : metadata.title;
  return {
    id: `${item.file_id ?? path}-page`,
    type: "page",
    content: typeof title === "string" && title ? title : "Untitled",
    url: path,
    breadcrumbs: [blog ? "Blog" : "Docs"],
  };
}

export function createUnifiedSearch(getClient: () => Mixedbread) {
  async function searchPages(query: string, source: Source = "all"): Promise<SortedResult[]> {
    query = query.trim().slice(0, 200);
    if (!query || !/[\p{L}\p{N}]/u.test(query)) return [];
    if (source === "website") return searchWebsite(query);
    const response = await getClient().stores.search({
      query,
      store_identifiers: source === "all" ? [stores.docs, stores.blog] : [stores[source]],
      top_k: 20,
      search_options: { ...(source !== "blog" ? { rerank: true } : {}), return_metadata: true },
    });
    const seen = new Set<string>();
    const results: SortedResult[] = [];
    for (const chunk of response.data) {
      const result = resultFromChunk(chunk);
      if (!result || seen.has(result.url)) continue;
      if (source !== "all" && !result.url.startsWith(`/${source}/`)) continue;
      seen.add(result.url);
      results.push(result);
      if (result.url.startsWith("/docs/") && chunk.type === "text" && chunk.text) {
        const heading = extractHeadingTitle(chunk.text);
        if (heading)
          results.push({
            id: `${result.id}-${chunk.chunk_index}-heading`,
            type: "heading",
            content: heading,
            url: `${result.url}#${slugger(heading)}`,
          });
      }
    }
    // Existing stores cover docs/blog. Keep marketing pages searchable until they
    // are indexed in Mixedbread too; never substitute local results on API failure.
    if (source === "all") {
      const website = await searchWebsite(query);
      return [...results.slice(0, 25), ...website.slice(0, 5)];
    }
    return results.slice(0, 30);
  }
  async function GET(request: Request) {
    const url = new URL(request.url);
    const source = url.searchParams.get("tag") || url.searchParams.get("source") || "all";
    if (!sources.has(source))
      return Response.json({ error: "Invalid search source." }, { status: 400 });
    const local = ["localhost", "127.0.0.1"].includes(url.hostname);
    const origins = {
      website:
        process.env.NEXT_SITE_ORIGIN || (local ? "http://localhost:3000" : "https://www.prisma.io"),
      docs:
        process.env.NEXT_DOCS_ORIGIN || (local ? "http://localhost:3001" : "https://www.prisma.io"),
      blog:
        process.env.NEXT_BLOG_ORIGIN || (local ? "http://localhost:3002" : "https://www.prisma.io"),
    };
    try {
      const results = await searchPages(url.searchParams.get("query") || "", source as Source);
      return Response.json(
        results.map((result) => {
          const kind = result.url.startsWith("/docs/")
            ? "docs"
            : result.url.startsWith("/blog/")
              ? "blog"
              : "website";
          return { ...result, url: new URL(result.url, origins[kind]).href };
        }),
      );
    } catch {
      // Do not log search text, credentials, or upstream response bodies.
      console.error("Mixedbread search is unavailable");
      return Response.json({ error: "Search is temporarily unavailable." }, { status: 503 });
    }
  }
  return { GET, searchPages };
}

let client: Mixedbread | undefined;
export const { GET, searchPages } = createUnifiedSearch(() => {
  if (!process.env.MIXEDBREAD_API_KEY) throw new Error("MIXEDBREAD_API_KEY is required");
  return (client ??= new Mixedbread({ apiKey: process.env.MIXEDBREAD_API_KEY }));
});
