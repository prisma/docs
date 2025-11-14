---
title: 'Autocompletion in GraphQL resolvers with JavaScript'
metaTitle: 'Autocompletion in GraphQL resolvers with JavaScript'
metaDescription: 'Learn how you can get autocompletion for Prisma Client queries in GraphQL resolvers with plain JavaScript'
---

<TopBlock/>

## Problem

When using GraphQL with TypeScript, you always get autocompletion for the Prisma Client instance in your GraphQL resolvers because then the `context` object can be typed – no matter if folks are using Nexus, TypeGraphQL or SDL first. This immensely helps with autocompletion and preventing unwanted errors.

Unfortunately, this needs a little more effort when you're working in plain JavaScript. Suppose we have a resolver like this:

```js
filterPosts: (parent, args, ctx) => {
  return ctx.prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: args.searchString } },
        { content: { contains: args.searchString } },
      ],
    },
  })
}
```

Now whenever you type `ctx.` VS Code will provide unnecessary options in the autocomplete which is undesirable.

![Unwanted autocomplete values by VSCode](/img/orm/unwanted-autocomplete-values-in-vscode.png)

VS Code doesn't know the _type_ of the `context` object so it can't provide any intellisense for it, which is why unwanted suggestions are displayed.

## Solution

To overcome this, you need to add a [JSDoc](https://jsdoc.app/) comment named `typedef` to "import" the correct type of your `PrismaClient` instance.

```js
// Add this to the top of the file

/**
 * @typedef { import("../prisma/generated/client").PrismaClient } Prisma
 */
```

> **Note**: You can learn more about JSDoc [here](https://devhints.io/jsdoc).

Finally, you need to type your resolver arguments. For simplicity, ignore the `parent` and `args` parameters. So the resolver should now look like this:

```js
/**
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
filterPosts: (parent, args, ctx) => {
  return ctx.prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: args.searchString } },
        { content: { contains: args.searchString } },
      ],
    },
  })
}
```

This will tell VS Code that the `context` has a property named `prisma` and the type is `Prisma` which was defined in the `@typedef` above.

And voilà, autocompletion in plain JavaScript.

![The correct parameters for context are obtained](/img/orm/prisma-autocompletion-in-js.png)

The final file should look something like:

```js
/**
 * @typedef { import("../prisma/generated/client").PrismaClient } Prisma
 * @typedef { import("../prisma/generated/client").UserCreateArgs } UserCreateArgs
 */

const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
type User {
  email: String!
  id: ID!
  name: String
  posts: [Post!]!
}

type Post {
  author: User
  content: String
  id: ID!
  published: Boolean!
  title: String!
}


type Query {
  feed: [Post!]!
  filterPosts(searchString: String): [Post!]!
  post(where: PostWhereUniqueInput!): Post
}

type Mutation {
  createDraft(authorEmail: String, content: String, title: String!): Post!
  deleteOnePost(where: PostWhereUniqueInput!): Post
  publish(id: ID): Post
  signupUser(data: UserCreateInput!): User!
}

input PostWhereUniqueInput {
  id: ID
}

input UserCreateInput {
  email: String!
  id: ID
  name: String
  posts: PostCreateManyWithoutPostsInput
}

input PostCreateManyWithoutPostsInput {
  connect: [PostWhereUniqueInput!]
  create: [PostCreateWithoutAuthorInput!]
}

input PostCreateWithoutAuthorInput {
  content: String
  id: ID
  published: Boolean
  title: String!
}
`

const resolvers = {
  Query: {
    /**
     * @param {any} parent
     * @param {any} args
     * @param {{ prisma: Prisma }} ctx
     */
    feed: (parent, args, ctx) => {
      return ctx.prisma.post.findMany({
        where: { published: true },
      })
    },
    /**
     * @param {any} parent
     * @param {{ searchString: string }} args
     * @param {{ prisma: Prisma }} ctx
     */
    filterPosts: (parent, args, ctx) => {
      return ctx.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        },
      })
    },
    /**
     * @param {any} parent
     * @param {{ where: { id: string }}} args
     * @param {{ prisma: Prisma }} ctx
     */
    post: (parent, args, ctx) => {
      return ctx.prisma.post.findUnique({
        where: { id: Number(args.where.id) },
      })
    },
  },
  Mutation: {
    /**
     * @param {any} parent
     * @param {{ title: string, content: string, authorEmail: (string|undefined) }} args
     * @param {{ prisma: Prisma }} ctx
     */
    createDraft: (parent, args, ctx) => {
      return ctx.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: false,
          author: args.authorEmail && {
            connect: { email: args.authorEmail },
          },
        },
      })
    },
    /**
     * @param {any} parent
     * @param {{ where: { id: string }}} args
     * @param {{ prisma: Prisma }} ctx
     */
    deleteOnePost: (parent, args, ctx) => {
      return ctx.prisma.post.delete({
        where: { id: Number(args.where.id) },
      })
    },
    /**
     * @param {any} parent
     * @param {{ id: string }} args
     * @param {{ prisma: Prisma }} ctx
     */
    publish: (parent, args, ctx) => {
      return ctx.prisma.post.update({
        where: { id: Number(args.id) },
        data: { published: true },
      })
    },
    /**
     * @param {any} parent
     * @param {UserCreateArgs} args
     * @param {{ prisma: Prisma }} ctx
     */
    signupUser: (parent, args, ctx) => {
      return ctx.prisma.user.create(args)
    },
  },
  User: {
    /**
     * @param {{ id: number }} parent
     * @param {any} args
     * @param {{ prisma: Prisma }} ctx
     */
    posts: (parent, args, ctx) => {
      return ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .posts()
    },
  },
  Post: {
    /**
     * @param {{ id: number }} parent
     * @param {any} args
     * @param {{ prisma: Prisma }} ctx
     */
    author: (parent, args, ctx) => {
      return ctx.prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .author()
    },
  },
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

module.exports = {
  schema,
}
```
