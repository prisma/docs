import Link from "next/link";
import { ArrowRight } from "@/components/icons/forma";
import { PanelHero } from "@/components/extensions/panel-hero";
import { SubmitExtensionForm } from "@/components/extensions/submit-form";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Submit a Prisma 8 extension",
  description:
    "List your Prisma ORM 8 extension or middleware in the directory. The form validates your entry and opens a pull request for you.",
  path: "/extensions/submit",
  ogKicker: "Prisma 8 Extensions",
});

const steps = [
  {
    title: "Publish to npm",
    body: "The directory lists published packages only, so follow the extension pack layout from the author guide and publish before you submit.",
  },
  {
    title: "Fill in the form",
    body: "Give the name, a one-line summary, the databases it works with or adds, and the links, and the form checks the entry and confirms the package resolves on npm.",
  },
  {
    title: "We open the pull request",
    body: "The entry is appended to the community registry in prisma/web, a maintainer reviews the pull request, and the listing goes live on the next deploy after the merge.",
  },
];

export default function SubmitExtensionPage() {
  return (
    <>
      <PanelHero
        align="start"
        kicker="Prisma ORM 8"
        title="Submit an extension"
        lead="List a published Prisma 8 extension in the directory. The form validates the entry and opens the pull request for you."
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
      />

      <section className="bg-white px-4 py-16 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="relative min-w-0">
            <SubmitExtensionForm />
          </div>
          <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
            <ol className="flex flex-col gap-6">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold tabular-nums text-primary-foreground">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-col gap-2 rounded-2xl border border-black/[0.06] bg-paper p-6 text-sm">
              <p className="font-semibold text-foreground">Prefer git?</p>
              <p className="leading-relaxed text-muted-foreground">
                Add an entry to{" "}
                <a
                  href="https://github.com/prisma/web/blob/main/packages/ui/src/data/extensions/community.json"
                  className="font-semibold text-foreground underline underline-offset-4 hover:text-prism-cyan-700"
                  rel="noopener noreferrer"
                >
                  community.json
                </a>{" "}
                and open a pull request. The field reference is in the README next to it.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                New to writing extensions? Start with the{" "}
                <a
                  href="https://www.prisma.io/blog/prisma-next-call-for-extension-authors"
                  className="font-semibold text-foreground underline underline-offset-4 hover:text-prism-cyan-700"
                >
                  author guide
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
