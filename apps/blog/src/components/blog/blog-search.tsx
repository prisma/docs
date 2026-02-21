import { Search } from 'lucide-react';

export function BlogSearch({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <label
      className="inline-flex w-full items-center justify-between gap-2 rounded-md border border-border/70 bg-background/80 px-3 py-1.5 text-muted-foreground md:w-[290px]"
      data-testid="blog-search"
    >
      <input
        aria-label="Search the blog"
        data-testid="blog-search-input"
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search the blog"
        type="search"
        value={query}
      />
      <Search className="shrink-0" size={14} />
    </label>
  );
}
