import { Suspense } from 'react';
import { blog } from '@/lib/source';
import { BlogGrid } from '@/components/BlogGrid';

export default function BlogHome() {
  const posts = blog.getPages().sort((a, b) => {
    const aTime =
      a.data.date instanceof Date
        ? a.data.date.getTime()
        : new Date((a.data.date as unknown as string) ?? '').getTime();
    const bTime =
      b.data.date instanceof Date
        ? b.data.date.getTime()
        : new Date((b.data.date as unknown as string) ?? '').getTime();
    return bTime - aTime;
  });

  const formatDate = (value: unknown) => {
    const date =
      value instanceof Date ? value : new Date((value as string) ?? '');
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const getPrimaryAuthor = (post: (typeof posts)[number]) => {
    const data = post.data as any;
    const authors = Array.isArray(data.authors) ? data.authors : [];
    return authors.length > 0 ? authors[0] : null;
  };
  const getCardImageSrc = (post: (typeof posts)[number]) => {
    const data = post.data as any;
    const rel =
      (data.heroImagePath as string | undefined) ??
      (data.metaImagePath as string | undefined);
    if (rel) {
      // If frontmatter already provides an absolute path, use it directly
      if (rel.startsWith('/')) {
        return rel;
      }
      const base = post.url.startsWith('/') ? post.url : `/${post.url}`;
      const baseClean = base.endsWith('/') ? base.slice(0, -1) : base;
      const relClean = rel.replace(/^\.\//, '').replace(/^\/+/, '');
      return `${baseClean}/${relClean}`;
    }
    const absolute =
      (data.heroImageUrl as string | undefined) ??
      (data.metaImageUrl as string | undefined);
    return absolute ?? null;
  };
  const items = posts.map((post) => {
    const data = post.data as any;
    return {
      url: post.url,
      title: data.title as string,
      date: data.date ? new Date(data.date).toISOString() : '',
      description: (data.description as string) ?? '',
      author: getPrimaryAuthor(post),
      imageSrc: getCardImageSrc(post),
      imageAlt: (data.heroImageAlt as string) ?? (data.title as string),
      seriesTitle: data.series?.title ?? null,
    };
  });
  return (
    <main className="flex-1 w-full max-w-350 mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Prisma Blog</h1>
      <p className="text-fd-muted mb-8">
        Guides, announcements and articles about Prisma, databases and the data
        access layer.
      </p>

      {/* Category pills (static "Show all" to match layout) */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-fd-primary text-white">
          Show all
        </span>
      </div>

      {/* Grid with pagination */}
      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, 12).map((post) => (
              <div
                key={post.url}
                className="rounded-2xl border border-fd-primary/20 bg-fd-secondary animate-pulse h-64"
              />
            ))}
          </div>
        }
      >
        <BlogGrid items={items} pageSize={12} />
      </Suspense>
    </main>
  );
}
