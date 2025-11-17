---
title: 'Add Prisma ORM to an existing MongoDB project'
sidebar_title: 'MongoDB'
metaTitle: 'How to add Prisma ORM to an existing project using MongoDB (15 min)'
metaDescription: 'Add Prisma ORM to an existing TypeScript project with MongoDB and learn database introspection and querying.'
---

import Prerequisites from '../../_components/_prerequisites.mdx'
import ExploreData from '../../_components/_explore-data.mdx'
import NextSteps from '../../_components/_next-steps.mdx'

[MongoDB](https://www.mongodb.com/) is a popular document-based NoSQL database known for its flexibility, scalability, and developer-friendly features. In this guide, you will learn how to add Prisma ORM to an existing TypeScript project, connect it to MongoDB, introspect your existing database schema, and start querying with type-safe Prisma Client.

:::warning[MongoDB support for Prisma ORM v7]

**MongoDB support for Prisma ORM v7 is coming in the near future.** In the meantime, please use **Prisma ORM v6.19** (the latest v6 release) when working with MongoDB.

This guide uses Prisma ORM v6.19 to ensure full compatibility with MongoDB.

:::

:::tip

If you're migrating to Prisma ORM from Mongoose, see our [Migrate from Mongoose guide](/guides/migrate-from-mongoose).

:::

## Prerequisites

In order to successfully complete this guide, you need:

- [Node.js](https://nodejs.org/en/) installed on your machine (see [system requirements](/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-6#minimum-supported-nodejs-versions) for officially supported versions)
- An existing TypeScript project with a `package.json` file
- Access to a MongoDB 4.2+ server with a replica set deployment. We recommend using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

:::warning

The MongoDB database connector uses transactions to support nested writes. Transactions **requires** a [replica set](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/) deployment. The easiest way to deploy a replica set is with [Atlas](https://www.mongodb.com/docs/atlas/getting-started/). It's free to get started.

:::

Make sure you have your database [connection URL](/orm/reference/connection-urls) (that includes your authentication credentials) at hand!

:::note

If your project contains multiple directories with `package.json` files (e.g., `frontend`, `backend`, etc.), note that Prisma ORM is specifically designed for use in the API/backend layer. To set up Prisma, navigate to the appropriate backend directory containing the relevant `package.json` file and configure Prisma there.

:::

## 1. Set up Prisma ORM

Navigate to your existing project directory and install the required dependencies:

```terminal
npm install prisma@6.19 @types/node --save-dev
npm install @prisma/client@6.19 dotenv
```

Here's what each package does:

- **`prisma`** - The Prisma CLI for running commands like `prisma init`, `prisma db pull`, and `prisma generate`
- **`@prisma/client`** - The Prisma Client library for querying your database
- **`dotenv`** - Loads environment variables from your `.env` file

:::info[Why Prisma v6.19?]

This is the latest stable version of Prisma ORM v6 that fully supports MongoDB. MongoDB support for Prisma ORM v7 is coming soon.

You can also install `prisma@6` and `@prisma/client@6` to automatically get the latest v6 release.

:::

## 2. Initialize Prisma ORM

Set up your Prisma ORM project by creating your [Prisma Schema](/orm/prisma-schema) file with the following command:

```terminal
npx prisma init --datasource-provider mongodb --output ../generated/prisma
```

This command does a few things:

- Creates a `prisma/` directory with a `schema.prisma` file containing your database connection configuration
- Creates a `.env` file in the root directory for environment variables
- Creates a `prisma.config.ts` file for Prisma configuration

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

## 3. Connect your database

Update the `.env` file with your MongoDB connection URL:

```bash file=.env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/mydb"
```

For MongoDB Atlas, the connection URL format is:

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE
```

Self-hosted MongoDB connection URL format:

```
mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

Connection URL components:

- **`USERNAME`**: Your database user name
- **`PASSWORD`**: Your database user password
- **`HOST`**: The host where [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) or [`mongos`](https://www.mongodb.com/docs/manual/reference/program/mongos/#mongodb-binary-bin.mongos) is running
- **`PORT`**: The port where your database server is running (typically `27017`)
- **`DATABASE`**: The name of your database

:::tip

For MongoDB Atlas, you can manually append the database name to the connection URL, as Atlas doesn't include it by default.

:::

### Troubleshooting connection issues

#### `Error in connector: SCRAM failure: Authentication failed.`

If you see the `Error in connector: SCRAM failure: Authentication failed.` error message, you can specify the source database for the authentication by [adding](https://github.com/prisma/prisma/discussions/9994#discussioncomment-1562283) `?authSource=admin` to the end of the connection string.

#### `Raw query failed. Error code 8000 (AtlasError): empty database name not allowed.`

If you see the `Raw query failed. Code: unknown. Message: Kind: Command failed: Error code 8000 (AtlasError): empty database name not allowed.` error message, be sure to append the database name to the database URL. You can find more info in this [GitHub issue](https://github.com/prisma/docs/issues/5562).

## 4. Introspect your database

Run the following command to introspect your existing database:

```terminal
npx prisma db pull
```

This command:
- Reads the `DATABASE_URL` from your `.env` file
- Connects to your MongoDB database
- Samples documents in your collections to infer the schema
- Generates Prisma models in your `schema.prisma` file

![Introspect your database with Prisma ORM](/img/getting-started/prisma-db-pull-generate-schema.png)

:::info

**MongoDB introspection limitations:** Prisma introspects MongoDB by sampling documents. You may need to manually:
- Add relation fields using the `@relation` attribute
- Adjust field types if the sampling didn't capture all variations
- Add indexes and constraints not detected during introspection

:::

## 5. Generate Prisma ORM types

Generate Prisma Client based on your introspected schema:

```terminal
npx prisma generate
```

This creates a type-safe Prisma Client tailored to your database schema in the `generated/prisma` directory.

## 6. Instantiate Prisma Client

Create a utility file to instantiate Prisma Client:

```typescript file=lib/prisma.ts
import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient()

export { prisma }
```

## 7. Query your database

Now you can use Prisma Client to query your database. Create a `script.ts` file:

```typescript file=script.ts
import { prisma } from './lib/prisma'

async function main() {
  // Example: Fetch all records from a collection
  // Replace 'user' with your actual model name
  const allUsers = await prisma.user.findMany()
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

## 8. Evolve your schema

MongoDB doesn't support migrations like relational databases. Instead, use `db push` to sync schema changes:

### 8.1. Update your Prisma schema file

Modify your Prisma schema file with the changes you want. For example, add a new model:

```prisma file=prisma/schema.prisma
// add-start
model Post {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String   @db.ObjectId
  author    User     @relation(fields: [authorId], references: [id])
}

model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  name  String?
  posts Post[]
}
// add-end
```

:::info

In MongoDB, the `id` field is mapped to `_id` and uses `@db.ObjectId` type. Relations use `String` type with `@db.ObjectId` annotation.

:::

### 8.2. Push the changes to your database

```terminal
npx prisma db push
```

This command:
- Applies schema changes to your MongoDB database
- Automatically regenerates Prisma Client

:::info[Why `db push` instead of migrations?]

MongoDB uses a flexible schema model. Prisma Migrate (which creates migration files) is not supported for MongoDB. Always use `prisma db push` to sync your schema changes.

:::

## 9. Explore your data

You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), the MongoDB shell, or MongoDB Compass to view and manage your data.

[Prisma Studio](/orm/tools/prisma-studio) does not currently support MongoDB. Support may be added in a future release. See [Databases supported by Prisma Studio](/orm/tools/prisma-studio#databases-supported-by-prisma-studio) for more information.

## Next steps

<NextSteps />

## More info

- [MongoDB database connector](/orm/overview/databases/mongodb)
- [Prisma Config reference](/orm/reference/prisma-config-reference)
- [Database introspection](/orm/prisma-schema/introspection)
