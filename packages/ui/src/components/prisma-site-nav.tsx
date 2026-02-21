import { Github } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@prisma-docs/eclipse";

import { cn } from "../lib/cn";
import { DiscordIcon } from "./discord";

type PrismaSiteNavProps = {
  className?: string;
  activeHref?: string;
  logoHref?: string;
  logoSrc?: string;
  dataTestId?: string;
};

const productLinks = [
  { href: "https://www.prisma.io/orm", label: "ORM" },
  { href: "https://www.prisma.io/postgres", label: "Postgres" },
  { href: "https://www.prisma.io/accelerate", label: "Accelerate" },
  { href: "https://www.prisma.io/optimize", label: "Optimize" },
];

const resourceLinks = [
  { href: "https://www.prisma.io/docs", label: "Docs" },
  { href: "https://playground.prisma.io", label: "Playground" },
  { href: "https://www.prisma.io/dataguide", label: "Data Guide" },
  { href: "https://benchmarks.prisma.io", label: "Benchmarks" },
];

const navLinks = [
  { href: "https://www.prisma.io/pricing", label: "Pricing" },
  { href: "https://www.prisma.io/partners", label: "Partners" },
  { href: "/", label: "Blog" },
];

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function PrismaSiteNav({
  className,
  activeHref = "/",
  logoHref = "/",
  logoSrc = "/img/logo-white.svg",
  dataTestId,
}: PrismaSiteNavProps) {
  return (
    <header className={cn("pt-5 sm:pt-6", className)} data-testid={dataTestId}>
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--background)_92%,black_8%)_0%,color-mix(in_srgb,var(--background)_82%,black_18%)_100%)] px-6 py-3 shadow-[0_20px_40px_color-mix(in_srgb,var(--background)_68%,black_32%)] backdrop-blur">
        <div className="flex items-center gap-8">
          <a className="inline-flex shrink-0 items-center" href={logoHref}>
            <img alt="Prisma" className="h-8 w-auto" height={32} src={logoSrc} width={125} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-4 md:flex">
            <TopDropdown label="Products" links={productLinks} />

            {navLinks.slice(0, 1).map((link) => (
              <a
                key={link.label}
                className={cn(
                  "inline-flex h-8 items-center rounded-md bg-transparent px-1.5 py-1 text-sm font-semibold text-foreground/90 transition-colors hover:text-foreground focus:text-foreground",
                  activeHref === link.href && "text-foreground",
                )}
                href={link.href}
                rel={isExternal(link.href) ? "noreferrer" : undefined}
                target={isExternal(link.href) ? "_blank" : undefined}
              >
                {link.label}
              </a>
            ))}

            <TopDropdown label="Resources" links={resourceLinks} />

            {navLinks.slice(1).map((link) => (
              <a
                key={link.label}
                className={cn(
                  "inline-flex h-8 items-center rounded-md bg-transparent px-1.5 py-1 text-sm font-semibold text-foreground/90 transition-colors hover:text-foreground focus:text-foreground",
                  activeHref === link.href && "text-foreground",
                )}
                href={link.href}
                rel={isExternal(link.href) ? "noreferrer" : undefined}
                target={isExternal(link.href) ? "_blank" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            className="hidden items-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-sm font-semibold text-foreground/90 transition-colors hover:text-foreground lg:inline-flex"
            href="https://github.com/prisma/prisma"
            rel="noreferrer"
            target="_blank"
          >
            <Github size={14} />
            <span>41.8K</span>
          </a>
          <a
            className="hidden items-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-sm font-semibold text-foreground/90 transition-colors hover:text-foreground lg:inline-flex"
            href="https://discord.com/invite/prisma"
            rel="noreferrer"
            target="_blank"
          >
            <DiscordIcon className="size-3.5" />
          </a>
          <a
            className="rounded-lg border border-border/80 bg-background/80 px-3.5 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/70"
            href="https://www.prisma.io/login"
            rel="noreferrer"
            target="_blank"
          >
            Login
          </a>
          <a
            className="rounded-lg border border-primary/40 bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            href="https://console.prisma.io/"
            rel="noreferrer"
            target="_blank"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}

function TopDropdown({
  label,
  links,
}: {
  label: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <NavigationMenu viewport={false} className="flex-none">
      <NavigationMenuList className="gap-0">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-8 rounded-md bg-transparent px-1.5 py-1 text-sm font-semibold text-foreground/90 hover:bg-transparent hover:text-foreground data-[state=open]:bg-transparent data-[state=open]:text-foreground">
            {label}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-[220px] rounded-lg border border-border/70 bg-background/95 p-1.5 shadow-lg backdrop-blur">
            <ul className="grid gap-1">
              {links.map((link) => (
                <li key={link.label}>
                  <NavigationMenuLink
                    asChild
                    className="rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-secondary/50 focus:bg-secondary/60"
                  >
                    <a href={link.href} rel="noreferrer" target="_blank">
                      {link.label}
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
