# Troubleshooting Guide

## Colors Not Rendering in Development

### Issue
Colors defined in the design system were not appearing in the browser when running the dev server on `localhost:3001` or `localhost:3002`.

### Root Cause
The issue was caused by incorrect syntax for Tailwind CSS v4. The project was using Tailwind CSS v4 syntax in `postcss.config.mjs` but the CSS custom properties were defined using Tailwind v3 patterns.

### Solution

#### 1. Updated `globals.css` to use Tailwind v4 `@theme` directive

**Before (v3 style):**
```css
@layer base {
    :root {
        --background-default: hsl(0 0% 100%);
        --foreground-neutral: hsl(220 25% 9%);
        /* ... */
    }
    
    .dark {
        --background-default: hsl(220 54% 5%);
        /* ... */
    }
}
```

**After (v4 style):**
```css
@theme {
    --color-background-default: hsl(0 0% 100%);
    --color-foreground-neutral: hsl(220 25% 9%);
    /* ... */
}

@theme dark {
    --color-background-default: hsl(220 54% 5%);
    /* ... */
}
```

**Key Changes:**
- Use `@theme` directive instead of `@layer base` with `:root`
- Add `--color-` prefix to all color variables (required by Tailwind v4)
- Use `@theme dark` for dark mode instead of `.dark` class selector
- Keep `@import "tailwindcss";` at the top of the file

#### 2. Updated `tailwind.config.ts` to reference correct CSS variables

**Before:**
```ts
colors: {
  background: {
    DEFAULT: "var(--background-default)",
    neutral: "var(--background-neutral)",
  }
}
```

**After:**
```ts
colors: {
  background: {
    DEFAULT: "var(--color-background-default)",
    neutral: "var(--color-background-neutral)",
  }
}
```

### Verification
After making these changes, restart the dev server:

```bash
cd apps/eclipse/dev
pnpm dev
```

Colors should now render correctly in the browser.

### Key Tailwind v4 Differences

1. **Theme Definition**: Use `@theme` directive instead of CSS layers
2. **Color Prefix**: All color variables must start with `--color-`
3. **Dark Mode**: Define in separate `@theme dark` block
4. **No Arbitrary Values in @theme**: You cannot use `calc()` or other CSS functions directly in `@theme`
5. **Import Order**: `@import "tailwindcss";` must be first

### Resources
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)

## Dark Mode Not Toggling

### Issue
Clicking the dark mode toggle button doesn't switch between light and dark themes, or the page starts in dark mode when it should start in light mode.

### Root Cause
The dark class needs to be applied to the `<html>` or document root element, not a nested div, for Tailwind's dark mode to work properly with `darkMode: "class"`.

### Solution

Update the component to apply the dark class to `document.documentElement`:

**Before:**
```tsx
export function ShowcaseExample() {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background-default">
        {/* content */}
      </div>
    </div>
  );
}
```

**After:**
```tsx
export function ShowcaseExample() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div>
      <div className="min-h-screen bg-background-default">
        {/* content */}
      </div>
    </div>
  );
}
```

### Verification
1. Ensure `darkMode: "class"` is set in `tailwind.config.ts`
2. Ensure `:root` and `.dark` selectors are used in `globals.css` (not `@theme` directives)
3. Click the toggle button - colors should switch between light and dark modes

## Other Common Issues

### Port Already in Use
If port 3001 is already in use, Vite will automatically try the next available port (3002, 3003, etc.). Check the terminal output for the actual port being used.

### PostCSS Plugin Not Found
If you see an error about `@tailwindcss/postcss` not being found:
```bash
pnpm install @tailwindcss/postcss
```

### Type Errors with Token Imports
If you get TypeScript errors about number types in fontWeight, ensure you're converting them to strings:
```ts
fontWeight: {
  normal: tokens.typography.fontWeight.normal.toString(),
}
```
