import { type FileObject, printErrors, scanURLs, validateFiles } from "next-validate-link";
import fg from "fast-glob";
import * as path from "node:path";
import { getSlugs } from "fumadocs-core/source";
import * as fs from "node:fs/promises";
import { getTableOfContents } from "fumadocs-core/content/toc";
import matter from "gray-matter";

interface ParsedFile {
  path: string;
  data: Record<string, unknown>;
  content: string;
  slugs: string[];
}

async function readFromPath(file: string, prefix: string): Promise<ParsedFile> {
  const content = await fs.readFile(path.resolve(file)).then((res) => res.toString());
  const parsed = matter(content);
  // Remove the prefix (e.g., "content/docs/") to get path relative to content root
  const relativePath = file.startsWith(prefix) ? file.slice(prefix.length) : file;
  const slugs = getSlugs(relativePath);

  return {
    path: file,
    data: parsed.data,
    content: parsed.content,
    slugs,
  };
}

async function checkLinks() {
  console.log("Scanning MDX files...");

  // Read v7 docs (content/docs/)
  const v7FilePaths = await fg("content/docs/**/*.mdx");
  const v7Files = await Promise.all(v7FilePaths.map((f) => readFromPath(f, "content/docs/")));

  // Read v6 docs (content/docs.v6/)
  const v6FilePaths = await fg("content/docs.v6/**/*.mdx");
  const v6Files = await Promise.all(v6FilePaths.map((f) => readFromPath(f, "content/docs.v6/")));

  console.log(`Found ${v7Files.length} v7 pages and ${v6Files.length} v6 pages`);
  console.log("Scanning URLs...");

  const scanned = await scanURLs({
    preset: "next",
    populate: {
      // Latest (unversioned) route
      "[[...slug]]": await Promise.all(
        v7Files.map(async (file) => {
          const toc = await getTableOfContents(file.content);
          return {
            value: { slug: file.slugs },
            hashes: toc.map((item) => item.url.slice(1)),
          };
        }),
      ),
      // v6 explicit route
      "v6/[[...slug]]": await Promise.all(
        v6Files.map(async (file) => {
          const toc = await getTableOfContents(file.content);
          return {
            value: { slug: file.slugs },
            hashes: toc.map((item) => item.url.slice(1)),
          };
        }),
      ),
    },
  });

  console.log(`Collected ${scanned.urls.size} URLs, ${scanned.fallbackUrls.length} fallbacks`);
  console.log("Validating files...");

  // Convert to FileObject format
  const allFiles: FileObject[] = [
    ...v7Files.map((file) => ({
      path: file.path,
      content: file.content,
      url: `/${file.slugs.join("/")}`,
    })),
    ...v6Files.map((file) => ({
      path: file.path,
      content: file.content,
      url: `/v6/${file.slugs.join("/")}`,
    })),
  ];

  const errors = await validateFiles(allFiles, {
    scanned,
    markdown: {
      components: {
        Card: { attributes: ["href"] },
        Cards: { attributes: ["href"] },
      },
    },
    checkRelativePaths: "as-url",
  });

  printErrors(errors, true);

  if (errors.length > 0) {
    console.error(`\nFound ${errors.length} link validation error(s)`);
    process.exit(1);
  } else {
    console.log("\n✓ All links are valid!");
  }
}

checkLinks().catch((error) => {
  console.error("Error running link checker:", error);
  process.exit(1);
});
