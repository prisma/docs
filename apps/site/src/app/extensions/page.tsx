import { JsonLd } from "@prisma-docs/ui/components/json-ld";
import { extensions } from "@prisma-docs/ui/data/extensions";
import { PrismButton, PrismButtonOutline } from "@/components/brand/prism-button";
import { ExtensionsDirectory } from "@/components/extensions/directory";
import { PanelHero } from "@/components/extensions/panel-hero";
import { createPageMetadata } from "@/lib/page-metadata";
import { createCollectionPageStructuredData } from "@/lib/structured-data";

const PAGE_TITLE = "Prisma 8 Extensions | Databases, column types, indexes, and middleware";
const PAGE_DESCRIPTION =
  "Every package that plugs into Prisma ORM 8: database support, pgvector, PostGIS, full-text search, typed JSON, caching, and query guardrails, by Prisma and the community.";
const DOCS_EXTENSIONS = "https://www.prisma.io/docs/orm/extensions/using-extensions";
const AUTHOR_GUIDE = "https://www.prisma.io/blog/prisma-next-call-for-extension-authors";

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/extensions",
  ogKicker: "Prisma 8 Extensions",
});

const structuredData = createCollectionPageStructuredData({
  path: "/extensions",
  name: "Prisma 8 Extensions",
  description: PAGE_DESCRIPTION,
  items: extensions.map((entry) => ({
    url: `/extensions/${entry.slug}`,
    name: entry.name,
    description: entry.tldr,
  })),
});

export default function ExtensionsPage() {
  return (
    <>
      <JsonLd id="extensions-collection" data={structuredData} />

      <PanelHero
        kicker="Prisma ORM 8"
        title="Extensions for Prisma 8"
        lead="Everything that plugs into Prisma 8 is an extension: the database packages, column types such as vectors and geometries, index types, query operations, and middleware. Each one is an npm package that you register in your config and on your client."
      >
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <PrismButton href="/extensions/submit" ctaLocation="extensions-hero">
            Submit an extension
          </PrismButton>
          <PrismButtonOutline href={DOCS_EXTENSIONS}>How extensions work</PrismButtonOutline>
        </div>
      </PanelHero>

      <section className="bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-site">
          <ExtensionsDirectory entries={extensions} />
        </div>
      </section>

      <section className="bg-white px-4 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-site">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-black/[0.06] p-8 text-center sm:p-12">
            <h2 className="text-[clamp(1.5rem,2.25vw,2rem)] leading-[1.15]">
              Build your own extension
            </h2>
            <p className="max-w-[56ch] text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground">
              An extension is a versioned npm package with a control entrypoint for the config and a
              runtime entrypoint for the client. The same layout that ships pgvector also adds a
              database, since the PostgreSQL and MongoDB packages are extensions themselves. Once
              yours is on npm, list it here.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <PrismButton href={AUTHOR_GUIDE}>Read the author guide</PrismButton>
              <PrismButtonOutline href="/extensions/submit">Submit an extension</PrismButtonOutline>
            </div>
            <p className="text-xs text-muted-foreground">
              A submission opens a pull request against prisma/web, which a maintainer reviews
              before the listing goes live.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
