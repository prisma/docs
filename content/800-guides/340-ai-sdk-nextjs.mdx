---
title: 'How to use AI SDK with Prisma ORM, Prisma Postgres, and Next.js for chat applications'
metaTitle: 'How to use AI SDK with Prisma ORM, Prisma Postgres, and Next.js for chat applications'
description: 'Build a chat application with AI SDK, Prisma, and Next.js to store chat sessions and messages'
sidebar_label: 'AI SDK (with Next.js)'
image: '/img/guides/prisma-ai-sdk-nextjs-cover.png'
completion_time: '20 min'
community_section: true
---

## Introduction

Prisma ORM streamlines database access with type-safe queries, and when paired with [Next.js](https://nextjs.org/) and [AI SDK](https://sdk.vercel.ai/), it creates a powerful foundation for building AI-powered chat applications with persistent storage.

In this guide, you'll learn to build a chat application using AI SDK with Next.js and Prisma ORM to store chat sessions and messages in a Prisma Postgres database. You can find a complete example of this guide on [GitHub](https://github.com/prisma/prisma-examples/tree/latest/orm/ai-sdk-nextjs).

## Prerequisites
- [Node.js 20+](https://nodejs.org)
- An [OpenAI API key](https://platform.openai.com/api-keys) or other AI provider API key

## 1. Set up your project

To get started, you'll need to create a new Next.js project.

```terminal
npx create-next-app@latest ai-sdk-prisma
```

It will prompt you to customize your setup. Choose the defaults:

:::info

- *Would you like to use TypeScript?* `Yes`
- *Would you like to use ESLint?* `Yes`
- *Would you like to use Tailwind CSS?* `Yes`
- *Would you like your code inside a `src/` directory?* `No`
- *Would you like to use App Router?* (recommended) `Yes`
- *Would you like to use Turbopack for `next dev`?* `Yes`
- *Would you like to customize the import alias (`@/*` by default)?* `No`

:::

Navigate to the project directory:

```terminal
cd ai-sdk-prisma
```

## 2. Install and Configure Prisma

### 2.1. Install dependencies

To get started with Prisma, you'll need to install a few dependencies:

```terminal
npm install prisma tsx @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg dotenv pg
```

:::info

If you are using a different database provider (MySQL, SQL Server, SQLite), install the corresponding driver adapter package instead of `@prisma/adapter-pg`. For more information, see [Database drivers](/orm/overview/databases/database-drivers).

:::

Once installed, initialize Prisma in your project:

```terminal
npx prisma init --db --output ../app/generated/prisma
```
:::info
You'll need to answer a few questions while setting up your Prisma Postgres database. Select the region closest to your location and a memorable name for your database like "My Next.js AI SDK Project"
:::

This will create:

- A `prisma` directory with a `schema.prisma` file.
- A `prisma.config.ts` file for configuring Prisma
- A Prisma Postgres database.
- A `.env` file containing the `DATABASE_URL` at the project root.
- The `output` field specifies where the generated Prisma Client will be stored.

### 2.2. Define your Prisma Schema

In the `prisma/schema.prisma` file, add the following models:

```prisma file=prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

//add-start
model Session {
  id        String    @id
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  messages  Message[]
}

model Message {
  id        String      @id @default(cuid())
  role      MessageRole
  content   String
  createdAt DateTime    @default(now())
  sessionId String
  session   Session     @relation(fields: [sessionId], references: [id], onDelete: Cascade)
}

enum MessageRole {
  USER
  ASSISTANT
}
//add-end
```

This creates three models: `Session`, `Message`, and `MessageRole`.

### 2.3 Add `dotenv` to `prisma.config.ts`

To get access to the variables in the `.env` file, they can either be loaded by your runtime, or by using `dotenv`.
Include an import for `dotenv` at the top of the `prisma.config.ts`

```ts
//add-start
import 'dotenv/config'
//add-end
import { defineConfig, env } from 'prisma/config';
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
```

### 2.4. Configure the Prisma Client generator

Now, run the following command to create the database tables and generate the Prisma Client:

```terminal
npx prisma migrate dev --name init
npx prisma generate
```

## 3. Integrate Prisma into Next.js

Create a `/lib` directory and a `prisma.ts` file inside it. This file will be used to create and export your Prisma Client instance.

```terminal
mkdir lib
touch lib/prisma.ts
```

Set up the Prisma client like this:

```tsx file=lib/prisma.ts
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

:::warning
We recommend using a connection pooler (like [Prisma Accelerate](https://www.prisma.io/accelerate)) to manage database connections efficiently.

If you choose not to use one, **avoid** instantiating `PrismaClient` globally in long-lived environments. Instead, create and dispose of the client per request to prevent exhausting your database connections.
:::

## 4. Set up AI SDK

### 4.1. Install AI SDK and get an API key

Install the AI SDK package:

```terminal
npm install ai @ai-sdk/react @ai-sdk/openai zod
```

To use AI SDK, you'll need to obtain an API key from [OpenAI](https://platform.openai.com/api-keys).

1. Navigate to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Click on `Create new secret key`
3. Fill in the form:
    - Give your key a name like `Next.js AI SDK Project`
    - Select `All` access
4. Click on `Create secret key`
5. Copy the API key
6. Add the API key to the `.env` file:

```env file=.env
DATABASE_URL=<YOUR_DATABASE_URL_HERE>
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY_HERE>
```

### 4.2. Create a route handler

You need to create a route handler to handle the AI SDK requests. This handler will process chat messages and stream AI responses back to the client.

```terminal
mkdir -p app/api/chat
touch app/api/chat/route.ts
```

Set up the basic route handler:

```tsx file=app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const maxDuration = 300;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

This route handler:

1. Extracts the conversation history from the request body
2. Converts UI messages to the format expected by the AI model
3. Streams the AI response back to the client in real-time

To save chat sessions and messages to the database, we need to:

1. Add a session `id` parameter to the request
2. Include an `onFinish` callback in the response
3. Pass the `id` and `messages` parameters to the `saveChat` function (which we'll build next)

```tsx file=app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
//add-next-line
import { saveChat } from "@/lib/save-chat";

export const maxDuration = 300;

export async function POST(req: Request) {
  //edit-next-line
  const { messages, id }: { messages: UIMessage[]; id: string } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    //add-start
    originalMessages: messages,
    onFinish: async ({ messages }) => {
      await saveChat(messages, id);
    },
    //add-end
  });
}
```

### 4.3. Create a `saveChat` function

Create a new file at `lib/save-chat.ts` to save the chat sessions and messages to the database:

```terminal
touch lib/save-chat.ts
```

To start, create a basic function called `saveChat` that will be used to save the chat sessions and messages to the database. 

Pass into it the `messages` and `id` parameters typed as `UIMessage[]` and `string` respectively:

```tsx file=lib/save-chat.ts
import { UIMessage } from "ai";

export async function saveChat(messages: UIMessage[], id: string) {

}
```

Now, add the logic to create a session with the given `id`:

```tsx file=lib/save-chat.ts
//add-next-line
import prisma from "./prisma";
import { UIMessage } from "ai";

export async function saveChat(messages: UIMessage[], id: string) {
  //add-start
  const session = await prisma.session.upsert({
    where: { id },
    update: {},
    create: { id },
  });

  if (!session) throw new Error("Session not found");
  //add-end
}
```

Add the logic to save the messages to the database. You'll only be saving the last two messages _(Users and Assistants last messages)_ to avoid any overlapping messages.

```tsx file=lib/save-chat.ts
import prisma from "./prisma";
import { UIMessage } from "ai";

export async function saveChat(messages: UIMessage[], id: string) {
  const session = await prisma.session.upsert({
    where: { id },
    update: {},
    create: { id },
  });

  if (!session) throw new Error("Session not found");

  //add-start
  const lastTwoMessages = messages.slice(-2);

  for (const msg of lastTwoMessages) {
    let content = JSON.stringify(msg.parts);
    if (msg.role === "assistant") {
      const textParts = msg.parts.filter((part) => part.type === "text");
      content = JSON.stringify(textParts);
    }

    await prisma.message.create({
      data: {
        role: msg.role === "user" ? "USER" : "ASSISTANT",
        content: content,
        sessionId: session.id,
      },
    });
  }
  //add-end
}
```

This function:

1. Upserts a session with the given `id` to create a session if it doesn't exist
2. Saves the messages to the database under the `sessionId`

## 5. Create a messages API route

Create a new file at `app/api/messages/route.ts` to fetch the messages from the database:

```terminal
mkdir -p app/api/messages
touch app/api/messages/route.ts
```

Create a basic API route to fetch the messages from the database.

```tsx file=app/api/messages/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "asc" },
    });

    const uiMessages = messages.map((msg) => ({
      id: msg.id,
      role: msg.role.toLowerCase(),
      parts: JSON.parse(msg.content),
    }));

    return NextResponse.json({ messages: uiMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ messages: [] });
  }
}
```

## 6. Create the UI

Replace the content of the `app/page.tsx` file with the following:

```tsx file=app/page.tsx
'use client';

export default function Page() {

}
```

### 6.1. Set up the basic imports and state

Start by importing the required dependencies and setting up the state variables that will manage the chat interface:

```tsx file=app/page.tsx
'use client';

//add-next-line
import { useChat } from '@ai-sdk/react';
//add-next-line
import { useState, useEffect } from 'react';

export default function Chat() {
  //add-start
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { messages, sendMessage, setMessages } = useChat();
  //add-end
}
```



### 6.2. Load existing messages

Create a `useEffect` hook that will automatically fetch and display any previously saved messages when the chat component loads:

```tsx file=app/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { messages, sendMessage, setMessages } = useChat();

  //add-start
  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [setMessages]);
  //add-end
}
```

This loads any existing messages from your database when the component first mounts, so users can see their previous conversation history.

### 6.3. Add message display

Build the UI components that will show a loading indicator while fetching data and render the chat messages with proper styling:

```tsx file=app/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { messages, sendMessage, setMessages } = useChat();

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [setMessages]);

  //add-start
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => (
        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
          <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
            message.role === 'user' 
              ? 'bg-neutral-600 text-white' 
              : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
          }`}>
            <div className="whitespace-pre-wrap">
              <p className="text-xs font-extralight mb-1 opacity-70">{message.role === 'user' ? 'YOU ' : 'AI '}</p>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                }
              })}
            </div>
          </div>
        </div>
      ))}
  //add-end
