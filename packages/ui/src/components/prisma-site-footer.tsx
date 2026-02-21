import { cn } from "../lib/cn";

type PrismaSiteFooterProps = {
  className?: string;
  logoHref?: string;
  logoSrc?: string;
  dataTestId?: string;
};

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "ORM", href: "https://www.prisma.io/orm" },
      { label: "Studio", href: "https://www.prisma.io/studio" },
      { label: "Optimize", href: "https://www.prisma.io/optimize" },
      { label: "Accelerate", href: "https://www.prisma.io/accelerate" },
      { label: "Pricing", href: "https://www.prisma.io/pricing" },
      { label: "Changelog", href: "https://www.prisma.io/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "https://www.prisma.io/docs" },
      { label: "Ecosystem", href: "https://www.prisma.io/ecosystem" },
      { label: "Playground", href: "https://playground.prisma.io" },
      { label: "Customer Stories", href: "https://www.prisma.io/blog" },
      { label: "Data Guide", href: "https://www.prisma.io/dataguide" },
      { label: "Benchmarks", href: "https://benchmarks.prisma.io" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Community", href: "https://www.prisma.io/community" },
      { label: "Support", href: "https://www.prisma.io/support" },
      { label: "Partners", href: "https://www.prisma.io/partners" },
      { label: "Enterprise", href: "https://www.prisma.io/enterprise" },
      { label: "OSS Friends", href: "https://www.prisma.io/oss-friends" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "https://www.prisma.io/about" },
      { label: "Blog", href: "/" },
      { label: "Data DX", href: "https://www.prisma.io/datadx" },
      { label: "Careers", href: "https://www.prisma.io/careers" },
      { label: "Legal", href: "https://www.prisma.io/legal" },
    ],
  },
];

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function PrismaSiteFooter({
  className,
  logoHref = "/",
  logoSrc = "/img/logo-white.svg",
  dataTestId,
}: PrismaSiteFooterProps) {
  return (
    <footer
      className={cn("mb-6 mt-14 border-t border-border/70 pt-6", className)}
      data-testid={dataTestId}
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[150px_minmax(0,1fr)]">
        <a className="inline-flex items-center" href={logoHref}>
          <img alt="Prisma" className="h-6 w-auto" height={24} src={logoSrc} width={93} />
        </a>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.04em] text-foreground/90">
                {column.title}
              </h3>
              <ul className="mt-2 flex flex-col gap-1.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      href={link.href}
                      rel={isExternal(link.href) ? "noreferrer" : undefined}
                      target={isExternal(link.href) ? "_blank" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
