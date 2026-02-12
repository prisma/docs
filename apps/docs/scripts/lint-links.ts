import {
  type FileObject,
  printErrors,
  scanURLs,
  validateFiles,
} from 'next-validate-link';
import type { InferPageType } from 'fumadocs-core/source';

import { register } from 'node:module';
register('fumadocs-mdx/node/loader', import.meta.url);

const { source } = await import('@/lib/source');
const allPages = source.getPages().map((page) => ({
  value: { slug: page.slugs },
  hashes: getHeadings(page),
}));

console.log(`Found ${allPages.length} doc files`);

async function checkLinks() {
  const scanned = await scanURLs({
    preset: 'next',
    populate: {
      '(docs)/(default)/[[...slug]]': allPages,
    },
  });

  printErrors(
    await validateFiles(await getFiles(), {
      scanned,
      markdown: {
        components: {
          Card: { attributes: ['href'] },
          Cards: { attributes: ['href'] },
        },
      },
      checkRelativePaths: 'as-url',
    }),
    true,
  );
}

function getHeadings({ data }: InferPageType<typeof source>): string[] {
  return data.toc.map((item) => item.url.slice(1));
}

function getFiles() {
  console.log("Validating Files")

  const promises = source.getPages().map(
    async (page): Promise<FileObject> => ({
      path: page.absolutePath ?? '',
      content: await page.data.getText('raw'),
      url: page.url,
      data: page.data,
    }),
  );

  return Promise.all(promises);
}

void checkLinks();
