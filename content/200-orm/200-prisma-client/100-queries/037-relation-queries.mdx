---
title: 'Relation queries'
metaTitle: 'Relation queries (Concepts)'
metaDescription: 'Prisma Client provides convenient queries for working with relations, such as a fluent API, nested writes (transactions), nested reads and relation filters.'
toc_max_heading_level: 4
---

A key feature of Prisma Client is the ability to query [relations](/orm/prisma-schema/data-model/relations) between two or more models. Relation queries include:

- [Nested reads](#nested-reads) (sometimes referred to as _eager loading_) via [`select`](/orm/reference/prisma-client-reference#select) and [`include`](/orm/reference/prisma-client-reference#include)
- [Nested writes](#nested-writes) with [transactional](/orm/prisma-client/queries/transactions) guarantees
- [Filtering on related records](#relation-filters)

Prisma Client also has a [fluent API for traversing relations](#fluent-api).

## Nested reads

Nested reads allow you to read related data from multiple tables in your database - such as a user and that user's posts. You can:

- Use [`include`](/orm/reference/prisma-client-reference#include) to include related records, such as a user's posts or profile, in the query response.
- Use a nested [`select`](/orm/reference/prisma-client-reference#select) to include specific fields from a related record. You can also nest `select` inside an `include`.

### Relation load strategies (Preview)

Since version [5.8.0](https://github.com/prisma/prisma/releases/tag/5.8.0), you can decide on a per-query-level _how_ you want Prisma Client to execute a relation query (i.e. what _load strategy_ should be applied) via the `relationLoadStrategy` option for PostgreSQL databases.

Since version [5.10.0](https://github.com/prisma/prisma/releases/tag/5.10.0), this feature is also available for MySQL.

Because the `relationLoadStrategy` option is currently in Preview, you need to enable it via the `relationJoins` preview feature flag in your Prisma schema file:

```prisma file=schema.prisma showLineNumbers
generator client {
  provider        = "prisma-client"
  output          = "./generated"
  previewFeatures = ["relationJoins"]
}
```

After adding this flag, you need to run `prisma generate` again to re-generate Prisma Client. The `relationJoins` feature is currently available on PostgreSQL, CockroachDB and MySQL.

Prisma Client supports two load strategies for relations:

- `join` (default): Uses a database-level `LATERAL JOIN` (PostgreSQL) or correlated subqueries (MySQL) and fetches all data with a single query to the database.
- `query`: Sends multiple queries to the database (one per table) and joins them on the application level.

Another important difference between these two options is that the `join` strategy uses JSON aggregation on the database level. That means that it creates the JSON structures returned by Prisma Client already in the database which saves computation resources on the application level.

> **Note**: Once `relationLoadStrategy` moves from [Preview](/orm/more/releases#preview) into [General Availability](/orm/more/releases/#generally-available-ga), `join` will universally become the default for all relation queries.

#### Examples

You can use the `relationLoadStrategy` option on the top-level in any query that supports `include` or `select`.

Here is an example with `include`:

```ts
const users = await prisma.user.findMany({
  relationLoadStrategy: 'join', // or 'query'
  include: {
    posts: true,
  },
})
```

And here is another example with `select`:

```ts
const users = await prisma.user.findMany({
  relationLoadStrategy: 'join', // or 'query'
  select: {
    posts: true,
  },
})
```

#### When to use which load strategy?

- The `join` strategy (default) will be more effective in most scenarios. On PostgreSQL, it uses a combination of `LATERAL JOINs` and JSON aggregation to reduce redundancy in result sets and delegate the work of transforming the query results into the expected JSON structures on the database server. On MySQL, it uses correlated subqueries to fetch the results with a single query.
- There may be edge cases where `query` could be more performant depending on the characteristics of the dataset and query. We recommend that you profile your database queries to identify these situations.
- Use `query` if you want to save resources on the database server and do heavy-lifting of merging and transforming data in the application server which might be easier to scale.

### Include a relation

The following example returns a single user and that user's posts:

<CodeWithResult outputResultText="query">
<cmd>

```ts
const user = await prisma.user.findFirst({
  include: {
    posts: true,
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
  id: 19,
  name: null,
  email: 'emma@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: [],
  posts: [
    {
      id: 20,
      title: 'My first post',
      published: true,
      authorId: 19,
      comments: null,
      views: 0,
      likes: 0
    },
    {
      id: 21,
      title: 'How to make cookies',
      published: true,
      authorId: 19,
      comments: null,
      views: 0,
      likes: 0
    }
  ]
}
```

</cmdResult>
</CodeWithResult>

### Include all fields for a specific relation

The following example returns a post and its author:

<CodeWithResult outputResultText="query">
<cmd>

```ts
const post = await prisma.post.findFirst({
  include: {
    author: true,
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
  id: 17,
  title: 'How to make cookies',
  published: true,
  authorId: 16,
  comments: null,
  views: 0,
  likes: 0,
  author: {
    id: 16,
    name: null,
    email: 'orla@prisma.io',
    profileViews: 0,
    role: 'USER',
    coinflips: [],
  },
}
```

</cmdResult>
</CodeWithResult>

### Include deeply nested relations

You can nest `include` options to include relations of relations. The following example returns a user's posts, and each post's categories:

<CodeWithResult outputResultText="query">
<cmd>

```ts
const user = await prisma.user.findFirst({
  include: {
    posts: {
      include: {
        categories: true,
      },
    },
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
    "id": 40,
    "name": "Yvette",
    "email": "yvette@prisma.io",
    "profileViews": 0,
    "role": "USER",
    "coinflips": [],
    "testing": [],
    "city": null,
    "country": "Sweden",
    "posts": [
        {
            "id": 66,
            "title": "How to make an omelette",
            "published": true,
            "authorId": 40,
            "comments": null,
            "views": 0,
            "likes": 0,
            "categories": [
                {
                    "id": 3,
                    "name": "Easy cooking"
                }
            ]
        },
        {
            "id": 67,
            "title": "How to eat an omelette",
            "published": true,
            "authorId": 40,
            "comments": null,
            "views": 0,
            "likes": 0,
            "categories": []
        }
    ]
}
```

</cmdResult>
</CodeWithResult>


### Select specific fields of included relations

You can use a nested `select` to choose a subset of fields of relations to return. For example, the following query returns the user's `name` and the `title` of each related post:

<CodeWithResult outputResultText="query">
<cmd>

```ts
const user = await prisma.user.findFirst({
  select: {
    name: true,
    posts: {
      select: {
        title: true,
      },
    },
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
  name: "Elsa",
  posts: [ { title: 'My first post' }, { title: 'How to make cookies' } ]
}
```

</cmdResult>
</CodeWithResult>

You can also nest a `select` inside an `include` - the following example returns _all_ `User` fields and the `title` field of each post:

<CodeWithResult outputResultText="query">
<cmd>

```ts
const user = await prisma.user.findFirst({
  include: {
    posts: {
      select: {
        title: true,
      },
    },
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
  "id": 1,
  "name": null,
  "email": "martina@prisma.io",
  "profileViews": 0,
  "role": "USER",
  "coinflips": [],
  "posts": [
    { "title": "How to grow salad" },
    { "title": "How to ride a horse" }
  ]
}
```

</cmdResult>
</CodeWithResult>

Note that you **cannot** use `select` and `include` _on the same level_. This means that if you choose to `include` a user's post and `select` each post's title, you cannot `select` only the users' `email`:

<CodeWithResult>
<cmd>

```ts highlight=3,6;delete
// The following query returns an exception
const user = await prisma.user.findFirst({
  //delete-next-line
  select: { // This won't work!
    email:  true
  }
  //delete-next-line
  include: { // This won't work!
    posts: {
      select: {
        title: true
      }
    }
  },
})
```

</cmd>
<cmdResult>

```code no-copy
Invalid `prisma.user.findUnique()` invocation:

{
  where: {
    id: 19
  },
  select: {
  ~~~~~~
    email: true
  },
  include: {
  ~~~~~~~
    posts: {
      select: {
        title: true
      }
    }
  }
}


Please either use `include` or `select`, but not both at the same time.
```

</cmdResult>
</CodeWithResult>

Instead, use nested `select` options:

```ts
const user = await prisma.user.findFirst({
  select: {
    // This will work!
    email: true,
    posts: {
      select: {
        title: true,
      },
    },
  },
})
```

## Relation count

In [3.0.1](https://github.com/prisma/prisma/releases/3.0.1) and later, you can [`include` or `select` a count of relations](/orm/prisma-client/queries/aggregation-grouping-summarizing#count-relations) alongside fields - for example, a user's post count.

<CodeWithResult outputResultText="query">
<cmd>

```ts
const relationCount = await prisma.user.findMany({
  include: {
    _count: {
      select: { posts: true },
    },
  },
})
```

</cmd>
<cmdResult>

```code no-copy
{ id: 1, _count: { posts: 3 } },
{ id: 2, _count: { posts: 2 } },
{ id: 3, _count: { posts: 2 } },
{ id: 4, _count: { posts: 0 } },
{ id: 5, _count: { posts: 0 } }
```

</cmdResult>
</CodeWithResult>

## Filter a list of relations

When you use `select` or `include` to return a subset of the related data, you can **filter and sort the list of relations** inside the `select` or `include`.

For example, the following query returns list of titles of the unpublished posts associated with the user:

```ts
const result = await prisma.user.findFirst({
  select: {
    posts: {
      where: {
        published: false,
      },
      orderBy: {
        title: 'asc',
      },
      select: {
        title: true,
      },
    },
  },
})
```

You can also write the same query using `include` as follows:

```ts
const result = await prisma.user.findFirst({
  include: {
    posts: {
      where: {
        published: false,
      },
      orderBy: {
        title: 'asc',
      },
    },
  },
})
```

## Nested writes

A nested write allows you to write **relational data** to your database in **a single transaction**.

Nested writes:

- Provide **transactional guarantees** for creating, updating or deleting data across multiple tables in a single Prisma Client query. If any part of the query fails (for example, creating a user succeeds but creating posts fails), Prisma Client rolls back all changes.
- Support any level of nesting supported by the data model.
- Are available for [relation fields](/orm/prisma-schema/data-model/relations#relation-fields) when using the model's create or update query. The following section shows the nested write options that are available per query.

### Create a related record

You can create a record and one or more related records at the same time. The following query creates a `User` record and two related `Post` records:

<CodeWithResult outputResultText="query">
<cmd>

```ts highlight=5-10;normal
const result = await prisma.user.create({
  data: {
    email: 'elsa@prisma.io',
    name: 'Elsa Prisma',
    //highlight-start
    posts: {
      create: [
        { title: 'How to make an omelette' },
        { title: 'How to eat an omelette' },
      ],
    },
    //highlight-end
  },
  include: {
    posts: true, // Include all posts in the returned object
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
  id: 29,
  name: 'Elsa',
  email: 'elsa@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: [],
  posts: [
    {
      id: 22,
      title: 'How to make an omelette',
      published: true,
      authorId: 29,
      comments: null,
      views: 0,
      likes: 0
    },
    {
      id: 23,
      title: 'How to eat an omelette',
      published: true,
      authorId: 29,
      comments: null,
      views: 0,
      likes: 0
    }
  ]
}
```

</cmdResult>
</CodeWithResult>

### Create a single record and multiple related records

There are two ways to create or update a single record and multiple related records - for example, a user with multiple posts:

- Use a nested [`create`](/orm/reference/prisma-client-reference#create) query
- Use a nested [`createMany`](/orm/reference/prisma-client-reference#createmany-1) query

In most cases, a nested `create` will be preferable unless the [`skipDuplicates` query option](/orm/reference/prisma-client-reference#nested-createmany-options) is required. Here's a quick table describing the differences between the two options:

| Feature                               | `create` | `createMany` | Notes                                                                                                                                                                                           |
| :------------------------------------ | :------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supports nesting additional relations | ✔        | ✘ \*         | For example, you can create a user, several posts, and several comments per post in one query.<br />\* You can manually set a foreign key in a has-one relation - for example: `{ authorId: 9}` |
| Supports 1-n relations           | ✔        | ✔            | For example, you can create a user and multiple posts (one user has many posts)                                                                                                                 |
| Supports m-n relations       | ✔        | ✘            | For example, you can create a post and several categories (one post can have many categories, and one category can have many posts)                                                             |
| Supports skipping duplicate records   | ✘        | ✔            | Use `skipDuplicates` query option.                                                                                                                                                              |

#### Using nested `create`

The following query uses nested [`create`](/orm/reference/prisma-client-reference#create) to create:

- One user
- Two posts
- One post category

The example also uses a nested `include` to include all posts and post categories in the returned data.

<CodeWithResult outputResultText="query">
<cmd>

```ts highlight=5-17;normal
const result = await prisma.user.create({
  data: {
    email: 'yvette@prisma.io',
    name: 'Yvette',
    //highlight-start
    posts: {
      create: [
        {
          title: 'How to make an omelette',
          categories: {
            create: {
              name: 'Easy cooking',
            },
          },
        },
        { title: 'How to eat an omelette' },
      ],
    },
    //highlight-end
  },
  include: {
    // Include posts
    posts: {
      include: {
        categories: true, // Include post categories
      },
    },
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
    "id": 40,
    "name": "Yvette",
    "email": "yvette@prisma.io",
    "profileViews": 0,
    "role": "USER",
    "coinflips": [],
    "testing": [],
    "city": null,
    "country": "Sweden",
    "posts": [
        {
            "id": 66,
            "title": "How to make an omelette",
            "published": true,
            "authorId": 40,
            "comments": null,
            "views": 0,
            "likes": 0,
            "categories": [
                {
                    "id": 3,
                    "name": "Easy cooking"
                }
            ]
        },
        {
            "id": 67,
            "title": "How to eat an omelette",
            "published": true,
            "authorId": 40,
            "comments": null,
            "views": 0,
            "likes": 0,
            "categories": []
        }
    ]
}
```

</cmdResult>
</CodeWithResult>

Here's a visual representation of how a nested create operation can write to several tables in the database as once:

![](/img/orm/nested-create.png)

#### Using nested `createMany`

The following query uses a nested [`createMany`](/orm/reference/prisma-client-reference#createmany) to create:

- One user
- Two posts

The example also uses a nested `include` to include all posts in the returned data.

<CodeWithResult outputResultText="query">
<cmd>

```ts highlight=4-8;normal
const result = await prisma.user.create({
  data: {
    email: 'saanvi@prisma.io',
    //highlight-start
    posts: {
      createMany: {
        data: [{ title: 'My first post' }, { title: 'My second post' }],
      },
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
    "id": 43,
    "name": null,
    "email": "saanvi@prisma.io",
    "profileViews": 0,
    "role": "USER",
    "coinflips": [],
    "testing": [],
    "city": null,
    "country": "India",
    "posts": [
        {
            "id": 70,
            "title": "My first post",
            "published": true,
            "authorId": 43,
            "comments": null,
            "views": 0,
            "likes": 0
        },
        {
            "id": 71,
            "title": "My second post",
            "published": true,
            "authorId": 43,
            "comments": null,
            "views": 0,
            "likes": 0
        }
    ]
}
```

</cmdResult>
</CodeWithResult>

Note that it is **not possible** to nest an additional `create` or `createMany` inside the highlighted query, which means that you cannot create a user, posts, and post categories at the same time.

As a workaround, you can send a query to create the records that will be connected first, and then create the actual records. For example:

```ts
const categories = await prisma.category.createManyAndReturn({
  data: [
    { name: 'Fun', },
    { name: 'Technology', },
    { name: 'Sports', }
  ],
  select: {
    id: true
  }
});

const posts = await prisma.post.createManyAndReturn({
  data: [{
    title: "Funniest moments in 2024",
    categoryId: categories.find(category => category.name === 'Fun')!.id
  }, {
    title: "Linux or macOS — what's better?",
    categoryId: categories.find(category => category.name === 'Technology')!.id
  },
  {
    title: "Who will win the next soccer championship?",
    categoryId: categories.find(category => category.name === 'Sports')!.id
  }]
});
```

If you want to create _all_ records in a single database query, consider using a [`$transaction`](/orm/prisma-client/queries/transactions#the-transaction-api) or [type-safe, raw SQL](/orm/prisma-client/using-raw-sql/typedsql).


### Create multiple records and multiple related records

You cannot access relations in a `createMany()` or `createManyAndReturn()` query, which means that you cannot create multiple users and multiple posts in a single nested write. The following is **not** possible:

```ts highlight=6-8,13-15;delete
const createMany = await prisma.user.createMany({
  data: [
    {
      name: 'Yewande',
      email: 'yewande@prisma.io',
      //delete-start
      posts: {
        // Not possible to create posts!
      },
      //delete-end
    },
    {
      name: 'Noor',
      email: 'noor@prisma.io',
      //delete-start
      posts: {
        // Not possible to create posts!
      },
      //delete-end
    },
  ],
})
```

### Connect multiple records

The following query creates ([`create`](/orm/reference/prisma-client-reference#create) ) a new `User` record and connects that record ([`connect`](/orm/reference/prisma-client-reference#connect) ) to three existing posts:

<CodeWithResult outputResultText="query">
<cmd>

```ts highlight=4-6;normal
const result = await prisma.user.create({
  data: {
    email: 'vlad@prisma.io',
    //highlight-start
    posts: {
      connect: [{ id: 8 }, { id: 9 }, { id: 10 }],
    },
    //highlight-end
  },
  include: {
    posts: true, // Include all posts in the returned object
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
  id: 27,
  name: null,
  email: 'vlad@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: [],
  posts: [
    {
      id: 10,
      title: 'An existing post',
      published: true,
      authorId: 27,
      comments: {},
      views: 0,
      likes: 0
    }
  ]
}
```

</cmdResult>
</CodeWithResult>

> **Note**: Prisma Client throws an exception if any of the post records cannot be found: `connect: [{ id: 8 }, { id: 9 }, { id: 10 }]`

### Connect a single record

You can [`connect`](/orm/reference/prisma-client-reference#connect) an existing record to a new or existing user. The following query connects an existing post (`id: 11`) to an existing user (`id: 9`)

```ts highlight=6-9;normal
const result = await prisma.user.update({
  where: {
    id: 9,
  },
  data: {
    //highlight-start
    posts: {
      connect: {
        id: 11,
      },
    //highlight-end
    },
  },
  include: {
    posts: true,
  },
})
```

### Connect _or_ create a record

If a related record may or may not already exist, use [`connectOrCreate`](/orm/reference/prisma-client-reference#connectorcreate) to connect the related record:

- Connect a `User` with the email address `viola@prisma.io` _or_
- Create a new `User` with the email address `viola@prisma.io` if the user does not already exist

<CodeWithResult outputResultText="query">
<cmd>

```ts highlight=4-14;normal
const result = await prisma.post.create({
  data: {
    title: 'How to make croissants',
    //highlight-start
    author: {
      connectOrCreate: {
        where: {
          email: 'viola@prisma.io',
        },
        create: {
          email: 'viola@prisma.io',
          name: 'Viola',
        },
      },
    },
    //highlight-end
  },
  include: {
    author: true,
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
  id: 26,
  title: 'How to make croissants',
  published: true,
  authorId: 43,
  views: 0,
  likes: 0,
  author: {
    id: 43,
    name: 'Viola',
    email: 'viola@prisma.io',
    profileViews: 0,
    role: 'USER',
    coinflips: []
  }
}
```

</cmdResult>
</CodeWithResult>

### Disconnect a related record

To `disconnect` one out of a list of records (for example, a specific blog post) provide the ID or unique identifier of the record(s) to disconnect:

<CodeWithResult outputResultText="query">
<cmd>

```ts highlight=6-8;normal
const result = await prisma.user.update({
  where: {
    id: 16,
  },
  data: {
    //highlight-start
    posts: {
      disconnect: [{ id: 12 }, { id: 19 }],
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
  id: 16,
  name: null,
  email: 'orla@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: [],
  posts: []
}
```

</cmdResult>
</CodeWithResult>

To `disconnect` _one_ record (for example, a post's author), use `disconnect: true`:

<CodeWithResult outputResultText="query">
<cmd>

```ts highlight=6-8;normal
const result = await prisma.post.update({
  where: {
    id: 23,
  },
  data: {
    //highlight-start
    author: {
      disconnect: true,
    },
    //highlight-end
  },
  include: {
    author: true,
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
  id: 23,
  title: 'How to eat an omelette',
  published: true,
  authorId: null,
  comments: null,
  views: 0,
  likes: 0,
  author: null
}
```

</cmdResult>
</CodeWithResult>

### Disconnect all related records

To [`disconnect`](/orm/reference/prisma-client-reference#disconnect) _all_ related records in a one-to-many relation (a user has many posts), `set` the relation to an empty list as shown:

<CodeWithResult outputResultText="query">
<cmd>

```ts highlight=6-8;normal
const result = await prisma.user.update({
  where: {
    id: 16,
  },
  data: {
    //highlight-start
    posts: {
      set: [],
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

</cmd>
<cmdResult>

```js no-copy
{
  id: 16,
  name: null,
  email: 'orla@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: [],
  posts: []
}
```

</cmdResult>
</CodeWithResult>

### Delete all related records

Delete all related `Post` records:

```ts highlight=6-8;normal
const result = await prisma.user.update({
  where: {
    id: 11,
  },
  data: {
    //highlight-start
    posts: {
      deleteMany: {},
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

### Delete specific related records

Update a user by deleting all unpublished posts:

```ts highlight=6-10;normal
const result = await prisma.user.update({
  where: {
    id: 11,
  },
  data: {
    //highlight-start
    posts: {
      deleteMany: {
        published: false,
      },
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

Update a user by deleting specific posts:

```ts highlight=6-8;normal
const result = await prisma.user.update({
  where: {
    id: 6,
  },
  data: {
    //highlight-start
    posts: {
      deleteMany: [{ id: 7 }],
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

### Update all related records (or filter)

You can use a nested `updateMany` to update _all_ related records for a particular user. The following query unpublishes all posts for a specific user:

```ts highlight=6-15;normal
const result = await prisma.user.update({
  where: {
    id: 6,
  },
  data: {
    //highlight-start
    posts: {
      updateMany: {
        where: {
          published: true,
        },
        data: {
          published: false,
        },
      },
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

### Update a specific related record

```ts highlight=6-15;normal
const result = await prisma.user.update({
  where: {
    id: 6,
  },
  data: {
    //highlight-start
    posts: {
      update: {
        where: {
          id: 9,
        },
        data: {
          title: 'My updated title',
        },
      },
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

### Update _or_ create a related record

The following query uses a nested `upsert` to update `"bob@prisma.io"` if that user exists, or create the user if they do not exist:

```ts highlight=6-17;normal
const result = await prisma.post.update({
  where: {
    id: 6,
  },
  data: {
    //highlight-start
    author: {
      upsert: {
        create: {
          email: 'bob@prisma.io',
          name: 'Bob the New User',
        },
        update: {
          email: 'bob@prisma.io',
          name: 'Bob the existing user',
        },
      },
    },
    //highlight-end
  },
  include: {
    author: true,
  },
})
```

### Add new related records to an existing record

You can nest `create` or `createMany` inside an `update` to add new related records to an existing record. The following query adds two posts to a user with an `id` of 9:

```ts highlight=6-10;normal
const result = await prisma.user.update({
  where: {
    id: 9,
  },
  data: {
    //highlight-start
    posts: {
      createMany: {
        data: [{ title: 'My first post' }, { title: 'My second post' }],
      },
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

## Relation filters

### Filter on "-to-many" relations

Prisma Client provides the [`some`](/orm/reference/prisma-client-reference#some), [`every`](/orm/reference/prisma-client-reference#every), and [`none`](/orm/reference/prisma-client-reference#none) options to filter records by the properties of related records on the "-to-many" side of the relation. For example, filtering users based on properties of their posts.

For example:

| Requirement                                                                       | Query option to use                 |
| --------------------------------------------------------------------------------- | ----------------------------------- |
| "I want a list of every `User` that has _at least one_ unpublished `Post` record" | `some` posts are unpublished        |
| "I want a list of every `User` that has _no_ unpublished `Post` records"          | `none` of the posts are unpublished |
| "I want a list of every `User` that has _only_ unpublished `Post` records"        | `every` post is unpublished         |

For example, the following query returns `User` that meet the following criteria:

- No posts with more than 100 views
- All posts have less than, or equal to 50 likes

```ts
const users = await prisma.user.findMany({
  where: {
    //highlight-start
    posts: {
      none: {
        views: {
          gt: 100,
        },
      },
      every: {
        likes: {
          lte: 50,
        },
      },
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

### Filter on "-to-one" relations

Prisma Client provides the [`is`](/orm/reference/prisma-client-reference#is) and [`isNot`](/orm/reference/prisma-client-reference#isnot) options to filter records by the properties of related records on the "-to-one" side of the relation. For example, filtering posts based on properties of their author.

For example, the following query returns `Post` records that meet the following criteria:

- Author's name is not Bob
- Author is older than 40

```ts highlight=3-13;normal
const users = await prisma.post.findMany({
  where: {
    //highlight-start
    author: {
      isNot: {
        name: 'Bob',
      },
      is: {
        age: {
          gt: 40,
        },
      },
    },
  },
  //highlight-end
  include: {
    author: true,
  },
})
```

### Filter on absence of "-to-many" records

For example, the following query uses `none` to return all users that have zero posts:

```ts highlight=3-5;normal
const usersWithZeroPosts = await prisma.user.findMany({
  where: {
    //highlight-start
    posts: {
      none: {},
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

### Filter on absence of "-to-one" relations

The following query returns all posts that don't have an author relation:

```js highlight=3;normal
const postsWithNoAuthor = await prisma.post.findMany({
  where: {
    //highlight-next-line
    author: null, // or author: { }
  },
  include: {
    author: true,
  },
})
```

### Filter on presence of related records

The following query returns all users with at least one post:

```ts highlight=3-5;normal
const usersWithSomePosts = await prisma.user.findMany({
  where: {
    //highlight-start
    posts: {
      some: {},
    },
    //highlight-end
  },
  include: {
    posts: true,
  },
})
```

## Fluent API

The fluent API lets you _fluently_ traverse the [relations](/orm/prisma-schema/data-model/relations) of your models via function calls. Note that the _last_ function call determines the return type of the entire query (the respective type annotations are added in the code snippets below to make that explicit).

This query returns all `Post` records by a specific `User`:

```ts
const postsByUser: Post[] = await prisma.user
  .findUnique({ where: { email: 'alice@prisma.io' } })
  .posts()
```

This is equivalent to the following `findMany` query:

```ts
const postsByUser = await prisma.post.findMany({
  where: {
    author: {
      email: 'alice@prisma.io',
    },
  },
})
```

The main difference between the queries is that the fluent API call is translated into two separate database queries while the other one only generates a single query (see this [GitHub issue](https://github.com/prisma/prisma/issues/1984))

> **Note**: You can use the fact that `.findUnique({ where: { email: 'alice@prisma.io' } }).posts()` queries are automatically batched by the Prisma dataloader in Prisma Client to [avoid the n+1 problem in GraphQL resolvers](/orm/prisma-client/queries/query-optimization-performance#solving-n1-in-graphql-with-findunique-and-prisma-clients-dataloader).

This request returns all categories by a specific post:

```ts
const categoriesOfPost: Category[] = await prisma.post
  .findUnique({ where: { id: 1 } })
  .categories()
```

Note that you can chain as many queries as you like. In this example, the chaining starts at `Profile` and goes over `User` to `Post`:

```ts
const posts: Post[] = await prisma.profile
  .findUnique({ where: { id: 1 } })
  .user()
  .posts()
```

The only requirement for chaining is that the previous function call must return only a _single object_ (e.g. as returned by a `findUnique` query or a "to-one relation" like `profile.user()`).

The following query is **not possible** because `findMany` does not return a single object but a _list_:

```ts
// This query is illegal
const posts = await prisma.user.findMany().posts()
```
