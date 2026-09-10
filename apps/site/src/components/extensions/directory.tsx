"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Database, Search } from "@/components/icons/forma";
import {
  getDatabaseLabel,
  getListedDatabases,
  type ExtensionEntry,
  type ExtensionSource,
} from "@prisma-docs/ui/data/extensions";
import { cn } from "@/lib/utils";
import { ExtensionCard } from "./extension-card";

type SourceFilter = ExtensionSource | "all";

const SOURCE_TABS: { value: SourceFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "official", label: "By Prisma" },
  { value: "community", label: "Community" },
];

function matchesQuery(entry: ExtensionEntry, query: string) {
  if (!query) return true;
  const haystack = [
    entry.name,
    entry.package,
    entry.tldr,
    entry.description,
    entry.author.name,
    ...entry.tags,
    ...entry.databases,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium transition-colors [&_svg]:size-3.5",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-black/[0.1] bg-white text-muted-foreground hover:border-black/[0.25] hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function ExtensionsDirectory({ entries }: { entries: ExtensionEntry[] }) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<SourceFilter>("all");
  const [database, setDatabase] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);
  const databases = useMemo(() => getListedDatabases(entries), [entries]);

  const filtered = useMemo(
    () =>
      entries.filter(
        (entry) =>
          (source === "all" || entry.source === source) &&
          (database === null || entry.databases.includes(database)) &&
          matchesQuery(entry, deferredQuery),
      ),
    [entries, source, database, deferredQuery],
  );

  const official = filtered.filter((entry) => entry.source === "official");
  const community = filtered.filter((entry) => entry.source === "community");
  const counts = {
    all: entries.length,
    official: entries.filter((entry) => entry.source === "official").length,
    community: entries.filter((entry) => entry.source === "community").length,
  };
  const hasActiveFilter = source !== "all" || database !== null || query !== "";
  const clear = () => {
    setQuery("");
    setSource("all");
    setDatabase(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative mx-auto w-full max-w-2xl">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, package, database, or keyword"
          aria-label="Search extensions"
          className="h-12 rounded-full border-black/[0.1] bg-white pl-11 pr-4 text-base shadow-[0_1px_2px_rgba(21,21,21,0.04)] md:text-base"
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div
          role="tablist"
          aria-label="Filter by maintainer"
          className="inline-flex w-fit gap-1 rounded-full border border-black/[0.06] bg-paper p-1"
        >
          {SOURCE_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={source === tab.value}
              onClick={() => setSource(tab.value)}
              className={cn(
                "inline-flex h-8 cursor-pointer items-center gap-2 rounded-full px-3.5 text-[13px] font-medium transition-colors",
                source === tab.value
                  ? "bg-white text-foreground shadow-[0_1px_2px_rgba(21,21,21,0.08)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
              <span className="rounded-full bg-black/[0.05] px-1.5 text-[11px] tabular-nums text-muted-foreground">
                {counts[tab.value]}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" aria-label="Filter by database">
          {databases.map((value) => (
            <Chip
              key={value}
              active={database === value}
              onClick={() => setDatabase(database === value ? null : value)}
            >
              <Database aria-hidden />
              {getDatabaseLabel(value)}
            </Chip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-black/[0.1] px-6 py-16 text-center">
          <p className="text-foreground">No extensions match these filters.</p>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            If you maintain one that belongs here, submit it and the form opens the pull request for
            you.
          </p>
          <div className="flex gap-3">
            {hasActiveFilter ? (
              <Button variant="outline" onClick={clear}>
                Clear filters
              </Button>
            ) : null}
            <Button asChild>
              <a href="/extensions/submit">Submit an extension</a>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-14">
          {official.length > 0 ? (
            <Section
              title="By Prisma"
              blurb="Maintained by the Prisma team and released with Prisma 8."
              entries={official}
            />
          ) : null}
          {community.length > 0 ? (
            <Section
              title="Community"
              blurb="Maintained by their authors, who document registration in each package's README."
              entries={community}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  blurb,
  entries,
}: {
  title: string;
  blurb: string;
  entries: ExtensionEntry[];
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-[clamp(1.375rem,2vw,1.75rem)] leading-[1.15]">
          {title}{" "}
          <span className="text-base text-muted-foreground tabular-nums">({entries.length})</span>
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{blurb}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <ExtensionCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </section>
  );
}
