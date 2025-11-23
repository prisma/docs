---
title: 'Converting Implicit many-to-many relation to Explicit many-to-many relation'
metaTitle: 'Learn how to convert implicit many-to-many relation to explicit many-to-many relation'
metaDescription: 'Learn how to convert implicit many-to-many relation to explicit many-to-many relation'
---

## Problem

Many-to-many relationships are an important aspect of relational databases, allowing multiple records in one table to be related to multiple records in another table. Prisma provides two approaches to model many-to-many relationships: [implicit](/orm/prisma-schema/data-model/relations/many-to-many-relations#implicit-many-to-many-relations) and [explicit](/orm/prisma-schema/data-model/relations/many-to-many-relations#explicit-many-to-many-relations).

Users sometimes encounter situations where they need to transition from implicit many-to-many relationships between models to explicit ones. Converting an implicit relation to explicit allows you to have more control over the relationship and store additional data specific to the relation, such as a timestamp or any other fields. This guide provides a step-by-step walkthrough on how to make that conversion.

## Solution

This will guide you through the process of converting an implicit many-to-many relation to an explicit one in Prisma:

Consider these models with an implicit many-to-many relationship via the `posts` and `author` fields:

```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String
  posts     Post[]
}

model Post {
  id        Int       @id @default(autoincrement())
  title     String
  authors   User[]
}
```

In the above models, a `User` can have multiple posts and a `Post` can have multiple authors.

To convert the implicit relation to an explicit one, we need to create a [relation table](/orm/prisma-schema/data-model/relations/many-to-many-relations#relation-tables). The relation table will contain foreign keys referencing both tables involved in the many-to-many relation. In our example, we'll create a new model called `UserPost`. Our updated `schema.prisma` file would look like this:

```prisma highlight=15-24;add
model User {
  id        Int        @id @default(autoincrement())
  name      String
  posts     Post[]
  userPosts UserPost[]
}

model Post {
  id        Int        @id @default(autoincrement())
  title     String
  authors   User[]
  userPosts UserPost[]
}

model UserPost {
  id        Int       @id @default(autoincrement())
  userId    Int
  postId    Int
  user      User      @relation(fields: [userId], references: [id])
  post      Post      @relation(fields: [postId], references: [id])
  createdAt DateTime  @default(now())

  @@unique([userId, postId])
}
```

If you are using Prisma Migrate, then you can invoke this command:

```terminal
npx prisma migrate dev --name "added explicit relation"
```

The migration will create the `UserPost` table and create one-to-many relation of `User` and `Post` model with `UserPost` model.

### Migrating Existing data from implicit relation table to newly created relation table

To migrate the existing data from the implicit relation table to the new explicit relation table, you'll need to write a custom migration script. You can use the Prisma Client to interact with the database, read data from the implicit relation table, and write it to the new relation table.

Considering the above `User` and `Post` models, here’s an example script you can use to migrate data.

```typescript
import { PrismaClient } from "../prisma/generated/client";

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  try {
    // Fetch all users with their related posts
    const users = await prisma.user.findMany({
      include: { posts: true },
    });

    // Iterate over users and their posts, then insert records into the UserPost table
    for (const user of users) {
      for (const post of user.posts) {
        await prisma.userPost.create({
          data: {
            userId: user.id,
            postId: post.id,
          },
        });
      }
    }

    console.log("Data migration completed.");
  } catch (e) {
    console.error(e);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Once the data is migrated to the relation table, you can remove the implicit relation columns ( `posts` in `User` model and `author` in `Post` model ) as shown below:

```prisma highlight=4,11;delete
model User {
  id        Int        @id @default(autoincrement())
  name      String
  posts     Post[]
  userPosts UserPost[]
}

model Post {
  id        Int        @id @default(autoincrement())
  title     String
  authors   User[]
  userPosts UserPost[]
}
```

After making the change in schema file, you can invoke this command:

```terminal
npx prisma migrate dev --name "removed implicit relation"
```

Running the above command would drop the implicit table `_PostToUser`

You've now successfully converted an implicit many-to-many relation to an explicit one in Prisma.
