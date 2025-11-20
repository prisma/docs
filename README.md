# Prisma Documentation

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/prisma/docs/blob/main/CONTRIBUTING.md) [![Discord](https://img.shields.io/discord/937751382725886062)](https://discord.com/invite/prisma-937751382725886062?utm_source=twitter&utm_medium=bio&dub_id=0HxLEKaaOg6pL0OL)

This repository contains the [source code](./src) and the [content](./content) for the [Prisma documentation](https://www.prisma.io/docs).

## Contributing to the docs

New contributors are welcome! Read through the [contributing guide](CONTRIBUTING.md) to learn how you can contribute to the Prisma documentation.

## Run the docs site locally

1. Clone this repository.
2. On your computer, open a terminal window in the repository's directory.
3. Run the following commands:

```
npm install
npm run start
```

Be sure to also test building the static site:

```
npm run clean && npm run build
npm run serve
```

To prettify or format the code, run:

```
npm run format
```

Please note that `.md` and `.mdx` files are not formatted by Prettier because they are written in [MDX 3](https://mdxjs.com/blog/v3/) which Prettier [does not support](https://github.com/prettier/prettier/issues/12209).

Visit `http://localhost:3000` to view the app.

## Configure

Write MDX files in `content` folder.

Most frontmatter for the docs are the same as [Docusaurus Frontmatter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter). There are some differences due to legacy frontmatter which are handled [here](https://github.com/prisma/docs/blob/94b04aa1d8f723802e715b531b9808bab2d7ae15/src/theme/DocItem/Metadata/index.tsx).

When possible, avoid using custom frontmatter fields and use the default ones available via Docusaurus.

## Inserting, moving and deleting files

All files/folders in the context are prefixed with a _position_ which indicates the order in which they appear in the sidenav on the docs website. This makes it cumbersome to insert, move and delete files because the positions of a number of other files (if not all) in the same folder might need to be adjusted. Thanks to [Luca Steeb](https://github.com/steebchen/), you can perform these operations with a dedicated CLI called [`mdtool`](https://gist.githubusercontent.com/steebchen/bd085ebde1fcf4242e3fdd0df4d202a6/raw/c04e3d262eb6a302a9fab98f6428fec9329681e2/mdtool).

### Install

First, install `wget`:

```bash
brew install wget
```

Then use `wget` to install `mdtool`:

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

![](https://res.cloudinary.com/prismaio/image/upload/v1628765536/docs/LJ0FGHk_u2jjxv.png)
