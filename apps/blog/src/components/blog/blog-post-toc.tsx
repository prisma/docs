'use client';

import { useEffect, useMemo, useState } from 'react';

type TocItem = {
  title?: string;
  url?: string;
  depth?: number;
  items?: TocItem[];
};

export function BlogPostTOC({
  items,
  className,
}: {
  items: TocItem[];
  className?: string;
}) {
  const flatItems = useMemo(() => flattenItems(items), [items]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (flatItems.length === 0) return;

    const applyHash = () => {
      const hash = window.location.hash || '';
      if (hash) setActive(hash);
    };

    applyHash();

    const targets = flatItems
      .map((item) => document.getElementById(item.url.replace(/^#/, '')))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length === 0) return;

        const first = visible[0];
        if (!first.target.id) return;
        setActive(`#${first.target.id}`);
      },
      {
        rootMargin: '-22% 0px -62% 0px',
        threshold: [0, 1],
      },
    );

    targets.forEach((target) => observer.observe(target));
    window.addEventListener('hashchange', applyHash);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', applyHash);
    };
  }, [flatItems]);

  if (flatItems.length === 0) return null;

  return (
    <aside
      className={`border-l border-border/70 pl-3 text-muted-foreground ${className ?? ''}`}
      data-testid="blog-post-toc"
    >
      <p className="text-sm font-semibold text-foreground">On this page</p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {flatItems.map((item) => (
          <li key={item.url}>
            <a
              className={`inline-block border-l-2 pl-2 text-sm transition-colors ${
                active === item.url
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              href={item.url}
              style={{ paddingLeft: `${Math.max(item.depth - 2, 0) * 12}px` }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function flattenItems(items: TocItem[]): Array<{ title: string; url: string; depth: number }> {
  const result: Array<{ title: string; url: string; depth: number }> = [];

  const walk = (entry: TocItem[]) => {
    entry.forEach((item) => {
      if (item.title && item.url) {
        result.push({
          title: item.title,
          url: item.url,
          depth: item.depth ?? 2,
        });
      }

      if (Array.isArray(item.items) && item.items.length > 0) {
        walk(item.items);
      }
    });
  };

  walk(items);
  return result;
}
