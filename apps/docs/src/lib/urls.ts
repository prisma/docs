/**
 * Returns the base URL for the site (e.g. https://www.prisma.io).
 * Used for canonical URLs, OpenGraph, and sitemaps.
 */
export function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    'http://localhost:3000'
  );
}

export function normalize(urlOrPath: string) {
  if (urlOrPath.length > 1 && urlOrPath.endsWith('/')) return urlOrPath.slice(0, -1);
  return urlOrPath;
}

/**
 * @returns if `href` is matching the given pathname
 */
export function isActive(href: string, pathname: string, nested = true): boolean {
  href = normalize(href);
  pathname = normalize(pathname);

  return href === pathname || (nested && pathname.startsWith(`${href}/`));
}

/**
 * @returns if pathname matches any of the given paths (exact or nested)
 */
export function isActiveAny(paths: string[], pathname: string): boolean {
  const normalizedPathname = normalize(pathname);
  return paths.some((path) => {
    const normalized = normalize(path);
    return normalized === normalizedPathname || normalizedPathname.startsWith(`${normalized}/`);
  });
}
