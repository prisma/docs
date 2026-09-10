"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle, Github } from "@/components/icons/forma";
import {
  EXTENSION_STATUS_LABELS,
  EXTENSION_STATUSES,
  KNOWN_DATABASES,
  getDatabaseLabel,
  type ExtensionStatus,
} from "@prisma-docs/ui/data/extensions";
import { slugFromPackage, submissionSchema } from "@/lib/extensions/submission";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  package: string;
  slug: string;
  slugTouched: boolean;
  status: ExtensionStatus;
  databases: string[];
  /** Databases outside KNOWN_DATABASES, comma separated, for an extension that adds one. */
  otherDatabases: string;
  tldr: string;
  description: string;
  tags: string;
  repo: string;
  docs: string;
  example: string;
  authorName: string;
  authorUrl: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  package: "",
  slug: "",
  slugTouched: false,
  status: "release-candidate",
  databases: ["postgresql"],
  otherDatabases: "",
  tldr: "",
  description: "",
  tags: "",
  repo: "",
  docs: "",
  example: "",
  authorName: "",
  authorUrl: "",
  website: "",
};

type Result =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; prUrl: string | null }
  | { kind: "fallback"; message: string; url: string }
  | { kind: "error"; message: string; issues: Record<string, string> };

const selectClass =
  "border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="mb-5 text-xl font-medium text-foreground">{title}</legend>
      {children}
    </fieldset>
  );
}

