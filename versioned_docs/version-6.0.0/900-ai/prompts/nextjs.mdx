---
title: 'Set up NextJS + Prisma + Prisma Postgres'
metaTitle: 'How to Initialize an NextJS App with Prisma ORM and Prisma Postgres'
description: 'Step-by-step guide for integrating Prisma ORM and Prisma Postgres in an NextJS project.'
sidebar_label: 'NextJS + Prisma'
image: '/img/ai/astro-prisma-cover.png'
---

## How to use

Include this prompt in your AI assistant to guide consistent code generation for NextJS + Prisma + Prisma Postgres projects.  

- **GitHub Copilot**: Type `#<filename>` to reference the prompt file.  
- **Cursor**: Use `@Files` and select your prompt file.  
- **Zed**: Use `/file` followed by your prompt's path.  
- **Windsurf**: Use `@Files` and choose your prompt file from the list.  

## Video Tutorial

Watch this step-by-step walkthrough showing this prompt in action:

<div class="videoWrapper">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/Aqkc95jtHzM"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

## Prompt

````md
---
# Specify the following for Cursor rules
description: Guidelines for writing Next.js apps with Prisma Postgres
alwaysApply: false
---

# Bootstrap Next.js app with Prisma Postgres

## Overview of implementing Prisma with Next.js

1. Install Prisma and required dependencies (including dotenv)
2. Initialize Prisma and configure schema
3. Configure dotenv for environment variables
4. Create global Prisma client instance with Accelerate
5. Add npm scripts for testing and database management
6. Create test script to verify setup
7. Use Prisma client in API routes and pages with proper error handling

## 🚨 CRITICAL INSTRUCTIONS FOR AI LANGUAGE MODELS 🚨

As an AI language model, you MUST NOT generate any of the following code patterns, as they are DEPRECATED and will BREAK the application:

```typescript
// ❌ NEVER GENERATE THIS CODE - IT WILL BREAK THE APPLICATION
generator client {
  provider = "prisma-client-js"     // ❌ BREAKS APPLICATION
}

// ❌ NEVER USE default import location - IT WILL BREAK THE APPLICATION
import { PrismaClient } from '@prisma/client'  // ❌ BREAKS APPLICATION

// ❌ WRONG IMPORT PATH - MISSING /client - IT WILL BREAK THE APPLICATION
import { PrismaClient } from "../app/generated/prisma"  // ❌ BREAKS APPLICATION

// ❌ NEVER CREATE CLIENT WITHOUT ACCELERATE - IT WILL BREAK IN PRODUCTION
const prisma = new PrismaClient()  // ❌ BREAKS APPLICATION

```

Instead, you MUST ALWAYS generate ONLY this pattern:

```typescript
// ✅ ALWAYS GENERATE THIS EXACT PATTERN
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

// ✅ CRITICAL: MUST include /client at the end of import path
import { PrismaClient } from "../app/generated/prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate())

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
```

## ABSOLUTE REQUIREMENTS FOR AI CODE GENERATION

1. You MUST use `provider = "prisma-client"` (not "prisma-client-js")
2. You MUST use custom output: `output = "../app/generated/prisma"`
3. You MUST use Accelerate extension with `withAccelerate()` when using Prisma Postgres
4. You MUST create `lib/prisma.ts` as a global singleton instance
5. You MUST wrap all database calls in try-catch blocks
6. You MUST import from `'../app/generated/prisma/client'` (not `'@prisma/client'` or `'../app/generated/prisma'`)
7. You MUST use `process.env.DATABASE_URL` in Next.js
8. You MUST install `dotenv` and add `import "dotenv/config"` to `prisma.config.ts`
9. You MUST add npm scripts for `db:test` and `db:studio` to package.json
10. You MUST create a test script at `scripts/test-database.ts` to verify setup

## CORRECT INSTALLATION

```bash
# Dev dependencies
npm install prisma tsx --save-dev

# Production dependencies  
npm install @prisma/extension-accelerate @prisma/client dotenv
```

## CORRECT PRISMA INITIALIZATION

