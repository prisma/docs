# PPG Connection-Limits Investigation — prisma/web

**Repo investigated:** `prisma/web` (branch `main`), checked out at `/home/user/workspace`.
**Scope:** Determine, from this repository only, where the pricing-page "1000 connections pooled / 100 direct" numbers live, what product/endpoint they claim to describe, and whether they conflict with other content in the same repo.
**Method:** ripgrep-style content search via the repo's grep tool + targeted file reads. No other repos were cloned. No site content was modified.
**Date:** 2026-09-08

---

## 1. Executive summary

The "1000 connections pooled / 100 direct" numbers are the **Business-plan column** of the "Compare plans" spec table on `/pricing`. They live in **one rendered source** — `apps/site/src/components/sections/pricing-spec-table.tsx` (lines 149–157) — under a group literally labeled **"Managed connection pool"**, plus a **dead, un-imported duplicate** in `apps/site/src/lib/pricing-data.ts` (lines 300–303). The **"100 direct"** value is consistent with the rest of the web repo: it matches the PPG TCP direct-connection limits in `apps/docs/content/docs/postgres/database/connection-pooling.mdx` (line 16: 10/10/50/100) exactly. The **"1000 pooled"** value is **not** consistent: that same docs page (line 15) lists Business pooled connections as **500**, not 1000, and the mismatch spans every tier (pricing pooled 10/100/500/1000 vs docs pooled 50/50/250/500). Because the spec-table group's own "direct" row matches the PPG TCP docs exactly, the group is most defensibly read as describing **PPG TCP connection limits (pooled via PgBouncer + direct)** — not Prisma Accelerate — which makes the "1000 pooled" figure look mislabeled/stale relative to the docs. There is **no web-repo evidence that 1000 is an Accelerate number**; Accelerate's only documented connection limit is a per-connection-string `connection_limit` parameter defaulting to 10 (`accelerate/more/troubleshoot.mdx` line 55), and Accelerate's connection-pooling doc redirects to the PPG page. The actual enforced numeric limits and the mechanics of raising them live in `prisma/pdp-control-plane` and `prisma/pdp-cloudflare`, which are **not** in this working copy.

---

## 2. Source of the pricing-page numbers

### 2a. The rendered source (what actually appears on https://www.prisma.io/pricing)

**File:** `apps/site/src/components/sections/pricing-spec-table.tsx`

The spec table is rendered by `<PricingSpecTable />` at `apps/site/src/app/pricing/page.tsx:47`. Its data is a hardcoded `GROUPS` array; the connection limits sit in the third group:

- Line 149 — group label:
  ```ts
      label: "Managed connection pool",
  ```
- Lines 153–156 — pooled row:
  ```ts
          {
            label: "Connection limit (pooled)",
            values: ["10", "100", "500", "1,000"],
          },
  ```
- Line 157 — direct row:
  ```ts
        { label: "Connection limit (direct)", values: ["10", "10", "50", "100"] },
  ```

Column order is defined at line 261:
```ts
const PLAN_NAMES = ["Free", "Starter", "Pro", "Business"];
```
So the four values map to **Free / Starter / Pro / Business**. The **Business** (4th) column is **"1,000" pooled** and **"100" direct** — i.e. the exact "1000 connections pooled / 100 direct" the customer saw.

There is **no footnote, asterisk, tooltip, or disclaimer** attached to either row. The group header renders as a plain `<th>` with an icon + the label "Managed connection pool" (`pricing-spec-table.tsx` lines 484–493). The only asterisks on the pricing page are on the **operations** bullets in the plan cards (`apps/site/src/lib/pricing-data.ts` lines 116/122/133/…), not on connection limits.

### 2b. A duplicate copy that does NOT render (dead code, but evidence of the same numbers)

**File:** `apps/site/src/lib/pricing-data.ts`

- Line 300 — section title:
  ```ts
      title: "Managed Connection Pool",
  ```
- Lines 302–303 — the rows:
  ```ts
        ["Connection limit (direct)", "10", "10", "50", "100"],
        ["Connection limit (pooled)", "10", "100", "500", "1000"],
  ```

This is part of the exported `comparisonSections` array (defined at line 295). A repo-wide search for `comparisonSections` returns **only** this definition line — it is **never imported or referenced** anywhere else (no consumer in `apps/site/src`). The rendered page therefore uses `pricing-spec-table.tsx`'s inline `GROUPS`, not this array. It is stale-by-design duplicate data, but it confirms the same 10/100/500/1000 pooled and 10/10/50/100 direct figures exist in two places in the codebase.

