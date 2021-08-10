# Prisma Documentation

[![Netlify Status](https://api.netlify.com/api/v1/badges/ac8f6d5a-9b11-4b0a-8df1-b3b2f927c064/deploy-status)](https://app.netlify.com/sites/prisma2-docs/deploys)

This repository contains the [source code](./src) and the [content](./content) for the [Prisma documentation](https://www.prisma.io/docs/).

## Run locally

Clone this repository and get started by running the following commands:

```
npm install
npm run dev
```

To prettify or format the code, run:

```
npm run prettify
```

Visit `http://localhost:8000/` to view the app.

## Configure

Write MDX files in `content` folder.

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

## Inserting, moving and deleting files

All files/folders in the context are prefixed with a _position_ which indicates the order in which they appear in the sidenav on the docs website. This makes it cumbersome to insert, move and delete files because the positions of a number of other files (if not all) in the same folder might need to be adjusted. Thanks to [Luca Steeb](https://github.com/steebchen/), you can perform these operations with a dedicated CLI called [`mdtool`](https://gist.githubusercontent.com/steebchen/bd085ebde1fcf4242e3fdd0df4d202a6/raw/c04e3d262eb6a302a9fab98f6428fec9329681e2/mdtool).

### Install

```bash
wget https://gist.githubusercontent.com/steebchen/bd085ebde1fcf4242e3fdd0df4d202a6/raw/c04e3d262eb6a302a9fab98f6428fec9329681e2/mdtool -qO /usr/local/bin/mdtool
chmod +x /usr/local/bin/mdtool
```

### Usage

#### Overview

```
mdtool insert 3
mdtool swap A B
mdtool move A B
mdtool remove 4
```

#### `mdtool insert`

Make place for a new file at given index and increment all numbers by one after that index:

```
$ mdtool insert INDEX

# e.g.:
$ mdtool insert 2

# Result: for files 01-a, 02-b, 03-c, and 04-d; 03-c is renamed to 04-c and 04-d is renamed to 05-d so you can create a new file at index 2
```

#### `mdtool swap`

Swap two files; specify both filenames (prefix numbers get automatically adjusted):

```
$ mdtool swap FILENAME1 FILENAME2

# e.g.:
$ mdtool swap 03-file1.mdx 07-file2.mdx

# Result: Files are now named: 03-file2.mdx 07-file1.mdx
```

#### `mdtool move`

Move a given file to another given index

```
$ mdtool move FILENAME INDEX

# e.g.:
$ mdtool move 05-file.mdx 2

# Result: 05-file.mdx is move to 02-file.mdx, plus previous files 02-*, 03-*, 04-* are incremented
```

#### `mdtool remove`

Shift all other items by -1 at a given index:

```
$ mdtool remove INDEX

# e.g.:
$ mdtool remove 2

# Result: 01-a, 02-b, 03-c, 04-d becomes 01-a, 02-b, 02-c, 03-d; 02-b is supposed to be manually deleted
```

#### Thanks Luca

![](https://imgur.com/LJ0FGHk.png)
