# Docs v6 Consolidation Plan

## Current State

- **`content/docs/`** (v7): Main docs — ~644 MDX files across ORM, Postgres, Accelerate, CLI, Guides, etc.
- **`content/docs.v6/`** (v6): Full duplicate — ~222 MDX files mirroring the same sections:
  - `(index)/` — v6 landing + prisma-orm + prisma-postgres quickstarts
  - `orm/` — v6-specific ORM content (different structure than v7)
  - `postgres/`, `accelerate/`, `optimize/`, `guides/`, `platform/`, `ai/`

- **Routing**: `/` and `/*` → v7 (default); `/v6` and `/v6/*` → v6 (own layout + `sourceV6`)
- **Version switcher**: Shown on both v7 and v6 layouts; switches between v7/v6 sections

## Goal

- Version only the **ORM** section between v6 and v7
- Remove the full `docs.v6` duplication
- Non-ORM sections (Postgres, Accelerate, Guides, etc.) use v7 content only
- Version switcher appears only on ORM pages

---

## Plan

### Phase 1: Content Restructure

#### 1.1 Create ORM-only v6 content

- **Keep**: `content/docs.v6/orm/` (v6-specific ORM content)
- **Remove**: Everything else from `docs.v6`:
  - `(index)/`, `accelerate/`, `ai/`, `guides/`, `optimize/`, `platform/`, `postgres/`

#### 1.2 v6 landing options

**Option A – Redirect (simplest)**  
- `/v6` → redirect to `/v6/orm`  
- No extra v6 index content  
- Remove `(index)/` from docs.v6 entirely  

**Option B – Minimal landing page**  
- Keep a small `content/docs.v6/(index)/index.mdx` that:
  - Acts as `/v6` landing
  - Links to `/v6/orm` (versioned ORM)
  - Links to v7 sections for Postgres, Guides, etc. (`/postgres`, `/guides`, …)

#### 1.3 Update source config

**`source.config.ts`**:

- Keep `docs` (v7) as is
- Change `docsV6` to load only ORM + index:

  ```ts
  // Option A: Keep structure, restrict via meta
  export const docsV6 = defineDocs({
    dir: 'content/docs.v6',
    // Only orm/ and index exist
  });
  ```

  Or use a separate “orm v6” source if fumadocs allows multiple dirs. The key is that `docsV6` should only expose ORM pages + `/v6` index.

#### 1.4 Internal links in v6 ORM

- v6 ORM currently links to `/v6/postgres`, `/v6/guides`, etc.
- After removal, these must point to v7 equivalents: `/postgres`, `/guides`, etc.
- Run a bulk update (or script) to replace `/v6/` with `/` for non-ORM sections
- Keep `/v6/orm` links as-is for links within ORM

---

### Phase 2: Routing & Layout

#### 2.1 Redirect non-ORM v6 paths

For `/v6/postgres`, `/v6/accelerate`, etc., add redirects to v7:

- `/v6` → keep (v6 landing)
- `/v6/orm`, `/v6/orm/*` → serve from v6 ORM source
- `/v6/postgres`, `/v6/postgres/*` → redirect to `/postgres`, `/postgres/*`
- `/v6/accelerate`, `/v6/accelerate/*` → redirect to `/accelerate`, …
- `/v6/guides`, `/v6/optimize`, `/v6/platform`, `/v6/ai` → same pattern

**Implementation options**:

- **A. Middleware** (`middleware.ts`): Match `/v6/<section>` and redirect non-ORM sections.
- **B. v6 catch-all page**: In `(docs)/v6/[[...slug]]/page.tsx`, if `slug[0]` is not `orm` and not empty, call `redirect()` to the v7 path.

#### 2.2 v6 layout

- **ORM pages** (`/v6/orm/*`): Use current v6 layout with v6 ORM sidebar.
- **v6 index** (`/v6`): Use a simplified layout or shared layout with minimal nav.

If we merge v6 into the default route group, the v6 layout can be conditional: show v6 sidebar only for `/v6/orm/*`, otherwise use v7 tree.

---

### Phase 3: Source & Data

#### 3.1 `source.config.ts`

```ts
// v6 docs: only orm + index (no postgres, accelerate, etc.)
export const docsV6 = defineDocs({
  dir: 'content/docs.v6',
  // Structure: index.mdx (/) + orm/ (orm subtree)
});
```

Ensure `meta.json` for `content/docs.v6` only lists `orm` (and optionally `(index)` if needed).

#### 3.2 `source.ts`

