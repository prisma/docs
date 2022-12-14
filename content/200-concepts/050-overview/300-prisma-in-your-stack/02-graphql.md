---
title: 'GraphQL'
metaTitle: 'Building GraphQL servers with Prisma'
metaDescription: 'This page gives explains how to build GraphQL servers with Prisma. It shows how Prisma fits into the GraphQL ecosystem and provides practical examples.'
---

<TopBlock>

[GraphQL](https://graphql.org/) is a query language for APIs. It is often used as an alternative to RESTful APIs, but can also be used as an additional "gateway" layer on top of existing RESTful services.

With Prisma, you can build GraphQL servers that connect to a database. Prisma is completely agnostic to the GraphQL tools you use. When building a GraphQL server, you can combine Prisma with tools like Apollo Server, `express-graphql`, TypeGraphQL, GraphQL.js, or pretty much any tool or library that you're using in your GraphQL server setup.

</TopBlock>

## GraphQL servers under the hood

A GraphQL server consists of two major components:

- GraphQL schema (type definitions + resolvers)
- HTTP server

Note that a GraphQL schema can be written code-first or SDL-first. Check out this [article](https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3) to learn more about these two approaches. If you like the SDL-first approach but still want to make your code type-safe, check out [GraphQL Code Generator](https://graphql-code-generator.com/) to generate various type definitions based on SDL.

The GraphQL schema and HTTP server are typically handled by separate libraries. Here is an overview of current GraphQL server tools and their purpose:

| Library (npm package) | Purpose                     | Compatible with Prisma | Prisma integration                                                             |
| :-------------------- | :-------------------------- | :--------------------- | :----------------------------------------------------------------------------- |
| `graphql`             | GraphQL schema (code-first) | Yes                    | No                                                                             |
| `graphql-tools`       | GraphQL schema (SDL-first)  | Yes                    | No                                                                             |
| `type-graphql`        | GraphQL schema (code-first) | Yes                    | [`typegraphql-prisma`](https://www.npmjs.com/package/typegraphql-prisma)       |
| `nexus`               | GraphQL schema (code-first) | Yes                    | [`nexus-prisma`](https://graphql-nexus.github.io/nexus-prisma) _Early Preview_ |
| `apollo-server`       | HTTP server                 | Yes                    | n/a                                                                            |
| `express-graphql`     | HTTP server                 | Yes                    | n/a                                                                            |
| `fastify-gql`         | HTTP server                 | Yes                    | n/a                                                                            |
| `graphql-yoga`        | HTTP server                 | Yes                    | n/a                                                                            |

In addition to these standalone and single-purpose libraries, there are several projects building integrated _application frameworks_:

| Framework                                  | Stack     | Built by                                          | Prisma                 | Description                                                                      |
| :----------------------------------------- | :-------- | :------------------------------------------------ | :--------------------- | :------------------------------------------------------------------------------- |
| [Redwood.js](https://redwoodjs.com)        | Fullstack | [Tom Preston-Werner](https://github.com/mojombo/) | Built on top of Prisma | _Bringing full-stack to the JAMstack._                                           |
| [Blitz](https://github.com/blitz-js/blitz) | Fullstack | [Brandon Bayer](https://github.com/flybayer)      | Built on top of Prisma | _Rails-like framework for monolithic, full-stack React apps — built on Next.js._ |

> **Note**: If you notice any GraphQL libraries/frameworks missing from the list, please let us know.

## Prisma & GraphQL examples

In the following section will find several ready-to-run examples that showcase how to use Prisma with different combinations of the tools mentioned in the table above.

### TypeScript

| Example                                                                                                           | HTTP Server     | GraphQL schema  | Description                                                                                                                     |
| :---------------------------------------------------------------------------------------------------------------- | :-------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| [GraphQL API](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql)                           | `apollo-server` | `nexus`         | GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)                                    |
| [GraphQL API (SDL-first)](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-sdl-first)     | `apollo-server` | `graphql-tools` | GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) (Apollo) |
| [GraphQL API (TypeGraphQL)](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-typegraphql) | `apollo-server` | `type-graphql`  | GraphQL server based on the code-first approach of [TypeGraphQL](https://typegraphql.com/)                                      |
| [GraphQL API (Auth)](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-auth)               | `apollo-server` | `nexus`         | GraphQL server with email-password authentication & permissions                                                                 |
| [Fullstack app](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-nextjs)                  | `apollo-server` | `nexus`         | Fullstack app with Next.js (React), Apollo Client, Apollo Server and Nexus                                                      |
| [GraphQL subscriptions](https://github.com/prisma/prisma-examples/tree/latest/typescript/subscriptions-pubsub)    | `apollo-server` | `nexus`         | GraphQL server implementing realtime GraphQL subscriptions                                                                      |

### JavaScript (Node.js)

| Demo                                                                                                                  | HTTP Server     | GraphQL schema  | Description                                                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------- | :-------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| [GraphQL API](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql)                               | `apollo-server` | `nexus`         | GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)                                    |
| [GraphQL API (Apollo Server)](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql-apollo-server) | `apollo-server` | `nexus`         | GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)                                    |
| [GraphQL API (SDL-first)](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql-sdl-first)         | `apollo-server` | `graphql-tools` | GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) (Apollo) |
| [GraphQL API (Auth)](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql-auth)                   | `apollo-server` | `nexus`         | GraphQL server with email-password authentication & permissions                                                                 |
|                                                                                                                       |

## FAQ

### What is Prisma's role in a GraphQL server?

No matter which of the above GraphQL tools/libraries you use, Prisma is used inside your GraphQL resolvers to connect to your database. It has the same role that any other ORM or SQL query builder would have inside your resolvers.

In the resolver of a GraphQL query, Prisma typically reads data from the database to return it in the GraphQL response. In the resolver of a GraphQL mutation, Prisma typically also writes data to the database (e.g. creating new or updating existing records).

## Other GraphQL Resources

Prisma curates [GraphQL Weekly](https://www.graphqlweekly.com/), a newsletter highlighting resources and updates from the GraphQL community. Subscribe to keep up-to-date with GraphQL articles, videos, tutorials, libraries, and more.
