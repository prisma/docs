---
title: 'Upgrade to Prisma ORM 4'
metaTitle: 'Upgrade to Prisma ORM 4'
metaDescription: 'Guides on how to upgrade to Prisma ORM 4'
tocDepth: 3
toc: true
---

<TopBlock>

Prisma ORM 4 introduces a number of **breaking changes** when you upgrade from an earlier Prisma ORM version. This guide explains how this upgrade might affect your application and gives instructions on how to handle any changes.

</TopBlock>

## Breaking changes

This section gives an overview of breaking changes in Prisma ORM 4, grouped under [general changes](#general-changes) that affect both the Prisma Schema and Prisma Client, [Schema changes](#schema-changes) and [Client changes](#client-changes).

We recommend that you first address any Prisma schema validation errors, then pull your database to reflect new Prisma schema capabilities, and finally fix any type errors in Prisma Client and validate by running your test suite.

### Upgrade your Prisma Schema

1. Carefully skim the list of changes and check if you are impacted by a breaking change.
2. Review the Prisma schema validation errors (via `npx prisma validate`, or via the Prisma VS Code extension).
   1. If you don't have validation errors, continue with step 3.
   2. If you have validation errors:
      1. Try to map the validation error to a change from the list below to understand which change caused the invalid Prisma schema, and read the linked instructions for how to upgrade. It can only come from:
         - [Explicit unique constraints for 1:1 relations](#explicit-unique-constraints-on-one-to-one-relations)
         - [Removed support for usage of `references` on implicit many-to-many relations](#disallow-references-syntax-for-implicit-many-to-many-relations)
         - [Enforced uniqueness of referenced fields in the `references` argument in one-to-one and one-to-many relations for MySQL and MongoDB](#enforced-use-of-unique-or-id-attribute-for-one-to-one-and-one-to-many-relations-mysql-and-mongodb)
         - Removal of undocumented support for the `type` alias
         - Removal of the `sqlite` protocol for SQLite URLs
         - [Better grammar for string literals](#better-grammar-for-string-literals)
3. Repeat until your Prisma schema is valid.
4. Run `npx prisma db pull` to upgrade the Prisma schema to all new capabilities (e.g. `extendedIndexes`).
5. Review changes of the Prisma schema and verify validity.
6. Continue with Prisma Client steps.

### Upgrade your use of Prisma Client

1. Carefully skim the [list of changes](#client-changes) to understand if you are impacted by a breaking change.
   1. If yes, read the detailed upgrade instructions.
   2. If no, proceed with 2.
2. Some API changes in Prisma Client are impacting runtime behavior, so please run your test suite.

Enjoy Prisma ORM 4!

### General changes

This section includes changes that affect both the Prisma Schema and Prisma Client.

#### Node.js minimum version change

From Prisma ORM version 4.0.0, the minimum version of Node.js that we support is 14.17.x. If you use an earlier version of Node.js, you will need to update it.

See our [system requirements](/orm/reference/system-requirements) for all minimum version requirements.

### Schema changes

This section includes changes that affect the Prisma Schema.

#### Index configuration

In Prisma ORM 4, the `extendedIndexes` Preview feature will now become generally available. This includes the following index configuration options:

- Length configuration of indexes, unique constraints and primary key constraints for MySQL (in Preview in versions 3.5.0 and later)
- Sort order configuration of indexes, unique constraints and primary key constraints (in Preview in versions 3.5.0 and later)
- New index types for PostgreSQL: Hash (in Preview in versions 3.6.0 and later) and GIN, GiST, SP-GiST and BRIN (in Preview in versions 3.14.0 and later)
- Index clustering for SQL Server (in Preview in versions 3.13.0 and later)

See our documentation on [Index configuration](/orm/prisma-schema/data-model/indexes#index-configuration) for more details of these features.

##### Upgrade path

These can all be breaking changes if you were previously configuring these properties at the database level. In this case, you will need to:

1. Upgrade to the new Prisma ORM 4 packages following [these instructions](#upgrade-the-prisma-and-prismaclient-packages-to-version-4)
1. Run `npx prisma db pull` afterwards to retrieve any existing configuration of indexes and constraints. This needs to be done before running any `npx prisma db push` or `npx prisma migrate dev` command, or you may lose any configuration that was defined in the database but not previously represented in the Prisma schema.

For more details, see the [Upgrading from previous versions](/orm/prisma-schema/data-model/indexes#upgrading-from-previous-versions) section of our index configuration documentation.

#### Scalar list defaults

For database connectors that support scalar lists (PostgreSQL, CockroachDB and MongoDB), Prisma ORM 4 introduces the ability to set a default value in your Prisma schema with the `@default` attribute:

<TabbedContent code>
<TabItem value="Relational databases">

```prisma highlight=4;normal
model User {
  id             Int      @id @default(autoincrement())
  posts          Post[]
  //highlight-next-line
  favoriteColors String[] @default(["red", "yellow", "purple"])
}
```

</TabItem>
<TabItem value="MongoDB">

```prisma highlight=4;normal
model User {
  id             String   @id @default(auto()) @map("_id") @db.ObjectId
  posts          Post[]
  //highlight-next-line
  favoriteColors String[] @default(["red", "yellow", "purple"])
}
```

</TabItem>
</TabbedContent>

##### Upgrade path

This is a breaking change if you previously had defaults defined for scalar lists at the database level. In this case, you will need to:

1. Upgrade to the new Prisma ORM 4 packages following [these instructions](#upgrade-the-prisma-and-prismaclient-packages-to-version-4)
1. Run `npx prisma db pull` afterwards to retrieve any existing configuration of indexes and constraints. This needs to be done before running any `npx prisma db push` or `npx prisma migrate dev` command, or you will lose any defaults that are defined in the database but not previously represented in the Prisma schema.

#### Explicit `@unique` constraints on one-to-one relations

When using one-to-one relations in Prisma ORM 4, you will need to explicitly add the `@unique` attribute to the relation scalar field. For example, for this one-to-one relation between a `User` and a `Profile` model, you will need to add the `@unique` attribute to the `profileId` field:

<TabbedContent code>
<TabItem value="Relational databases">

```prisma
model User {
  id        Int      @id @default(autoincrement())
  profile   Profile? @relation(fields: [profileId], references: [id])
  profileId Int?     @unique // <-- include this explicitly
}

model Profile {
  id   Int   @id @default(autoincrement())
  user User?
}
```

</TabItem>
<TabItem value="MongoDB">

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  profile   Profile? @relation(fields: [profileId], references: [id])
  profileId String?  @unique @db.ObjectId // <-- include this explicitly
}

model Profile {
  id   String @id @default(auto()) @map("_id") @db.ObjectId
  user User?
}
```

</TabItem>
</TabbedContent>

##### Upgrade path

After you upgrade to Prisma ORM 4, any one-to-one relations without a `@unique` attribute on the relation scalar will trigger a validation error. To upgrade, you will need to:

1. Upgrade to the new Prisma ORM 4 packages following [these instructions](#upgrade-the-prisma-and-prismaclient-packages-to-version-4)

1. Manually fix the validation errors in your Prisma schema by adding the explicit `@unique` or `@id` attribute to your data model.
1. Push the changes to your database using `prisma db push` for MongoDB or `prisma migrate dev` for MySQL.

#### Enforced use of `@unique` or `@id` attribute for one-to-one and one-to-many relations (MySQL and MongoDB)

When you use one-to-one and one-to-many relations in Prisma ORM 4, you will need to use a `@unique` attribute on the relation field to guarantee that the singular side(s) of the relation has only one record. This is now enforced for MySQL and MongoDB, bringing them into line with other connectors. Missing `@unique` attributes will now trigger a validation error.

In the following example of a _one-to-many relation_ between a `User` and `Post` model, the `@unique` attribute must be added to the `email` field:

<TabbedContent code>
<TabItem value="Relational databases">

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique // <-- we enforce this attribute
  posts Post[]
}

model Post {
  id          Int    @id @default(autoincrement())
  authorEmail String
  author      User   @relation(fields: [authorEmail], references: [email])
}
```

</TabItem>
<TabItem value="MongoDB">

```prisma
model User {
  id    Int    @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique // <-- we enforce this attribute
  posts Post[]
}

model Post {
  id          Int    @id @default(auto()) @map("_id") @db.ObjectId
  authorEmail String
  author      User   @relation(fields: [authorEmail], references: [email])
}
```

</TabItem>
</TabbedContent>

In the following example of a _one-to-one relation_ between a `User` and `Profile` model, the `@unique` attribute must be added to the `email` field:

<TabbedContent code>
<TabItem value="Relational databases">

```prisma
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique // <- we enforce this unique attribute
  profile   Profile @relation(fields: [profileId], references: [id])
  profileId Int
}

model Profile {
  id        Int     @id @default(autoincrement())
  userEmail String? @unique
  user      User?
}
```

</TabItem>
<TabItem value="MongoDB">

```prisma
model User {
  id        Int     @id @default(auto()) @map("_id") @db.ObjectId
  email     String  @unique // <- we enforce this unique attribute
  profile   Profile @relation(fields: [profileId], references: [id])
  profileId Int     @db.ObjectId
}

model Profile {
  id        Int     @id @default(auto()) @map("_id") @db.ObjectId
  userEmail String? @unique
  user      User?   @relation(fields: [userEmail], references: [email])
}
```

</TabItem>
</TabbedContent>

##### Upgrade path

After you upgrade to Prisma ORM 4, any one-to-one or one-to-many relations without a `@unique` or `@id` attribute on the relation field will trigger a validation error. To upgrade, you will need to:

1. Upgrade to the new Prisma ORM 4 packages following [these instructions](#upgrade-the-prisma-and-prismaclient-packages-to-version-4)
1. Manually fix the validation errors in your Prisma schema. Alternatively, if you have an up-to-date live database, running `npx prisma db pull` will add the `@unique` attributes automatically.

#### Disallow `references` syntax for implicit many-to-many relations

When using [implicit many-to-many relations](/orm/prisma-schema/data-model/relations/many-to-many-relations#implicit-many-to-many-relations) in Prisma ORM 4, you will no longer be able to use the `references` argument, which was previously optional. For example, the following relation would now trigger a validation error:

```prisma file=schema.prisma showLineNumbers
model Post {
  id         Int        @id @default(autoincrement())
  categories Category[] @relation("my-relation", references: [id]) // <-- validation error
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[] @relation("my-relation", references: [id]) // <-- validation error
}
```

Instead, you can write:

```prisma file=schema.prisma showLineNumbers
model Post {
  id         Int        @id @default(autoincrement())
  categories Category[] @relation("my-relation")
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[] @relation("my-relation")
}
```

This is because the only valid value for `references` was `id`, so removing this argument makes it clearer what can and cannot be changed.

##### Upgrade path

After you upgrade to Prisma ORM 4, any implicit many-to-many relations with a `references` argument will trigger a validation error. To upgrade, you will need to:

1. Upgrade to the new Prisma ORM 4 packages following [these instructions](#upgrade-the-prisma-and-prismaclient-packages-to-version-4)
1. Manually fix the validation errors in your Prisma schema. Alternatively, if you have an up-to-date live database, running `npx prisma db pull` will remove the `references` arguments automatically.

#### Better grammar for string literals

String literals in your Prisma Schema now need to follow the same rules as strings in JSON. This mostly changes the escaping of some special characters. More details can be found in [the JSON specification](https://www.ietf.org/rfc/rfc4627.txt) or on the [JSON website](https://www.json.org/json-en.html).

##### Upgrade path

This is a breaking change for some existing schemas. After you upgrade to Prisma ORM 4, incorrectly escaped characters will trigger a validation error. To upgrade, you will need to:

1. Upgrade to the new Prisma ORM 4 packages following [these instructions](#upgrade-the-prisma-and-prismaclient-packages-to-version-4)
1. Manually fix the validation errors in your Prisma schema.

### Client changes

This section includes changes that affect Prisma Client.

#### Raw query type mapping: scalar values are now deserialized as their correct JavaScript types

In versions 3.14.x and 3.15.x, [raw query type mapping](/orm/prisma-client/using-raw-sql/raw-queries#raw-query-type-mapping) was available with the Preview feature `improvedQueryRaw`. In version 4.0.0, we have made raw query type mapping Generally Available. You do not need to use `improvedQueryRaw` to get this functionality in versions 4.0.0 and later.

Raw queries now deserialize scalar values to their corresponding JavaScript types. Note that Prisma ORM infers types from the values themselves and not from the Prisma Schema types.

Example query and response:

```ts
const res =
  await prisma.$queryRaw`SELECT bigint, bytes, decimal, date FROM "Table";`
console.log(res) // [{ bigint: BigInt("123"), bytes: Buffer.from([1, 2]), decimal: new Prisma.Decimal("12.34"), date: Date("<some_date>") }]
```

##### Upgrade path

From version 4.0.0, some data types returned by `queryRaw` or `queryRawUnsafe` are different, as follows:

| Data type  | Before version 4.0.0  | From version 4.0.0    |
| ---------- | --------------------- | --------------------- |
| `DateTime` | Returned as `String`  | Returned as `Date`    |
| `Numeric`  | Returned as `Float`   | Returned as `Decimal` |
| `Bytes`    | Returned as `String`  | Returned as `Buffer`  |
| `Int64`    | Returned as `Integer` | Returned as `BigInt`  |

If you use `queryRaw` or `queryRawUnsafe` to return any of the above data types, then you must change your code to handle the new types.

For example, if you return `DateTime` data, then you need to take into account the following:

- You no longer need to manually instantiate a `DateTime` object for the returned data.
- If your code currently uses the returned `String` data, then you now need to convert the `DateTime` object to a `String`.

You must make equivalent code changes for the other data types in the table above.

#### Raw query mapping: PostgreSQL type-casts

In versions 3.14.x and 3.15.x, [raw query type mapping](/orm/prisma-client/using-raw-sql/raw-queries#raw-query-type-mapping) was available with the Preview feature `improvedQueryRaw`. In version 4.0.0, we have made raw query type mapping Generally Available. You do not need to use `improvedQueryRaw` to get this functionality in versions 4.0.0 and later.

Before version 4.0.0, many PostgreSQL type-casts did not work. We have tightened the type coercion rules so that all type-casts now work. As a result, some implicit casts now fail.

##### Upgrade path

We recommend that you re-test your use of `$queryRaw` to ensure that the types you pass into your raw queries match the types that PostgreSQL expects.

For example, in version 4.0.0, the following query fails:

```js
await prisma.$queryRaw`select length(${42});`
// ERROR: function length(integer) does not exist
// HINT: No function matches the given name and argument types. You might need to add explicit type casts.
```

This is because PostgreSQL’s `length` function expects `text` as input. Prisma ORM used to silently coerce `42` to `text`, but does not do this in version 4.0.0. To fix this, explicitly cast `42` to `text` as follows:

```js
await prisma.$queryRaw`select length(${42}::text);`
```

#### Raw query mapping: PostgreSQL and JavaScript integers

In versions 3.14.x and 3.15.x, [raw query type mapping](/orm/prisma-client/using-raw-sql/raw-queries#raw-query-type-mapping) was available with the Preview feature `improvedQueryRaw`. In version 4.0.0, we have made raw query type mapping Generally Available. You do not need to use `improvedQueryRaw` to get this functionality in versions 4.0.0 and later.

Prisma ORM sends JavaScript integers to PostgreSQL as `INT8`. This might conflict with your user-defined functions that accept only `INT4` as input.

##### Upgrade path

If you use `$queryRaw` or parametrized `$queryRawUnsafe`queries with a PostgreSQL database, do one of the following:

- Update the input types of any integers in your user-defined functions to `INT8`, or
- Cast any integers in your query parameters to `INT4`.

#### `DbNull`, `JsonNull` and `AnyNull` are now objects

JavaScript `null` is ambiguous for JSON columns, so Prisma ORM uses `DbNull`, `JsonNull`, and `AnyNull` to distinguish between the database `NULL` value and the JSON `null` value. Before version 4.0.0, `DbNull`, `JsonNull`, and `AnyNull` were string constants. From version 4.0.0, they are objects.

See [Filtering by null values](/orm/prisma-client/special-fields-and-types/working-with-json-fields#filtering-by-null-values) for more information.

##### Upgrade path

1. If you use literal strings to address these values, then you must replace them with the following named constants:

   - `DbNull`: replace with `Prisma.DbNull`
   - `JsonNull`: replace with `Prisma.JsonNull`
   - `AnyNull`: replace with `Prisma.AnyNull`

   If you already use these named constants, then you do not need to take any action.

1. If you now get a type error when you pass `Prisma.DbNull` as the value of a JSON field, then this probably indicates a bug in your code that our types did not catch before version 4.0.0. The field where you tried to store `DbNull` is probably not nullable in your schema. As a result, a literal `DbNull` string was stored in the database instead of `NULL`.
1. You might now encounter a type error or runtime validation error when you use `Prisma.DbNull`, `Prisma.JsonNull`, or `Prisma.AnyNull` with MongoDB. This was never valid, but was silently accepted prior to Prisma ORM 4. You need to review your data and change these fields to `null`.
1. If you pass in dynamic JSON to a JSON column in Prisma Client (for example `prisma.findMany({where: { jsonColumn: someJson } })`), then you must check that `someJson`cannot be the string "DBNull", "JsonNull", or "AnyNull". If it is any of these values, then the query will return different results in version 4.0.0.

#### Default fields on composite types in MongoDB

From version 4.0.0, if you carry out a database read on a composite type when all of the following conditions are true, then Prisma Client inserts the default value into the result.

Conditions:

- A field on the composite type is required, and
- this field has a default value, and
- this field is not present in the returned document or documents.

This behavior is now consistent with the behavior for model fields.

To learn more, see [Default values for required fields on composite types](/orm/prisma-client/special-fields-and-types/composite-types#default-values-for-required-fields-on-composite-types).

##### Upgrade path

If you currently rely on a return value of `null`, then you need to refactor your code to handle the default value that is now returned in Prisma ORM 4.

#### Rounding errors on big numbers in SQLite

SQLite is a loosely-typed database. If your schema has a field with type `Int`, then Prisma ORM prevents you from inserting a value larger than an integer. However, nothing prevents the database from directly accepting a bigger number. These manually-inserted big numbers cause rounding errors when queried.

To avoid this problem, Prisma ORM version 4.0.0 and later checks numbers on the way out of the database to verify that they fit within the boundaries of an integer. If a number does not fit, then Prisma ORM throws a P2023 error, such as:

```
Inconsistent column data: Conversion failed:
Value 9223372036854775807 does not fit in an INT column,
try migrating the 'int' column type to BIGINT
```

##### Upgrade path

If you use Prisma ORM in conjunction with SQLite, then you need to find any code that queries `Int` fields and ensure that it handles any P2023 errors that might be returned.

#### Prisma ORM no longer exports `Prisma.dmmf.schema` into the generated Prisma Client

From version 4.0.0, Prisma ORM no longer exports `Prisma.dmmf.schema` into the generated Prisma Client. This makes the generated Prisma Client much more efficient, and also avoids some memory leaks with Jest.

Note:

- This change does not affect the DMMF that Prisma ORM passes to the generators.
- You can use `getDmmf()`from `@prisma/internals` to access the schema property.
- We still export `Prisma.dmmf.datamodel` into the generated Prisma Client.

## Upgrade the `prisma` and `@prisma/client` packages to version 4

To upgrade to Prisma ORM 4 from an earlier version, you need to update both the `prisma` and `@prisma/client` packages. Both the `prisma` and `@prisma/client` packages install with a caret `^` in their version number. This allows upgrades to new minor versions, but not major versions, to safeguard against breaking changes.

To ignore the caret `^` and upgrade across major versions, you can use the `@4` tag when you upgrade with `npm`, or `yarn`:

:::danger

Before you upgrade, check each **breaking change** to see how the upgrade might affect your application.

:::

<TabbedContent code>

<TabItem value="npm">

```terminal
npm install prisma@4 @prisma/client@4
```

</TabItem>

<TabItem value="yarn">

```terminal
yarn up prisma@4 @prisma/client@4
```

</TabItem>

</TabbedContent>

## Video guide

For a video walkthrough of the upgrade process and examples of upgrade scenarios, see our recorded livestream on upgrading to Prisma ORM 4:

<div class="videoWrapper">

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/FSjkBrfaoEY"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

</div>
