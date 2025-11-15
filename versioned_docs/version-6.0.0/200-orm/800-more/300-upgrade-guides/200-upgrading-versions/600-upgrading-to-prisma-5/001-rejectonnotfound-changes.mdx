---
title: 'rejectOnNotFound changes'
metaTitle: 'How to handle removal of rejectOnNotFound in Prisma ORM 5'
metaDescription: 'Sub-guide explaining how to update your code due to the removal of rejectOnNotFound in Prisma ORM 5'
tocDepth: 2
toc: true
---

<TopBlock>

As of Prisma ORM version 5.0.0, the deprecated parameter `rejectOnNotFound` has been removed. Depending on if your project used `rejectOnNotFound` per query or globally, there will be be different ways of updating your code.

If you are using the `rejectOnNotFound` parameter on a per-query basis, then follow our steps for [updating your code at the query level](#replacing-rejectonnotfound-enabled-at-the-query-level).

If instead you have set up the `rejectOnNotFound` parameter at the client level, you will need to follow [the steps for updating your code at the client level](#replacing-rejectonnotfound-enabled-at-the-client-level).

A full list of Prisma ORM 5 changes can be found [in our release notes](https://github.com/prisma/prisma/releases/tag/5.0.0).

</TopBlock>

## Replacing `rejectOnNotFound` enabled at the query level

If you previously enabled `rejectOnNotFound` on a per-query basis, you will need to replace your usage at the _query level_. You can use our `*OrThrow` query variants, `findFirstOrThrow` or `findUniqueOrThrow` instead of supplying the parameter to `findFirst` and `findUnique()`.

### Simple `rejectOnNotFound` usage

The following example:

```js
prisma.user.findFirst({
  where: { name: 'Alice' },
  rejectOnNotFound: true,
})
```

needs to be converted to:

```js
prisma.user.findFirstOrThrow({
  where: { name: 'Alice' },
})
```

### `rejectOnNotFound` usage with custom error handler

If you use a custom error handler like the following:

```js
prisma.user.findFirst({
  where: { name: 'Alice' },
  rejectOnNotFound: () => new UserNotFoundError(),
})
```

You will need to modify your code to handle the errors thrown by `...OrThrow` methods.

```js
try {
  await prisma.user.findFirstOrThrow({
    where: { name: 'Alice' },
  })
} catch (err) {
  if (err.code === 'P2025') {
    throw new UserNotFoundError()
  }
  throw err
}
```

If your error handler is used in multiple places, you can also create a reusable error adapter which could then be used within a `.catch()` called on your function.

```js
const adaptError = (customThrowFn) => (error) => {
  if (error.code === 'P2025') {
    throw customThrowFn()
  }
  throw error
}

const user = await prisma.user.findFirstOrThrow({
  where: { name: 'Alice' },
}).catch(adaptError(() => new MyCustomError())
```

## Replacing `rejectOnNotFound` enabled at the Client level

### `rejectOnNotFound` via Prisma Client Constructor

If you previously enabled `rejectOnNotFound` globally via configuration in the Prisma Client constructor, like in these examples:

```js
// Example 1
const prisma = new PrismaClient({
  rejectOnNotFound: true,
})

// Example 2
const prisma = new PrismaClient({
  rejectOnNotFound: {
    findUnique: true,
  },
})
```

You will need to update your codebase to use `findUniqueOrThrow` and `findFirstOrThrow` instead of `findUnique()` and `findFirst`, depending on which calls you would like to throw.

### `rejectOnNotFound` via Prisma Client Constructor with custom error handler

If instead you use a custom error handler with the `rejectOnNotFound` property, like these examples:

```js
// Example 3
const prisma = new PrismaClient({
  rejectOnNotFound: (err) => new Error('something'),
})

// Example 4
const prisma = new PrismaClient({
  rejectOnNotFound: {
    findUnique: (err) => new Error('something'),
  },
})

// Example 5
const prisma = new PrismaClient({
  rejectOnNotFound: {
    findFirst: {
      User: (err) => new Error('User error'),
      Post: (err) => new Error('Post error'),
    },
    findUnique: {
      User: (err) => new Error('User error'),
      Post: (err) => new Error('Post error'),
    },
  },
})
```

You will need to update your method usage to `...OrThrow` and then use a [Client Extension](/orm/prisma-client/client-extensions) in order to get the same behavior.

As an example, the following extension would give the same behavior in Prisma ORM 5 that `Example 5` gave in Prisma ORM 4 and lower.

```js
import { PrismaClient } from '@prisma/client';

const customErrorFunc = async (model, query, args) => {
  try {
    await query(args)
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new Error(`${model} error`)
    }
    throw error;
  }
}

const prisma = (new PrismaClient()).$extends({
  query: {
    user: {
      async findFirstOrThrow({ model, query, args }) {
        return await customErrorFunc(model, query, args)
      },
      async findUniqueOrThrow({ model, query, args }) {
        return await customErrorFunc(model, query, args)
      },
    },
    post: {
      async findFirstOrThrow({ model, query, args }) {
        return await customErrorFunc(model, query, args)
      },
      async findUniqueOrThrow({ model, query, args }) {
        return await customErrorFunc(model, query, args)
      },
    },
  },
})
```
