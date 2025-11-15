---
title: 'Computed fields'
metaTitle: 'Computed fields'
metaDescription: 'This page explains how to use client extensions to add computed fields to Prisma models.'
---

Computed fields allow you to derive a new field based on existing data. A common example is when you want to compute a full name. In your database, you may only store the first and last name, but you can define a function that computes a full name by combining the first and last name. Computed fields are read-only and stored in your application's memory, not in your database.

## Using a Prisma Client extension

The following example illustrates how to create a [Prisma Client extension](/orm/prisma-client/client-extensions) that adds a `fullName` computed field at runtime to the `User` model in a Prisma schema.

<TabbedContent code>

<TabItem value="Prisma Client extension">

<CodeWithResult style={{marginTop: 0}}>

<cmd>

```ts
import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient().$extends({
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`
        },
      },
    },
  },
})

async function main() {
  /**
   * Example query containing the `fullName` computed field in the response
   */
  const user = await prisma.user.findFirst()
}

main()
```

</cmd>
<cmdResult>

```js no-copy
{
  id: 1,
  firstName: 'Aurelia',
  lastName: 'Schneider',
  email: 'Jalen_Berge40@hotmail.com',
  fullName: 'Aurelia Schneider',
}
```

</cmdResult>

</CodeWithResult>

</TabItem>

<TabItem value="Prisma schema">

```prisma copy
datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client"
  output   = "./generated"
}

model User {
  id        Int    @id @default(autoincrement())
  email     String @unique
  firstName String
  lastName  String
  posts     Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  published Boolean @default(true)
  content   String?
  authorId  Int?
  author    User?   @relation(fields: [authorId], references: [id])
}
```

</TabItem>

</TabbedContent>

The computed fields are type-safe and can return anything from a concatenated value to complex objects or functions that can act as an instance method for your models.

<details>

<summary>Instructions prior to Prisma ORM 4.16.0</summary>

:::warning

With Prisma Client extensions Generally Available as of Prisma ORM version 4.16.0, the following steps are not recommended. Please use [a client extension](#using-a-prisma-client-extension) to accomplish this.

:::

Prisma Client does not yet natively support computed fields, but, you can define a function that accepts a generic type as an input then extend that generic to ensure it conforms to a specific structure. Finally, you can return that generic with additional computed fields. Let's see how that might look:

<TabbedContent code>

<TabItem value="TypeScript">

```tsx
// Define a type that needs a first and last name
type FirstLastName = {
  firstName: string
  lastName: string
}

// Extend the T generic with the fullName attribute
type WithFullName<T> = T & {
  fullName: string
}

// Take objects that satisfy FirstLastName and computes a full name
function computeFullName<User extends FirstLastName>(
  user: User
): WithFullName<User> {
  return {
    ...user,
    fullName: user.firstName + ' ' + user.lastName,
  }
}

async function main() {
  const user = await prisma.user.findUnique({ where: 1 })
  const userWithFullName = computeFullName(user)
}
```

</TabItem>

<TabItem value="JavaScript">

```js
function computeFullName(user) {
  return {
    ...user,
    fullName: user.firstName + ' ' + user.lastName,
  }
}

async function main() {
  const user = await prisma.user.findUnique({ where: 1 })
  const userWithFullName = computeFullName(user)
}
```

</TabItem>

</TabbedContent>

In the TypeScript example above, a `User` generic has been defined that extends the `FirstLastName` type. This means that whatever you pass into `computeFullName` must contain `firstName` and `lastName` keys.

A `WithFullName<User>` return type has also been defined, which takes whatever `User` is and tacks on a `fullName` string attribute.

With this function, any object that contains `firstName` and `lastName` keys can compute a `fullName`. Pretty neat, right?

</details>

### Going further

- Learn how you can use [Prisma Client extensions](/orm/prisma-client/client-extensions) to add a computed field to your schema — [example](https://github.com/prisma/prisma-client-extensions/tree/main/computed-fields).
- Learn how you can move the `computeFullName` function into [a custom model](/orm/prisma-client/queries/custom-models).
- There's an [open feature request](https://github.com/prisma/prisma/issues/3394) to add native support to Prisma Client. If you'd like to see that happen, make sure to upvote that issue and share your use case!
