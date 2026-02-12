# OpenAPI Spec Caching

## Problem

The Vercel build was failing with timeout errors when trying to fetch the OpenAPI specification from `https://api.prisma.io/v1/doc` during the static site generation phase:

```
docs:build: Error occurred prerendering page "/management-api/endpoints/database-usage/get-databases-id-usage". Read more: https://nextjs.org/docs/messages/prerender-error
docs:build: TypeError: fetch failed
docs:build:   [cause]: AggregateError: 
docs:build:       at ignore-listed frames {
docs:build:     code: 'ETIMEDOUT'
docs:build:   }
```

The issue occurred because:
1. Next.js with `output: "export"` statically generates all pages at build time
2. Each API documentation page needs the OpenAPI spec to render
3. Multiple workers were fetching the spec simultaneously, causing network congestion
4. Vercel's build environment has stricter timeouts than local development

## Solution

We implemented a three-layer caching strategy:

### 1. Pre-build Fetch Script (`scripts/fetch-openapi.ts`)

- Runs **before** the Next.js build starts (via the build script)
- Fetches the OpenAPI spec from the API with retry logic and exponential backoff
- Caches the spec to `cache/openapi.json`
- This ensures the spec is available locally before any rendering begins

### 2. File-based Cache

- The cached `cache/openapi.json` file is checked first during builds
- If available, it's used instead of making network requests
- This file is gitignored but will be created on every build

### 3. In-memory Cache (`src/lib/openapi.ts`)

- Once the spec is loaded (either from file or API), it's stored in memory
- All subsequent requests during the same build process use the in-memory version
- Prevents duplicate fetches even across multiple workers

## Implementation Details

### Build Process Flow

```
pnpm build
  → turbo build
    → docs#build
      → fetch-openapi script (fetches & caches to file)
      → next build (reads from cache file, stores in memory)
        → All API pages use in-memory cache
```

### Key Files

- **`scripts/fetch-openapi.ts`**: Pre-build script that fetches and caches the spec
- **`src/lib/openapi.ts`**: Main OpenAPI integration with caching logic
- **`cache/openapi.json`**: Cached OpenAPI specification (gitignored)

### Retry Logic

Both the pre-build script and runtime fetch include:
- 3-5 retry attempts with exponential backoff
- 30-60 second timeouts per request
- Graceful error handling with informative messages

## Benefits

1. **Faster Builds**: Spec is fetched once instead of multiple times
2. **More Reliable**: Retry logic handles transient network issues
3. **Vercel Compatible**: Works within Vercel's timeout constraints
4. **Offline Capable**: Can build using cached spec if API is temporarily unavailable

## Maintenance

The cache is automatically regenerated on every build via the `fetch-openapi` script. No manual cache invalidation is needed.

If the API structure changes, simply run a new build to refresh the cache.

## Testing Locally

To test the caching behavior:

```bash
# Clean build (fetches spec fresh)
rm -rf apps/docs/cache apps/docs/.next
pnpm build

# Subsequent build (uses cached spec)
pnpm build
```

You should see:
- First build: "Fetching OpenAPI spec from https://api.prisma.io/v1/doc"
- Subsequent builds: "Using cached OpenAPI spec from file"