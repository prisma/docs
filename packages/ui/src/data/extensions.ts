/**
 * Prisma 8 extension directory registry.
 *
 * Two JSON files back the directory at prisma.io/extensions and the catalog
 * in the docs. `official.json` lists packages maintained by Prisma;
 * `community.json` lists packages maintained by everyone else and is the file
 * the submission form appends to. See ./extensions/README.md for the entry
 * shape and the submission flow.
 */
import communityEntries from "./extensions/community.json";
import officialEntries from "./extensions/official.json";

export const EXTENSION_KINDS = ["extension", "middleware"] as const;
export const EXTENSION_SOURCES = ["official", "community"] as const;
export const EXTENSION_DATABASES = ["postgresql", "mongodb"] as const;
export const EXTENSION_STATUSES = ["stable", "release-candidate", "experimental"] as const;

export type ExtensionKind = (typeof EXTENSION_KINDS)[number];
export type ExtensionSource = (typeof EXTENSION_SOURCES)[number];
export type ExtensionDatabase = (typeof EXTENSION_DATABASES)[number];
export type ExtensionStatus = (typeof EXTENSION_STATUSES)[number];

export type ExtensionEntry = {
  /** URL segment on prisma.io/extensions/<slug>. Lowercase letters, digits, and dashes. */
  slug: string;
  /** Display name. */
  name: string;
  /** npm package name. */
  package: string;
  /** Import specifier when it differs from the package name (built-in middleware). */
  importPath?: string;
  kind: ExtensionKind;
  source: ExtensionSource;
  status: ExtensionStatus;
  /** True when the code ships inside a database package and needs no extra install. */
  builtIn?: boolean;
  /** One sentence, shown on cards and in the docs table. */
  tldr: string;
  /** One short paragraph, shown on the detail page. Inline code allowed. */
  description: string;
  databases: ExtensionDatabase[];
  tags: string[];
  /** Source repository URL. */
  repo: string;
  /** Documentation URL, if any. */
  docs?: string;
  /** Runnable example URL, if any. */
  example?: string;
  author: { name: string; url: string };
  /** ISO date (YYYY-MM-DD) the entry was added to the registry. */
  addedAt: string;
};

export const EXTENSION_KIND_LABELS: Record<ExtensionKind, string> = {
  extension: "Extension",
  middleware: "Middleware",
};

export const EXTENSION_SOURCE_LABELS: Record<ExtensionSource, string> = {
  official: "By Prisma",
  community: "Community",
};

export const EXTENSION_DATABASE_LABELS: Record<ExtensionDatabase, string> = {
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
};

export const EXTENSION_STATUS_LABELS: Record<ExtensionStatus, string> = {
  stable: "Stable",
  "release-candidate": "Release candidate",
  experimental: "Experimental",
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const NPM_PACKAGE_PATTERN = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isNonEmptyString(value: unknown, max = 500): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

function isOneOf<T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return typeof value === "string" && (values as readonly string[]).includes(value);
}

/**
 * Validate one registry entry. Returns a list of problems; an empty list means
 * the entry is valid. Used at module load (so a bad JSON edit fails the build)
 * and by the submission API before it opens a pull request.
 */
