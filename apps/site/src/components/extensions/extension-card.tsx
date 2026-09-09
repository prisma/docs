import Link from "next/link";
import { ArrowRight } from "@/components/icons/forma";
import { getInstallCommand, type ExtensionEntry } from "@prisma-docs/ui/data/extensions";
import { CopyCommand, MONO } from "./copy-command";
import { DatabaseBadges, KindBadge, SourceBadge, StatusBadge } from "./badges";

export function ExtensionCard({ entry }: { entry: ExtensionEntry }) {
  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(21,21,21,0.04)] transition-colors hover:border-black/[0.12]">
      <div className="flex flex-wrap items-center gap-1.5">
        <SourceBadge source={entry.source} />
        <KindBadge kind={entry.kind} />
        <StatusBadge status={entry.status} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="break-words text-lg leading-snug">
          <Link
            href={`/extensions/${entry.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl after:content-['']"
          >
            {entry.name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{entry.tldr}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <DatabaseBadges databases={entry.databases} />
      </div>
      <div className="relative z-10 mt-auto flex flex-col gap-3 pt-2">
        {entry.builtIn ? (
          <p className="rounded-xl border border-dashed border-black/[0.1] px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            Built into <code className={MONO}>{entry.package}</code>. Nothing extra to install.
          </p>
        ) : (
          <CopyCommand command={getInstallCommand(entry)} />
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="truncate">by {entry.author.name}</span>
          <span className="flex items-center gap-1 font-semibold text-foreground transition-colors group-hover:text-prism-cyan-700">
            Details
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </article>
  );
}
