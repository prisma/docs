---
title: 'jsonProtocol changes'
metaTitle: 'Upgrade to jsonProtocol in Prisma ORM 5'
metaDescription: 'Changes that need to be made to your app in Prisma ORM 5 due to the jsonProtocol'
tocDepth: 2
toc: true
---

<TopBlock>

As of Prisma ORM version 5.0.0, the new `jsonProtocol` is the default. There are some changes that directly result from this change and a few changes that are related to the new protocol.

A full list of Prisma ORM 5 changes can be found [in our release notes](https://github.com/prisma/prisma/releases/tag/5.0.0).

</TopBlock>

## `jsonProtocol` specific changes

Below are changes that result directly from the `jsonProtocol` feature becoming the default in Prisma ORM 5.

### Removal of `jsonProtocol` Preview Feature

In Prisma ORM 5, `jsonProtocol` is the default and only protocol in Prisma Client. The `jsonProtocol` Preview feature is no longer needed.

Prisma ORM 4 and lower:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["jsonProtocol"]
}
```

Prisma ORM 5:

```prisma
generator client {
  provider = "prisma-client-js"
}
```

### Improved error messages

Due to the switch to the new protocol, several error messages have been improved. For example, the following error message in Prisma ORM 4 and below:

```terminal
Failed to validate the query: `Unable to match input value to any allowed input type for the field. Parse errors: [Query parsing/validation error at `Mutation.createOneUser.data.UserCreateInput.person.PersonCreateNestedOneWithoutUserInput.create`: Unable to match input value to any allowed input type for the field. Parse errors: [Query parsing/validation error at `Mutation.createOneUser.data.UserCreateInput.person.PersonCreateNestedOneWithoutUserInput.create.PersonCreateWithoutUserInput.hubspot_id`: A value is required but not set., Query parsing/validation error at `Mutation.createOneUser.data.UserCreateInput.person.PersonCreateNestedOneWithoutUserInput.create.PersonUncheckedCreateWithoutUserInput.hubspot_id`: A value is required but not set.], Query parsing/validation error at `Mutation.createOneUser.data.UserUncheckedCreateInput.person`: Field does not exist on enclosing type.]` at `Mutation.createOneUser.data`
```

becomes the following in Prisma ORM 5:

```terminal
Invalid `prisma.user.create()` invocation in
/Users/prismo/projects/prisma/reproductions/workbench/index.ts:21:36

  18 const prisma = new PrismaClient()
  19
  20 for (const u of userData) {
→ 21   const user = await prisma.user.create({
         data: {
           email: "eugene.albright@gallaudet.edu",
           person: {
             create: {
               first_name: "William",
               last_name: "Albright",
       +       hubspot_id: String
             }
           }
         }
       })

Argument `hubspot_id` must not be null.
```

## `jsonProtocol` related changes

Below are changes that are related to the switch to the new protocol. If you were using the `jsonProtocol` Preview Feature, you most likely ran into these issues.

### Removal of array shortcuts

Several array shortcuts were removed as a part of this major update. These shortcuts were a way to add a single element as a value to an array-based operator.

#### `OR` operators

The following code in Prisma ORM 4 and lower:

```js
prisma.user.findMany({
  where: {
    OR: { email: 'foo@example.com' },
  },
})
```

Will need to be changed to the following in Prisma ORM 5:

```js highlight=3;normal
prisma.user.findMany({
  where: {
    OR: [{ email: 'foo@example.com' }],
  },
})
```

`OR` operators will only accept array values.

#### `in` and `notIn` operators

Similar to `OR`, `in` and `notIn` require array values.

Prisma ORM 4 and lower:

```js
prisma.user.findMany({
  where: {
    id: { in: 123 },
  },
})

prisma.user.findMany({
  where: {
    id: { notIn: 123 },
  },
})
```

Prisma ORM 5:

```js highlight=4,12;normal
prisma.user.findMany({
  where: {
    id: {
      in: [123],
    },
  },
})

prisma.user.findMany({
  where: {
    id: {
      notIn: [123],
    },
  },
})
```

<details>
<summary>Suggestion for single elements</summary>

If your `in` and `notIn` values are only one element, you can also update your code to not use these operators at all:

```js highlight=3,9;normal
prisma.user.findMany({
  where: {
    id: 123,
  },
})

prisma.user.findMany({
  where: {
    id: { not: 123 },
  },
})
```

</details>

#### `path` argument for filtering on JSON fields in PostgreSQL

[When filtering on JSON fields in a PostgreSQL model](/orm/prisma-client/special-fields-and-types/working-with-json-fields#filter-on-a-json-field-simple) the `path` argument now only accepts an array.

When using the following schema:

```prisma
model User {
  id       String @id
  settings Json
}
```

Prisma ORM 4 and lower:

```js
prisma.user.findMany({
  where: {
    settings: {
      path: 'someSetting',
      equals: someValue,
    },
  },
})
```

Prisma ORM 5:

```js highlight=4;normal
prisma.user.findMany({
  where: {
    settings: {
      path: ['someSetting'],
      equals: someValue,
    },
  },
})
```

:::info

Note: This `path` argument change only affects PostgreSQL databases. MySQL databases are not affected as they use a different syntax.

:::

#### Scalar lists

[Scalar list](/orm/prisma-schema/data-model/models#scalar-fields) values must be arrays in all operations.

With the following schema:

```prisma
model Post {
  id   String   @id @default(uuid())
  tags String[]
}
```

Prisma ORM 4 and lower:

```js
prisma.post.create({
  data: {
    tags: 'databases',
  },
})

prisma.post.findMany({
  where: {
    tags: 'databases',
  },
})
```

Prisma ORM 5:

```js highlight=3,9;normal
prisma.post.create({
  data: {
    tags: ['databases'],
  },
})

prisma.post.findMany({
  where: {
    tags: ['databases'],
  },
})
```

#### Composite lists

Operations on lists of [Composite types](/orm/prisma-schema/data-model/models#defining-composite-types) (for [MongoDB](/orm/overview/databases/mongodb)) now only accept array values.

With the following schema:

```prisma
model Post {
  id           String    @id @default(uuid())
  commentsList Comment[]
}

type Comment {
  text String
}
```

Prisma ORM 4 and lower:

```js
prisma.post.findMany({
  where: {
    commentsList: {
      equals: { text: 'hello' },
    },
  },
})
```

Prisma ORM 5:

```js highlight=4;normal
prisma.post.findMany({
  where: {
    commentsList: {
      equals: [{ text: 'hello' }],
    },
  },
})
```

<details>
<summary>Shorthand notation usage</summary>

If you use the shorthand notation and exclude `equals`, you still must supply an array value for composite list fields.

Prisma 4 and lower:

```js
prisma.post.create({
  data: {
    commentsList: { text: 'hello' },
  },
})

prisma.post.findMany({
  where: {
    commentsList: { text: 'hello' },
  },
})
```

Prisma 5:

```js highlight=3,8;normal
prisma.post.create({
  data: {
    commentsList: [{ text: 'hello' }],
  },
})

prisma.post.findMany({
  where: {
    commentsList: [{ text: 'hello' }],
  },
})
```

</details>
