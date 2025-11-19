---
title: 'How to use Prisma Postgres with Shopify'
metaTitle: 'How to use Prisma Postgres with Shopify'
description: 'Learn how to use Prisma Postgres with Shopify'
sidebar_label: 'Shopify'
image: '/img/guides/prisma-shopify-cover.png'
completion_time: '25 min'
community_section: true
---

## Introduction

[Shopify](https://www.shopify.com/) is a popular platform for building e-commerce stores. This guide will show you how to connect a Shopify app to a [Prisma Postgres](https://www.prisma.io/postgres) database in order to create internal notes for products.

## Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)
- [Shopify Partner Account](https://www.shopify.com/partners) and a [development store](https://shopify.dev/docs/api/development-stores#create-a-development-store-to-test-your-app)

## 1. Set up your project

:::note
If you do not have the Shopify CLI installed, you can install it with `npm install -g @shopify/cli`.
:::

To start, initialize a new Shopify app using the Shopify CLI:

```terminal
shopify app init
```

During setup, you'll be prompted to customize your app. Don't worry—just follow these recommended options to get started quickly and ensure your app is set up for success:

:::info

- *Get started building your app:* `Build a Remix app (recommended)`
- *For your Remix template, which language do you want:* `JavaScript`
- *App Name:* `prisma-store` *(name cannot contain `shopify`)*

:::

Navigate to the `prisma-store` directory:

```terminal
cd prisma-store
```

## 2. Set up Prisma

Prisma comes pre-installed in your project, but let's take a moment to update it to the latest version. This ensures you have access to the newest features, improvements, and the best possible experience as you build your app.



You will be swapping to a Prisma Postgres database, so delete the `migrations` folder along with the `dev.sqlite` file, inside of the `prisma` directory.

You need to update a few things in the `schema.prisma` file to get it working with Remix and Prisma Postgres.
- Swap to the new `prisma-client` generator.
- Update the provider to `postgresql`.
- Update the url to the new database url.


```prisma file=prisma/schema.prisma
generator client {
	//delete-next-line
  provider = "prisma-client-js"
  //add-next-line
  provider = "prisma-client"
  //add-next-line
  output   = "../app/generated/prisma"
}

datasource db {
	//delete-next-line
  provider = "sqlite"
	//add-next-line
  provider = "postgresql"
  //delete-next-line
  url      = "file:../dev.db"
}

model Session {
  // ... existing model
}
```

Create a `prisma.config.ts` file to configure Prisma:

```typescript file=prisma.config.ts
//add-start
import 'dotenv/config'
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
//add-end
```

:::note

Since Shopify apps typically have dotenv pre-installed, you should already have access to it. If not, install it with:

```terminal
npm install dotenv
```

:::

To enable your app to store notes for each product, let's add a new `ProductNote` model to your Prisma schema. 

This model will allow you to save and organize notes linked to individual products in your database through the `productGid` field.

```prisma file=prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Session {
  // ... existing model
}

//add-start
model ProductNote {
  id         String   @id @default(uuid())
  productGid String
  body       String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
//add-end
```
Next, Prisma will need to be updated to the latest version. Run:

```terminal
npm install prisma @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg
```

:::info

If you are using a different database provider (MySQL, SQL Server, SQLite), install the corresponding driver adapter package instead of `@prisma/adapter-pg`. For more information, see [Database drivers](/orm/overview/databases/database-drivers).

:::

Prisma Postgres allows you to create a new database on the fly, you can create a new database at the same time you initialize your project by adding the `--db` flag:

```terminal
npx prisma init --db
```

Once you've completed the prompts, it's time to access your new database:

1. **Open the [Prisma Console](https://console.prisma.io):**
   - Log in and select your newly created database project.
2. **Get your database connection string:**
   - Click the **Connect** button.
   - Copy the connection string that appears. It should look similar to this:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
   ```
3. **Configure your environment:**
   - Create a new `.env` file in the root of your project.
   - Paste the `DATABASE_URL` you just copied into this file.
4. **Apply your database schema:**
   - Run the following command to create your tables and get your database ready:
   ```terminal
   npx prisma migrate dev --name init
   ```

   Then generate Prisma Client:
   ```terminal
   npx prisma generate
   ```

Now, before moving on, let's update your `db.server.ts` file to use the newly generated Prisma client with the driver adapter:

```tsx file=app/db.server.ts
//delete-start
import { PrismaClient } from "@prisma/client";
//delete-end
//add-start
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
//add-end

if (process.env.NODE_ENV !== "production") {
  if (!global.prismaGlobal) {
    //delete-next-line
    global.prismaGlobal = new PrismaClient();
    //add-next-line
    global.prismaGlobal = new PrismaClient({ adapter });
  }
}

//delete-next-line
const prisma = global.prismaGlobal ?? new PrismaClient();
//add-next-line
const prisma = global.prismaGlobal ?? new PrismaClient({ adapter });

export default prisma;
```

:::warning
It is recommended to add `app/generated/prisma` to your `.gitignore` file.
:::

## 3. Create your Remix model

To keep your project organized, let's create a new `models/` folder. Inside this folder, add a file named `notes.server.js`. This will be the home for all your note-related logic and make your codebase easier to manage as your app grows.

The `notes.server.js` file will contain two functions:
- `getNotes` - This will get all the notes for a given product.
- `createNote` - This will create a new note for a given product.

Start by importing the Prisma client from `db.server.ts` and creating the `getNotes` function:

```js file=models/notes.server.js
//add-start
import prisma from "../db.server";

export const getNotes = async (productGid) => {
  const notes = await prisma.productNote.findMany({
    where: { productGid: productGid.toString() },
    orderBy: { createdAt: "desc" },
  });
  return notes;
};
//add-end
```

To enable users to add new notes to your database, let's create a function in `notes.server.js` that uses `prisma.productNote.create`:

```js file=models/notes.server.js
import prisma from "../db.server";

export const getNotes = async (productGid) => {
  const notes = await prisma.productNote.findMany({
    where: { productGid: productGid.toString() },
    orderBy: { createdAt: "desc" },
  });
  return notes;
};

//add-start
export const createNote = async (note) => {
  const newNote = await prisma.productNote.create({
    data: {
      body: note.body,
      productGid: note.productGid,
    },
  });
  return newNote;
};
//add-end
```

## 4. Create your layout route

Before those functions are able to be called, our route needs a layout to sit in. This layout route will feature a button for selecting a product, and will act as the parent for your `ProductNotes` route, keeping your app organized and user-friendly.

### 4.1. Create the ProductNotesLayout component

Start by creating the the folder `routes/app.product-notes.jsx` and adding the `ProductNotesLayout` component inside of it:

```jsx file=app/routes/app.product-notes.jsx
//add-start
import { Page, Layout } from "@shopify/polaris";

export default function ProductNotesLayout() {
  return (
    <Page title="Product Notes">
      <Layout>
        <Layout.Section></Layout.Section>
      </Layout>
    </Page>
  );
}
//add-end
```

Next, create the `selectProduct` function and a `Button` to let the user pick a product:

```jsx file=app/routes/app.product-notes.jsx
import { useNavigate } from "@remix-run/react";
//delete-next-line
import { Page, Layout } from "@shopify/polaris";
//add-next-line
import { Button, Page, Layout } from "@shopify/polaris";

export default function ProductNotesLayout() {
  //add-next-line
  const navigate = useNavigate();

  //add-start
  async function selectProduct() {
    const products = await window.shopify.resourcePicker({
      type: "product",
      action: "select",
    });
    const selectedGid = products[0].id;
    navigate(`/app/product-notes/${encodeURIComponent(selectedGid)}`);
  }
  //add-end

  return (
    <Page title="Product Notes">
      <Layout>
        <Layout.Section>
          //add-start
          <Button onClick={selectProduct} fullWidth size="large">
            Select Product
          </Button>
          //add-end
        </Layout.Section>
      </Layout>
    </Page>
  );
}
```

Remix renders provides the ability to render a nested route. Add an `<Outlet />` to the `routes/app.product-notes.jsx` file where the `ProductNotes` route will be rendered:

```jsx file=app/routes/app.product-notes.jsx
//delete-next-line
import { useNavigate } from "@remix-run/react";
//add-next-line
import { Outlet, useNavigate } from "@remix-run/react";
import { Page, Button, Layout } from "@shopify/polaris";

export default function ProductNotesLayout() {
  const navigate = useNavigate();

  async function selectProduct() {
    const products = await window.shopify.resourcePicker({
      type: "product",
      action: "select",
    });
    const selectedGid = products[0].id;
    navigate(`/app/product-notes/${encodeURIComponent(selectedGid)}`);
  }

  return (
    <Page title="Product Notes">
      <Layout>
        <Layout.Section>
          <Button onClick={selectProduct} fullWidth size="large">
            Select Product
          </Button>
        </Layout.Section>
        //add-next-line
        <Outlet />
      </Layout>
    </Page>
  );
}
```

### 4.2. Add the ProductNotesLayout to the sidebar

If you run `npm run dev`, you won't be able to see the `Product Notes` route. To fix this, you need to add the `ProductNotesLayout` to the `app.jsx` file so it shows up in the sidebar:

```jsx file=app/routes/app.jsx
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
        //add-next-line
        <Link to="/app/product-notes">Product Notes</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
```

## 5. Create your product notes route

Currently, if you run `npm run dev` and navigate to the `Product Notes` route, you will see nothing once selecting a product.

Follow these steps to create the product notes route:

Create a new `routes/app/app.notes.$productGid.jsx` file which will take in the productGid as a parameter, and return the product notes associated with the product as well as a form to create a new note:

```jsx file=app/routes/app/app.notes.$productGid.jsx
//add-start
export default function ProductNotes() {
  return (
    <></>
  );
}
//add-end
```

### 5.1. Render the notes

On load, the route will need to fetch the notes for the product and display them.

Add a `loader` function to the route:

```jsx file=app/routes/app/app.notes.$productGid.jsx
//add-start
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getNotes } from "../models/note.server";
//add-end

//add-start
export const loader = async ({ params }) => {
  const { productGid } = params;
  const notes = await getNotes(productGid);
  return json({ notes, productGid });
};
//add-end

export default function ProductNotes() {
  //add-next-line
  const { notes, productGid } = useLoaderData();

  return (
    <></>
  );
}
```

Map out the notes in the `ProductNotes` component, using Polaris components:

```jsx file=app/routes/app/app.notes.$productGid.jsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getNotes } from "../models/note.server";
//add-next-line
import { Card, Layout, Text, BlockStack } from "@shopify/polaris";

export const loader = async ({ params }) => {
  const { productGid } = params;
  const notes = await getNotes(productGid);
  return json({ notes, productGid });
};

export default function ProductNotes() {
  const { notes, productGid } = useLoaderData();
  return (
    <>
      //add-start
      <Layout.Section>
        <BlockStack gap="200">
          {notes.length === 0 ? (
            <Text as="p" variant="bodyMd" color="subdued">
              No notes yet.
            </Text>
          ) : (
            notes.map((note) => (
              <Card key={note.id} sectioned>
                <BlockStack gap="100">
                  {note.body && (
                    <Text as="p" variant="bodyMd">
                      {note.body}
                    </Text>
                  )}
                  <Text as="p" variant="bodySm" color="subdued">
                    Added: {new Date(note.createdAt).toLocaleString()}
                  </Text>
                </BlockStack>
              </Card>
            ))
          )}
        </BlockStack>
      </Layout.Section>
      //add-end
    </>
  );
}
```

You should be seeing "No notes yet.". If so, you're on the right track.

### 5.2. Add the form

A few things need to be added to the route in order to create a new note:
- Add an `action` function to the route.
- Display a `Toast` notification when a note is created.
- Import the `createNote` function from `models/note.server.js`.
- Import the `useActionData` and `useAppBridge`

```jsx file=app/routes/app/app.notes.$productGid.jsx
import { json, redirect } from "@remix-run/node";
//delete-next-line
import { useLoaderData } from "@remix-run/react";
//add-next-line
import { useLoaderData, useActionData } from "@remix-run/react";
//delete-next-line
import { getNotes } from "../models/note.server";
//add-next-line
import { getNotes, createNote } from "../models/note.server";
import { Card, Layout, Text, BlockStack } from "@shopify/polaris";
//add-next-line
import { useAppBridge } from "@shopify/app-bridge-react";

export const loader = async ({ params }) => {
  const { productGid } = params;
  const notes = await getNotes(productGid);
  return json({ notes, productGid });
};

//add-start
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const body = formData.get("body")?.toString() || null;
  const { productGid } = params;

  await createNote({ productGid, body });
  return redirect(`/app/product-notes/${encodeURIComponent(productGid)}`);
};
//add-end

