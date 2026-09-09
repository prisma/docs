/**
 * Pins the contracts the extension directory and its submission flow rely on:
 * the registry loader validates what the site and docs build from, and the
 * submission API writes `community.json` back in exactly the checked-in
 * format, so a submission pull request diffs as one added entry.
 */

import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  communityExtensions,
  extensions,
  officialExtensions,
  validateExtensionEntry,
} from "@prisma-docs/ui/data/extensions";
import {
  assertPublishedOnNpm,
  COMMUNITY_REGISTRY_PATH,
  formatRegistry,
  isTrustedOrigin,
  slugFromPackage,
  SubmissionError,
  submissionSchema,
  toRegistryEntry,
} from "@/lib/extensions/submission";

const REPO_ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const REGISTRY_DIR = path.join(REPO_ROOT, "packages/ui/src/data/extensions");

const validInput = {
  name: "my-thing",
  package: "prisma-orm-extension-my-thing",
  slug: "my-thing",
  status: "release-candidate" as const,
  databases: ["postgresql"],
  tldr: "Adds a thing to PostgreSQL columns.",
  description: "A long enough description of the thing this extension adds to a Prisma 8 project.",
  tags: ["thing"],
  repo: "https://github.com/someone/prisma-orm-extension-my-thing",
  docs: "",
  example: "",
  authorName: "Someone",
  authorUrl: "https://github.com/someone",
  website: "",
};

test("every checked-in registry entry validates and slugs are unique across files", () => {
  for (const entry of [...officialExtensions, ...communityExtensions]) {
    assert.deepEqual(validateExtensionEntry(entry), [], entry.slug);
  }
  assert.equal(new Set(extensions.map((entry) => entry.slug)).size, extensions.length);
});

test("validateExtensionEntry rejects malformed entries", () => {
  const base = communityExtensions[0]!;
  const problem = (patch: Record<string, unknown>) =>
    validateExtensionEntry({ ...base, ...patch }).join("; ");
  assert.match(problem({ slug: "Bad Slug" }), /^slug/);
  assert.match(problem({ package: "Not A Package" }), /^package/);
  assert.match(problem({ repo: "http://insecure.example" }), /^repo/);
  assert.match(problem({ databases: [] }), /^databases/);
  assert.match(problem({ databases: ["postgresql", "postgresql"] }), /repeat/);
  assert.match(problem({ tags: ["json", "json"] }), /repeat/);
  assert.match(problem({ tags: ["Middleware"] }), /lowercase/);
  assert.match(problem({ builtIn: true }), /^importPath is required/);
  assert.deepEqual(problem({ builtIn: true, importPath: "@scope/pkg/runtime" }), "");
  assert.match(problem({ author: { name: "x", url: "ftp://x" } }), /^author/);
  assert.match(problem({ addedAt: "09/09/2026" }), /^addedAt/);
  assert.match(problem({ addedAt: "2026-02-30" }), /^addedAt/);
  assert.match(problem({ addedAt: "2026-13-01" }), /^addedAt/);
  assert.deepEqual(validateExtensionEntry(null), ["entry must be an object"]);
});

test("formatRegistry reproduces both registry files byte for byte", () => {
  for (const file of ["community.json", "official.json"]) {
    const source = readFileSync(path.join(REGISTRY_DIR, file), "utf8");
    assert.equal(formatRegistry(JSON.parse(source)), source, file);
  }
});

test("COMMUNITY_REGISTRY_PATH is the file the registry loads", () => {
  assert.ok(existsSync(path.join(REPO_ROOT, COMMUNITY_REGISTRY_PATH)));
  assert.equal(path.basename(COMMUNITY_REGISTRY_PATH), "community.json");
});

