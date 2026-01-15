---
title: 'Neon'
metaTitle: 'Neon'
metaDescription: 'Guide to Neon'
tocDepth: 2
toc: true
---

This guide explains how to:

- [Connect Prisma ORM using Neon's connection pooling feature](#how-to-use-neons-connection-pooling)
- [Resolve connection timeout issues](#resolving-connection-timeouts)
- [Use Neon's serverless driver with Prisma ORM](#how-to-use-neons-serverless-driver-with-prisma-orm)

## What is Neon?

[Neon](https://neon.tech/) is a fully managed serverless PostgreSQL with a generous free tier. Neon separates storage and compute, and offers modern developer features such as serverless, branching, bottomless storage, and more. Neon is open source and written in Rust.

Learn more about Neon [here](https://neon.tech/docs/introduction).

## Commonalities with other database providers

Many aspects of using Prisma ORM with Neon are just like using Prisma ORM with any other PostgreSQL database. You can:

- model your database with the [Prisma Schema Language](/orm/prisma-schema)
- use Prisma ORM's [`postgresql` database connector](/orm/overview/databases/postgresql) in your schema, along with the [connection string Neon provides you](https://neon.tech/docs/connect/connect-from-any-app)
- use [Introspection](/orm/prisma-schema/introspection) for existing projects if you already have a database schema on Neon
- use [`prisma migrate dev`](/orm/prisma-migrate/workflows/development-and-production) to track schema migrations in your Neon database
- use [`prisma db push`](/orm/prisma-migrate/workflows/prototyping-your-schema) to push changes in your schema to Neon
- use [Prisma Client](/orm/prisma-client) in your application to communicate with the database hosted by Neon

## Differences to consider

There are a few differences between Neon and PostgreSQL you should be aware of the following when deciding to use Neon with Prisma ORM:

- **Neon's serverless model** — By default, Neon scales a [compute](https://neon.tech/docs/introduction/compute-lifecycle) to zero after 5 minutes of inactivity. During this state, a compute instance is in _idle_ state. A characteristic of this feature is the concept of a "cold start". Activating a compute from an idle state takes from 500ms to a few seconds. Depending on how long it takes to connect to your database, your application may timeout. To learn more, see: [Connection latency and timeouts](https://neon.tech/docs/guides/prisma#connection-timeouts).
- **Neon's connection pooler** — Neon offers connection pooling using PgBouncer, enabling up to 10,000 concurrent connections. To learn more, see: [Connection pooling](https://neon.tech/docs/connect/connection-pooling).

## How to use Neon's connection pooling

If you would like to use the [connection pooling](https://neon.tech/docs/guides/prisma#use-connection-pooling-with-prisma) available in Neon, you will
need to add `-pooler` in the hostname of the connection string that Prisma Client uses via a driver adapter:

```bash file=.env
# Connect to Neon with Pooling.
DATABASE_URL=postgres://daniel:<password>@ep-mute-rain-952417-pooler.us-east-2.aws.neon.tech:5432/neondb?sslmode=require
```

Prisma CLI commands (for example, `prisma migrate` or `prisma db pull`) now read the direct connection string from `prisma.config.ts`. Configure both a pooled and non-pooled environment variable:

```env file=.env highlight=5-6;add showLineNumbers
# Connect to Neon with pooling (used by Prisma Client via the adapter).
DATABASE_URL=postgres://daniel:<password>@ep-mute-rain-952417-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require

# Direct connection to the database used by the Prisma CLI.
DIRECT_URL="postgres://daniel:<password>@ep-mute-rain-952417.us-east-2.aws.neon.tech/neondb"
```

Point `prisma.config.ts` to the direct connection string:

```ts file=prisma.config.ts showLineNumbers
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DIRECT_URL'),
  },
})
```

At runtime, instantiate Prisma Client with the pooled connection string using `@prisma/adapter-neon`:

```ts file=src/db/client.ts showLineNumbers
import { PrismaClient } from '../prisma/generated/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({ adapter })
```

:::info

We strongly recommend using the pooled connection string in your `DATABASE_URL` environment variable. You will gain the great developer experience of the Prisma CLI while also allowing for connections to be pooled regardless of deployment strategy. While this is not strictly necessary for every app, serverless solutions will inevitably require connection pooling.

:::

## Resolving connection timeouts

A connection timeout that occurs when connecting from Prisma ORM to Neon causes an error similar to the following:

```text no-copy
Error: P1001: Can't reach database server at `ep-white-thunder-826300.us-east-2.aws.neon.tech`:`5432`
Please make sure your database server is running at `ep-white-thunder-826300.us-east-2.aws.neon.tech`:`5432`.
```

This error most likely means that the connection created by Prisma Client timed out before the Neon compute was activated.

A Neon compute has two main states: _Active_ and _Idle_. Active means that the compute is currently running. If there is no query activity for 5 minutes, Neon places a compute into an idle state by default. Refer to Neon's docs to [learn more](https://neon.tech/docs/introduction/compute-lifecycle).

When you connect to an idle compute from Prisma ORM, Neon automatically activates it. Activation typically happens within a few seconds but added latency can result in a connection timeout. To address this issue, your can adjust your Neon connection string by adding a `connect_timeout` parameter. This parameter defines the maximum number of seconds to wait for a new connection to be opened. The default value is 5 seconds. A higher setting should provide the time required to avoid connection timeout issues. For example:

```text wrap
DATABASE_URL=postgres://daniel:<password>@ep-mute-rain-952417.us-east-2.aws.neon.tech/neondb?connect_timeout=10
```

:::info

A `connect_timeout` setting of 0 means no timeout.

:::

Another possible cause of connection timeouts is Prisma ORM's [connection pool](/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool), which has a default timeout of 10 seconds. This is typically enough time for Neon, but if you are still experiencing connection timeouts, you can try increasing this limit (in addition to the `connect_timeout` setting described above) by setting the `pool_timeout` parameter to a higher value. For example:

```text wrap
DATABASE_URL=postgres://daniel:<password>@ep-mute-rain-952417.us-east-2.aws.neon.tech/neondb?connect_timeout=15&pool_timeout=15
```

## How to use Neon's serverless driver with Prisma ORM

The [Neon serverless driver](https://github.com/neondatabase/serverless) is a low-latency Postgres driver for JavaScript and TypeScript that allows you to query data from serverless and edge environments over HTTP or WebSockets in place of TCP.

You can use Prisma ORM along with the Neon serverless driver using a [driver adapter](/orm/overview/databases/database-drivers#driver-adapters) . A driver adapter allows you to use a different database driver from the default Prisma ORM provides to communicate with your database.

:::info

This feature has been Generally Available since Prisma ORM [v6.16.0](https://pris.ly/release/6.16.0).

:::

To get started, istall the Prisma ORM adapter for Neon:

```terminal
npm install @prisma/adapter-neon
```

Update your Prisma Client instance:

```ts
import { PrismaClient } from '../prisma/generated/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import dotenv from 'dotenv'

dotenv.config()
const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })
```

You can then use Prisma Client as you normally would with full type-safety. Prisma Migrate, introspection, and Prisma Studio will continue working as before, using the connection string defined in the Prisma schema.

### Notes

#### Configuring the schema for Prisma queries (most common case)

In Prisma 7, you configure the schema that Prisma uses when generating queries by passing a `schema` option when creating the `PrismaNeon` instance. This is the recommended approach for most users who previously used the `schema` URL parameter in Prisma 6.

```ts
const adapter = new PrismaNeon(
  { connectionString },
  { schema: 'myPostgresSchema' }  // Optional: specify the default schema
)
```

:::note
**For Prisma 6 users**: In Prisma 6, you may have used a `?schema=` parameter in your connection URL. In Prisma 7, you must use the `schema` option shown above instead. This change makes the schema configuration more explicit and consistent across database adapters.
:::

#### Configuring the search path for raw SQL queries (less common case)

If you need to set the search path for raw SQL queries (where you refer to tables without schema qualification), use PostgreSQL's native `options` parameter in your connection string. This is only necessary if you're using raw queries that reference tables without their schema name.

```
postgresql://user:pass@host:5432/db?options=-c%20search_path%3Dmyschemaname
```

or with the alternative syntax:

```
postgresql://user:pass@host:5432/db?options=--search_path%3Dmyschemaname
```

Both syntaxes are supported by the underlying `pg` driver. This approach is only needed for raw SQL queries - for Prisma Client queries, use the `schema` option shown above.
