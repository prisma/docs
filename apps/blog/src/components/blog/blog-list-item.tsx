import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostItem } from '@/lib/blog-data';
import { BLOG_TYPE_LABELS } from '@/lib/blog-data';

export function BlogListItem({ post }: { post: BlogPostItem }) {
  return (
    <article className="grid gap-4 border-t border-border/50 py-4 md:grid-cols-[minmax(0,1fr)_264px]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border bg-secondary/70 px-2 py-0.5 text-[11px] font-medium text-primary">
            {BLOG_TYPE_LABELS[post.type]}
          </span>
          <span>{post.dateLabel}</span>
        </div>

        <Link
          className="text-2xl font-semibold leading-tight tracking-tight text-foreground [font-family:var(--font-barlow)]"
          href={post.url}
        >
          {post.title}
        </Link>

        <div className="mt-2 inline-flex items-center gap-2 text-sm text-foreground">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-secondary text-[10px] font-semibold">
            {getInitials(post.author)}
          </span>
          <span>{post.author}</span>
        </div>
      </div>

      <Link
        className="relative min-h-[160px] overflow-hidden rounded-lg border border-border md:min-h-[152px]"
        href={post.url}
        tabIndex={-1}
      >
        {post.imageSrc ? (
          <Image
            alt={post.imageAlt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 24vw, 100vw"
            src={post.imageSrc}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-accent/20 to-primary/20" />
        )}
      </Link>
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