export function SubmitExtensionForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((previous) => ({ ...previous, [key]: value }));

  const issues = result.kind === "error" ? result.issues : {};

  const payload = () => ({
    name: form.name,
    package: form.package,
    slug: form.slug || slugFromPackage(form.package),
    status: form.status,
    databases: [
      ...new Set([
        ...form.databases,
        ...form.otherDatabases
          .split(",")
          .map((database) => database.trim().toLowerCase())
          .filter(Boolean),
      ]),
    ],
    tldr: form.tldr,
    description: form.description,
    tags: [
      ...new Set(
        form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    ],
    repo: form.repo,
    docs: form.docs,
    example: form.example,
    authorName: form.authorName,
    authorUrl: form.authorUrl,
    website: form.website,
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = payload();

    const local = submissionSchema.safeParse(data);
    if (!local.success) {
      const collected: Record<string, string> = {};
      for (const issue of local.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!collected[key]) collected[key] = issue.message;
      }
      setResult({ kind: "error", message: "Check the highlighted fields.", issues: collected });
      return;
    }

    setResult({ kind: "submitting" });
    try {
      const response = await fetch("/api/extensions/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await response.json()) as {
        ok?: boolean;
        prUrl?: string | null;
        error?: string;
        fallbackUrl?: string;
        issues?: { path: string; message: string }[];
      };
      if (response.ok && json.ok) {
        setResult({ kind: "success", prUrl: json.prUrl ?? null });
        return;
      }
      if (json.fallbackUrl) {
        setResult({
          kind: "fallback",
          message: json.error ?? "Automatic submission is unavailable.",
          url: json.fallbackUrl,
        });
        return;
      }
      const collected: Record<string, string> = {};
      for (const issue of json.issues ?? []) {
        // Array items report as "databases.0"; the form shows errors per field.
        const key = issue.path.split(".")[0] || "form";
        if (!collected[key]) collected[key] = issue.message;
      }
      setResult({ kind: "error", message: json.error ?? "Submission failed.", issues: collected });
    } catch {
      setResult({ kind: "error", message: "Network error. Try again.", issues: {} });
    }
  };

  if (result.kind === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-black/[0.06] bg-paper p-8">
        <CheckCircle className="size-8 text-prism-cyan-700" aria-hidden />
        <h2 className="text-[clamp(1.375rem,2vw,1.75rem)] leading-[1.15]">Pull request opened</h2>
        <p className="max-w-[56ch] leading-relaxed text-muted-foreground">
          A maintainer reviews the listing, and it goes live on the next deploy after the merge.
        </p>
        {result.prUrl ? (
          <Button asChild size="lg">
            <a href={result.prUrl} rel="noopener noreferrer">
              <Github aria-hidden />
              View the pull request
            </a>
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-10 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(21,21,21,0.04)] sm:p-8"
    >
      {result.kind === "fallback" ? (
        <div className="flex flex-col gap-3 rounded-xl border border-prism-yellow-200 bg-prism-yellow-50 p-5 text-sm text-prism-yellow-700">
          <p>{result.message}</p>
          <Button asChild variant="outline" className="w-fit">
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              Open the prefilled GitHub issue
              <ArrowRight aria-hidden />
            </a>
          </Button>
        </div>
      ) : null}
      {result.kind === "error" ? (
        <div className="rounded-xl border border-prism-red-200 bg-prism-red-50 p-4 text-sm text-prism-red-700">
          {result.message}
        </div>
      ) : null}

      <Fieldset title="The package">
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="npm package"
            htmlFor="package"
            hint="Must already be published."
            error={issues.package}
          >
            <Input
              id="package"
              value={form.package}
              placeholder="prisma-orm-extension-my-thing"
              onChange={(event) => {
                const value = event.target.value;
                setForm((previous) => ({
                  ...previous,
                  package: value,
                  slug: previous.slugTouched ? previous.slug : slugFromPackage(value),
                }));
              }}
              aria-invalid={Boolean(issues.package)}
              required
            />
          </Field>
          <Field label="Display name" htmlFor="name" error={issues.name}>
            <Input
              id="name"
              value={form.name}
              placeholder="my-thing"
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={Boolean(issues.name)}
              required
            />
          </Field>
          <Field
            label="Directory slug"
            htmlFor="slug"
            hint="Becomes prisma.io/extensions/<slug>."
            error={issues.slug}
          >
            <Input
              id="slug"
              value={form.slug}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  slug: event.target.value,
                  slugTouched: true,
                }))
              }
              aria-invalid={Boolean(issues.slug)}
            />
          </Field>
          <Field label="Source repository" htmlFor="repo" error={issues.repo}>
            <Input
              id="repo"
              type="url"
              value={form.repo}
              placeholder="https://github.com/you/prisma-orm-extension-my-thing"
              onChange={(event) => update("repo", event.target.value)}
              aria-invalid={Boolean(issues.repo)}
              required
            />
          </Field>
        </div>
      </Fieldset>

      <Fieldset title="What it is">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <Field label="Status" htmlFor="status" error={issues.status}>
            <select
              id="status"
              className={selectClass}
              value={form.status}
              onChange={(event) => update("status", event.target.value as ExtensionStatus)}
            >
              {EXTENSION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {EXTENSION_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </Field>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Databases</span>
            <div className="flex min-h-9 flex-wrap items-center gap-x-5 gap-y-2">
              {KNOWN_DATABASES.map((database) => (
                <label
                  key={database}
                  className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
                >
                  <Checkbox
                    checked={form.databases.includes(database)}
                    onCheckedChange={(checked) =>
                      update(
                        "databases",
                        checked === true
                          ? [...form.databases, database]
                          : form.databases.filter((item) => item !== database),
                      )
                    }
                  />
                  {getDatabaseLabel(database)}
                </label>
              ))}
            </div>
            <Input
              id="otherDatabases"
              value={form.otherDatabases}
              placeholder="Other, comma separated: cockroachdb, duckdb"
              aria-label="Other databases"
              onChange={(event) => update("otherDatabases", event.target.value)}
            />
            {issues.databases ? (
              <p className="text-xs text-destructive">{issues.databases}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                The databases it works with, or the database it adds to Prisma 8.
              </p>
            )}
          </div>
        </div>
        <Field
          label="One-line summary"
          htmlFor="tldr"
          hint={`${form.tldr.length}/140. Shown on the card and in the docs table.`}
          error={issues.tldr}
        >
          <Input
            id="tldr"
            value={form.tldr}
            maxLength={140}
            placeholder="Typed JSON columns described and enforced by a zod schema."
            onChange={(event) => update("tldr", event.target.value)}
            aria-invalid={Boolean(issues.tldr)}
            required
          />
        </Field>
        <Field
          label="Description"
          htmlFor="description"
          hint={`${form.description.length}/600. One paragraph. Inline \`code\` is fine.`}
          error={issues.description}
        >
          <Textarea
            id="description"
            value={form.description}
            maxLength={600}
            rows={4}
            placeholder="What it adds, how it is declared in the contract, and anything the database needs installed."
            onChange={(event) => update("description", event.target.value)}
            aria-invalid={Boolean(issues.description)}
            required
          />
        </Field>
        <Field
          label="Tags"
          htmlFor="tags"
          hint="Comma separated, up to 6. Used for search."
          error={issues.tags}
        >
          <Input
            id="tags"
            value={form.tags}
            placeholder="json, validation, zod"
            onChange={(event) => update("tags", event.target.value)}
          />
        </Field>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Docs URL (optional)" htmlFor="docs" error={issues.docs}>
            <Input
              id="docs"
              type="url"
              value={form.docs}
              onChange={(event) => update("docs", event.target.value)}
              aria-invalid={Boolean(issues.docs)}
            />
          </Field>
          <Field label="Example URL (optional)" htmlFor="example" error={issues.example}>
            <Input
              id="example"
              type="url"
              value={form.example}
              onChange={(event) => update("example", event.target.value)}
              aria-invalid={Boolean(issues.example)}
            />
          </Field>
        </div>
      </Fieldset>

      <Fieldset title="Who maintains it">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Name or organization" htmlFor="authorName" error={issues.authorName}>
            <Input
              id="authorName"
              value={form.authorName}
              onChange={(event) => update("authorName", event.target.value)}
              aria-invalid={Boolean(issues.authorName)}
              required
            />
          </Field>
          <Field label="Profile URL" htmlFor="authorUrl" error={issues.authorUrl}>
            <Input
              id="authorUrl"
              type="url"
              value={form.authorUrl}
              placeholder="https://github.com/you"
              onChange={(event) => update("authorUrl", event.target.value)}
              aria-invalid={Boolean(issues.authorUrl)}
              required
            />
          </Field>
        </div>
      </Fieldset>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={result.kind === "submitting"}>
          <Github aria-hidden />
          {result.kind === "submitting" ? "Opening pull request…" : "Open a pull request"}
        </Button>
        <p className={cn("text-xs leading-relaxed text-muted-foreground")}>
          This opens a pull request against{" "}
          <a
            href="https://github.com/prisma/web"
            className="font-semibold text-foreground underline underline-offset-4"
            rel="noopener noreferrer"
          >
            prisma/web
          </a>{" "}
          on your behalf. A maintainer reviews it before it goes live.
        </p>
      </div>
    </form>
  );
}
