---
title: 'Compare columns of the same table with raw queries'
metaTitle: 'Compare columns of the same table with raw queries'
metaDescription: 'Compare columns with inbuilt raw query methods in Prisma'
---

Comparing different columns from the same table is a common scenario that developers encounter. Some examples include comparing two numeric values in the same table or comparing two dates in a same table. There's an existing [GitHub Issue](https://github.com/prisma/prisma/issues/5048) regarding the same.

:::warning

From version 4.3.0, you do not need to use raw queries to compare columns in the same table. You can use the `<model>.fields` property to [compare the columns](/orm/reference/prisma-client-reference#compare-columns-in-the-same-table).

The below information is kept for backwards compatibility with Prisma ORM versions prior to 4.3.0.

:::

## Workaround

Comparing values from two columns in the same table can be achieved by using [raw queries](/orm/prisma-client/using-raw-sql/raw-queries).

### Comparing numeric values

:::info

From version 4.3.0, you do not need to use raw queries to compare columns in the same table. You can use the `<model>.fields` property to compare the columns. [Learn more](/orm/reference/prisma-client-reference#compare-columns-in-the-same-table)

:::

One use case for comparing values from different columns would be retrieving posts that have more comments than likes; in this case, you need to compare the values of `commentsCount` and `likesCount`.

```prisma
model Post {
  id            Int      @id @default(autoincrement())
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  title         String
  content       String?
  published     Boolean  @default(false)
  author        User     @relation(fields: [authorId], references: [id])
  authorId      Int
  likesCount    Int
  commentsCount Int
}
```

Queries (depending upon which database) could look something like:

_PostgreSQL / CockroachDB_

```js
import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient()

async function initiateNumbersComparisonRawQuery() {
  const response =
    await prisma.$queryRaw`SELECT * FROM "public"."Post" WHERE "likesCount" < "commentsCount";`

  console.log(response)
}

await initiateNumbersComparisonRawQuery()
```

_MySQL_

```js
import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient()

async function initiateNumbersComparisonRawQuery() {
  const response =
    await prisma.$queryRaw`SELECT * FROM \`public\`.\`Post\` WHERE \`likesCount\` < \`commentsCount\`;`

  console.log(response)
}

await initiateNumbersComparisonRawQuery()
```

_Sqlite_

```js
import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient()

async function initiateNumbersComparisonRawQuery() {
  const response =
    await prisma.$queryRaw`SELECT * FROM "Post" WHERE "likesCount" < "commentsCount";`

  console.log(response)
}

await initiateNumbersComparisonRawQuery()
```

Running the above queries (depending upon the database) would filter posts that has fewer likes compared to comments.

_Query Response_

```js
;[
  {
    id: 1,
    createdAt: '2022-03-03T12:08:11.421+00:00',
    updatedAt: '2022-03-03T12:08:11.422+00:00',
    title: 'Hello World',
    content: 'This is my first post',
    published: false,
    authorId: 1,
    likesCount: 50,
    commentsCount: 100,
  },
]
```

### Comparing date values

:::info

From version 4.3.0, you do not need to use raw queries to compare columns in the same table. You can use the `<model>.fields` property to compare the columns. [Learn more](/orm/reference/prisma-client-reference#compare-columns-in-the-same-table)

:::

Similarly, if you need to compare dates, you could also achieve the same thing using raw queries.

For example, a use case could be to get all projects completed after the due date.

```prisma
model Project {
  id            Int      @id @default(autoincrement())
  title         String
  author        User     @relation(fields: [authorId], references: [id])
  authorId      Int
  dueDate       DateTime
  completedDate DateTime
  createdAt     DateTime @default(now())
}
```

Queries (depending upon the database) could look something like:

_PostgreSQL / CockroachDB_

```js
import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient()

async function initiateDatesComparisonRawQuery() {
  const response =
    await prisma.$queryRaw`SELECT * FROM "public"."Project" WHERE "completedDate" > "dueDate";`

  console.log(response)
}

await initiateDatesComparisonRawQuery()
```

_MySQL_

```js
import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient()

async function initiateDatesComparisonRawQuery() {
  const response =
    await prisma.$queryRaw`SELECT * FROM \`public\`.\`Project\` WHERE \`completedDate\` > \`dueDate\`;`

  console.log(response)
}

await initiateDatesComparisonRawQuery()
```

_Sqlite_

```js
import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient()

async function initiateDatesComparisonRawQuery() {
  const response =
    await prisma.$queryRaw`SELECT * FROM "Project" WHERE "completedDate" > "dueDate";`

  console.log(response)
}

await initiateDatesComparisonRawQuery()
```

Running the above query would fetch projects where `completedDate` is after the `dueDate`.

_Query Response_

```js
;[
  {
    id: 1,
    title: 'Project 1',
    authorId: 1,
    dueDate: '2022-03-10T00:00:00+00:00',
    completedDate: '2022-03-12T00:00:00+00:00',
    createdAt: '2022-03-03T12:08:11.421+00:00',
  },
]
```