```

The message rendering logic handles different message types and applies appropriate styling - user messages appear on the right with a dark background, while AI responses appear on the left with a light background.

### 6.4. Add the input form

Now we need to create the input interface that allows users to type and send messages to the AI:

```tsx file=app/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { messages, sendMessage, setMessages } = useChat();

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [setMessages]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => (
        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
          <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
            message.role === 'user' 
              ? 'bg-neutral-600 text-white' 
              : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
          }`}>
            <div className="whitespace-pre-wrap">
              <p className="text-xs font-extralight mb-1 opacity-70">{message.role === 'user' ? 'YOU ' : 'AI '}</p>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                }
              })}
            </div>
          </div>
        </div>
      ))}

      //add-start
      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
      //add-end
    </div>
  );
}
```

## 7. Test your application

To test your application, run the following command:

```terminal
npm run dev
```

Open your browser and navigate to [`http://localhost:3000`](http://localhost:3000) to see your application in action.

Test it by sending a message to the AI and see if it's saved to the database. Check Prisma Studio to see the messages in the database.

```terminal
npx prisma studio
```

You're done! You've just created a AI SDK chat application with Next.js and Prisma. Below are some next steps to explore, as well as some more resources to help you get started expanding your project.

## Next Steps

Now that you have a working AI SDK chat application connected to a Prisma Postgres database, you can:

- Extend your Prisma schema with more models and relationships
- Add create/update/delete routes and forms
- Explore authentication and validation
- Enable query caching with [Prisma Postgres](/postgres/database/caching) for better performance

### More Info

- [Prisma Documentation](/orm/overview/introduction)
- [AI SDK Documentation](https://ai-sdk.dev/)