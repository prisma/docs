/**
 * Migrates internal links in v6 ORM docs from /v6/<section> to /<section>
 * for non-ORM sections (postgres, accelerate, guides, etc.).
 * Keeps /v6/orm links unchanged.
 *
 * Usage: npx tsx scripts/migrate-v6-links.ts
 */
import fs from 'node:fs';
import path from 'node:path';

const ORM_DIR = path.join(process.cwd(), 'content/docs.v6/orm');
const NON_ORM_SECTIONS = ['postgres', 'accelerate', 'optimize', 'guides', 'platform', 'ai', 'prisma-orm', 'prisma-postgres'];

function replaceInContent(content: string): string {
  let updated = content;
  // Replace /v6/postgres with /postgres (and similar for other non-orm sections)
  for (const section of NON_ORM_SECTIONS) {
    const regex = new RegExp(`/v6/${section}(?=/|"|'|\\)|\\s|$)`, 'g');
    updated = updated.replace(regex, `/${section}`);
  }
  return updated;
}

function walkDir(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  const files = walkDir(ORM_DIR);
  let totalReplacements = 0;
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const updated = replaceInContent(content);
    if (content !== updated) {
      const count = (content.match(/\/v6\/(postgres|accelerate|optimize|guides|platform|ai|prisma-orm|prisma-postgres)/g) || []).length;
      fs.writeFileSync(file, updated);
      totalReplacements += count;
      console.log(`Updated: ${path.relative(process.cwd(), file)}`);
    }
  }
  console.log(`\nDone. Migrated links in ${files.length} files.`);
}

main();