export default function ProductNotes() {
  const { notes, productGid } = useLoaderData();
  //add-start
  const actionData = useActionData();
  const app = useAppBridge();
  //add-end

  //add-start
  useEffect(() => {
    if (actionData?.ok) {
      app.toast.show("Note saved", { duration: 3000 });
      setBody("");
    }
  }, [actionData, app]);
  //add-end

  return (
    <>
      <Layout.Section>
        <BlockStack gap="200">
          {notes.length === 0 ? (
            <Text as="p" variant="bodyMd" color="subdued">
              No notes yet.
            </Text>
          ) : (
            notes.map((note) => (
              <Card key={note.id} sectioned>
                <BlockStack gap="100">
                  {note.body && (
                    <Text as="p" variant="bodyMd">
                      {note.body}
                    </Text>
                  )}
                  <Text as="p" variant="bodySm" color="subdued">
                    Added: {new Date(note.createdAt).toLocaleString()}
                  </Text>
                </BlockStack>
              </Card>
            ))
          )}
        </BlockStack>
      </Layout.Section>
    </>
  );
}
```

Now, you can build out the form that will call the `action` function:

```jsx file=app/routes/app/app.notes.$productGid.jsx
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { getNotes, createNote } from "../models/note.server";
//delete-next-line
import { Card, Layout, Text, BlockStack } from "@shopify/polaris";
//add-next-line
import { Card, Layout, Text, BlockStack, Form, FormLayout, TextField, Button } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";