export function validateExtensionEntry(input: unknown): string[] {
  const problems: string[] = [];
  if (typeof input !== "object" || input === null) return ["entry must be an object"];
  const entry = input as Record<string, unknown>;

  if (!isNonEmptyString(entry.slug, 64) || !SLUG_PATTERN.test(entry.slug)) {
    problems.push("slug must be lowercase letters, digits, and dashes");
  }
  if (!isNonEmptyString(entry.name, 80)) problems.push("name is required (max 80 characters)");
  if (!isNonEmptyString(entry.package, 214) || !NPM_PACKAGE_PATTERN.test(entry.package)) {
    problems.push("package must be a valid npm package name");
  }
  if (entry.importPath !== undefined && !isNonEmptyString(entry.importPath, 214)) {
    problems.push("importPath must be a non-empty string when set");
  }
  if (!isOneOf(EXTENSION_KINDS, entry.kind)) {
    problems.push(`kind must be one of ${EXTENSION_KINDS.join(", ")}`);
  }
  if (!isOneOf(EXTENSION_SOURCES, entry.source)) {
    problems.push(`source must be one of ${EXTENSION_SOURCES.join(", ")}`);
  }
  if (!isOneOf(EXTENSION_STATUSES, entry.status)) {
    problems.push(`status must be one of ${EXTENSION_STATUSES.join(", ")}`);
  }
  if (entry.builtIn !== undefined && typeof entry.builtIn !== "boolean") {
    problems.push("builtIn must be a boolean when set");
  }
  if (!isNonEmptyString(entry.tldr, 140)) problems.push("tldr is required (max 140 characters)");
  if (!isNonEmptyString(entry.description, 600)) {
    problems.push("description is required (max 600 characters)");
  }
  if (
    !Array.isArray(entry.databases) ||
    entry.databases.length === 0 ||
    !entry.databases.every((database) => isOneOf(EXTENSION_DATABASES, database))
  ) {
    problems.push(`databases must list at least one of ${EXTENSION_DATABASES.join(", ")}`);
  }
  if (
    !Array.isArray(entry.tags) ||
    entry.tags.length > 6 ||
    !entry.tags.every((tag) => isNonEmptyString(tag, 32))
  ) {
    problems.push("tags must be an array of up to 6 short strings");
  }
  if (!isHttpsUrl(entry.repo)) problems.push("repo must be an https URL");
  if (entry.docs !== undefined && !isHttpsUrl(entry.docs)) {
    problems.push("docs must be an https URL when set");
  }
  if (entry.example !== undefined && !isHttpsUrl(entry.example)) {
    problems.push("example must be an https URL when set");
  }
  const author = entry.author as Record<string, unknown> | undefined;
  if (
    typeof author !== "object" ||
    author === null ||
    !isNonEmptyString(author.name, 80) ||
    !isHttpsUrl(author.url)
  ) {
    problems.push("author must have a name and an https url");
  }
  if (!isNonEmptyString(entry.addedAt, 10) || !ISO_DATE_PATTERN.test(entry.addedAt)) {
    problems.push("addedAt must be an ISO date (YYYY-MM-DD)");
  }
  return problems;
}

function loadRegistry(entries: unknown[], file: string): ExtensionEntry[] {
  const seen = new Set<string>();
  return entries.map((entry, index) => {
    const problems = validateExtensionEntry(entry);
    if (problems.length > 0) {
      throw new Error(`Invalid extension entry #${index + 1} in ${file}: ${problems.join("; ")}`);
    }
    const valid = entry as ExtensionEntry;
    if (seen.has(valid.slug)) {
      throw new Error(`Duplicate extension slug "${valid.slug}" in ${file}`);
    }
    seen.add(valid.slug);
    return valid;
  });
}

export const officialExtensions: ExtensionEntry[] = loadRegistry(officialEntries, "official.json");
export const communityExtensions: ExtensionEntry[] = loadRegistry(
  communityEntries,
  "community.json",
);

/** Every registry entry, official first, each group sorted by name. */
export const extensions: ExtensionEntry[] = [
  ...[...officialExtensions].sort((a, b) => a.name.localeCompare(b.name)),
  ...[...communityExtensions].sort((a, b) => a.name.localeCompare(b.name)),
];

for (const entry of communityExtensions) {
  if (officialExtensions.some((official) => official.slug === entry.slug)) {
    throw new Error(
      `Extension slug "${entry.slug}" exists in both official.json and community.json`,
    );
  }
}

export function getExtensionBySlug(slug: string): ExtensionEntry | undefined {
  return extensions.find((entry) => entry.slug === slug);
}

/** The shell command that adds the package to a project. */
export function getInstallCommand(entry: ExtensionEntry): string {
  return `npm install ${entry.package}`;
}

export function getNpmUrl(entry: ExtensionEntry): string {
  return `https://www.npmjs.com/package/${entry.package}`;
}

/** Absolute URL of the entry's page in the directory. */
export function getExtensionDirectoryUrl(entry: ExtensionEntry): string {
  return `https://www.prisma.io/extensions/${entry.slug}`;
}
