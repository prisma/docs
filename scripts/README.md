# Scripts

## check-redirect-loops.js

Detects redirect loops in the `static/_redirects` file.

### Usage

**Local testing:**
```bash
npm run check-redirects
```

**Direct execution:**
```bash
node scripts/check-redirect-loops.js
```

### What it checks

- ✅ Detects circular redirects (A → B → C → A)
- ✅ Detects self-redirects (A → A)
- ✅ Detects hash fragment loops (/path#hash → /docs/path → /path)
- ✅ Detects chains exceeding max depth (potential infinite loops)
- ✅ Ignores external redirects (http/https URLs)
- ✅ Handles splat patterns and hash fragments

### Exit codes

- `0` - No loops detected
- `1` - Loops detected or error

### CI Integration

This script runs automatically in GitHub Actions on:
- Pull requests that modify `static/_redirects`
- Pushes to `main` that modify `static/_redirects`

See `.github/workflows/check-redirects.yml` for the workflow configuration.

### Example output

**No loops:**
```
🔍 Checking for redirect loops...

📋 Found 538 internal redirects to check

✅ No redirect loops detected!
```

**Loops detected:**
```
🔍 Checking for redirect loops...

📋 Found 538 internal redirects to check

❌ Found 1 redirect loop(s):

Loop 1:
  Chain: /getting-started → /docs/getting-started → /getting-started

```
