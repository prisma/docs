/**
 * Migrates v6 ORM links from /v6/orm/ to /orm/v6/
 * and image paths from /docs/v6/orm/ to /docs/orm/v6/
 *
 * Usage: npx tsx scripts/migrate-orm-v6-links.ts
 */
import fs from 'node:fs';
import path from 'node:path';

const ORM_V6_DIR = path.join(process.cwd(), 'content/docs/orm/v6');

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

function migrateContent(content: string): string {
  return content
    .replace(/\/v6\/orm\//g, '/orm/v6/')
    .replace(/\/v6\/orm"/g, '/orm/v6"')
    .replace(/\/v6\/orm\)/g, '/orm/v6)')
    .replace(/\/docs\/v6\/orm\//g, '/docs/orm/v6/');
}

function main() {
  const files = walkDir(ORM_V6_DIR);
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const updated = migrateContent(content);
    if (content !== updated) {
      fs.writeFileSync(file, updated);
      console.log(`Updated: ${path.relative(process.cwd(), file)}`);
    }
  }
  console.log(`\nDone. Processed ${files.length} files.`);
}

main();
