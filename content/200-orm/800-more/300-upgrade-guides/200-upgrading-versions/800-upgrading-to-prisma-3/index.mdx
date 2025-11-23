---
title: 'Upgrade to Prisma ORM 3'
metaTitle: 'Upgrade to Prisma ORM 3'
metaDescription: 'Guides on how to upgrade to Prisma ORM 3'
tocDepth: 3
toc: true
---

<TopBlock>

Prisma ORM 3 introduces a number of **breaking changes** if you are upgrading from an earlier version (any 2.x version), therefore, it is important to understand how this upgrade might affect your application and make any needed adjustments to ensure a smooth transition.

Below you will find a list of the breaking changes and how to handle them.

</TopBlock>

## Breaking changes

### [Referential actions](/orm/prisma-schema/data-model/relations/referential-actions)

The introduction of referential actions in version 3.x removes the safety net in Prisma Client that had previously prevented cascading deletes at runtime.

As a result, depending on which workflow you are using to work on your application, you could be impacted. We advise you to check your schema and decide if you need to define referential actions explicitly.

See [Referential action upgrade path](/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-3/referential-actions) to understand how to proceed.

### [Named constraints](/orm/prisma-schema/data-model/database-mapping)

We changed the convention followed by Prisma ORM to name constraints and indexes. We also introduced a clear distinction between the `map` attribute (database-level name) and `name` attribute (Prisma Client API name) in the PSL to explicitly control how constraints are defined in the Prisma schema.

This means that you will notice an impact when running Prisma `migrate` or `db pull` which will follow this new convention. We advise you to adjust your schema to reflect the names of your constraints and indexes appropriately.

You can check out the [Named constraints upgrade path](/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-3/named-constraints) for more information on how to proceed.

### [$queryRaw](/orm/prisma-client/using-raw-sql/raw-queries)

From version 3.x onwards, the `$queryRaw` method now only supports a template literal.

This means that if your application relied on `$queryRaw` calls using _strings_, those calls will **not** work anymore. We advise you to use template literals wherever possible for security reasons or resort to `$queryRawUnsafe` otherwise, after carefully escaping queries to prevent SQL injections.

You can learn more about the new `$queryRaw` and `$queryRawUnsafe` methods in the [Raw database access](/orm/prisma-client/using-raw-sql/raw-queries) section of the docs.

### [Json Null Equality](/orm/prisma-client/special-fields-and-types/working-with-json-fields#filtering-by-null-values)

You cannot filter a `Json` field by a null value. [See this GitHub issue](https://github.com/prisma/prisma/issues/8399).
This is because `{ equals: null }` checks if the column value in the database is `NULL`, not if the JSON value inside the column equals `null`.

To fix this problem, we decided to split null on Json fields into `JsonNull`, `DbNull` and `AnyNull`.

- **JsonNull**: Selects the null value in JSON.
- **DbNull**: Selects the NULL value in the database.
- **AnyNull:** Selects both null JSON values and NULL database values.

Given the following model in your Prisma Schema:

```ts
model Log {
  id Int @id
  meta Json
}
```

Starting in 3.0.1, you'll see a TypeError if you try to filter by null on a `Json` field:

```ts
prisma.log.findMany({
  where: {
    data: {
      meta: {
        equals: null
                ^ TypeError: Type 'null' is not assignable to type
        }
    },
  },
});
```

To fix this, you'll import and use one of the new null types:

```ts highlight=7;normal
import { Prisma } from '@prisma/client'

prisma.log.findMany({
  where: {
    data: {
      meta: {
        equals: Prisma.AnyNull,
      },
    },
  },
})
```

This also applies to `create`, `update` and `upsert`. To insert a `null` value
into a `Json` field, you would write:

```ts highlight=5;normal
import { Prisma } from '@prisma/client'

prisma.log.create({
  data: {
    meta: Prisma.JsonNull,
  },
})
```

And to insert a database `NULL` into a Json field, you would write:

```ts highlight=5;normal
import { Prisma } from '@prisma/client'

prisma.log.create({
  data: {
    meta: Prisma.DbNull,
  },
})
```

:::warning

This API change does not apply to the MongoDB connector where there is not a difference between a JSON null and a database NULL.

They also do not apply to the `array_contains` operator because there can only be a JSON null within an JSON array. Since there cannot be a database NULL within a JSON array, `{ array_contains: null }` is not ambiguous.

:::

## Specific upgrade paths

<Subsections />

## Upgrading the `prisma` and `@prisma/client` packages to Prisma ORM 3

To upgrade from version 2.x to 3.x, you need to update both the `prisma` and `@prisma/client` packages. Both the `prisma` and `@prisma/client` packages install with a caret `^` in their version number to safe guard against breaking changes.

To ignore the caret `^` and upgrade across major versions, you can use the `@3` tag when upgrading with `npm`, or `yarn` .

:::danger

Before upgrading, check each **breaking change** to see how the upgrade might affect your application.

:::

<TabbedContent code>

<TabItem value="npm">

```terminal
npm install prisma@3 @prisma/client@3
```

</TabItem>

<TabItem value="yarn">

```terminal
yarn up prisma@3 @prisma/client@3
```

</TabItem>

</TabbedContent>