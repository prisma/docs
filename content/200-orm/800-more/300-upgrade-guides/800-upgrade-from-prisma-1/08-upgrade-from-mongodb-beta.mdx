---
title: 'Upgrade from MongoDB Beta'
metaTitle: 'Upgrade from the Prisma 1 MongoDB Beta to Prisma ORM 2 or later'
metaDescription: 'Learn how to upgrade your MongoDB application running Prisma 1 to Prisma ORM 2 or later.'
---

## Introduction

This guide helps you migrate from the Prisma 1 MongoDB Beta to MongoDB on Prisma ORM 2 or later. To learn more about the differences between Prisma 1 and Prisma ORM 2.x and later, refer to [this document](/orm/more/upgrade-guides/upgrade-from-prisma-1/how-to-upgrade#main-differences-between-prisma-1-and-prisma-orm-version-2x-and-later).

The scope of this guide is to give you the workflow necessary to perform the migration and highlight some of the problems you might encounter.

We unfortunately can't cover all possible scenarios or changes required, but this guide should help you on your journey. Join [our Discord](https://pris.ly/discord?utm_source=docs&utm_medium=intro_text) or create an issue [on Github](https://github.com/prisma/prisma1/issues/new/choose) with any questions.

:::warning
  Perform this migration on your staging environment before trying this in
  production!
:::

## Requirements

- Must be running MongoDB 4.2+ as a replica set (MongoDB Atlas does this for you automatically)
- Node.js: see [system requirements](/orm/reference/system-requirements)
- TypeScript: see [system requirements](/orm/reference/system-requirements)

## Installing Prisma ORM 3.12.0 or later

In your project directory run the following commands:

```terminal
npm install prisma@latest && npm install @prisma/client
npx prisma init --datasource-provider=mongodb
```

This should create the following files:

- `prisma/schema.prisma`: An initial Prisma schema
- `.env`: Environment file where you'll store your connection string

:::info

If you see the following error:

```
ERROR  File schema.prisma already exists in your project.
Please try again in a project that is not yet using Prisma.
```

You have likely a `prisma/` directory in your project already. Rename that directory to something like `_prisma/` and try again

:::

## Find the Connection String to your MongoDB Database

Next you'll want to find the connection string to your MongoDB database. You should be able to find it in your `docker-compose.yml` file or on MongoDB Atlas. It's what you'd pass to MongoDB Compass. The connection string should look something like this:

```bash
mongodb://<user>:<pass>@<host>:27017
```

The database that stores application data in Prisma 1 is called `default_default`, so we'll add that to the end of the connection string and update the `DATABASE_URL` key in the `.env` file

```bash file=.env
DATABASE_URL="mongodb://prisma:prisma@localhost:27017/default_default"
```

## Introspect your MongoDB Database

You're now ready to pull the structure of your database down into your Prisma Schema.

```bash
$ npx prisma db pull
```

And you should see your Prisma schema in `prisma/schema.prisma` populated with your models.

:::info

If you see the following error: `Error in connector: SCRAM failure: Authentication failed.`, try adding `?authSource=admin` to the end of your connection string and trying again.

:::

## Touching up your Prisma Schema

The generated Prisma Client from a freshly introspected Prisma 1 based MongoDB database may not have the best API. You can adjust the model names and fields, just be sure to `@map` and `@@map` the original name to the underlying database collection and field names:

```diff
- model posts {
+ model Post {
    id        String  @id @default(auto()) @map("_id") @db.ObjectId
    published Boolean
    title     String
+    @@map("posts")
  }

- model users {
+ model User {
    id    String   @id @default(auto()) @map("_id") @db.ObjectId
    email String   @unique(map: "email_U")
    name  String
-    posts String[] @db.ObjectId
+    postIds String[] @db.ObjectId @map("posts")

    @@index([posts], map: "posts_R")
+    @@map("users")
  }
```

Take caution in doing these renames because you need to make sure the Prisma Schema still maps properly to the underlying database collections and field names.

Unlike SQL databases, MongoDB doesn't have an explicit understanding of relationships between data. This means that Prisma ORM's introspection is unable to infer those relationships for you.

We typically recommend adding the relationships by hand with the help of [this documentation](/orm/overview/databases/mongodb#how-to-add-in-missing-relations-after-introspection). However, Prisma 1 stores foreign keys is different than where Prisma ORM 2 and later expects foreign keys, so if you want to take advantage of relationships, you'll need to shift where the foreign keys are on your database before adding the relationships.

:::tip

💡 Download the Prisma VSCode Extension to provide autocomplete and helpful error messages as you transition your Prisma schema.

:::

## Generating a Prisma Client

With the Prisma schema populated with the schema of your data, you're now ready to generate a Typescript Client to read and write to your MongoDB database.

```bash
$ npx prisma generate
```

## Testing Reads

Create a simple `test.ts` script to verify that Prisma Client can read and write to your application. Note that this guide is using the example in the [Prisma 1 examples repository](https://github.com/prisma/prisma1-examples/tree/master/typescript/docker-mongodb), but the code will change depending on your application.

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()
  const posts = await prisma.post.findMany()
  console.log(posts)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Make sure `ts-node` is installed globally and run:

```bash
ts-node test.ts
```

You should see a list of your data:

```bash
[
  {
    comments: [],
    id: '62435a83fca136000996ba16',
    content: 'https://www.prisma.io/day/',
    published: true,
    title: 'Join us for Prisma Day 2019 in Berlin',
    wasCreated: 2022-03-29T19:14:11.172Z,
    wasUpdated: 2022-03-29T19:14:11.172Z
  },
  {
    comments: [ [Object] ],
    id: '62435a83fca136000996ba18',
    content: 'https://graphqlweekly.com/',
    published: true,
    title: 'Subscribe to GraphQL Weekly for community news',
    wasCreated: 2022-03-29T19:14:11.369Z,
    wasUpdated: 2022-03-29T19:14:11.369Z
  },
  {
    comments: [],
    id: '62435a83fca136000996ba1a',
    content: 'https://twitter.com/prisma',
    published: false,
    title: 'Follow Prisma on Twitter',
    wasCreated: 2022-03-29T19:14:11.375Z,
    wasUpdated: 2022-03-29T19:14:11.375Z
  }
]
```

## Testing Writes

You can then alter your `test.ts` to try writes:

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()
  const user = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })
  console.log(user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

And you should see a user was created.

:::warning

If you see the following error:

```no-lines wrap
Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. https://pris.ly/d/mongodb-replica-set
```

This means that your MongoDB database isn't running as a replica set. Refer to [the link above](https://pris.ly/d/mongodb-replica-set) for steps to resolve this issue.

:::

## Upgrading your Application

Now that you have a working Prisma Client, you can start replacing Prisma Client 1 queries with the latest Prisma Client queries. The [Prisma Client Reference](/orm/reference/prisma-client-reference#filter-conditions-and-operators) is a helpful resource for learning how to use the latest Prisma Client.

## Conclusion

I hope this brief guide was helpful in getting you started on the right path. Let us know if you have any questions or issues. We really appreciate your support over the years.