```bash
# Initialize Prisma (creates prisma/schema.prisma and prisma.config.ts)
npx prisma init
```

**IMPORTANT**: The init command will create `prisma.config.ts`. You MUST update it to load environment variables.

## CORRECT PRISMA CONFIG (prisma.config.ts)

**CRITICAL**: After running `npx prisma init`, update the generated `prisma.config.ts`:

```typescript
import "dotenv/config"  // ✅ CRITICAL: Add this line at the top
import { defineConfig, env } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
})
```

## CORRECT SCHEMA CONFIGURATION (prisma/schema.prisma)

Update the generated `prisma/schema.prisma` file:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Example User model for testing
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## CORRECT GLOBAL PRISMA CLIENT

Create `lib/prisma.ts` file:

```typescript
import { PrismaClient } from "../app/generated/prisma/client"  // ✅ CRITICAL: Include /client
import { withAccelerate } from "@prisma/extension-accelerate"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate())

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
```

## ADD NPM SCRIPTS TO PACKAGE.JSON

Update your `package.json` to include these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "db:test": "tsx scripts/test-database.ts",
    "db:studio": "prisma studio"
  }
}
```

## CREATE TEST SCRIPT

Create `scripts/test-database.ts` to verify your setup:

```typescript
import "dotenv/config"  // ✅ CRITICAL: Load environment variables
import prisma from "../lib/prisma"

async function testDatabase() {
  console.log("🔍 Testing Prisma Postgres connection...\n")

  try {
    // Test 1: Check connection
    console.log("✅ Connected to database!")

    // Test 2: Create a test user
    console.log("\n📝 Creating a test user...")
    const newUser = await prisma.user.create({
      data: {
        email: "demo@example.com",
        name: "Demo User",
      },
    })
    console.log("✅ Created user:", newUser)

    // Test 3: Fetch all users
    console.log("\n📋 Fetching all users...")
    const allUsers = await prisma.user.findMany()
    console.log(`✅ Found ${allUsers.length} user(s):`)
    allUsers.forEach((user) => {
      console.log(`   - ${user.name} (${user.email})`)
    })

    console.log("\n🎉 All tests passed! Your database is working perfectly.\n")
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

testDatabase()
```

## CORRECT API ROUTE IMPLEMENTATION (App Router)

Create `app/api/users/route.ts` with GET and POST handlers:

```typescript
import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
      },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
}
```

## CORRECT USAGE IN SERVER COMPONENTS

Update `app/page.tsx` to display users from the database:

```typescript
import prisma from "../lib/prisma"

