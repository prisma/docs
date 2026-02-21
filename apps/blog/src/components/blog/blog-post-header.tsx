import { BLOG_TYPE_LABELS, type BlogPostType } from '@/lib/blog-data';

export function BlogPostHeader({
  title,
  description,
  author,
  dateLabel,
  type,
  tags,
}: {
  title: string;
  description?: string;
  author: string;
  dateLabel: string;
  type: BlogPostType;
  tags: string[];
}) {
  const displayTags = [BLOG_TYPE_LABELS[type], ...tags.filter((tag) => tag !== type)].slice(0, 6);

  return (
    <header className="pt-10" data-testid="blog-post-header">
      <h1 className="text-5xl font-bold leading-[1.04] tracking-tight text-foreground [font-family:var(--font-barlow)] md:text-6xl">
        {title}
      </h1>

      <div className="mt-4 inline-flex items-center gap-2 text-sm text-foreground">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-secondary text-[10px] font-semibold">
          {getInitials(author)}
        </span>
        <span>{author}</span>
        {dateLabel ? <span className="text-muted-foreground">•</span> : null}
        {dateLabel ? <span>{dateLabel}</span> : null}
      </div>

      {description ? <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{description}</p> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {displayTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-secondary/70 px-2 py-0.5 text-[11px] font-medium text-primary"
          >
            {formatTag(tag)}
          </span>
        ))}
      </div>
    </header>
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

function formatTag(tag: string): string {
  return tag
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
