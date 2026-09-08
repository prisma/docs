/**
 * The production origin guard in next.config.mjs must stay strict for builds
 * and servers while letting `next typegen` (and therefore `pnpm types:check`)
 * run on a fresh clone with no env vars set.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertOriginsConfigured,
  isTypeOnlyRun,
  missingOriginMessages,
  nextCommandFromArgv,
} from "./require-origins.mjs";

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const bothOrigins = {
  NODE_ENV: "production",
  NEXT_DOCS_ORIGIN: "https://docs.prisma.io",
  NEXT_BLOG_ORIGIN: "https://blog.prisma.io",
};

const buildArgv = ["/usr/bin/node", "/repo/apps/site/node_modules/next/dist/bin/next", "build"];
const typegenArgv = ["/usr/bin/node", "/repo/apps/site/node_modules/next/dist/bin/next", "typegen"];
const startArgv = ["/usr/bin/node", "/repo/apps/site/node_modules/next/dist/bin/next", "start"];

test("nextCommandFromArgv reads the subcommand, skipping flags", () => {
  assert.equal(nextCommandFromArgv(buildArgv), "build");
  assert.equal(nextCommandFromArgv([...typegenArgv.slice(0, 2), "--turbopack", "typegen"]), "typegen");
  assert.equal(nextCommandFromArgv(buildArgv.slice(0, 2)), undefined);
});

test("only typegen counts as a type-only run", () => {
  assert.equal(isTypeOnlyRun(typegenArgv), true);
  assert.equal(isTypeOnlyRun(buildArgv), false);
  assert.equal(isTypeOnlyRun(startArgv), false);
  // A build's jest-worker children re-load the config with an argv that has no
  // Next.js subcommand at all; they must not be treated as typegen.
  assert.equal(isTypeOnlyRun(["/usr/bin/node", "/repo/node_modules/next/dist/compiled/jest-worker/threadChild.js"]), false);
});

test("missingOriginMessages names each unset origin", () => {
  assert.deepEqual(missingOriginMessages({}), [
    "DOCS_ORIGIN is required in production",
    "BLOG_ORIGIN is required in production",
  ]);
  assert.deepEqual(missingOriginMessages({ NEXT_DOCS_ORIGIN: "https://docs.prisma.io" }), [
    "BLOG_ORIGIN is required in production",
  ]);
  assert.deepEqual(missingOriginMessages(bothOrigins), []);
});

test("a production build without origins still throws", () => {
  assert.throws(
    () => assertOriginsConfigured({ env: { NODE_ENV: "production" }, argv: buildArgv }),
    /DOCS_ORIGIN is required in production; BLOG_ORIGIN is required in production/,
  );
  assert.throws(
    () =>
      assertOriginsConfigured({
        env: { NODE_ENV: "production", NEXT_DOCS_ORIGIN: "https://docs.prisma.io" },
        argv: buildArgv,
      }),
    /^Error: BLOG_ORIGIN is required in production$/,
  );
});

test("a production server without origins still throws", () => {
  assert.throws(
    () => assertOriginsConfigured({ env: { NODE_ENV: "production" }, argv: startArgv }),
    /DOCS_ORIGIN is required in production/,
  );
});

test("typegen runs without origins, in production mode", () => {
  assert.doesNotThrow(() =>
    assertOriginsConfigured({ env: { NODE_ENV: "production" }, argv: typegenArgv }),
  );
});

test("a production build with both origins passes", () => {
  assert.doesNotThrow(() => assertOriginsConfigured({ env: bothOrigins, argv: buildArgv }));
});

test("development never requires the origins", () => {
  assert.doesNotThrow(() =>
    assertOriginsConfigured({ env: { NODE_ENV: "development" }, argv: buildArgv }),
  );
  assert.doesNotThrow(() => assertOriginsConfigured({ env: {}, argv: buildArgv }));
});

test("next.config.mjs delegates the guard instead of inlining it", () => {
  const config = readFileSync(path.join(appDir, "next.config.mjs"), "utf8");
  assert.match(config, /assertOriginsConfigured\(\)/);
  assert.doesNotMatch(
    config,
    /throw new Error\(/,
    "next.config.mjs should not re-introduce an inline origin throw",
  );
});