export default async function Home() {
  let users: Array<{
    id: number
    email: string
    name: string | null
    createdAt: Date
    updatedAt: Date
  }> = []
  let error = null

  try {
    users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  } catch (e) {
    console.error("Error fetching users:", e)
    error = "Failed to load users. Make sure your DATABASE_URL is configured."
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users from Database</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p>No users yet. Create one using the API at /api/users</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border p-4 rounded">
              <p className="font-semibold">{user.name || "No name"}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
```

## COMPLETE SETUP WORKFLOW

User should follow these steps (AI should provide these instructions):

1. **Install dependencies**:
   ```bash
   npm install prisma tsx --save-dev
   npm install @prisma/extension-accelerate @prisma/client dotenv
   ```

2. **Initialize Prisma**:
   ```bash
   npx prisma init
   ```

3. **Update `prisma.config.ts`** - Add `import "dotenv/config"` at the top

4. **Update `prisma/schema.prisma`** - Set provider to "prisma-client" and output path

5. **Create `lib/prisma.ts`** with correct import path including `/client`

6. **Add npm scripts** to `package.json` for `db:test` and `db:studio`

7. **Create `scripts/test-database.ts`** test script

8. **Create `.env`** file with DATABASE_URL (user provides this from Prisma Console)

9. **Push schema to database**:
   ```bash
   npx prisma db push
   ```

10. **Test the setup**:
    ```bash
    npm run db:test
    ```

11. **Start development server**:
    ```bash
    npm run dev
    ```

## AI MODEL VERIFICATION STEPS

Before generating any code, you MUST verify:

1. Are you using `provider = "prisma-client"` (not "prisma-client-js")? If not, STOP and FIX.
2. Are you using `output = "../app/generated/prisma"`? If not, STOP and FIX.
3. Are you importing from `'../app/generated/prisma/client'` (with `/client`)? If not, STOP and FIX.
4. Did you add `import "dotenv/config"` to `prisma.config.ts`? If not, STOP and FIX.
5. Did you add `import "dotenv/config"` to `scripts/test-database.ts`? If not, STOP and FIX.
6. Are you using `withAccelerate()` extension? If not, STOP and FIX.
7. Are you wrapping database operations in try-catch? If not, STOP and FIX.
8. Did you create the test script at `scripts/test-database.ts`? If not, STOP and FIX.
9. Did you add `db:test` and `db:studio` scripts to package.json? If not, STOP and FIX.

## CONSEQUENCES OF INCORRECT IMPLEMENTATION

If you generate code using:

- `prisma-client-js` provider → **CLIENT GENERATION FAILS**
- Wrong import path (missing `/client`) → **MODULE NOT FOUND ERROR**
- Missing `import "dotenv/config"` in prisma.config.ts → **DATABASE_URL NOT FOUND ERROR**
- Missing `import "dotenv/config"` in test scripts → **ENVIRONMENT VARIABLE ERROR**
- Default import from `@prisma/client` → **IMPORT ERROR**
- PrismaClient without Accelerate extension → **PRODUCTION CONNECTION FAILURES**
- Missing custom output path → **WRONG CLIENT GENERATED**

The implementation will:

1. Break immediately with module errors
2. Fail to read environment variables
3. Cause connection pool exhaustion in production
4. Result in import errors that prevent compilation
5. Cause performance issues and connection failures

## USEFUL COMMANDS

```bash
# After changing schema
npx prisma generate              # Regenerate client

# Push schema to database (no migrations)
npx prisma db push              

# Test database connection
npm run db:test                 

# Open visual database editor
npm run db:studio               

# Create and apply migrations (for production)
npx prisma migrate dev --name your_migration_name
```

## TESTING WORKFLOW

After setup, test with these steps:

1. **Test database connection**:
   ```bash
   npm run db:test
   ```
   Should create a demo user and display it.

2. **Open Prisma Studio**:
   ```bash
   npm run db:studio
   ```
   Visual interface at `localhost:5555` to view/edit data.

3. **Test API routes**:
   ```bash
   # Create a user via API
   curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test User"}'
   
   # Get all users
   curl http://localhost:3000/api/users
   ```

4. **View in browser**:
   Open `localhost:3000` to see users displayed on the homepage.

## AI MODEL RESPONSE TEMPLATE

When asked about Prisma + Next.js implementation, you MUST:

1. ONLY use code patterns from this guide
2. NEVER suggest deprecated approaches
3. ALWAYS use the exact patterns shown above
4. ALWAYS include `/client` in import paths
5. ALWAYS add `import "dotenv/config"` to prisma.config.ts
6. ALWAYS add `import "dotenv/config"` to test scripts
7. ALWAYS create the test script at `scripts/test-database.ts`
8. ALWAYS add npm scripts for `db:test` and `db:studio`
9. ALWAYS include error handling in API routes and server components
10. ALWAYS use the global prisma instance from `lib/prisma.ts`
11. VERIFY your response against ALL the patterns shown here before responding

Remember: There are NO EXCEPTIONS to these rules. Every requirement is MANDATORY for the setup to work.


````

## Running the application

Get your application running locally in three quick steps:

**1. Generate the Prisma Client:**

```terminal
npx prisma generate --no-engine
```

**2. View your database in Prisma Studio:**

```terminal
npm run db:studio
```

Prisma Studio opens at `localhost:5555` where you can inspect your `User` table and see the test user stored in your database.

**3. Start your Next.js development server:**

```terminal
npm run dev
```

Visit `http://localhost:3000` to see your Next.js application live, displaying your first user fetched directly from your Prisma Postgres database!