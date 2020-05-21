---
title: 'GraphQL'
metaTitle: 'Building GraphQL servers with Prisma'
metaDescription: 'This page gives explains how to build GraphQL servers with Prisma. It shows how Prisma fits into the GraphQL ecosystem and provides practical examples.'
---

## Overview

[GraphQL](http://graphql.org/) is a query language for APIs. It is often used as an alternative to RESTful APIs, but can also be used as an additional "gateway" layer on top of existing RESTful services.

With Prisma, you can build GraphQL servers that connect to a database. Prisma is completely agnostic to the GraphQL tools you use. When building as GraphQL server, you can combine Prisma with tools like Apollo Server, `express-graphql`, TypeGraphQL, GraphQL.js or pretty much any tool or library that you're using in your GraphQL server setup.

## GraphQL servers under the hood

A GraphQL server consists of two major components:

- GraphQL schema (type definitions + resolvers)
- HTTP server

Note that a GraphQL schema can be written code-first or SDL-first. Check out this [article](https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3/) to learn more about these two approaches. If you like the SDL-first approach but still want to make your code type safe, check out [GraphQL Code Generator](https://graphql-code-generator.com/) to generate various type definitions based on SDL.

The GraphQL schema and HTTP server are typically handled by separate libraries. Here is an overview of current GraphQL server tools and their purpose:

| Library (npm package) | Purpose                     | Compatible with Prisma | Prisma integration |
| :-------------------- | :-------------------------- | :--------------------- | :----------------- |
| `graphql`             | GraphQL schema (code-first) | Yes                    | No                 |
| `graphql-tools`       | GraphQL schema (SDL-first)  | Yes                    | No                 |
| `type-graphql`        | GraphQL schema (code-first) | Yes                    | In progress        |
| `apollo-server`       | HTTP server                 | Yes                    | n/a                |
| `express-graphql`     | HTTP server                 | Yes                    | n/a                |
| `fastify-gql`         | HTTP server                 | Yes                    | n/a                |
| `graphql-yoga`        | HTTP server                 | Yes                    | n/a                |

In addition to these standalone and single-purpose libraries, there are several projects building integrated _application frameworks_:

| Framework                                  | Stack        | Built by                                          | Prisma                 | Description                                                                      |
| :----------------------------------------- | :----------- | :------------------------------------------------ | :--------------------- | :------------------------------------------------------------------------------- |
| [Nexus](https://www.nexusjs.org/#/)        | Backend only | [Prisma Labs](https://github.com/prisma-labs/)    | Prisma is optional     | _Delightful GraphQL Application Framework_                                       |
| [Redwood.js](https://redwoodjs.com)        | Fullstack    | [Tom Preston-Werner](https://github.com/mojombo/) | Built on top of Prisma | _Bringing full-stack to the JAMstack. _                                          |
| [Blitz](https://github.com/blitz-js/blitz) | Fullstack    | [Brandon Bayer](https://github.com/flybayer)      | Built on top of Prisma | _Rails-like framework for monolithic, full-stack React apps — built on Next.js._ |

> **Note**: If you notice any GraphQL libraries/frameworks missing from the list, please let us know.

## Prisma & GraphQL examples

Below you find a number of ready-to-run examples that showcase how to use Prisma with different combination of the tools mentioned in the table above.

### TypeScript

| Demo                                                                                                              | HTTP Server     | GraphQL schema  | Description                                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------- | :-------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| [GraphQL](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql)                               | `graphql-yoga`  | `nexus`         | Simple GraphQL server based on [`graphql-yoga`](https://github.com/prisma-labs/graphql-yoga)                                           |
| [GraphQL (Apollo Server)](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-apollo-server) | `apollo-server` | `nexus`         | Simple GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)                                    |
| [GraphQL (SDL-first)](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-sdl-first)         | `graphql-yoga`  | `graphql-tools` | Simple GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) (Apollo) |
| [GraphQL (Auth)](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-auth)                   | `graphql-yoga`  | `nexus`         | GraphQL server with email-password authentication & permissions                                                                        |

### JavaScript (Node.js)

| Demo                                                                                                              | HTTP Server     | GraphQL schema  | Description                                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------- | :-------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| [GraphQL](https://github.com/prisma/prisma-examples/tree/master/javascript/graphql)                               | `graphql-yoga`  | `nexus`         | Simple GraphQL server based on [`graphql-yoga`](https://github.com/prisma-labs/graphql-yoga)                                           |
| [GraphQL (Apollo Server)](https://github.com/prisma/prisma-examples/tree/master/javascript/graphql-apollo-server) | `apollo-server` | `nexus`         | Simple GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)                                    |
| [GraphQL (SDL-first)](https://github.com/prisma/prisma-examples/tree/master/javascript/graphql-sdl-first)         | `graphql-yoga`  | `graphql-tools` | Simple GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) (Apollo) |
| [GraphQL (Auth)](https://github.com/prisma/prisma-examples/tree/master/javascript/graphql-auth)                   | `graphql-yoga`  | `nexus`         | GraphQL server with email-password authentication & permissions                                                                        |

## FAQ

### What is Prisma's role in a GraphQL server?

No matter which of the above GraphQL tools/libraries you use, Prisma is used inside your GraphQL resolvers to connect to your database. It has the same role that any other ORM or SQL query builder would have inside your resolvers.

In the resolver of a GraphQL query, Prisma typically reads data from the database to return it in the GraphQL response. In the resolver of a GraphQL mutation, Prisma typically also writes data to the database (e.g. creating new or updating existing records).

### Is there a special connection between Prisma and Nexus?

Yes. At Prisma, we love GraphQL and strongly believe in its bright future. While Prisma is compatible with all tools from the GraphQL ecosystem, we want to leverage the amazing things that become possible when [Nexus](https://www.nexusjs.org/#/) and Prisma are combined and are therefore helping to build it.

As an example, when you use Nexus together with Prisma, Nexus can leverage the information from the Prisma schema and automatically generate queries and mutations for your Prisma models.

The [Prisma Labs](https://github.com/prisma-labs) team has been founded as an independent part of the rest of Prisma's engineering organization to work on open-source tools that are not directly tied to the Prisma database tools. Prisma Labs is currently dedicating most of their time to work on Nexus with the vision of making it a fully-fledged backend framework for building GraphQL servers.
