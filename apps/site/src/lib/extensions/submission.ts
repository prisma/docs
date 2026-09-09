import { z } from "zod";
import {
  EXTENSION_STATUSES,
  extensions,
  validateExtensionEntry,
  type ExtensionEntry,
} from "@prisma-docs/ui/data/extensions";

/** Path of the community registry inside the prisma/web repository. */
export const COMMUNITY_REGISTRY_PATH = "packages/ui/src/data/extensions/community.json";

const httpsUrl = z
  .string()
  .trim()
  .url()
  .refine((value) => value.startsWith("https://"), "Must be an https URL");

const optionalHttpsUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  httpsUrl.optional(),
);

/** Shape of the submission form. Shared by the client form and the API route. */
export const submissionSchema = z.object({
  name: z.string().trim().min(1).max(80),
  package: z
    .string()
    .trim()
    .min(1)
    .max(214)
    .regex(
      /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/,
      "Not a valid npm package name",
    ),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, digits, and dashes only"),
  status: z.enum(EXTENSION_STATUSES),
  databases: z
    .array(
      z
        .string()
        .trim()
        .toLowerCase()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase slug such as postgresql"),
    )
    .min(1, "Name at least one database")
    .max(6),
  tldr: z.string().trim().min(10).max(140),
  description: z.string().trim().min(40).max(600),
  tags: z.array(z.string().trim().min(1).max(32)).max(6),
  repo: httpsUrl,
  docs: optionalHttpsUrl,
  example: optionalHttpsUrl,
  authorName: z.string().trim().min(1).max(80),
  authorUrl: httpsUrl,
  /** Honeypot. Real users never fill it; the route drops anything that does. */
  website: z.string().optional(),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

/** Derive a directory slug from an npm package name. */
export function slugFromPackage(packageName: string): string {
  return packageName
    .toLowerCase()
    .replace(/^@[^/]+\//, "")
    .replace(/^(prisma-)?orm-extension-/, "")
    .replace(/^prisma-/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toRegistryEntry(input: SubmissionInput, addedAt: string): ExtensionEntry {
  const entry: ExtensionEntry = {
    slug: input.slug,
    name: input.name,
    package: input.package,
    source: "community",
    status: input.status,
    tldr: input.tldr,
    description: input.description,
    databases: input.databases,
    tags: input.tags,
    repo: input.repo,
    ...(input.docs ? { docs: input.docs } : {}),
    ...(input.example ? { example: input.example } : {}),
    author: { name: input.authorName, url: input.authorUrl },
    addedAt,
  };
  const problems = validateExtensionEntry(entry);
  if (problems.length > 0) throw new SubmissionError(400, problems.join("; "));
  return entry;
}

export class SubmissionError extends Error {
  constructor(
    public status: number,
    message: string,
    public fallbackUrl?: string,
  ) {
    super(message);
  }
}

/** Reject entries that collide with anything already listed. */
export function assertNotListed(entry: ExtensionEntry, current: ExtensionEntry[]) {
  const all = [...extensions, ...current];
  if (all.some((listed) => listed.slug === entry.slug)) {
    throw new SubmissionError(409, `An extension with the slug "${entry.slug}" is already listed.`);
  }
  if (all.some((listed) => listed.package === entry.package)) {
    throw new SubmissionError(409, `${entry.package} is already listed.`);
  }
}

/** Confirm the package is published before we open a pull request for it. */
export async function assertPublishedOnNpm(packageName: string) {
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`, {
    headers: { accept: "application/json" },
  });
  if (response.status === 404) {
    throw new SubmissionError(400, `${packageName} is not published on npm.`);
  }
  if (!response.ok) {
    throw new SubmissionError(502, "Could not reach the npm registry. Try again in a minute.");
  }
}

/**
 * Print the registry the way the checked-in file is formatted: one entry per
 * block, scalar arrays on one line. Keeps the pull request diff to the added
 * entry only.
 */
export function formatRegistry(entries: ExtensionEntry[]): string {
  const formatted = entries.map((entry) => {
    const lines = Object.entries(entry).map(([key, value]) => {
      const printed = Array.isArray(value)
        ? `[${value.map((item) => JSON.stringify(item)).join(", ")}]`
        : typeof value === "object" && value !== null
          ? `{ ${Object.entries(value)
              .map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`)
              .join(", ")} }`
          : JSON.stringify(value);
      return `    ${JSON.stringify(key)}: ${printed}`;
    });
    return `  {\n${lines.join(",\n")}\n  }`;
  });
  return `[\n${formatted.join(",\n")}\n]\n`;
}

/** A prefilled GitHub issue for when automatic pull requests are unavailable. */
export function buildFallbackIssueUrl(repo: string, entry: ExtensionEntry): string {
  const title = `Extension submission: ${entry.name}`;
  const body = [
    `Please add this extension to \`${COMMUNITY_REGISTRY_PATH}\`.`,
    "",
    "```json",
    JSON.stringify(entry, null, 2),
    "```",
  ].join("\n");
  const params = new URLSearchParams({ title, body, labels: "extensions" });
  return `https://github.com/${repo}/issues/new?${params.toString()}`;
}

type GitHubConfig = { token: string; repo: string; baseBranch: string };

export function getGitHubConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_EXTENSIONS_TOKEN;
  if (!token) return null;
  return {
    token,
    repo: process.env.EXTENSIONS_REPO ?? "prisma/web",
    baseBranch: process.env.EXTENSIONS_BASE_BRANCH ?? "main",
  };
}

async function github<T>(
  config: GitHubConfig,
  path: string,
  init: { method?: string; body?: unknown } = {},
): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    method: init.method ?? "GET",
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${config.token}`,
      "x-github-api-version": "2022-11-28",
      ...(init.body !== undefined ? { "content-type": "application/json" } : {}),
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new SubmissionError(
      502,
      `GitHub returned ${response.status} for ${init.method ?? "GET"} ${path}: ${detail.slice(0, 200)}`,
    );
  }
  return (await response.json()) as T;
}

/** Read the community registry as it is on the base branch right now. */
export async function fetchCurrentRegistry(
  config: GitHubConfig,
): Promise<{ entries: ExtensionEntry[]; sha: string }> {
  const file = await github<{ content: string; sha: string }>(
    config,
    `/repos/${config.repo}/contents/${COMMUNITY_REGISTRY_PATH}?ref=${encodeURIComponent(config.baseBranch)}`,
  );
  const decoded = Buffer.from(file.content, "base64").toString("utf8");
  return { entries: JSON.parse(decoded) as ExtensionEntry[], sha: file.sha };
}

/** Create a branch, commit the updated registry, and open the pull request. */
export async function openPullRequest(
  config: GitHubConfig,
  entry: ExtensionEntry,
  current: { entries: ExtensionEntry[]; sha: string },
): Promise<{ url: string; number: number }> {
  const base = await github<{ object: { sha: string } }>(
    config,
    `/repos/${config.repo}/git/ref/heads/${encodeURIComponent(config.baseBranch)}`,
  );
  const branch = `extensions/add-${entry.slug}-${Date.now().toString(36)}`;
  await github(config, `/repos/${config.repo}/git/refs`, {
    method: "POST",
    body: { ref: `refs/heads/${branch}`, sha: base.object.sha },
  });

  const next = [...current.entries, entry].sort((a, b) => a.name.localeCompare(b.name));
  await github(config, `/repos/${config.repo}/contents/${COMMUNITY_REGISTRY_PATH}`, {
    method: "PUT",
    body: {
      message: `feat(extensions): list ${entry.name}`,
      content: Buffer.from(formatRegistry(next), "utf8").toString("base64"),
      sha: current.sha,
      branch,
    },
  });

  const body = [
    `Adds **${entry.name}** (\`${entry.package}\`) to the community extension directory.`,
    "",
    `- Databases: ${entry.databases.join(", ")}`,
    `- Status: ${entry.status}`,
    `- Source: ${entry.repo}`,
    entry.docs ? `- Docs: ${entry.docs}` : null,
    entry.example ? `- Example: ${entry.example}` : null,
    `- Author: [${entry.author.name}](${entry.author.url})`,
    "",
    `> ${entry.tldr}`,
    "",
    entry.description,
    "",
    "---",
    "",
    "Submitted through the form at https://www.prisma.io/extensions/submit. The entry passed",
    "schema validation and the package resolves on npm. Reviewers: confirm the package targets",
    "Prisma 8, skim its README, then merge. The docs catalog table regenerates on merge.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const pull = await github<{ html_url: string; number: number }>(
    config,
    `/repos/${config.repo}/pulls`,
    {
      method: "POST",
      body: {
        title: `feat(extensions): list ${entry.name}`,
        head: branch,
        base: config.baseBranch,
        body,
        maintainer_can_modify: true,
      },
    },
  );

  // Labels are best effort: a missing label must not fail the submission.
  await github(config, `/repos/${config.repo}/issues/${pull.number}/labels`, {
    method: "POST",
    body: { labels: ["extensions"] },
  }).catch(() => undefined);

  return { url: pull.html_url, number: pull.number };
}
