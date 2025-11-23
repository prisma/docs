---
title: 'Introduction to Prisma Client'
sidebar_label: 'Introduction'
metaTitle: 'Introduction to Prisma Client'
metaDescription: 'Learn how to set up Prisma Client.'
---

import {
  Icon
} from '@site/src/components/Icon';

<TopBlock>

Prisma Client is an auto-generated and type-safe query builder that's _tailored_ to your data. The easiest way to get started with Prisma Client is by following the **[Quickstart](/getting-started/prisma-orm/quickstart/sqlite)**.

<Link className="button button--primary" to="/getting-started/prisma-orm/quickstart/sqlite">
  <Icon icon="fa-solid fa-star" size="18px" />
  Quickstart (5 min)
</Link>

The setup instructions [below](#set-up) provide a high-level overview of the steps needed to set up Prisma Client. If you want to get started using Prisma Client with your own database, follow one of these guides:

<Link
  className="button button--primary"
  to="/getting-started/prisma-orm/quickstart/postgresql"
>
  <Icon icon="fa-solid fa-rocket" size="18px" />
  Set up a new project from scratch
</Link>
<br />
<Link
  className="button button--primary"
  to="/getting-started/prisma-orm/add-to-existing-project/postgresql"
>
  <Icon icon="fa-solid fa-plus" size="18px" />
  Add Prisma to an existing project
</Link>

</TopBlock>

## Set up

### 1. Prerequisites

In order to set up Prisma Client, you need a [Prisma schema file](/orm/prisma-schema) with your database connection, the Prisma Client generator, and at least one model:

```prisma file=schema.prisma
datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
}
```

Also make sure to [install the Prisma CLI](/orm/tools/prisma-cli#installation):

```
npm install prisma --save-dev
npx prisma
```

### 2. Installation

Install Prisma Client in your project with the following command:

```
npm install @prisma/client
```

### 3. Importing Prisma Client

There are multiple ways to import Prisma Client in your project depending on your use case:

<TabbedContent code>

<TabItem value="TypeScript">

```ts
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
```

</TabItem>

<TabItem value="JavaScript">

```js
const { PrismaClient } = require('./generated/prisma')

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
```

</TabItem>

</TabbedContent>

For edge environments, you can import Prisma Client as follows:

<TabbedContent code>

<TabItem value="TypeScript">

```ts
import { PrismaClient } from './generated/prisma/edge'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
```

</TabItem>

<TabItem value="JavaScript">

```js
const { PrismaClient } = require('./generated/prisma/edge')

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
```

</TabItem>

</TabbedContent>

> **Note**: If you're using [driver adapters](/orm/overview/databases/database-drivers#driver-adapters), you can import from the location spefified in your generator's `output` path directly, e.g. `./src/generated/prisma`. No need to import from `./src/generated/prisma/edge`.

### 4. Use Prisma Client to send queries to your database

Once you have instantiated `PrismaClient`, you can start sending queries in your code:

```ts
// run inside `async` function
const newUser = await prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
})

const users = await prisma.user.findMany()
```

:::info

All Prisma Client methods return an instance of [`PrismaPromise`](/orm/reference/prisma-client-reference#prismapromise-behavior) which only executes when you call `await` or `.then()` or `.catch()`.

:::

### 5. Evolving your application

Whenever you make changes to your database that are reflected in the Prisma schema, you need to manually re-generate Prisma Client to update the generated code in your output directory:

```
prisma generate
```
