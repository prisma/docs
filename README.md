# Gatsby TypeScript MDX Prismjs starter

Demo: <https://infallible-brown-28846b.netlify.com/>

## Getting started

Install this by running the following from your CLI:

```bash
$ gatsby new my-website https://github.com/tylergreulich/gatsby-typescript-mdx-prismjs-starter
```

Run `yarn dev` to serve your website on <http://localhost:8000>.

Run `yarn build` to create a static site ready to host from (`/public`)

## Features

- [x] Gatsby 2.0
  - [x] sharp
  - [x] offline support
  - [x] manifest
  - [x] typescript
  - [x] blog in mdx
- [x] Tools
  - [x] [Jest](https://facebook.github.io/jest/) / [react-testing-library](https://github.com/kentcdodds/react-testing-library)
  - [x] [Typescript](https://www.typescriptlang.org/) / [tslint](https://palantir.github.io/tslint/)
- [x] SEO
  - [x] [Helmet](https://github.com/nfl/react-helmet)
- [x] [styled-components](https://www.styled-components.com/) for styling
- [x] [Prismjs](https://prismjs.com/) for syntax highlighting in blog posts

## Changing theme of Prismjs

Go into gatsby-browser.js and replace the theme with what you want

Some of their default themes can be found [here](https://prismjs.com/)

[List of other themes](https://github.com/PrismJS/prism-themes)
