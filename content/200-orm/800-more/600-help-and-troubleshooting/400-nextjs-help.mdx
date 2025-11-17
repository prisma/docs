---
title: "Comprehensive Guide to Using Prisma ORM with Next.js"
sidebar_label: "Using Prisma ORM with Next.js"
description: "Learn best practices, monorepo strategies, and dynamic usage techniques for Prisma ORM in Next.js applications."
tags:
  - Prisma
  - Next.js
  - ORM
  - Monorepo
  - Dynamic Usage
  - Best Practices
---

Prisma ORM and Next.js form a powerful combination for building modern, server-side rendered, and API-driven web applications. This guide consolidates various tips and strategies to help you maximize their potential. Whether you’re looking for best practices, monorepo setup guidance, or strategies for dynamic usage, we’ve got you covered.

---

## Best practices for using Prisma Client in development

### Avoid multiple Prisma Client instances

When developing a Next.js application, one common issue is accidentally creating multiple instances of the Prisma Client. This often occurs due to Next.js’s hot-reloading feature in development.

#### Why this happens

Next.js’s hot-reloading feature reloads modules frequently to reflect code changes instantly. However, this can lead to multiple instances of Prisma Client being created, which consumes resources and might cause unexpected behavior.

#### Recommended solution

To avoid this, create a single Prisma Client instance by using a global variable:

```typescript
// lib/prisma.ts
import { PrismaClient } from "../prisma/generated/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

Using this approach ensures that only one instance of Prisma Client exists, even during hot-reloading in development.

---

## Setting Up Prisma ORM in a Monorepo

### Challenges of using Prisma ORM in monorepos

Monorepos allow multiple projects to share code and dependencies, making them a popular choice for modern development. However, using Prisma ORM in a monorepo can present challenges related to dependency resolution and schema management.

#### Key issues

1. **Dependency Resolution**: Multiple packages in a monorepo might lead to conflicts if they use different version of Prisma ORM.
2. **Schema Centralization**: Managing a single Prisma Schema across multiple projects can be complex.

#### Best practices for monorepo integration

- **Centralize the Prisma Schema**: Place the `schema.prisma` file in a shared package, such as `@myorg/db`, to ensure consistency.
- **Use a custom output directory for generated client**: Define a [custom output directory](/orm/prisma-client/setup-and-configuration/generating-prisma-client#using-a-custom-output-path) for the generated Prisma Client to maintain consistency across packages.
- **Install dependencies in the root**: To prevent version conflicts, install Prisma ORM at the root of the monorepo. If individual packages need direct access to Prisma (e.g., for local client generation), install it within those packages as well. You can use a monorepo tool like Turborepo, following its [best practices](https://turbo.build/repo/docs/crafting-your-repository/managing-dependencies#keeping-dependencies-on-the-same-version), or adopt a similar strategy to keep dependencies synchronized across your app.
- **Use NPM Scripts for Generation**:

  ```json
    {
      "scripts": {
        "prisma:generate": "prisma generate --schema=./packages/db/schema.prisma"
      }
    }
  ```

This approach keeps your Prisma Schema and generated client in sync across all projects in the monorepo.

---

## Dynamic usage of Prisma Client in Next.js

### Handling dynamic scenarios

Dynamic use cases, such as working with tenant-specific databases, require additional consideration when using Prisma ORM with Next.js.

#### Problem

Each tenant might have its own database, necessitating the creation of separate Prisma Clients at runtime. This can be complex in Next.js due to its hybrid rendering model.

#### Solution

Use a factory function to dynamically create Prisma Clients based on tenant-specific configurations:

```typescript
// lib/prismaDynamic.ts
import { PrismaClient } from "../prisma/generated/client";

type TenantConfig = {
  databaseUrl: string;
};

export function createPrismaClient(config: TenantConfig): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: config.databaseUrl,
      },
    },
  });
}
```

Ensure that you manage the lifecycle of dynamically created Prisma Clients to avoid resource exhaustion.