### 2c. Developer comment confirming the pooled figures are intentional

**File:** `apps/site/src/components/sections/pricing-comparison.tsx`

- Lines 16–17:
  ```ts
  // V2 copy verbatim, with "No connection limits" removed — Gregory confirmed
  // pooled limits do exist (10/100/500/1000).
  ```
This documents that the pooled series 10/100/500/1000 (Free→Business) is a deliberate, engineer-confirmed value, and that an earlier "No connection limits" claim was removed because pooled limits do exist.

### 2d. Plan/tier and per-tenant/project/instance labeling

- **Plan/tier:** Business (4th column of the spec table).
- **Plan cards themselves do NOT mention connection limits.** The Business card in `apps/site/src/components/sections/pricing-plans.tsx` (lines 94–114) lists only operations, storage, databases, and backup retention under "Prisma Postgres". The 1000/100 numbers appear **only** in the lower "Compare plans" spec table, not on the cards.
- **Per-tenant / per-project / per-instance labeling:** The pricing page does **not** label these limits per-tenant, per-project, or per-instance. The spec table is organized **per plan**. The canonical docs page labels them "**concurrent connection limits per plan**" (`apps/docs/content/docs/postgres/database/connection-pooling.mdx:18`). So in the web repo's own words, the unit is **per plan** (which in practice maps to a tenant/workspace's plan).

---

## 3. What product the numbers claim to describe

The group is labeled **"Managed connection pool"**, which is **ambiguous** in isolation — "managed connection pool" is phrasing the site also uses for **Prisma Accelerate** (e.g. `apps/docs/content/docs/accelerate/compare.mdx:11` — "The managed connection pool is designed for serverless infrastructure…"; `apps/docs/content/docs/accelerate/index.mdx:19` — "Prisma Accelerate is a managed connection pool and global cache for your database."). So the label alone could be read as Accelerate.

However, the **surrounding rows and the rest of the repo** point strongly to **PPG TCP connection limits (pooled via PgBouncer + direct)**, not Accelerate:

1. **The "direct" row matches PPG TCP docs exactly.** `apps/docs/content/docs/postgres/database/connection-pooling.mdx:16` lists Direct connections as `10 / 10 / 50 / 100` (Free/Starter/Pro/Business) — identical to `pricing-spec-table.tsx:157`. Accelerate is an HTTP/data-proxy path and does not expose a "direct" TCP connection limit in this codebase; the only Accelerate connection limit documented anywhere is a per-connection-string `connection_limit` parameter defaulting to 10 (`apps/docs/content/docs/accelerate/more/troubleshoot.mdx:55`). The presence of a "Connection limit (direct)" row that exactly tracks PPG's documented direct TCP limits is the strongest signal that the whole group is intended to describe PPG TCP.

2. **The docs page that defines these limits is unambiguously PPG TCP.** `connection-pooling.mdx` describes "a tenant-isolated PgBouncer instance running in transactional pool mode" (line 9), the flow `Application → Connection Proxy → PgBouncer (per tenant, transactional mode) → Database` (line 25), the pooled hostname `pooled.db.prisma.io` (lines 28, 37) and the direct hostname `db.prisma.io` (lines 39, 63). That is the PPG TCP path (pooled + direct), not Accelerate's `prisma+postgres://accelerate.prisma-data.net` HTTP path.

3. **That docs page explicitly defers plan comparison to the pricing page** — `connection-pooling.mdx:20`: "Compare plans on the [Prisma pricing page](https://www.prisma.io/pricing)." — which only makes sense if the two pages are meant to describe the **same** limits. They share the direct figures; they diverge on pooled (see §4).

4. **Accelerate's connection-pooling doc redirects to the PPG page.** `apps/docs/content/docs/accelerate/connection-pooling.mdx:11`: "This page has moved, connection pooling in Prisma Accelerate is now documented in the Prisma Postgres section (/postgres/database/connection-pooling)." So the PPG table is the canonical "connection pooling" reference for both products on the site.

5. **The pricing page's own Accelerate group does not list connection limits.** The "Accelerate (global cache)" group in `pricing-spec-table.tsx` (lines 180–217) lists operations, egress, cache-tag invalidations, and cache purge requests — **no** connection-limit row. So the "Connection limit (pooled/direct)" rows are not part of the Accelerate group on the pricing page.

