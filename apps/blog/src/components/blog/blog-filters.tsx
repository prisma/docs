import {
  BLOG_TYPE_LABELS,
  BLOG_TYPE_ORDER,
  type BlogPostFilterType,
} from '@/lib/blog-data';

type Counts = Record<BlogPostFilterType, number>;

export function BlogFilters({
  selectedType,
  onTypeChange,
  counts,
}: {
  selectedType: BlogPostFilterType;
  onTypeChange: (type: BlogPostFilterType) => void;
  counts: Counts;
}) {
  const options: BlogPostFilterType[] = ['all', ...BLOG_TYPE_ORDER];

  return (
    <div className="flex min-w-0 items-center" data-testid="blog-filters">
      <div className="flex flex-wrap items-center gap-2">
        {options.map((type) => (
          <button
            key={type}
            aria-pressed={selectedType === type}
            className={`inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium transition-colors ${
              selectedType === type
                ? 'border-primary/60 bg-primary/20 text-primary-foreground'
                : 'border-border/70 bg-secondary/80 text-muted-foreground hover:border-border hover:text-foreground'
            }`}
            data-testid={`filter-${type}`}
            onClick={() => onTypeChange(type)}
            type="button"
          >
            {BLOG_TYPE_LABELS[type]}
            <span className="sr-only">{counts[type]} posts</span>
          </button>
        ))}
      </div>
    </div>
  );
}
