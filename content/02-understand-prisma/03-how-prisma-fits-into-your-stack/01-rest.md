---
title: 'REST'
metaTitle: ''
metaDescription: ''
---

## Overview

When building REST APIs, Prisma Client can be used inside your _route controllers_ to send databases queries.

![](https://imgur.com/dbRvgHc.png)

## Supported libraries

As Prisma Client is "only" responsible for sending queries to your database, it can be combined with any HTTP server library or web framework of your choice.

Here are a few examples:

- [Express](https://expressjs.com/)
- [koa](https://koajs.com/)
- [hapi](https://hapi.dev/)
- [Fastify](https://www.fastify.io/)
- [Sails](https://sailsjs.com/)
- [AdonisJs](https://adonisjs.com/)
- [NestJS](https://nestjs.com/)
- [Next.js](https://nextjs.org/)
- [Foal TS](https://foalts.org/)
- [Polka](https://github.com/lukeed/polka)
- [Micro](https://github.com/zeit/micro)
- [Feathers](https://feathersjs.com/)

## Example

You can find several ready-to-tun examples that show how to implement a REST API with Prisma Client in the [`prisma-examples`](https://github.com/prisma/prisma-examples/) repository.

## TypeScript

### Fullstack

| Example                                                                                          | Language   | Stack        | Description                                                       |
| :----------------------------------------------------------------------------------------------- | :--------- | ------------ | ----------------------------------------------------------------- |
| [`rest-nextjs`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/rest-nextjs)   | TypeScript | Fullstack    | Simple [Next.js](https://nextjs.org/) app (React) with a REST API |
| [`rest-express`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/rest-express) | TypeScript | Backend only | Simple REST API with Express                                      |
| [`rest-nextjs`](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/rest-nextjs)   | JavaScript | Fullstack    | Simple [Next.js](https://nextjs.org/) app (React) with a REST API |
| [`rest-express`](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/rest-express) | JavaScript | Backend only | Simple REST API with Express                                      |
