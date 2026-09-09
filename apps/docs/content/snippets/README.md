# Shared content snippets

MDX fragments that more than one page needs to state identically. They are not
pages: this directory sits outside `content/docs`, so nothing here gets a URL, a
sidebar entry, or frontmatter.

## Using a snippet

Pull a snippet into a page with fumadocs' `include` tag, using a path relative to
the including page:

```mdx
:::warning[Accelerate retirement]

<include>../../snippets/accelerate-retirement.mdx</include>

:::
```

`remarkInclude` runs before every other remark plugin, so the snippet is inlined
into the page's own MDX tree at build time. It renders in the page, in
`llms.txt`, and in the "copy as markdown" output exactly as if it had been typed
there.

Page-specific context belongs in the page, around the include — add a sentence
inside the callout before the `<include>` tag. Never fork the snippet's text into
a page to reword it.

## Snippets

### `accelerate-retirement.mdx`

The Accelerate retirement date and the three remediation guides. Every retirement
callout in the docs includes it, so the date and the links exist in exactly one
place.

`src/lib/accelerate-retirement.test.ts` enforces that: it fails if a page under
`content/docs` writes its own copy of the notice, and it fails if any page states
a retirement date other than the one in this snippet.
