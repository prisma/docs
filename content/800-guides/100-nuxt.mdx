---
title: 'How to use Prisma ORM and Prisma Postgres with Nuxt'
metaTitle: 'Build a Nuxt app with Prisma ORM and Prisma Postgres'
description: 'A step-by-step guide to setting up and using Prisma ORM and Prisma Postgres in a Nuxt app.'
sidebar_label: 'Nuxt'
completion_time: '10 min'
image: '/img/guides/prisma-postgres-and-prisma-nuxt-guide.png'
tags:
  - Nuxt
  - Prisma Postgres
community_section: true
---

This guide shows you how to set up Prisma ORM in a Nuxt application with [Prisma Postgres](https://prisma.io/postgres).

## Prerequisites

- Node.js 18+
- A [Prisma Postgres](https://console.prisma.io/) database (or any PostgreSQL database)

## 1. Create a Nuxt project

Create a new Nuxt project and install dependencies:

```terminal
npx nuxi@latest init hello-prisma
cd hello-prisma
npm install @prisma/client @prisma/adapter-pg pg
npm install -D prisma @types/pg dotenv tsx
```

## 2. Initialize Prisma

Initialize Prisma in your project:

```terminal
npx prisma init
```

Update your `prisma/schema.prisma`:

```prisma file=prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "./generated"
}

datasource db {
  provider = "postgresql"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

Create a `prisma.config.ts` file in the root of your project:

```ts file=prisma.config.ts
import { defineConfig, env } from 'prisma/config'
import 'dotenv/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx ./prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
```

Update your `.env` file with your database connection string:

```bash file=.env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

Run the migration to create your database tables:

```terminal
npx prisma migrate dev --name init
```

## 3. Set up Prisma Client

Create `server/utils/db.ts`. Nuxt auto-imports exports from `server/utils`, making `prisma` available in all API routes:

```ts file=server/utils/db.ts
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../prisma/generated/client'

const prismaClientSingleton = () => {
  const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
  return new PrismaClient({ adapter: pool })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## 4. Create API routes

Create an API route to fetch users. The `prisma` instance is auto-imported:

```ts file=server/api/users.get.ts
export default defineEventHandler(async () => {
  const users = await prisma.user.findMany({
    include: { posts: true }
  })
  return users
})
```

Create an API route to create a user:

```ts file=server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody<{ name: string; email: string }>(event)

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  })

  return user
})
```

## 5. Create a page

Update `app.vue` to display users:

```html file=app.vue
<template>
  <div>
    <h1>Users</h1>
    <ul v-if="users?.length">
      <li v-for="user in users" :key="user.id">
        {{ user.name }} ({{ user.email }})
      </li>
    </ul>
    <p v-else>No users yet.</p>
  </div>
</template>

<script setup>
const { data: users } = await useFetch('/api/users')
</script>
```

## 6. Run the app

Start the development server:

```terminal
npm run dev
```

Open `http://localhost:3000` to see your app.

## 7. Seed your database (optional)

Create a seed file to populate your database with sample data:

```ts file=prisma/seed.ts
import 'dotenv/config'
import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World', published: true },
      },
    },
  })
  console.log(`Created user: ${alice.name}`)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Run the seed:

```terminal
npx prisma db seed
```

## 8. Deploy to Vercel

You can deploy your Nuxt application to Vercel using one of two methods:

### Option A: Deploy using Vercel CLI

1. Install the Vercel CLI (if not already installed):
   ```terminal
   npm install -g vercel
   ```

2. Deploy your project:
   ```terminal
   npx vercel
   ```

3. Set the `DATABASE_URL` environment variable:
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Navigate to **Settings** → **Environment Variables**
   - Add `DATABASE_URL` with your database connection string

4. Redeploy your application to apply the environment variable:
   ```terminal
   npx vercel --prod
   ```

### Option B: Deploy using Git integration

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Add `prisma generate` to your `postinstall` script in `package.json` to ensure Prisma Client is generated during deployment:
   ```json file=package.json
   {
     "scripts": {
       "postinstall": "prisma generate",
       "build": "nuxt build",
       "dev": "nuxt dev"
     }
   }
   ```

3. Import your project in Vercel:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **Add New** → **Project**
   - Import your Git repository
   - Vercel will automatically detect it as a Nuxt project

4. Configure environment variables:
   - Before deploying, go to **Environment Variables**
   - Add `DATABASE_URL` with your database connection string
   - Click **Deploy**

Vercel will automatically build and deploy your Nuxt application. The deployment process is the same as any other Node.js application, and Prisma Client will be generated during the build process thanks to the `postinstall` script.

## Next steps

- Explore the [full Nuxt + Prisma example](https://github.com/prisma/prisma-examples/tree/latest/orm/nuxt) for a complete blog application
- Learn about [Prisma Client API](/orm/prisma-client)
- Set up [Prisma Postgres](/postgres) for a managed database
