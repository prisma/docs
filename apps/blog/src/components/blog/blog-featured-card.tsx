import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostItem } from '@/lib/blog-data';
import { BLOG_TYPE_LABELS } from '@/lib/blog-data';

export function BlogFeaturedCard({ post }: { post: BlogPostItem }) {
  return (
    <article
      className="mt-1 grid overflow-hidden rounded-xl border border-border bg-card/65 md:grid-cols-[minmax(0,1.03fr)_minmax(0,1fr)]"
      data-testid="blog-featured-card"
    >
      <Link className="relative block min-h-[220px] md:min-h-[260px]" href={post.url}>
        {post.imageSrc ? (
          <Image
            alt={post.imageAlt}
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            src={post.imageSrc}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary" />
        )}
      </Link>

      <div className="flex flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border bg-secondary/70 px-2 py-0.5 text-[11px] font-medium text-primary">
            {BLOG_TYPE_LABELS[post.type]}
          </span>
          <span>{post.dateLabel}</span>
        </div>

        <Link
          className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-foreground [font-family:var(--font-barlow)]"
          data-testid="featured-title-link"
          href={post.url}
        >
          {post.title}
        </Link>

        {post.summary ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.summary}</p> : null}

        <div className="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-foreground">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-secondary text-[10px] font-semibold">
            {getInitials(post.author)}
          </span>
          <span>{post.author}</span>
        </div>
      </div>
    </article>
  );
}

function getInitials(author: string): string {
  const values = author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '');

  return values.join('') || 'PT';
}
