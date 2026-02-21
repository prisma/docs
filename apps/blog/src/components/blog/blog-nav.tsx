import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Github } from "lucide-react";
import { DiscordIcon } from "@prisma-docs/ui/components/discord";

const navLinks = [
  { href: "https://www.prisma.io/products", label: "Products", hasMenu: true },
  { href: "https://www.prisma.io/pricing", label: "Pricing", hasMenu: false },
  {
    href: "https://www.prisma.io/resources",
    label: "Resources",
    hasMenu: true,
  },
  { href: "https://www.prisma.io/partners", label: "Partners", hasMenu: false },
  { href: "/", label: "Blog", hasMenu: false },
];

export function BlogNav() {
  return (
    <header className="pt-6 sm:pt-7" data-testid="blog-nav">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--background)_95%,black_5%)_0%,color-mix(in_srgb,var(--background)_85%,black_15%)_100%)] px-4 py-2.5 shadow-[0_14px_30px_color-mix(in_srgb,var(--background)_60%,black_40%)] backdrop-blur xl:px-5">
        <div className=" flex items-center gap-3">
          <Link className="inline-flex shrink-0 items-center" href="/">
            <Image
              alt="Prisma"
              className="h-7 w-auto"
              height={28}
              priority
              src="/img/logo-white.svg"
              width={109}
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 lg:flex"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                className={`text-sm font-medium transition-colors ${
                  item.label === "Blog"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                href={item.href}
              >
                <span className="inline-flex items-center gap-1">
                  {item.label}
                  {item.hasMenu ? (
                    <ChevronDown className="size-3 text-muted-foreground/90" />
                  ) : null}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            className="hidden items-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border/70 hover:text-foreground lg:inline-flex"
            href="https://github.com/prisma/prisma"
            rel="noreferrer"
            target="_blank"
          >
            <Github size={14} />
            <span>41.8K</span>
          </a>
          <a
            className="hidden items-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border/70 hover:text-foreground lg:inline-flex"
            href="https://discord.com/invite/prisma"
            rel="noreferrer"
            target="_blank"
          >
            <DiscordIcon className="size-3.5" />
          </a>
          <a
            className="rounded-md border border-border/80 bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70"
            href="https://www.prisma.io/login"
            rel="noreferrer"
            target="_blank"
          >
            Login
          </a>
          <a
            className="rounded-md border border-primary/40 bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
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