6. **The architecture doc separates the two paths cleanly.** `apps/docs/content/docs/postgres/database/switch-from-accelerate.mdx` distinguishes the hosted Accelerate URL `prisma+postgres://accelerate.prisma-data.net` (line 24, being retired 2026-12-01 per line 11) from the PPG replacement paths: **Pooled TCP** (`pooled.db.prisma.io`, line 70), **Direct TCP** (`db.prisma.io`, line 73), and the **serverless driver** (HTTP/WebSockets, line 50/55). Line 15 states "Both replacement paths retain Prisma Postgres connection pooling. Neither path retains Accelerate query caching." — confirming "Prisma Postgres connection pooling" (PgBouncer) and "Accelerate" are distinct.

**Reasoned conclusion (with explicit ambiguity):** The most defensible reading of the pricing-page group is that **"Managed connection pool" is intended to describe PPG TCP connection limits — pooled (via PgBouncer, `pooled.db.prisma.io`) and direct (`db.prisma.io`)**, because (a) its "direct" row matches the PPG TCP direct limits exactly, (b) the canonical docs page that defines these numbers is the PPG PgBouncer page, and (c) Accelerate has no per-plan connection cap anywhere in the repo. The label "Managed connection pool" is nonetheless **Accelerate-flavored wording**, which is the root of the ambiguity the engineers suspected. If the "1000 pooled" figure was actually meant to be an Accelerate-side number, it is **sitting under the wrong label and next to a PPG-direct row** — i.e. mislabeled. If it was meant to be the PPG pooled limit, it **conflicts with the docs** (§4). Either way the figure is problematic; the web repo does not contain a clean, unambiguous source that says "1000 is the Accelerate pooled limit" or "1000 is the PPG pooled limit."

---

## 4. All other connection-limit mentions in the web repo

