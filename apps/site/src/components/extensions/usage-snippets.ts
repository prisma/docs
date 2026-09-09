import { isDatabase, isMiddleware, type ExtensionEntry } from "@prisma-docs/ui/data/extensions";

export type UsageSnippet = { title: string; file: string; code: string };

const middlewareRegistration = (importLine: string, call: string): UsageSnippet[] => [
  {
    title: "Register it on the client",
    file: "src/prisma/db.ts",
    code: `${importLine}
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
  middleware: [${call}],
});`,
  },
];

const HAND_WRITTEN: Record<string, UsageSnippet[]> = {
  postgresql: [
    {
      title: "Configure the database",
      file: "prisma.config.ts",
      code: `import { defineConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export default defineConfig({
  orm: ormConfig({
    contract: './src/prisma/contract.prisma',
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
});`,
    },
    {
      title: "Create the client",
      file: "src/prisma/db.ts",
      code: `import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});`,
    },
  ],
  mongodb: [
    {
      title: "Configure the database",
      file: "prisma.config.ts",
      code: `import { defineConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-mongo/config';

export default defineConfig({
  orm: ormConfig({
    contract: './src/prisma/contract.prisma',
    db: {
      connection: process.env['MONGODB_URL']!,
    },
  }),
});`,
    },
    {
      title: "Create the client",
      file: "src/prisma/db.ts",
      code: `import mongo from '@prisma/orm-mongo/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

export const db = mongo<Contract>({
  contractJson,
  url: process.env['MONGODB_URL']!,
});`,
    },
  ],
  pgvector: [
    {
      title: "Declare a vector column",
      file: "src/prisma/contract.prisma",
      code: `types {
  Embedding1536 = pgvector.Vector(1536)
}

model Post {
  id        String         @id @default(uuid())
  title     String
  embedding Embedding1536?
}`,
    },
    {
      title: "Query by similarity",
      file: "src/prisma/similarity-search.ts",
      code: `const plan = db.sql.public.post
  .select('id', 'title')
  .select('distance', (f, fns) => fns.cosineDistance(f.embedding, queryVector))
  .orderBy((f, fns) => fns.cosineDistance(f.embedding, queryVector), { direction: 'asc' })
  .limit(10)
  .build();

const similar = await db.runtime().execute(plan);`,
    },
  ],
  postgis: [
    {
      title: "Declare a geometry column",
      file: "src/prisma/contract.prisma",
      code: `types {
  Point4326 = postgis.Geometry(4326)
}

model Place {
  id       String    @id @default(uuid())
  name     String
  location Point4326
}`,
    },
  ],
  "middleware-cache": middlewareRegistration(
    "import { createCacheMiddleware } from '@prisma/orm-extension-middleware-cache';",
    "createCacheMiddleware({ maxEntries: 1_000 })",
  ),
  lints: middlewareRegistration(
    "import { lints } from '@prisma/orm-postgres/family-runtime';",
    "lints()",
  ),
  budgets: middlewareRegistration(
    "import { budgets } from '@prisma/orm-postgres/family-runtime';",
    "budgets({ maxRows: 10_000, maxLatencyMs: 1_000 })",
  ),
};

/**
 * Registration snippets shown on an extension's detail page. Official
 * extension packs share one layout (a `/control` and a `/runtime` entrypoint),
 * so those are generated. Middleware and database packages register
 * differently and use the hand-written snippets. Community packages document
 * their own layout, so the page links to their README instead.
 */
export function getUsageSnippets(entry: ExtensionEntry): UsageSnippet[] {
  const handWritten = HAND_WRITTEN[entry.slug] ?? [];
  if (entry.source !== "official") return handWritten;
  if (isMiddleware(entry) || isDatabase(entry)) return handWritten;

  const identifier = entry.slug.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase());
  return [
    {
      title: "Register it in the config",
      file: "prisma.config.ts",
      code: `import { defineConfig } from '@prisma/cli-engine';
import ${identifier} from '${entry.package}/control';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export default defineConfig({
  orm: ormConfig({
    contract: './src/prisma/contract.prisma',
    extensions: [${identifier}],
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
});`,
    },
    {
      title: "Register it on the client",
      file: "src/prisma/db.ts",
      code: `import ${identifier} from '${entry.package}/runtime';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
  extensions: [${identifier}],
});`,
    },
    ...handWritten,
  ];
}
