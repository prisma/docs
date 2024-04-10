# Prisma Documentation

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/prisma/docs/blob/main/CONTRIBUTING.md) [![Slack](https://img.shields.io/badge/chat-on%20slack-blue.svg?style=flat-square)](https://slack.prisma.io/) [![Vercel](https://vercelbadge.vercel.app/api/prisma/docs)](https://vercel.com/prisma/docs/deployments)

This repository contains the [source code](./src) and the [content](./content) for the [Prisma documentation](https://www.prisma.io/docs).

## Contributing to the docs

New contributors are welcome! Read through the [contributing guide](CONTRIBUTING.md) to learn how you can contribute to the Prisma documentation.

## Prerequisites for Apple M1 chip (macOS BigSur and later)

1. Install [`homebrew`](https://brew.sh/).
2. Install [`libvips`](https://github.com/libvips/libvips) via homebrew.

   ```
   brew install libvips
   ```

## Run the docs site locally

1. Clone this repository.
2. On your computer, open a terminal window in the repository's directory.
3. Run the following commands:

```
cd docs
npm install
npm run dev
```

## Run functions locally

Run a local build to run the functions using the following command:

```
vercel dev
```

> Make sure you have the correct path to `POSTGRES_URL` in your local `.env` file to test the functions

To prettify or format the code, run:

```
npm run format
```

Visit `http://localhost:8000` to view the app.

## Configure

Write MDX files in `content` folder.

Open `config.ts` for available config options for `gatsby`, `header`, `footer` and `siteMetadata`.

- `gatsby` config for global configuration like

  - `pathPrefix` - Gatsby Path Prefix
  - `siteUrl` - The url of the deployed site
  - `titlePrefix` - The prefix to title that is added to the SEO title of the page
  - `titleSuffix` - The suffix to title that is added to the SEO title of the page

- `header` config for site header configuration like

  - `secondLevelHeaderMenuItems` - The text and links for the buckets on the second level of header
  - `search` - The API keys for search functionality

- `footer` config for site footer configuration like

  - `newsletter` - Newsletter text

- `homepage` config for various links and content in the homepage of https://www.prisma.io/docs

  - `SummaryLinkData` - Links and text in the Summary section of homepage
  - `GeneralLinkData` - Links and text in the General section of homepage
  - `GuideLinkData` - Links and text in the Guide section of homepage
  - `ReferenceLinkData` - Links and text in the Reference section of homepage
  - `MoreUsefulLinks` - Links and text in the More Useful section of homepage

- `siteMetadata` config for website related configuration

  - `title` - Title of the website in main page
  - `description` - Description of the website
  - `keywords` - Keywords of the website for SEO

- `feedback` config for feedback urls

  - `sentimentUrl` - api path for sentiment details on feedback functionality
  - `feedbackUrl` - api path for feedback details on feedback functionality

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