- `sourceV6` continues to use `docsV6`, but it will have far fewer pages (ORM + index only).
- `getSource(version)` stays the same; v6 source will just have a smaller page set.

---

### Phase 4: Integrations

Update all consumers of `sourceV6` to reflect that it now only has ORM + index:

| File | Change |
|------|--------|
| `src/lib/source.ts` | No change if `sourceV6` is just a smaller loader |
| `src/app/(docs)/sitemap.ts` | No change; fewer v6 URLs |
| `src/app/og/docs/[...slug]/route.tsx` | No change; v6 pages still valid |
| `src/app/llms.txt/route.ts` | No change |
| `src/app/llms.mdx/[[...slug]]/route.ts` | No change |
| `src/app/llms-full.txt/route.ts` | No change |
| `src/app/api/search/route.ts` | No change |
| `scripts/lint-links.ts` | No change |
| `src/lib/page-badges.ts` | No change |

---

### Phase 5: Version Switcher

- **Current**: Shown on every v7 and v6 page.
- **Target**: Show only on ORM pages.

**Changes**:

1. **`(default)/layout.tsx`**  
   Show `VersionSwitcher` only when `pathname` matches `/orm` or `/orm/*`.

2. **`v6/layout.tsx`**  
   Keep `VersionSwitcher` (all v6 routes will be ORM or index, which is fine).

3. **`version-switcher.tsx`**  
   Update `VERSION_SECTIONS` so that when switching:
   - From v7 ORM to v6: go to `/v6/orm`
   - From v6 ORM to v7: go to `/orm`
   - When not on ORM, switching versions can either hide the switcher or navigate to `/orm` / `/v6/orm`.

---

### Phase 6: Static Assets

- **Keep**: `public/docs/v6/orm/` (images used by v6 ORM)
- **Remove**: `public/docs/v6/` assets for other sections if any
- **Verify**: Image paths in v6 ORM MDX (e.g. `/docs/v6/orm/...`) still resolve correctly

---

### Phase 7: Link Migration Script

Create a script to update internal links in `content/docs.v6/orm/**/*.mdx`:

- Links like `/v6/postgres/...` → `/postgres/...`
- Links like `/v6/guides/...` → `/guides/...`
- Links like `/v6/accelerate/...` → `/accelerate/...`
- Links like `/v6/platform/...` → `/platform/...`
- Links like `/v6/ai/...` → `/ai/...`
- Keep `/v6/orm/...` as-is

---

## File Structure After Consolidation

```
content/
  docs/                    # v7 (unchanged)
    orm/
    postgres/
    ...
  docs.v6/                 # Minimal v6
    index.mdx              # /v6 landing (new or extracted)
    orm/                   # v6 ORM only (keep)
      getting-started/
      overview/
      prisma-client/
      prisma-migrate/
      prisma-schema/
      reference/
      ...
    meta.json              # pages: ["(index)", "orm"] or equivalent
```

---

## Implementation Order

1. **Phase 1.3 + 1.4**: Update source config and `meta.json`; add link migration script and run it.
2. **Phase 1.1 + 1.2**: Remove non-ORM content from `docs.v6`; add v6 index.
3. **Phase 2.1**: Implement redirects for non-ORM v6 paths.
4. **Phase 2.2**: Adjust v6 layout for ORM-only content.
5. **Phase 5**: Restrict version switcher to ORM pages.
6. **Phase 6**: Clean up public assets.
7. Test sitemap, OG, LLM, search, and lint-links.

---

## Risks & Considerations

1. **Existing links**: External links to `/v6/postgres`, `/v6/guides`, etc. will 301/308 to v7. Ensure redirects are correct.
2. **v6 ORM ↔ v7 sections**: v6 ORM content may link to v7 Postgres/Guides. Verify those v7 pages exist and are appropriate for v6 users.
3. **Fumadocs source**: Confirm that defining `docsV6` with only `orm/` + index in `dir: 'content/docs.v6'` produces the expected URL structure (`/v6`, `/v6/orm`, `/v6/orm/*`).

---

## Optional Enhancements

- **Version banner**: On v7 ORM, optionally show: “Viewing v7. Switch to [v6](/v6/orm).”
- **Breadcrumbs**: Ensure breadcrumbs correctly show “ORM” and version when on `/v6/orm/*`.
- **Edit on GitHub** (required fix): In `(docs)/v6/[[...slug]]/page.tsx`, `EditOnGitHub` currently uses `content/docs/${page.path}` but v6 content lives in `content/docs.v6/`. Update to `content/docs.v6/${page.path}`.
