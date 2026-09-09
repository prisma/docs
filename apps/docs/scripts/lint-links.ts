import { type FileObject, printErrors, scanURLs, validateFiles } from "next-validate-link";
import type { InferPageType } from "fumadocs-core/source";

import fs from "node:fs/promises";
import { register } from "node:module";
import path from "node:path";
register("fumadocs-mdx/node/loader", import.meta.url);

const { source } = await import("@/lib/source");

const pages = source.getPages().map((page) => {
  return {
    value: { slug: page.slugs },
    hashes: getHeadings(page),
  };
});

// const ormLatestAliasPages = source
//   .getPages()
//   .filter((page) => page.slugs[0] === 'orm' && page.slugs[1] === 'latest')
//   .map((page) => {
//     const aliasSlug = ['orm', ...page.slugs.slice(2)];
//     return {
//       value: { slug: aliasSlug.length > 1 ? aliasSlug : ['orm'] },
//       hashes: getHeadings(page),
//     };
//   });
//
// const ormV6AliasPages = source
//   .getPages()
//   .filter((page) => page.slugs[0] === 'orm' && page.slugs[1] === 'v6')
//   .map((page) => {
//     const aliasSlug = ['orm', ...page.slugs.slice(2)];
//     return {
//       value: { slug: aliasSlug.length > 1 ? aliasSlug : ['orm'] },
//       hashes: getHeadings(page),
//     };
//   });

console.log(`Found ${pages.length} current files`);

async function checkLinks() {
  const scanned = await scanURLs({
    preset: "next",
    populate: {
      "(docs)/(default)/[[...slug]]": [...pages],
    },
  });

  printErrors(
    await validateFiles(await getFiles(), {
      scanned,
      markdown: {
        components: {
          Card: { attributes: ["href"] },
          Cards: { attributes: ["href"] },
        },
      },
      checkRelativePaths: "as-url",
    }),
    true,
  );
}

function getHeadings({ data }: InferPageType<typeof source>): string[] {
  return data.toc.map((item) => item.url.slice(1));
}

async function getFiles() {
  console.log("Validating Files");

  const docsPages = source.getPages().map(async (page): Promise<FileObject> => ({
    path: page.absolutePath ?? "",
    content: await page.data.getText("raw"),
    url: page.url,
    data: page.data,
  }));

  return [...(await Promise.all(docsPages)), ...(await getSnippets())];
}

/**
 * Shared MDX snippets are not pages, so `source.getPages()` never sees them —
 * but their links render on every page that includes them, and `getText("raw")`
 * returns the unexpanded `<include>` tag, so a broken link in a snippet would
 * otherwise pass this lint and break the docs everywhere at once.
 */
async function getSnippets(): Promise<FileObject[]> {
  const dir = path.join(import.meta.dirname, "..", "content", "snippets");
  const names = (await fs.readdir(dir)).filter((name) => name.endsWith(".mdx"));

  return Promise.all(
    names.map(async (name) => {
      const file = path.join(dir, name);
      return { path: file, content: await fs.readFile(file, "utf8") };
    }),
  );
}

void checkLinks();
