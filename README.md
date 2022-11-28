# Prisma Documentation

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[badge-all-contributors]: https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- separate setup of badge as reusable component via https://github.com/all-contributors/all-contributors/issues/361#issuecomment-637166066 -->

[![All Contributors][badge-all-contributors]](#contributors-) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/prisma/docs/blob/main/CONTRIBUTING.md) [![Slack](https://img.shields.io/badge/chat-on%20slack-blue.svg?style=flat-square)](https://slack.prisma.io/) [![Netlify Status](https://api.netlify.com/api/v1/badges/ac8f6d5a-9b11-4b0a-8df1-b3b2f927c064/deploy-status)](https://app.netlify.com/sites/prisma2-docs/deploys)

This repository contains the [source code](./src) and the [content](./content) for the [Prisma documentation](https://www.prisma.io/docs/).

## Contributing to the docs

Read through the [contributing guide](CONTRIBUTING.md) to learn how you can contribute to the Prisma documentation.

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
npm install
npm run dev
```

## Run functions locally

Run a local build to run the functions using the following command:

```
netlify dev
```

> Make sure you have the correct path to `POSTGRES_URL` in your local `.env` file to test the functions

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://janpiotrowski.de"><img src="https://avatars.githubusercontent.com/u/183673?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jan Piotrowski</b></sub></a><br /><a href="https://github.com/prisma/docs/commits?author=janpio" title="Documentation">📖</a></td>
    <td align="center"><a href="https://norman.life"><img src="https://avatars.githubusercontent.com/u/1992255?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daniel Norman</b></sub></a><br /><a href="https://github.com/prisma/docs/commits?author=2color" title="Documentation">📖</a> <a href="#example-2color" title="Examples">💡</a></td>
    <td align="center"><a href="https://gerome.dev"><img src="https://avatars.githubusercontent.com/u/32737308?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gérôme Grignon</b></sub></a><br /><a href="https://github.com/prisma/docs/commits?author=geromegrignon" title="Documentation">📖</a> <a href="#example-geromegrignon" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/amcjen"><img src="https://avatars.githubusercontent.com/u/175249?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Allison Clift-Jennings</b></sub></a><br /><a href="https://github.com/prisma/docs/commits?author=amcjen" title="Documentation">📖</a> <a href="#example-amcjen" title="Examples">💡</a></td>
    <td align="center"><a href="http://tomhsiao1260.github.io"><img src="https://avatars.githubusercontent.com/u/31985811?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yao Hsiao</b></sub></a><br /><a href="https://github.com/prisma/docs/commits?author=TomHsiao1260" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/danielweinmann"><img src="https://avatars.githubusercontent.com/u/204765?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daniel Weinmann</b></sub></a><br /><a href="https://github.com/prisma/docs/commits?author=danielweinmann" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/rowinbot"><img src="https://avatars.githubusercontent.com/u/18468260?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rowin Hernández</b></sub></a><br /><a href="https://github.com/prisma/docs/commits?author=rowinbot" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://shishi.hatenablog.jp/"><img src="https://avatars.githubusercontent.com/u/341746?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shigenobu Nishikawa</b></sub></a><br /><a href="#example-shishi" title="Examples">💡</a></td>
    <td align="center"><a href="http://linkedin.com/in/austin-baldwin/"><img src="https://avatars.githubusercontent.com/u/11078749?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Austin Baldwin</b></sub></a><br /><a href="https://github.com/prisma/docs/commits?author=baldyeagle" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
