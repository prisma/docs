import { getLLMText, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { NextRequest } from 'next/server';

interface RouteParams {
  slug?: string[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  const { slug = [] } = await params;

  const cleanSlug = slug[slug.length - 1] === 'index' ? slug.slice(0, -1) : slug;
  const page = source.getPage(cleanSlug);
  if (!page) return notFound();

  const content = await getLLMText(page);

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, immutable',
    },
  });
}

export async function generateStaticParams() {
  const allParams = source.generateParams();
  const allPaths = new Set(allParams.map(p => p.slug?.join('/') || ''));

  const hasNestedChildren = (path: string) => {
    if (path === '') return Array.from(allPaths).some(p => p !== '');
    return Array.from(allPaths).some(p => p.startsWith(path + '/') && p !== path);
  };

  return allParams.map((param) => {
    const slug = param.slug || [];
    const path = slug.join('/');
    if (hasNestedChildren(path)) {
      return { slug: [...slug, 'index'] };
    }
    return { slug };
  });
}