export const loader = async ({ params }) => {
  const { productGid } = params;
  const notes = await getNotes(productGid);
  return json({ notes, productGid });
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const body = formData.get("body")?.toString() || null;
  const { productGid } = params;

  await createNote({ productGid, body });
  return redirect(`/app/product-notes/${encodeURIComponent(productGid)}`);
};

export default function ProductNotes() {
  const { notes, productGid } = useLoaderData();
  //add-start
  const actionData = useActionData();
  const app = useAppBridge();
  //add-end

  //add-start
  useEffect(() => {
    if (actionData?.ok) {
      app.toast.show("Note saved", { duration: 3000 });
      setBody("");
    }
  }, [actionData, app]);
  //add-end

  return (
    <>
      //add-start
      <Layout.Section>
        <Card sectioned>
          <Form method="post">
            <FormLayout>
              <BlockStack gap="200">
                <input type="hidden" name="productGid" value={productGid} />
                <TextField
                  label="Note"
                  value={body}
                  onChange={setBody}
                  name="body"
                  autoComplete="off"
                  multiline={4}
                />
                <Button submit primary>
                  Add Note
                </Button>
              </BlockStack>
            </FormLayout>
          </Form>
        </Card>
      </Layout.Section>
      //add-end
      <Layout.Section>
        <BlockStack gap="200">
          {notes.length === 0 ? (
            <Text as="p" variant="bodyMd" color="subdued">
              No notes yet.
            </Text>
          ) : (
            notes.map((note) => (
              <Card key={note.id} sectioned>
                <BlockStack gap="100">
                  {note.body && (
                    <Text as="p" variant="bodyMd">
                      {note.body}
                    </Text>
                  )}
                  <Text as="p" variant="bodySm" color="subdued">
                    Added: {new Date(note.createdAt).toLocaleString()}
                  </Text>
                </BlockStack>
              </Card>
            ))
          )}
        </BlockStack>
      </Layout.Section>
    </>
  );
}
```

You should now be able to add a note to a product and see it displayed.

### 6. Test your route

Run `npm run dev` and navigate to the `Product Notes` route. 
- Navigate to Product Notes on the sidebar
- Select a product
- Add a note
- Verify that notes are displayed and saved correctly.

## Next Steps

Now that you have a working Shopify app connected to a Prisma Postgres database, you can:
- Extend your Prisma schema with more models and relationships
- Add create/update/delete routes and forms
- Enable query caching with [Prisma Postgres](/postgres/database/caching) for better performance

### More Info

- [Prisma Documentation](/orm/overview/introduction)
- [Shopify Dev Documentation](https://shopify.dev/docs)
