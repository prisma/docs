import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@prisma-docs/ui/components/json-ld";
import {
  extensions,
  getExtensionBySlug,
  getInstallCommand,
  getNpmUrl,
  getDatabaseLabel,
  isDatabase,
  isMiddleware,
  EXTENSION_SOURCE_LABELS,
  EXTENSION_STATUS_LABELS,
} from "@prisma-docs/ui/data/extensions";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "@/components/icons/forma";
import { DatabaseBadges, SourceBadge, StatusBadge } from "@/components/extensions/badges";
import { CopyCommand, MONO } from "@/components/extensions/copy-command";
import { ExtensionCard } from "@/components/extensions/extension-card";
import { PanelHero } from "@/components/extensions/panel-hero";
import { getUsageSnippets } from "@/components/extensions/usage-snippets";
import { createPageMetadata } from "@/lib/page-metadata";
import { createSoftwareApplicationStructuredData } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return extensions.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getExtensionBySlug(slug);
  if (!entry) return {};
  const maintainer =
    entry.source === "official" ? "maintained by Prisma" : `maintained by ${entry.author.name}`;
  return createPageMetadata({
    title: `${entry.name} | Prisma 8 extension`,
    description: `${entry.tldr} ${entry.package} for Prisma ORM 8, ${maintainer}.`,
    path: `/extensions/${entry.slug}`,
    ogKicker: "Prisma 8 extension",
  });
}

/** Render a description paragraph, turning `code` spans into <code>. */
function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={index} className={cn("rounded bg-black/[0.05] px-1 text-[0.9em]", MONO)}>
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[clamp(1.375rem,2vw,1.75rem)] leading-[1.15]">{children}</h2>;
}

export default async function ExtensionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = getExtensionBySlug(slug);
  if (!entry) notFound();

  const snippets = getUsageSnippets(entry);
  const related = extensions
    .filter((other) => other.slug !== entry.slug)
    .filter(
      (other) =>
        other.tags.some((tag) => entry.tags.includes(tag)) ||
        other.databases.some((database) => entry.databases.includes(database)),
    )
    .slice(0, 3);

  const structuredData = createSoftwareApplicationStructuredData({
    path: `/extensions/${entry.slug}`,
    name: `${entry.name} for Prisma 8`,
    description: entry.tldr,
  });

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Package", value: <code className={MONO}>{entry.package}</code> },
    ...(entry.importPath
      ? [{ label: "Import from", value: <code className={MONO}>{entry.importPath}</code> }]
      : []),
    { label: "Maintainer", value: EXTENSION_SOURCE_LABELS[entry.source] },
    { label: "Status", value: EXTENSION_STATUS_LABELS[entry.status] },
    {
      label: "Databases",
      value: entry.databases.map(getDatabaseLabel).join(", "),
    },
    {
      label: "Author",
      value: (
        <a
          href={entry.author.url}
          className="underline underline-offset-4 hover:text-prism-cyan-700"
          rel="noopener noreferrer"
        >
          {entry.author.name}
        </a>
      ),
    },
    { label: "Listed", value: entry.addedAt },
  ];

  const links = [
    { label: "Source", href: entry.repo, external: true },
    { label: "npm", href: getNpmUrl(entry), external: true },
    ...(entry.docs ? [{ label: "Docs", href: entry.docs, external: false }] : []),
    ...(entry.example ? [{ label: "Example", href: entry.example, external: true }] : []),
  ];

  return (
    <>
      <JsonLd id="extension-software-application" data={structuredData} />

      <PanelHero
        align="start"
        kicker="Prisma 8 extension"
        title={entry.name}
        lead={entry.tldr}
        breadcrumb={
          <Link
            href="/extensions"
            className="group flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight
              className="size-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none"
              aria-hidden
            />
            All extensions
          </Link>
        }
      >
        <div className="mt-6 flex flex-wrap items-center gap-1.5">
          <SourceBadge source={entry.source} />
          <StatusBadge status={entry.status} />
          <DatabaseBadges databases={entry.databases} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((link, index) => (
            <Button key={link.label} asChild variant={index === 0 ? "default" : "outline"}>
              <a href={link.href} rel={link.external ? "noopener noreferrer" : undefined}>
                {index === 0 ? <Github aria-hidden /> : null}
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </PanelHero>

      <section className="bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="flex min-w-0 flex-col gap-12">
            <div className="flex flex-col gap-4">
              <SectionTitle>What it does</SectionTitle>
              <p className="max-w-[70ch] leading-relaxed text-foreground">
                <InlineCode text={entry.description} />
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <SectionTitle>Install</SectionTitle>
              {entry.builtIn ? (
                <p className="max-w-[70ch] leading-relaxed text-foreground">
                  Ships inside <code className={MONO}>{entry.package}</code>, which every Prisma 8
                  PostgreSQL project already installs. Import it from{" "}
                  <code className={MONO}>{entry.importPath}</code>.
                </p>
              ) : (
                <CopyCommand command={getInstallCommand(entry)} size="lg" />
              )}
              {entry.source === "community" ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Community packages document their own registration steps. Follow the README in the{" "}
                  <a
                    href={entry.repo}
                    className="font-semibold text-foreground underline underline-offset-4 hover:text-prism-cyan-700"
                    rel="noopener noreferrer"
                  >
                    source repository
                  </a>
                  .
                </p>
              ) : null}
            </div>

            {snippets.map((snippet) => (
              <div key={snippet.title} className="flex flex-col gap-4">
                <SectionTitle>{snippet.title}</SectionTitle>
                <div className="overflow-hidden rounded-2xl border border-black/[0.06]">
                  <div
                    className={cn(
                      "border-b border-black/[0.06] bg-paper px-4 py-2 text-xs text-muted-foreground",
                      MONO,
                    )}
                  >
                    {snippet.file}
                  </div>
                  <pre
                    className={cn(
                      "overflow-x-auto bg-white p-4 text-[13px] leading-relaxed text-foreground",
                      MONO,
                    )}
                  >
                    <code className={MONO}>{snippet.code}</code>
                  </pre>
                </div>
              </div>
            ))}

            {entry.source === "official" && !isMiddleware(entry) && !isDatabase(entry) ? (
              <p className="max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
                Then run <code className={MONO}>npx prisma@latest db init</code> (or{" "}
                <code className={MONO}>db update</code> on an existing database). The extension
                ships its own migration for anything the database needs installed. The full
                walkthrough is in the{" "}
                <a
                  href="https://www.prisma.io/docs/orm/extensions/using-extensions"
                  className="font-semibold text-foreground underline underline-offset-4 hover:text-prism-cyan-700"
                >
                  extensions docs
                </a>
                .
              </p>
            ) : null}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <dl className="flex flex-col gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 text-sm shadow-[0_1px_2px_rgba(21,21,21,0.04)]">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold text-muted-foreground">{fact.label}</dt>
                  <dd className="break-words text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
            {entry.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-black/[0.08] px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="text-xs leading-relaxed text-muted-foreground">
              Something wrong with this listing?{" "}
              <a
                href="https://github.com/prisma/web/tree/main/packages/ui/src/data/extensions"
                className="font-semibold text-foreground underline underline-offset-4 hover:text-prism-cyan-700"
                rel="noopener noreferrer"
              >
                Edit it on GitHub
              </a>
              .
            </p>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-white px-4 pb-24 sm:px-8 sm:pb-32">
          <div className="mx-auto flex max-w-site flex-col gap-6">
            <SectionTitle>Related</SectionTitle>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <ExtensionCard key={other.slug} entry={other} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
