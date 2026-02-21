'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Grid2x2, List } from 'lucide-react';
import { BlogCompactItem } from '@/components/blog/blog-compact-item';
import { BlogFeaturedCard } from '@/components/blog/blog-featured-card';
import { BlogFilters } from '@/components/blog/blog-filters';
import { BlogHero } from '@/components/blog/blog-hero';
import { BlogListItem } from '@/components/blog/blog-list-item';
import { BlogSearch } from '@/components/blog/blog-search';
import {
  type BlogPostFilterType,
  type BlogPostItem,
  filterPosts,
  getFeaturedPost,
  isBlogPostType,
  paginatePosts,
} from '@/lib/blog-data';

function parsePage(value: string | null): number {
  const parsed = parseInt(value ?? '1', 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

function parseType(value: string | null): BlogPostFilterType {
  if (!value || value === 'all') return 'all';
  return isBlogPostType(value) ? value : 'all';
}

function parseView(value: string | null): 'cards' | 'compact' {
  return value === 'compact' ? 'compact' : 'cards';
}

export function BlogGrid({
  items,
  pageSize = 12,
}: {
  items: BlogPostItem[];
  pageSize?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const selectedType = parseType(searchParams.get('type'));
  const view = parseView(searchParams.get('view'));
  const rawPage = parsePage(searchParams.get('page'));
  const nextView = view === 'cards' ? 'compact' : 'cards';
  const ToggleIcon = nextView === 'compact' ? List : Grid2x2;
  const toggleLabel = nextView === 'compact' ? 'List view' : 'Cards view';

  const filteredByType = useMemo(
    () => filterPosts(items, { query, type: selectedType }),
    [items, query, selectedType],
  );
  const filteredByQuery = useMemo(
    () => filterPosts(items, { query, type: 'all' }),
    [items, query],
  );

  const featured = useMemo(() => {
    if (rawPage !== 1) return null;
    return getFeaturedPost(filteredByType);
  }, [filteredByType, rawPage]);

  const feedSource = useMemo(() => {
    if (!featured) return filteredByType;
    return filteredByType.filter((post) => post.id !== featured.id);
  }, [featured, filteredByType]);

  const pagination = useMemo(
    () => paginatePosts(feedSource, rawPage, pageSize),
    [feedSource, rawPage, pageSize],
  );

  useEffect(() => {
    if (pagination.currentPage === rawPage) return;

    const params = new URLSearchParams(searchParams.toString());
    if (pagination.currentPage <= 1) params.delete('page');
    else params.set('page', String(pagination.currentPage));

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, [pagination.currentPage, pathname, rawPage, router, searchParams]);

  const counts = useMemo(() => {
    const nextCounts: Record<BlogPostFilterType, number> = {
      all: filteredByQuery.length,
      release: 0,
      'user-story': 0,
      community: 0,
      tutorial: 0,
      postgres: 0,
      changelog: 0,
    };

    filteredByQuery.forEach((post) => {
      nextCounts[post.type] += 1;
    });

    return nextCounts;
  }, [filteredByQuery]);

  const replaceParams = (
    updates: Partial<{
      q: string;
      type: BlogPostFilterType;
      view: 'cards' | 'compact';
      page: number;
    }>,
    options?: { resetPage?: boolean; scrollToTop?: boolean },
  ) => {
    const params = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : searchParams.toString(),
    );
    const resetPage = options?.resetPage ?? false;
    const scrollToTop = options?.scrollToTop ?? false;

    if (updates.q !== undefined) {
      const next = updates.q.trim();
      if (next) params.set('q', next);
      else params.delete('q');
    }

    if (updates.type !== undefined) {
      if (updates.type === 'all') params.delete('type');
      else params.set('type', updates.type);
    }

    if (updates.view !== undefined) {
      if (updates.view === 'cards') params.delete('view');
      else params.set('view', updates.view);
    }

    if (updates.page !== undefined) {
      if (updates.page <= 1) params.delete('page');
      else params.set('page', String(updates.page));
    }

    if (resetPage) params.delete('page');

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);

    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const hasResults = filteredByType.length > 0;

  return (
    <div className="flex flex-col gap-4" data-testid="blog-page">
      <BlogHero />

      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto] md:gap-4">
        <BlogFilters
          counts={counts}
          onTypeChange={(type) => replaceParams({ type }, { resetPage: true })}
          selectedType={selectedType}
        />
        <div className="flex items-center justify-end gap-2">
          <BlogSearch
            onQueryChange={(nextQuery) =>
              replaceParams(
                {
                  q: nextQuery,
                },
                { resetPage: true },
              )
            }
            query={query}
          />
          <button
            aria-label={`Switch to ${toggleLabel}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background/80 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            data-testid="view-toggle"
            onClick={() => replaceParams({ view: nextView })}
            title={`Switch to ${toggleLabel}`}
            type="button"
          >
            <ToggleIcon size={15} />
          </button>
        </div>
      </div>

      {featured ? <BlogFeaturedCard post={featured} /> : null}

      {hasResults ? (
        <section className="mt-1" data-testid="blog-feed">
          {view === 'cards'
            ? pagination.items.map((post) => <BlogListItem key={post.id} post={post} />)
            : pagination.items.map((post) => <BlogCompactItem key={post.id} post={post} />)}
        </section>
      ) : (
        <div className="mt-1 rounded-xl border border-border bg-card/60 p-6 text-center text-sm text-muted-foreground">
          <p>No posts matched this filter.</p>
          <button
            className="mt-3 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
            onClick={() => replaceParams({ q: '', type: 'all', page: 1 })}
            type="button"
          >
            Reset filters
          </button>
        </div>
      )}

      {pagination.totalPages > 1 ? (
        <nav
          aria-label="Blog pagination"
          className="mt-2 flex items-center justify-center gap-3 border-t border-border/50 pt-3 text-sm text-muted-foreground"
        >
          <button
            className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-45"
            disabled={pagination.currentPage <= 1}
            onClick={() =>
              replaceParams(
                {
                  page: pagination.currentPage - 1,
                },
                { scrollToTop: true },
              )
            }
            type="button"
          >
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-45"
            disabled={pagination.currentPage >= pagination.totalPages}
            onClick={() =>
              replaceParams(
                {
                  page: pagination.currentPage + 1,
                },
                { scrollToTop: true },
              )
            }
            type="button"
          >
            Next
          </button>
        </nav>
      ) : null}
    </div>
  );
}
