import { PrismaSiteNav } from "@prisma-docs/ui/components/prisma-site-nav";

export function BlogNav() {
  return <PrismaSiteNav activeHref="/" dataTestId="blog-nav" logoSrc="/img/logo-white.svg" />;
}
