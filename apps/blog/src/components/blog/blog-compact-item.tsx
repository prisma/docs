import Link from 'next/link';
import type { BlogPostItem } from '@/lib/blog-data';
import { BLOG_TYPE_LABELS } from '@/lib/blog-data';

export function BlogCompactItem({ post }: { post: BlogPostItem }) {
  return (
    <article className="flex flex-col gap-2 border-t border-border/50 py-4">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-full border border-border bg-secondary/70 px-2 py-0.5 text-[11px] font-medium text-primary">
          {BLOG_TYPE_LABELS[post.type]}
        </span>
        <span>{post.dateLabel}</span>
      </div>
      <Link
        className="text-xl font-semibold leading-tight tracking-tight text-foreground [font-family:var(--font-barlow)]"
        href={post.url}
      >
        {post.title}
      </Link>
      <div className="mt-1 inline-flex items-center gap-2 text-sm text-foreground">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-secondary text-[10px] font-semibold">
          {getInitials(post.author)}
        </span>
        <span>{post.author}</span>
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