test("toRegistryEntry builds a community entry and drops repeated databases and tags", () => {
  const parsed = submissionSchema.parse({
    ...validInput,
    databases: ["postgresql", "PostgreSQL ", "cockroachdb"],
    tags: ["thing", "Thing ", "other"],
    docs: "   ",
  });
  const entry = toRegistryEntry(parsed, "2026-09-09");
  assert.equal(entry.source, "community");
  assert.deepEqual(entry.databases, ["postgresql", "cockroachdb"]);
  assert.deepEqual(entry.tags, ["thing", "other"]);
  assert.equal(entry.addedAt, "2026-09-09");
  assert.equal("docs" in entry, false);
  assert.equal("example" in entry, false);
  assert.deepEqual(validateExtensionEntry(entry), []);
});

test("submissionSchema rejects what the registry would reject", () => {
  assert.equal(submissionSchema.safeParse({ ...validInput, slug: "Bad Slug" }).success, false);
  assert.equal(submissionSchema.safeParse({ ...validInput, databases: [] }).success, false);
  assert.equal(submissionSchema.safeParse({ ...validInput, repo: "http://x.dev" }).success, false);
  assert.equal(submissionSchema.safeParse({ ...validInput, tldr: "short" }).success, false);
});

test("assertPublishedOnNpm maps upstream failures to SubmissionError statuses", async () => {
  const realFetch = globalThis.fetch;
  const stub = (impl: () => Promise<Response>) => {
    globalThis.fetch = impl as typeof fetch;
  };
  const rejectsWithStatus = (status: number) => (error: unknown) =>
    error instanceof SubmissionError && error.status === status;
  try {
    stub(async () => {
      throw new DOMException("timed out", "TimeoutError");
    });
    await assert.rejects(assertPublishedOnNpm("some-package"), rejectsWithStatus(504));
    stub(async () => {
      throw new TypeError("fetch failed");
    });
    await assert.rejects(assertPublishedOnNpm("some-package"), rejectsWithStatus(502));
    stub(async () => new Response("{}", { status: 404 }));
    await assert.rejects(assertPublishedOnNpm("some-package"), rejectsWithStatus(400));
    stub(async () => new Response("{}", { status: 503 }));
    await assert.rejects(assertPublishedOnNpm("some-package"), rejectsWithStatus(502));
    stub(async () => new Response("{}", { status: 200 }));
    await assertPublishedOnNpm("some-package");
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("slugFromPackage strips scopes and the conventional prefixes", () => {
  assert.equal(slugFromPackage("prisma-orm-extension-typed-json"), "typed-json");
  assert.equal(slugFromPackage("@scope/prisma-orm-extension-foo-bar"), "foo-bar");
  assert.equal(slugFromPackage("orm-extension-x"), "x");
  assert.equal(slugFromPackage("prisma-foo"), "foo");
  assert.equal(slugFromPackage("my.pkg_name"), "my-pkg-name");
});

test("isTrustedOrigin accepts same-host, production, and local origins only", () => {
  const headers = (origin: string | null, host = "www.prisma.io") =>
    new Headers({ ...(origin === null ? {} : { origin }), host });
  assert.equal(isTrustedOrigin(headers("https://www.prisma.io")), true);
  assert.equal(isTrustedOrigin(headers("https://prisma.io")), true);
  assert.equal(isTrustedOrigin(headers("http://localhost:3000", "localhost:3000")), true);
  assert.equal(isTrustedOrigin(headers("http://127.0.0.1:3000", "127.0.0.1:3000")), true);
  assert.equal(
    isTrustedOrigin(headers("https://site-git-branch.vercel.app", "site-git-branch.vercel.app")),
    true,
  );
  assert.equal(
    isTrustedOrigin(
      new Headers({
        origin: "https://site-git-branch.vercel.app",
        host: "internal",
        "x-forwarded-host": "site-git-branch.vercel.app",
      }),
    ),
    true,
  );
  assert.equal(isTrustedOrigin(headers("https://localhost.attacker.example")), false);
  assert.equal(isTrustedOrigin(headers("https://evil.example")), false);
  assert.equal(isTrustedOrigin(headers("https://evil.example", "evil.example")), true);
  assert.equal(isTrustedOrigin(headers(null)), false);
  assert.equal(isTrustedOrigin(headers("not a url")), false);
});
