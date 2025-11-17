---
title: 'Use Prisma Postgres with TypeORM'
sidebar_label: 'TypeORM'
metaTitle: 'Quickstart: TypeORM with Prisma Postgres (10 min)'
metaDescription: 'Get started with TypeORM and Prisma Postgres by connecting your TypeScript ORM to a managed PostgreSQL database.'
---

[TypeORM](https://typeorm.io) is a TypeScript ORM. In this guide, you'll learn how to connect TypeORM to [Prisma Postgres](/postgres).

## Prerequisites

- Node.js version 16 or higher
- TypeScript version 4.5 or higher

## 1. Generate a TypeORM project

Use the TypeORM CLI to generate a starter project:

```terminal
npx typeorm init --name typeorm-quickstart --database postgres
```

This command will generate a new project with the following structure:

```
typeorm-quickstart
├── src
│   ├── entity
│   │   └── User.ts       # Sample entity
│   ├── migration         # Migrations folder
│   ├── data-source.ts    # Data source configuration
│   └── index.ts          # Application entry point
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## 2. Install dependencies

Navigate to the project directory and install dependencies:

```terminal
cd typeorm-quickstart
npm install
```

Install dotenv to load environment variables:

```terminal
npm install dotenv
```

## 3. Create a Prisma Postgres database

You can create a Prisma Postgres database using the `create-db` CLI tool. Follow these steps to create your Prisma Postgres database:

```terminal
npx create-db
```

Then the CLI tool should output:

```terminal
┌  🚀 Creating a Prisma Postgres database
│
│  Provisioning a temporary database in us-east-1...
│
│  It will be automatically deleted in 24 hours, but you can claim it.
│
◇  Database created successfully!
│
│
●  Database Connection
│
│
│    Connection String:
│
│    postgresql://hostname:password@db.prisma.io:5432/postgres?sslmode=require
│
│
◆  Claim Your Database
│
│    Keep your database for free:
│
│    https://create-db.prisma.io/claim?CLAIM_CODE
│
│    Database will be deleted on 11/18/2025, 1:55:39 AM if not claimed.
│
└  
```

Create a `.env` file and add the connection string from the output:

```env file=.env
DATABASE_URL="postgresql://hostname:password@db.prisma.io:5432/postgres?sslmode=require"
```

:::warning

**Never commit `.env` files to version control.** Add `.env` to your `.gitignore` file to keep credentials secure.

:::

The database created is temporary and will be deleted in 24 hours unless claimed. Claiming moves the database into your [Prisma Data Platform](https://console.prisma.io) account. Visit the claim URL from the output to keep your database.

:::note

To learn more about the `create-db` CLI tool, see the [create-db documentation](/postgres/introduction/npx-create-db).

:::

## 4. Configure database connection

Update the `src/data-source.ts` file to use your Prisma Postgres connection:

```typescript file=src/data-source.ts
import "reflect-metadata"
// add-start
import "dotenv/config";
// add-end
import { DataSource } from "typeorm"
import { User } from "./entity/User"

// add-start
// Parse DATABASE_URL into connection parameters
function parseConnectionString(url: string) {
  const parsed = new URL(url)
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port),
    username: parsed.username,
    password: parsed.password,
    database: parsed.pathname.slice(1), // Remove leading '/'
  }
}

const connectionParams = parseConnectionString(process.env.DATABASE_URL!)
// add-end

export const AppDataSource = new DataSource({
  type: "postgres",
  // delete-start
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  // delete-end
  // add-start
  ...connectionParams,
  ssl: true,
  // add-end
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
})
```

## 5. Run the application

Start the application:

```terminal
npm start
```

You should see output indicating the connection was successful and a new user was inserted into the database:

```terminal
Inserting a new user into the database...
Saved a new user with id: 1
Loading users from the database...
Loaded users:  [ User { id: 1, firstName: 'Timber', lastName: 'Saw', age: 25 } ]
```

## Next steps

You've successfully connected TypeORM to Prisma Postgres! For more advanced features like entities, migrations, and queries, see the [TypeORM documentation](https://typeorm.io/docs/getting-started).
