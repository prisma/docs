import { blog as blogSource } from '@/lib/source';

export const BLOG_TYPE_ORDER = [
  'release',
  'user-story',
  'community',
  'tutorial',
  'postgres',
  'changelog',
] as const;

export type BlogPostType = (typeof BLOG_TYPE_ORDER)[number];

export type BlogPostFilterType = BlogPostType | 'all';

export const BLOG_TYPE_LABELS: Record<BlogPostFilterType, string> = {
  all: 'All',
  'user-story': 'User Story',
  release: 'Release',
  community: 'Community',
  tutorial: 'Tutorial',
  postgres: 'Postgres',
  changelog: 'Changelog',
};

type SourcePage = ReturnType<typeof blogSource.getPages>[number];

export type BlogPostItem = {
  id: string;
  slug: string;
  url: string;
  title: string;
  dateISO: string;
  dateLabel: string;
  dateValue: number;
  description: string;
  summary: string;
  author: string;
  authors: string[];
  imageSrc: string | null;
  imageAlt: string;
  type: BlogPostType;
  tags: string[];
  featured: boolean;
};

export function isBlogPostType(value: unknown): value is BlogPostType {
  return typeof value === 'string' && BLOG_TYPE_ORDER.includes(value as BlogPostType);
}

export function inferPostType(slug: string, title: string): BlogPostType {
  const text = `${slug} ${title}`.toLowerCase();

  if (
    text.includes('changelog') ||
    text.includes("what's new") ||
    text.includes('whats-new') ||
    text.includes('wnip')
  ) {
    return 'changelog';
  }

  if (
    text.includes('customer') ||
    text.includes('customer-story') ||
    text.includes('success-story') ||
    text.includes('case-study') ||
    text.includes('case study')
  ) {
    return 'user-story';
  }

  if (text.includes('postgres')) {
    return 'postgres';
  }

  if (
    text.includes('tutorial') ||
    text.includes('guide') ||
    text.includes('how to') ||
    text.includes('fullstack') ||
    text.includes('build ')
  ) {
    return 'tutorial';
  }

  if (
    text.includes('release') ||
    text.includes('announcing') ||
    /orm-\d/.test(text) ||
    /prisma-\d/.test(text)
  ) {
    return 'release';
  }

  return 'community';
}

function toDate(value: unknown): Date | null {
  const parsed = value instanceof Date ? value : new Date((value as string) ?? '');
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(date: Date | null): string {
  if (!date) return '';

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getImageSrc(page: SourcePage): string | null {
  const data = page.data as unknown as Record<string, unknown>;
  const relRaw =
    (data.heroImagePath as string | undefined) ?? (data.metaImagePath as string | undefined);

  if (relRaw) {
    if (relRaw.startsWith('/')) return relRaw;

    const base = page.url.startsWith('/') ? page.url : `/${page.url}`;
    const baseClean = base.endsWith('/') ? base.slice(0, -1) : base;
    const relClean = relRaw.replace(/^\.\//, '').replace(/^\/+/, '');
    return `${baseClean}/${relClean}`;
  }

  const absoluteRaw =
    (data.heroImageUrl as string | undefined) ?? (data.metaImageUrl as string | undefined);
  return absoluteRaw ?? null;
}

function sanitizeText(value: unknown): string {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function getSummary(data: Record<string, unknown>): string {
  const description = sanitizeText(data.description);
  if (description) return description;

  const metaDescription = sanitizeText(data.metaDescription);
  if (metaDescription) return metaDescription;

  const excerpt = sanitizeText(data.excerpt);
  if (excerpt) return excerpt;

  return '';
}

function unique(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function normalizePostMeta(page: SourcePage): BlogPostItem {
  const data = page.data as unknown as Record<string, unknown>;
  const authors = Array.isArray(data.authors) ? data.authors.map((value) => String(value)) : [];
  const date = toDate(data.date);
  const title = sanitizeText(data.title);
  const slug = page.slugs.join('/');
  const rawType = data.type;
  const type = isBlogPostType(rawType) ? rawType : inferPostType(slug, title);
  const explicitTags = Array.isArray(data.tags)
    ? data.tags.map((value) => String(value).trim().toLowerCase())
    : [];

  return {
    id: page.url,
    slug,
    url: page.url,
    title,
    dateISO: date ? date.toISOString() : '',
    dateLabel: formatDate(date),
    dateValue: date ? date.getTime() : 0,
    description: getSummary(data),
    summary: getSummary(data),
    author: authors[0] ?? 'Prisma Team',
    authors,
    imageSrc: getImageSrc(page),
    imageAlt: sanitizeText(data.heroImageAlt) || title,
    type,
    tags: unique([type, ...explicitTags]),
    featured: Boolean(data.featured),
  };
}

export function getBlogPosts(): BlogPostItem[] {
  const pages = blogSource.getPages();

  return pages.map(normalizePostMeta).sort((a, b) => b.dateValue - a.dateValue);
}

export function filterPosts(
  posts: BlogPostItem[],
  options: {
    query?: string;
    type?: BlogPostFilterType;
  },
): BlogPostItem[] {
  const query = options.query?.trim().toLowerCase() ?? '';
  const filterType = options.type ?? 'all';

  return posts.filter((post) => {
    const matchesType = filterType === 'all' ? true : post.type === filterType;
    if (!matchesType) return false;

    if (!query) return true;

    const haystack = [
      post.title,
      post.description,
      post.summary,
      post.author,
      ...post.tags,
      BLOG_TYPE_LABELS[post.type],
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function paginatePosts(
  posts: BlogPostItem[],
  page: number,
  pageSize: number,
): {
  items: BlogPostItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
} {
  const totalItems = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const items = posts.slice(start, start + pageSize);

  return {
    items,
    currentPage,
    totalPages,
    totalItems,
  };
}

export function getFeaturedPost(posts: BlogPostItem[]): BlogPostItem | null {
  if (posts.length === 0) return null;
  return posts.find((post) => post.featured) ?? posts[0];
}
