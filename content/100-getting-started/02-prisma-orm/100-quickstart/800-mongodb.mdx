---
title: 'Quickstart with Prisma ORM and MongoDB'
sidebar_label: 'MongoDB'
metaTitle: 'Quickstart: Prisma ORM with MongoDB (10 min)'
metaDescription: 'Create a new TypeScript project from scratch by connecting Prisma ORM to MongoDB and generating a Prisma Client for database access.'
---

import Prerequisites from '../../_components/_prerequisites.mdx'
import CreateProject from '../../_components/_create-project.mdx'
import ExploreData from '../../_components/_explore-data.mdx'
import NextSteps from '../../_components/_next-steps.mdx'

[MongoDB](https://www.mongodb.com) is a popular NoSQL document database. In this guide, you will learn how to set up a new TypeScript project from scratch, connect it to MongoDB using Prisma ORM, and generate a Prisma Client for easy, type-safe access to your database.

:::warning[MongoDB support for Prisma ORM v7]

**MongoDB support for Prisma ORM v7 is coming in the near future.** In the meantime, please use **Prisma ORM v6.19** (the latest v6 release) when working with MongoDB.

This guide uses Prisma ORM v6.19 to ensure full compatibility with MongoDB.

:::

## Prerequisites

- Node.js installed in your system [with the supported version](/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-6#minimum-supported-nodejs-versions)
- A [MongoDB](https://www.mongodb.com/) database accessible via connection string

## 1. Create a new project

<CreateProject />

## 2. Install required dependencies

Install the packages needed for this quickstart:

```terminal
npm install prisma@6.19 @types/node --save-dev 
npm install @prisma/client@6.19 dotenv
```

:::info[Why Prisma v6.19?]

This is the latest stable version of Prisma ORM v6 that fully supports MongoDB. MongoDB support for Prisma ORM v7 is coming soon.

You can also install `prisma@6` and `@prisma/client@6` to automatically get the latest v6 release.

:::

Here's what each package does:

- **`prisma`** - The Prisma CLI for running commands like `prisma init`, `prisma db push`, and `prisma generate`
- **`@prisma/client`** - The Prisma Client library for querying your database
- **`dotenv`** - Loads environment variables from your `.env` file

:::note

MongoDB doesn't require driver adapters since Prisma ORM connects directly to MongoDB.

:::

## 3. Configure ESM support

Update `tsconfig.json` for ESM compatibility:

```json file=tsconfig.json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "node",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "ignoreDeprecations": "6.0"
  }
}
```

Update `package.json` to enable ESM:

```json file=package.json
{
  // add-start
  "type": "module",
  // add-end
}
```

## 4. Initialize Prisma ORM

You can now invoke the Prisma CLI by prefixing it with `npx`:

```terminal
npx prisma
```

Next, set up your Prisma ORM project by creating your [Prisma Schema](/orm/prisma-schema) file with the following command:

```terminal
npx prisma init --datasource-provider mongodb --output ../generated/prisma
```

This command does a few things:

- Creates a `prisma/` directory with a `schema.prisma` file for your database connection and schema models
- Creates a `.env` file in the root directory for environment variables
- Creates a `prisma.config.ts` file for Prisma configuration

:::note

Prisma Client will be generated in the `generated/prisma/` directory when you run `npx prisma generate` later in this guide.

:::

The generated `prisma.config.ts` file looks like this:

```typescript file=prisma.config.ts
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: "classic",
  datasource: {
    url: env('DATABASE_URL'),
  },
})
```

Add `dotenv` to `prisma.config.ts` so that Prisma can load environment variables from your `.env` file:

```typescript file=prisma.config.ts
// add-start
import 'dotenv/config'
// add-end
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: "classic",
  datasource: {
    url: env('DATABASE_URL'),
  },
})
```

The generated schema uses [the ESM-first `prisma-client` generator](/orm/prisma-schema/overview/generators#prisma-client) with a custom output path:

```prisma file=prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mongodb"
  url = env("DATABASE_URL")
}
```

Update your `.env` file with your MongoDB connection string:

```env file=.env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/mydb"
```

:::tip

Replace `username`, `password`, `cluster`, and `mydb` with your actual MongoDB credentials and database name. You can get your connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or your MongoDB deployment.

:::

## 5. Define your data model

Open `prisma/schema.prisma` and add the following models:

```prisma file=prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mongodb"
  url = env("DATABASE_URL")
}

//add-start
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  String  @db.ObjectId
}
//add-end
```

## 6. Push your schema to MongoDB

MongoDB doesn't support migrations like relational databases. Instead, use `db push` to sync your schema:

```terminal
npx prisma db push
```

This command:
- Creates the collections in MongoDB based on your schema
- Automatically generates Prisma Client

:::info

Unlike relational databases, MongoDB uses a flexible schema. The `db push` command ensures your Prisma schema is reflected in your database without creating migration files.

:::

## 7. Instantiate Prisma Client

Now that you have all the dependencies installed, you can instantiate Prisma Client:

```typescript file=lib/prisma.ts
import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient()

export { prisma }
```

## 8. Write your first query

Create a `script.ts` file to test your setup:

```typescript file=script.ts
import { prisma } from './lib/prisma'

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: {
          title: 'Hello World',
          content: 'This is my first post!',
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  })
  console.log('Created user:', user)

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.log('All users:', JSON.stringify(allUsers, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Run the script:

```terminal
npx tsx script.ts
```

You should see the created user and all users printed to the console!

## 9. Explore your data

You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), the MongoDB shell, or MongoDB Compass to view and manage your data.

[Prisma Studio](/orm/tools/prisma-studio) does not currently support MongoDB. Support may be added in a future release. See [Databases supported by Prisma Studio](/orm/tools/prisma-studio#databases-supported-by-prisma-studio) for more information.

## Next steps

<NextSteps />

## Troubleshooting

### `Error in connector: SCRAM failure: Authentication failed.`

If you see the `Error in connector: SCRAM failure: Authentication failed.` error message, you can specify the source database for the authentication by [adding](https://github.com/prisma/prisma/discussions/9994#discussioncomment-1562283) `?authSource=admin` to the end of the connection string.

### `Raw query failed. Error code 8000 (AtlasError): empty database name not allowed.`

If you see the `Raw query failed. Code: unknown. Message: Kind: Command failed: Error code 8000 (AtlasError): empty database name not allowed.` error message, be sure to append the database name to the database URL. You can find more info in this [GitHub issue](https://github.com/prisma/docs/issues/5562).

## More info

- [MongoDB database connector](/orm/overview/databases/mongodb)
- [MongoDB data modeling patterns](/orm/overview/databases/mongodb#type-mapping-between-mongodb-and-the-prisma-schema)
- [MongoDB deployment considerations](/orm/overview/databases/mongodb#differences-to-connectors-for-relational-databases)
