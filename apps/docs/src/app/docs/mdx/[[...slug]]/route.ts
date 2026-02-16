import { getLLMText, source, sourceV6 } from '@/lib/source';
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

  // Strip trailing 'index' if present (added to avoid file/directory conflicts)
  const cleanSlug = slug[slug.length - 1] === 'index' ? slug.slice(0, -1) : slug;

  // Check if this is a v6 request
  const isV6 = cleanSlug[0] === 'v6';
  const actualSlug = isV6 ? cleanSlug.slice(1) : cleanSlug;
  const pageSource = isV6 ? sourceV6 : source;

  const page = pageSource.getPage(actualSlug);
  if (!page) return notFound();

  // Get the LLM text (raw markdown)
  const content = await getLLMText(page);

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, immutable',
    },
  });
}

export async function generateStaticParams() {
  // Generate params for all pages from both sources
  const allDefaultParams = source.generateParams();
  const allV6Params = sourceV6.generateParams();

  // Create a set of all parent paths to detect conflicts
  const allPaths = new Set([
    ...allDefaultParams.map(p => p.slug?.join('/') || ''),
    ...allV6Params.map(p => ['v6', ...(p.slug || [])].join('/')),
  ]);

  // Helper to check if a path has nested children (including root)
  const hasNestedChildren = (path: string) => {
    if (path === '') {
      // Root path: check if there are any non-empty paths
      return Array.from(allPaths).some(p => p !== '');
    }
    return Array.from(allPaths).some(p => p.startsWith(path + '/') && p !== path);
  };

  const defaultParams = allDefaultParams.map((param) => {
    const slug = param.slug || [];
    const path = slug.join('/');

    // If this path has nested children, append 'index' to avoid conflict
    if (hasNestedChildren(path)) {
      return { slug: [...slug, 'index'] };
    }

    return { slug };
  });

  const v6Params = allV6Params.map((param) => {
    const slug = ['v6', ...(param.slug || [])];
    const path = slug.join('/');

    // If this path has nested children, append 'index' to avoid conflict
    if (hasNestedChildren(path)) {
      return { slug: [...slug, 'index'] };
    }

    return { slug };
  });

  return [...defaultParams, ...v6Params];
}
