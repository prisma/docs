import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

// The Accelerate retirement date and the guides that remediate it are stated in
// exactly one file. These tests are what makes that true: without them the
// notice drifts back apart one page at a time, which is how it got to nine
// hand-maintained copies in the first place.

const contentDir = path.join(import.meta.dirname, "..", "..", "content");
const docsDir = path.join(contentDir, "docs");
const snippetPath = path.join(contentDir, "snippets", "accelerate-retirement.mdx");

const snippet = readFileSync(snippetPath, "utf8");

const LONG_DATE =
  /(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}/g;

/** `- [Text](/href)` at the start of a line. */
const BULLET_LINK = /^- \[[^\]]+\]\([^)]+\)$/gm;

/** `:::warning[... retirement ...]` through its closing `:::`. */
const RETIREMENT_CALLOUT = /^:::warning\[([^\]]*retirement[^\]]*)\]\n([\s\S]*?)\n:::$/gim;

/** `<include>../..//snippets/accelerate-retirement.mdx</include>` */
const INCLUDE = /<include>([^<]+)<\/include>/g;

function docsPages(): { file: string; absolutePath: string; content: string }[] {
  return readdirSync(docsDir, { recursive: true, encoding: "utf8" })
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => {
      const absolutePath = path.join(docsDir, entry);
      return { file: entry, absolutePath, content: readFileSync(absolutePath, "utf8") };
    });
}

const pages = docsPages();

const snippetDates = snippet.match(LONG_DATE) ?? [];
const retirementDate = snippetDates[0];
const snippetBullets = snippet.match(BULLET_LINK) ?? [];
const [snippetLead] = snippet.split("\n\n");

test("the snippet states one retirement date and the remediation links", () => {
  assert.deepEqual(
    snippetDates,
    [retirementDate],
    "content/snippets/accelerate-retirement.mdx must state the retirement date exactly once",
  );
  assert.deepEqual(snippetBullets, [
    "- [Migrate a PostgreSQL database to Prisma Postgres](/prisma-postgres/import-from-existing-database-postgresql)",
    "- [Keep your existing database and remove Accelerate](/accelerate/keep-your-database)",
    "- [Connect to Prisma Postgres without Accelerate](/postgres/database/switch-from-accelerate)",
  ]);
});

test("every remediation link points at a page that exists", () => {
  for (const bullet of snippetBullets) {
    const href = bullet.slice(bullet.indexOf("](") + 2, -1);
    const slug = href.replace(/^\//, "");
    const candidates = [
      path.join(docsDir, `${slug}.mdx`),
      path.join(docsDir, slug, "index.mdx"),
      // Route groups such as `(index)` do not appear in the URL.
      path.join(docsDir, "(index)", `${slug}.mdx`),
      path.join(docsDir, "(index)", slug, "index.mdx"),
    ];
    assert.ok(
      candidates.some((candidate) => pages.some((page) => page.absolutePath === candidate)),
      `${href} does not resolve to a page under content/docs`,
    );
  }
});

test("every retirement callout includes the snippet instead of restating it", () => {
  for (const { file, absolutePath, content } of pages) {
    for (const [callout, title, body] of content.matchAll(RETIREMENT_CALLOUT)) {
      const includes = [...body.matchAll(INCLUDE)].map(([, target]) => target.trim());
      assert.ok(
        includes.length > 0,
        `${file}: the "${title}" callout writes the retirement notice out by hand. ` +
          `Replace its text with <include>…/snippets/accelerate-retirement.mdx</include>.`,
      );
      for (const target of includes) {
        assert.equal(
          path.resolve(path.dirname(absolutePath), target),
          snippetPath,
          `${file}: <include>${target}</include> does not resolve to the shared snippet`,
        );
      }
      assert.equal(
        callout.match(LONG_DATE),
        null,
        `${file}: the "${title}" callout hard-codes a date. The date belongs in the snippet.`,
      );
    }
  }
});

test("no page restates the snippet's wording", () => {
  for (const { file, content } of pages) {
    assert.ok(
      !content.includes(snippetLead),
      `${file} copies the shared notice's wording; include the snippet instead`,
    );
    for (const bullet of snippetBullets) {
      assert.ok(
        !content.includes(bullet),
        `${file} copies a remediation link out of the shared notice; include the snippet instead`,
      );
    }
  }
});

test("no page states a different retirement date", () => {
  for (const { file, content } of pages) {
    // Every long-form date in an Accelerate page is a retirement date today. A
    // page that needs an unrelated one should say so here rather than silently
    // diverge from the snippet.
    if (!/accelerate/i.test(content)) continue;
    for (const date of content.match(LONG_DATE) ?? []) {
      assert.equal(
        date,
        retirementDate,
        `${file} says "${date}" where content/snippets/accelerate-retirement.mdx says "${retirementDate}"`,
      );
    }
  }
});
