import type { source } from './source';

/**
 * Returns the canonical URL for a v6 docs page.
 * - If frontmatter has `canonical`, use it.
 * - Else if a docs page exists at the same slug, use the docs URL.
 * - Else use the v6 page's own URL.
 */
export function getCanonicalForV6Page(
  v6Page: { url: string; slugs: string[]; data: { canonical?: string } },
  docsSource: typeof source
): string {
  if (v6Page.data.canonical) return v6Page.data.canonical;
  const docsPage = docsSource.getPage(v6Page.slugs);
  return docsPage ? docsPage.url : v6Page.url;
}
