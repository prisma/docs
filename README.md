# Prisma2 Docs
[![Netlify Status](https://api.netlify.com/api/v1/badges/ac8f6d5a-9b11-4b0a-8df1-b3b2f927c064/deploy-status)](https://app.netlify.com/sites/prisma2/deploys)

## 🚀 Quickstart

Download the code and get started by running the following commands:

```
$ cd prisma2-docs
$ yarn
$ yarn dev
```

To prettify or format the code, run: 

```
yarn prettify
```

Visit `http://localhost:8000/` to view the app.


## 🔧 Configure

Write markdown files in `content` folder.

Open `config.js` for available config options for `gatsby`, `header`, `footer` and `siteMetadata`.

- `gatsby` config for global configuration like 
    - `pathPrefix` - Gatsby Path Prefix

- `header` config for site header configuration like
    - `title` - The title that appears on the top left
    - `links` - The links for header
    - `logoLink` - The link to redirect on logo click

- `footer` config for site footer configuration like
    - `title` - The title that appears on the top left
    - `logoLink` - The link to redirect on logo click
    - `products`, `community`, `company`, `resources` - The links for various footer
    - `newsletter` - Newsletter config
    - `findus` - Social links

- `siteMetadata` config for website related configuration
    - `title` - Title of the website in main page
    - `description` - Description of the website
    - `keywords` - Keywords of the website for SEO