| # | File:line | Verbatim quote | Verdict vs pricing (Business 1000 pooled / 100 direct) |
|---|-----------|----------------|--------------------------------------------------------|
| 1 | `apps/docs/content/docs/postgres/database/connection-pooling.mdx:15` | `\| **Pooled connections** \| 50   \| 50      \| 250  \| 500      \|` | **CONFLICTS.** Business pooled = 500 here vs 1,000 on pricing. Mismatch on every tier: docs 50/50/250/500 vs pricing 10/100/500/1000. (Pricing is ~2× docs on Starter/Pro/Business.) |
| 2 | `apps/docs/content/docs/postgres/database/connection-pooling.mdx:16` | `\| **Direct connections** \| 10   \| 10      \| 50   \| 100      \|` | **AGREES.** Business direct = 100, matches pricing exactly across all tiers (10/10/50/100). |
| 3 | `apps/docs/content/docs/postgres/database/connection-pooling.mdx:18` | `These are concurrent connection limits per plan. 5 direct connections are reserved for platform operations (maintenance, monitoring) and are not available to your workload.` | **Context.** Defines the unit as "per plan" and notes 5 direct conns are reserved — consistent with the direct row; says nothing that resolves the pooled 500-vs-1000 gap. |
| 4 | `apps/docs/content/docs/postgres/database/connection-pooling.mdx:20` | `Idle pooled connections are closed after 60 minutes. Compare plans on the [Prisma pricing page](https://www.prisma.io/pricing).` | **Conflict signal.** The docs page links to /pricing for plan comparison, implying the two should agree — they don't (row #1). Also note pricing's 60-minute idle timeout (`pricing-spec-table.tsx:159`) matches this. |
| 5 | `apps/docs/content/docs/postgres/database/connection-pooling.mdx:59` | `3. **Using the direct hostname for application traffic.** Direct connection limits are much lower (10–100 depending on plan). Switch application traffic to \`pooled.db.prisma.io\`.` | **AGREES (range).** "10–100 depending on plan" matches the direct series 10/10/50/100. Refers to PPG TCP direct (`db.prisma.io`). |
| 6 | `apps/docs/content/docs/postgres/database/connecting-to-your-database.mdx:39` | `\| Host       | \`pooled.db.prisma.io\` (pooled) or \`db.prisma.io\` (direct) |` | **Context.** Confirms PPG TCP hostnames; consistent with reading the pricing group as PPG TCP. |
| 7 | `apps/docs/content/docs/postgres/database/connecting-to-your-database.mdx:90` | `...each warm invocation creates a new client and a new connection, which can exhaust your plan's pooled connection limit.` | **Consistent with docs table; conflicts with pricing pooled.** Refers to the PPG pooled limit (same concept as rows #1–#2). |
| 8 | `apps/docs/content/docs/accelerate/more/troubleshoot.mdx:55` | `By default, the connection limit is set to 10 unless a different \`connection_limit\` is specified in your database connection string.` | **UNRELATED / does not match pricing.** This is Accelerate's per-connection-string `connection_limit` parameter (default 10), a different mechanism from a per-plan 1000 cap. No Accelerate per-plan cap exists in the repo. |
| 9 | `apps/docs/content/docs/accelerate/connection-pooling.mdx:11` | `This page has moved, connection pooling in Prisma Accelerate is now documented in the Prisma Postgres section (/postgres/database/connection-pooling).` | **Reinforces PPG table as canonical.** Accelerate's pooling doc redirects to the PPG page (rows #1–#2), so the 500-pooled figure is the site's canonical pooled number. |
| 10 | `apps/site/src/components/sections/pricing-spec-table.tsx:149-157` | (the pricing source itself — see §2a) | **Source.** Business 1,000 pooled / 100 direct. |
| 11 | `apps/site/src/lib/pricing-data.ts:300-303` | (dead duplicate — see §2b) | **AGREES with pricing** (same numbers, 1000 pooled / 100 direct for Business) — but does not render. |
| 12 | `apps/site/src/components/sections/pricing-comparison.tsx:16-17` | `// V2 copy verbatim, with "No connection limits" removed — Gregory confirmed // pooled limits do exist (10/100/500/1000).` | **AGREES with pricing pooled** — developer comment enshrining 10/100/500/1000 as the pooled series. |
| 13 | `apps/site/src/app/llms-content.ts:195-224` | (Pricing section of the LLM/agent-readable surface lists operations, storage, databases, backups, Compute meters, support, compliance — but **no connection-limit numbers**.) | **Gap, not a conflict.** The agent-ready surface omits connection limits entirely; the 1000/100 numbers exist only in the rendered spec-table HTML and source, not in the llms.txt feed. An AI agent answering from llms.txt alone would not see them. |
| 14 | `apps/docs/content/docs/orm/v7/prisma-client/setup-and-configuration/databases-connections/connection-pool.mdx:85` (and v6 twin, plus `mysql.mdx`/`quickstart` examples) | `\| connectionLimit \| 10 \|` style rows; `connectionLimit: 5` examples | **UNRELATED.** This is the **Prisma ORM client** `connectionLimit` datasource field (local client pool size), not a PPG plan cap. Not comparable. |

**Summary of consistency:** Direct = 100 is consistent everywhere. Pooled = 1000 is **contradicted** by the only other connection-limits table in the repo (`connection-pooling.mdx`, which says 500 for Business and is explicitly about PPG TCP via PgBouncer). No location in the repo corroborates a Business pooled value of 1000; the only places that print 1000 are the two copies of the pricing spec-table data (one rendered, one dead) and the developer comment that enshrines 10/100/500/1000.

---

## 5. Assessment: are the pricing-page numbers wrong?

**Based only on web-repo evidence, the "100 direct" figure is consistent and the "1000 pooled" figure is inconsistent / likely wrong or mislabeled.**

**"100 direct" — consistent.** It matches the PPG TCP direct-connection limit for Business in `connection-pooling.mdx:16` (10/10/50/100) and the prose at `connection-pooling.mdx:59` ("10–100 depending on plan"). There is no contradicting source. This figure is almost certainly the PPG direct TCP (`db.prisma.io`) limit.

**"1000 pooled" — inconsistent.** The single other connection-limits table in the web repo — `apps/docs/content/docs/postgres/database/connection-pooling.mdx:15` — lists Business pooled as **500**, not 1000, and that page is unambiguously about PPG TCP via PgBouncer (`pooled.db.prisma.io`). That page also links to `/pricing` for plan comparison (line 20), so the two are intended to agree. The pricing pooled series (10/100/500/1000) is exactly **2×** the docs pooled series (50/50/250/500) on Starter/Pro/Business, which looks like one set is stale or one was doubled relative to the other. The pricing figure is **not corroborated anywhere except the pricing component itself** (and its dead duplicate, and a developer comment restating the same series).

**Is it mislabeled (Accelerate vs PPG)?** The evidence is consistent with **mislabeling or a stale figure**, but the web repo alone cannot fully disambiguate which:
- If "Managed connection pool" was *intended* to mean PPG TCP (the reading supported by the matching "direct" row and the canonical PPG pooling doc), then "1000 pooled" is **wrong** versus the docs' 500 and should be reconciled.
- If "1000 pooled" was *intended* to be an Accelerate-side number, then it is **mislabeled**: it sits in a group whose "direct" row tracks PPG TCP direct exactly, next to no Accelerate connection-limit is documented anywhere else in the repo, and Accelerate's only documented connection limit is a per-string `connection_limit` parameter (default 10). Putting an Accelerate number in a group that also carries a PPG-direct row would be the kind of cross-product confusion the engineers suspected.

**Honest bottom line for support/on-call:** The web repo shows an **internal inconsistency** on the pooled figure (pricing 1000 vs docs 500 for Business) and an **ambiguous label** ("Managed connection pool" is Accelerate wording, but the group's contents match PPG TCP). The repo **cannot** tell you which number the control plane actually enforces — that requires `prisma/pdp-control-plane` / `prisma/pdp-cloudflare` (see §6). Until then, treat the **docs' 500 pooled / 100 direct** as the PPG TCP numbers the docs team intends to publish, and the **pricing 1000 pooled** as an unverified figure that needs reconciliation with the control plane and with the docs.

---

## 6. Out of scope / requires other repos

The following could **not** be verified from `prisma/web` and must be resolved in other repositories:

**(a) Actual enforced numeric limits per connection path.** The limits the control plane enforces for the PPG TCP direct path (`db.prisma.io:5432`), the PPG pooled TCP path (`pooled.db.prisma.io:5432` via PgBouncer), the Accelerate HTTP/data-proxy path (`prisma+postgres://accelerate.prisma-data.net`), and the serverless/proxy API are defined in **`prisma/pdp-control-plane`** (control-plane code) and **`prisma/pdp-cloudflare`** (serverless/proxy path). Neither repository is present in this working copy, and per the task constraints they were not cloned. So the question "does the control plane enforce 1000 or 500 for Business pooled?" cannot be answered here.

**(b) Mechanics of raising a specific tenant's limits.** The knobs `connectionLimit` (pooled/proxy side), `connectionLimitDirect` (direct TCP), and `maxConnections` (Postgres instance), and the tenant-manager admin command `configurePpgLimits({ tenantId, connectionLimit, connectionLimitDirect, maxConnections, ... })` — including validation caps, allowed roles, `maxConnections` headroom, and any degraded/emergency-mode throttling — **could not be verified in this repo**. A repo-wide search of `prisma/web` found **zero** references to `configurePpgLimits`, `connectionLimitDirect`, `maxConnections`, `tenant-manager`, `pdp-control-plane`, or `pdp-cloudflare`. The only `connectionLimit` hits in the repo are the unrelated **Prisma ORM client** datasource field (e.g. `connection-pool.mdx:85`, quickstart examples). The web repo is a marketing/docs surface; it does not reference the control-plane repos or tenant-manager at all.

**(c) `gh repo view` accessibility check (raw output).** The brief's requested command `gh repo view … --json name,visibility` failed because `visibility` is **not a valid `--json` field** for `gh repo view` (the CLI rejected it before hitting the API, listing `isPrivate` as the correct field). Re-running with valid fields succeeded, showing both repos are **reachable by the token (not 404 / not permission-denied) but PRIVATE**:

```text
=== pdp-control-plane ===
{"description":"The Prisma Data Platform Control Plane for Cloud Projects","isPrivate":true,"name":"pdp-control-plane"}

=== pdp-cloudflare ===
{"description":"Cloudflare infrastructure for PDP","isPrivate":true,"name":"pdp-cloudflare"}
```

So the cross-repo enforcement question is, in principle, answerable with the existing token *if* those repos were checked out (the token can read their metadata and presumably their contents), but it was **not** answerable from this working copy and the task forbade cloning them. The raw output of the brief's literal command, for completeness:

```text
$ gh repo view prisma/pdp-control-plane --json name,visibility 2>&1
Unknown JSON field: "visibility"
Available fields: ... isPrivate ... name ... (full list elided)
$ gh repo view prisma/pdp-cloudflare --json name,visibility 2>&1
Unknown JSON field: "visibility"
Available fields: ... isPrivate ... name ... (full list elided)
```

**No speculation about control-plane internals is offered here.** The gap is stated, not filled.
