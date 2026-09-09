import { JsonLd } from "@prisma-docs/ui/components/json-ld";
import {
  communityExtensions,
  extensions,
  officialExtensions,
} from "@prisma-docs/ui/data/extensions";
import { PrismButton, PrismButtonOutline } from "@/components/brand/prism-button";
import { ExtensionsDirectory } from "@/components/extensions/directory";
import { PanelHero } from "@/components/extensions/panel-hero";
import { MONO } from "@/components/extensions/copy-command";
import { createPageMetadata } from "@/lib/page-metadata";
import { createCollectionPageStructuredData } from "@/lib/structured-data";

const PAGE_TITLE = "Prisma 8 Extensions | Vector search, geospatial, caching, and more";
const PAGE_DESCRIPTION =
  "Browse extensions and middleware for Prisma ORM 8: pgvector, PostGIS, full-text search, typed JSON, caching, and query guardrails. Built by Prisma and the community.";
const DOCS_EXTENSIONS = "https://www.prisma.io/docs/orm/extensions";
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
        lead="Add vector search, geospatial data, full-text search, typed JSON, caching, and query guardrails to Prisma 8 with one install and two lines of registration."
      >
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <PrismButton href="/extensions/submit" ctaLocation="extensions-hero">
            Submit an extension
          </PrismButton>
          <PrismButtonOutline href={DOCS_EXTENSIONS}>How extensions work</PrismButtonOutline>
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          {officialExtensions.length} by Prisma · {communityExtensions.length} from the community ·
          Prisma 8 is a release candidate, install it with <code className={MONO}>prisma@next</code>
        </p>
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
              Everything around the Prisma 8 core is an extension, including PostgreSQL support
              itself. An extension is a versioned npm package with a documented layout that adds
              column types, query operations, index types, or middleware. Publish it, then list it
              here.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <PrismButton href={AUTHOR_GUIDE}>Read the author guide</PrismButton>
              <PrismButtonOutline href="/extensions/submit">Submit an extension</PrismButtonOutline>
            </div>
            <p className="text-xs text-muted-foreground">
              Submissions open a pull request against prisma/web. A maintainer reviews every
              listing.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
