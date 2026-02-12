import { generateRSS } from '@prisma-docs/ui/lib/rss';
import { source } from '@/lib/source';

export function getRSS() {
  return generateRSS(
    {
      title: 'Prisma Documentation',
      baseUrl: 'https://prisma.io/docs',
      description: 'Latest updates to Prisma documentation',
      copyright: `All rights reserved ${new Date().getFullYear()}, Prisma Data, Inc.`,
      author: {
        name: 'Prisma Data, Inc.',
      },
    },
    source.getPages().map((page: any) => ({
      id: page.url,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      date: page.data.lastModified ? new Date(page.data.lastModified) : new Date(),
    }))
  );
}