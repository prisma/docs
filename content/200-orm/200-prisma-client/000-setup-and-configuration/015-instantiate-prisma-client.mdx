---
title: 'Instantiating Prisma Client'
metaTitle: 'Instantiating Prisma Client'
metaDescription: 'How to create and use an instance of PrismaClient in your app.'
tocDepth: 3
---

The following example demonstrates how to import and instantiate your [generated client](/orm/prisma-client/setup-and-configuration/generating-prisma-client) from the [default path](/orm/prisma-client/setup-and-configuration/generating-prisma-client#using-a-custom-output-path):

<TabbedContent code>

<TabItem value="TypeScript">

```ts
import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient()
```

</TabItem>

<TabItem value="JavaScript">

```js
const { PrismaClient } = require('../prisma/generated/client')

const prisma = new PrismaClient()
```

</TabItem>

</TabbedContent>

:::tip

You can further customize `PrismaClient` with [constructor parameters](/orm/reference/prisma-client-reference#prismaclient) — for example, set [logging levels](/orm/prisma-client/observability-and-logging/logging), [transaction options](/orm/prisma-client/queries/transactions#transaction-options) or customize [error formatting](/orm/prisma-client/setup-and-configuration/error-formatting).

:::

## The number of `PrismaClient` instances matters

Your application should generally only create **one instance** of `PrismaClient`. How to achieve this depends on whether you are using Prisma ORM in a [long-running application](/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-long-running-applications) or in a [serverless environment](/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-serverless-environments) .

The reason for this is that each instance of `PrismaClient` manages a connection pool, which means that a large number of clients can **exhaust the database connection limit**. This applies to all database connectors.

If you use the **MongoDB connector**, connections are managed by the MongoDB driver connection pool. If you use a **relational database connector**, connections are managed by Prisma ORM's [connection pool](/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool). Each instance of `PrismaClient` creates its own pool.

1. Each client creates its own instance of the [query engine](/orm/more/under-the-hood/engines).
1. Each query engine creates a [connection pool](/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool) with a default pool size of:

   - `num_physical_cpus * 2 + 1` for relational databases
   - [`100` for MongoDB](https://www.mongodb.com/docs/manual/reference/connection-string-options/#mongodb-urioption-urioption.maxPoolSize)

1. Too many connections may start to **slow down your database** and eventually lead to errors such as:

   ```
   Error in connector: Error querying the database: db error: FATAL: sorry, too many clients already
       at PrismaClientFetcher.request
   ```
