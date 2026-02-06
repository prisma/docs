---
title: 'Add Prisma ORM to an existing SQL Server project'
sidebar_title: 'SQL Server'
metaTitle: 'How to add Prisma ORM to an existing project using SQL Server (15 min)'
metaDescription: 'Add Prisma ORM to an existing TypeScript project with SQL Server and learn database introspection, baselining, and querying.'
---

import Prerequisites from '../../_components/_prerequisites.mdx'
import ExploreData from '../../_components/_explore-data.mdx'
import NextSteps from '../../_components/_next-steps.mdx'

[SQL Server](https://www.microsoft.com/en-us/sql-server) is Microsoft's enterprise relational database management system known for its performance, security, and integration with Microsoft tools. In this guide, you will learn how to add Prisma ORM to an existing TypeScript project, connect it to SQL Server, introspect your existing database schema, and start querying with type-safe Prisma Client.

## Prerequisites

<Prerequisites />

## 1. Set up Prisma ORM

Navigate to your existing project directory and install the required dependencies:

```terminal
npm install prisma @types/node @types/mssql --save-dev
npm install @prisma/client @prisma/adapter-mssql dotenv
```

Here's what each package does:

- **`prisma`** - The Prisma CLI for running commands like `prisma init`, `prisma db pull`, and `prisma generate`
- **`@prisma/client`** - The Prisma Client library for querying your database
- **`@prisma/adapter-mssql`** - The SQL Server driver adapter that connects Prisma Client to your database
- **`dotenv`** - Loads environment variables from your `.env` file
- **`@types/mssql`** - TypeScript type definitions for mssql

## 2. Initialize Prisma ORM

Set up your Prisma ORM project by creating your [Prisma Schema](/orm/prisma-schema) file with the following command:

```terminal
npx prisma init --datasource-provider sqlserver --output ../generated/prisma
```

This command does a few things:

- Creates a `prisma/` directory with a `schema.prisma` file containing your database connection configuration
- Creates a `.env` file in the root directory for environment variables
- Creates a `prisma.config.ts` file for Prisma configuration

The generated `prisma.config.ts` file looks like this:

```typescript file=prisma.config.ts
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
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
  provider = "sqlserver"
}
```

## 3. Connect your database

Update the `.env` file with your SQL Server connection string details:

```bash file=.env
DATABASE_URL="sqlserver://localhost:1433;database=mydb;user=username;password=password;encrypt=true"
//add-start
DB_USER="username"
DB_PASSWORD="password"
DB_NAME="mydb"
HOST="localhost"
//add-end
```

Replace the placeholders with your actual database credentials:

- `localhost:1433`: Your SQL Server host and port
- `mydb`: Your database name
- `username`: Your SQL Server username
- `password`: Your SQL Server password

## 4. Introspect your database

Run the following command to introspect your existing database:

```terminal
npx prisma db pull
```

This command reads the `DATABASE_URL` environment variable, connects to your database, and introspects the database schema. It then translates the database schema from SQL into a data model in your Prisma schema.

![Introspect your database with Prisma ORM](/img/getting-started/prisma-db-pull-generate-schema.png)

After introspection, your Prisma schema will contain models that represent your existing database tables.

## 5. Baseline your database

To use Prisma Migrate with your existing database, you need to [baseline your database](/orm/prisma-migrate/getting-started).

First, create a `migrations` directory:

```terminal
mkdir -p prisma/migrations/0_init
```

Next, generate the migration file with `prisma migrate diff`:

```terminal
npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```

Review the generated migration file to ensure it matches your database schema.

Then, mark the migration as applied:

```terminal
npx prisma migrate resolve --applied 0_init
```

You now have a baseline for your current database schema.

## 6. Generate Prisma ORM types

Generate Prisma Client based on your introspected schema:

```terminal
npx prisma generate
```

This creates a type-safe Prisma Client tailored to your database schema in the `generated/prisma` directory.

## 7. Instantiate Prisma Client

Create a utility file to instantiate Prisma Client. You need to pass an instance of Prisma ORM's driver adapter to the `PrismaClient` constructor:

```typescript file=lib/prisma.ts
import "dotenv/config";
import { PrismaMssql } from '@prisma/adapter-mssql';
import { PrismaClient } from '../generated/prisma/client';

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.HOST,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

const adapter = new PrismaMssql(sqlConfig)
const prisma = new PrismaClient({ adapter });

export { prisma }
```

## 8. Query your database

Now you can use Prisma Client to query your database. Create a `script.ts` file:

```typescript file=script.ts
import { prisma } from './lib/prisma'

async function main() {
  // Example: Fetch all records from a table
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

## 9. Evolve your schema

To make changes to your database schema:

### 9.1. Update your Prisma schema file

Update your Prisma schema file to reflect the changes you want to make to your database schema. For example, add a new model:

```prisma file=prisma/schema.prisma
// add-start
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
  posts Post[]
}
// add-end
```

### 9.2. Create and apply a migration:

```terminal
npx prisma migrate dev --name your_migration_name
```

This command will:
- Create a new SQL migration file
- Apply the migration to your database
- Regenerate Prisma Client

## 10. Explore your data with Prisma Studio

<ExploreData />

## Next steps

<NextSteps />

## More info

- [SQL Server database connector](/orm/overview/databases/sql-server)
- [Prisma Config reference](/orm/reference/prisma-config-reference)
- [Database introspection](/orm/prisma-schema/introspection)
- [Prisma Migrate](/orm/prisma-migrate)
