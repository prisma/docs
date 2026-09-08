/**
 * The site app proxies /docs and /blog to the docs and blog deployments, so a
 * production deployment that does not know those origins would silently serve
 * the wrong thing. `next.config.mjs` therefore refuses to load in production
 * unless NEXT_DOCS_ORIGIN and NEXT_BLOG_ORIGIN are set.
 *
 * The one production-mode command that must not be blocked by that guard is
 * `next typegen`, which `pnpm types:check` runs. It loads `next.config.mjs`
 * with NODE_ENV=production and the same PHASE_PRODUCTION_BUILD phase a real
 * build uses, and it never sets NEXT_PHASE before importing the config — so
 * neither NODE_ENV, nor the phase argument of the config function, nor
 * process.env.NEXT_PHASE can tell typegen apart from a build. The CLI
 * subcommand in process.argv can, and it is the only thing that can, so that
 * is what this module reads.
 *
 * The guard is skipped for typegen only. `next build` and `next start` still
 * throw exactly as before when either origin is missing.
 */

/** Env vars that must be set for a production build or a production server. */
const REQUIRED_ORIGINS = [
  { env: "NEXT_DOCS_ORIGIN", message: "DOCS_ORIGIN is required in production" },
  { env: "NEXT_BLOG_ORIGIN", message: "BLOG_ORIGIN is required in production" },
];

/**
 * Next.js CLI subcommands that only inspect the project — they neither build
 * output nor serve traffic — and so do not need the proxy origins.
 */
const TYPE_ONLY_COMMANDS = new Set(["typegen"]);

/**
 * The Next.js CLI subcommand of a `next <command>` invocation, or `undefined`
 * when the process is not one (a jest-worker child during a build, a test
 * runner, a script importing the config directly). Flags are skipped so that
 * `next --turbopack typegen` is read the same as `next typegen`.
 *
 * @param {readonly string[]} argv
 * @returns {string | undefined}
 */
export function nextCommandFromArgv(argv) {
  // argv[0] is the node binary and argv[1] the script being run.
  return argv.slice(2).find((arg) => !arg.startsWith("-"));
}

/**
 * True when this process only generates or checks types and therefore does not
 * need the proxy origins configured.
 *
 * @param {readonly string[]} argv
 * @returns {boolean}
 */
export function isTypeOnlyRun(argv) {
  const command = nextCommandFromArgv(argv);
  return command !== undefined && TYPE_ONLY_COMMANDS.has(command);
}

/**
 * The origin env vars that are missing, as human-readable messages.
 *
 * @param {Record<string, string | undefined>} env
 * @returns {string[]}
 */
export function missingOriginMessages(env) {
  return REQUIRED_ORIGINS.filter(({ env: name }) => !env[name]).map(({ message }) => message);
}

/**
 * Throws when a production build or a production server is missing an origin.
 *
 * @param {{ env?: Record<string, string | undefined>, argv?: readonly string[] }} [options]
 */
export function assertOriginsConfigured({ env = process.env, argv = process.argv } = {}) {
  if (env.NODE_ENV !== "production") return;
  if (isTypeOnlyRun(argv)) return;

  const missing = missingOriginMessages(env);
  if (missing.length > 0) {
    throw new Error(missing.join("; "));
  }
}
