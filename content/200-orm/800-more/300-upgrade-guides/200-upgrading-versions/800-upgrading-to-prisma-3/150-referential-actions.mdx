---
title: 'Referential actions upgrade path'
metaTitle: 'Referential actions upgrade path'
metaDescription: 'Guides on how to deal with referential actions using Prisma Introspect or Prisma Migrate when upgrading to Prisma 3'
tocDepth: 4
toc_max_heading_level: 4
toc: true
---

<TopBlock>

Prisma ORM version 2.x prevents deletion of connected records in some Prisma Client functions, and does not let you configure referential actions in your Prisma Schema to change that behavior.

Prisma ORM version 3.x and later lets you control what should happen when deleting or updating records by explicitly setting referential actions on your models' relations. After the upgrade, Prisma Client will not enforce any referential actions anymore, and any action written to the database foreign keys will define the behavior when deleting or updating records.

Prisma Migrate 3.x will use the actions previously done by Prisma Client as the new default when writing the foreign key constraints to the database.

</TopBlock>

## Prisma ORM 2.x behavior

When invoking the [`delete()`](/orm/prisma-client/queries/crud#delete-a-single-record) or [`deleteAll()`](/orm/prisma-client/queries/crud#delete-all-records) methods using Prisma Client on required relations, a runtime check is performed and the deletion of records prevented if they are referencing related objects. **This prevents cascade behavior, no matter how the foreign key is defined**.

The behavior in Prisma ORM 2, without upgrading, does not allow setting referential actions at all. [See Prisma ORM 2.x default referential actions](#prisma-orm-2x-default-referential-actions)

If you need to actually use the cascade behavior configured in the database, you _can_ use [`raw`](/orm/prisma-client/using-raw-sql/raw-queries) SQL queries to [delete multiple referenced records](/orm/prisma-client/queries/crud#deleting-all-data-with-raw-sql--truncate). This is because Prisma Client will **not** perform runtime checks on raw queries.

### Prisma ORM 2.x default referential actions

Below are the default referential actions written to the database foreign keys when using Prisma Migrate versions 2.x:

| Clause     | Optional relations | Mandatory relations |
| :--------- | :----------------- | :------------------ |
| `onDelete` | `SetNull`          | `Cascade`           |
| `onUpdate` | `Cascade`          | `Cascade`           |

On top of the database referential actions, the following actions are enforced in Prisma Client versions 2.x:

| Clause     | Optional relations | Mandatory relations |
| :--------- | :----------------- | :------------------ |
| `onDelete` | `SetNull`          | `Restrict`          |
| `onUpdate` | `Cascade`          | `Cascade`           |

## Upgrade paths

There are a couple of paths you can take when upgrading which will give different results depending on the desired outcome.

If you currently use the migration workflow, you can run `prisma db pull` to check how the defaults are reflected in your schema. You can then manually update your database if you need to.

You can also decide to skip checking the defaults and run a migration to update your database with the new default values.

### Using Introspection

If you [Introspect](/orm/prisma-schema/introspection) your database, the referential actions configured at the database level will be reflected in your Prisma Schema. If you have been using Prisma Migrate or `prisma db push` to manage the database schema, these are likely to be the [\<=2.25.0 default values](#prisma-orm-2x-default-referential-actions).

When you run an Introspection, Prisma ORM compares all the foreign keys in the database with the schema, if the SQL statements `ON DELETE` and `ON UPDATE` do **not** match the default values, they will be explicitly set in the schema file.

After introspecting, you can review the non-default clauses in your schema. The most important clause to review is `onDelete`, which defaults to `Cascade` in version 2.25.0 and earlier.

:::danger

If you are using either the [`delete()`](/orm/prisma-client/queries/crud#delete-a-single-record) or [`deleteAll()`](/orm/prisma-client/queries/crud#delete-all-records) methods, **cascading deletes will now be performed, as the safety net in Prisma Client that previously prevented cascading deletes at runtime is removed**. Be sure to check your code and make any adjustments accordingly.

:::

Make sure you are happy with every case of `onDelete: Cascade` in your schema. If not, either:

- Modify your Prisma schema and `db push` or `dev migrate` to change the database _or_
- Manually update the underlying database if you only use `prisma db pull` in your workflow

The following example would result in a cascading delete, meaning that if the `User` is deleted then all of their `Post`'s will be deleted too.

#### A blog schema example

```prisma highlight=4;add
model Post {
  id       Int    @id @default(autoincrement())
  title    String
  //add-next-line
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId Int
}

model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

### Using Migration

When running a [Migration](/orm/prisma-migrate) (or the [`prisma db push`](/orm/prisma-migrate/workflows/prototyping-your-schema) command) the [new defaults](/orm/prisma-schema/data-model/relations/referential-actions#referential-action-defaults) will be applied to your database.

:::info

Unlike when you run `prisma db pull` for the first time, the new referential actions clause and property will **not** automatically be added to your Prisma schema by the Prisma VSCode extension.
You will have to manually add them if you wish to use anything other than the new defaults.

:::

Explicitly defining referential actions in your Prisma schema is optional. If you do not explicitly define a referential action for a relation, Prisma ORM uses the [new defaults](/orm/prisma-schema/data-model/relations/referential-actions#referential-action-defaults).

Note that referential actions can be added on a case by case basis. This means that you can add them to one single relation and leave the rest set to the defaults by not manually specifying anything.

### Checking for errors

**Before** upgrading to version 3.0.1 (or versions 2.26.0 and above with the `referentialActions` feature flag enabled), Prisma ORM prevented the deletion of records while using `delete()` or `deleteMany()` to preserve referential integrity. A custom runtime error would be thrown by Prisma Client with the error code `P2014`.

**After** upgrading, Prisma ORM no longer performs runtime checks. You can instead specify a custom referential action to preserve the referential integrity between relations.

When you use [`NoAction`](/orm/prisma-schema/data-model/relations/referential-actions#noaction) or [`Restrict`](/orm/prisma-schema/data-model/relations/referential-actions#restrict) to prevent the deletion of records, the error messages will be different in versions 3.0.1 and above (or 2.26.0 with the `referentialActions` feature flag enabled) compared to versions prior to that. This is because they are now triggered by the database and **not** Prisma Client. The new error code that can be expected is `P2003`, so you should check your code to make adjustments accordingly.

#### Example of catching errors

The following example uses the below blog schema with a 1-m relationship between `Post` and `User` and sets a [`Restrict`](/orm/prisma-schema/data-model/relations/referential-actions#restrict) referential actions on the `author` field.

This means that if a user has a post, that user (and their posts) **cannot** be deleted.

```prisma file=schema.prisma showLineNumbers
model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Restrict)
  authorId String
}

model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

Prior to upgrading, the error code you would receive when trying to delete a user which has posts would be `P2014` and it's message:

> "The change you are trying to make would violate the required relation '\{relation_name}' between the \{model_a_name} and \{model_b_name} models."

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.user.delete({
      where: {
        id: 'some-long-id',
      },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2014') {
        console.log(error.message)
      }
    }
  }
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

To make sure you are checking for the correct errors in your code, modify your check to look for `P2003`, which will deliver the message:

> "Foreign key constraint failed on the field: \{field_name}"

```ts highlight=14;delete|15;add
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.user.delete({
      where: {
        id: 'some-long-id'
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //delete-next-line
      if (error.code === 'P2014') {
      //add-next-line
      if (error.code === 'P2003') {
        console.log(error.message)
      }
    }
  }
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
