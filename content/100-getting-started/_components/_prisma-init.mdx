import CodeBlock from '@theme/CodeBlock';

## {props.stepNumber ? `${props.stepNumber}. ` : ''}Initialize Prisma

You can now invoke the Prisma CLI by prefixing it with `npx`:

```terminal
npx prisma
```

Next, set up your Prisma ORM project by creating your [Prisma Schema](/orm/prisma-schema) file with the following command:

{props.database === 'prisma-postgres' ? (
<>
<CodeBlock language="terminal">
{`npx prisma init --db --output ../generated/prisma`}
</CodeBlock>

:::info

You'll need to answer a few questions while setting up your Prisma Postgres database. Select the region closest to your location and a memorable name for your database.

:::

This command creates:

- A `prisma/` directory with a `schema.prisma` file containing your database connection and schema models
- A new Prisma Postgres database (when using `--db` flag)
- A `.env` file in the root directory for environment variables
- A `generated/prisma/` directory for the generated Prisma Client

The generated schema uses the modern `prisma-client` generator with a custom output path:

<CodeBlock language="prisma" metastring="file=prisma/schema.prisma">
{`generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}`}
</CodeBlock>
</>
) : (
<>
<CodeBlock language="terminal">
{`npx prisma init --datasource-provider ${props.datasource?.toLowerCase() || props.database} --output ../generated/prisma`}
</CodeBlock>

This command does a few things:

- Creates a new directory called `prisma` that contains a file called `schema.prisma`, which contains the Prisma Schema with your database connection variable and schema models.
- Sets the `datasource` to {props.datasource || props.database} and the output to a custom location, respectively.
- Creates the [`.env` file](/orm/more/development-environment/environment-variables) in the root directory of the project, which is used for defining environment variables (such as your database connection)

Note that the default schema created by `prisma init` uses PostgreSQL as the `provider`. If you didn't specify a provider with the `datasource-provider` option, you need to edit the `datasource` block to use the <code>{(props.datasource || props.database)?.toLowerCase()}</code> provider instead:

<CodeBlock language="prisma" metastring="file=prisma/schema.prisma">
{`datasource db {
  //edit-next-line
  provider = "${(props.datasource || props.database)?.toLowerCase()}"
  url      = env("DATABASE_URL")
}`}
</CodeBlock>
</>
)}
