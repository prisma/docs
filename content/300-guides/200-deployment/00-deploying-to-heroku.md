---
title: 'Deploying to Heroku'
metaTitle: 'Deploying to Heroku'
metaDescription: 'Learn how to deploy a Node.js server that uses Prisma to Heroku.'
---

## Overview

In this guide, you will set up and deploy a Node.js server that uses Prisma with PostgreSQL to [Heroku](https://www.heroku.com). The application will expose a REST API and use Prisma Client to handle fetching, creating, and deleting records from a database.

Heroku is a cloud platform as a service (PaaS). In contrast to the popular serverless deployment model, with Heroku, your application will be constantly running even if no requests are made to it. This has several benefits due to the connection limits of a PostgreSQL database. For more information, check out the [general deployment documentation](/concepts/components/prisma-client/deployment)

Typically Heroku integrates with a Git repository for automatic deployments upon commits. You can deploy to Heroku from a GitHub repository, or by pushing your source to a [Git repository that Heroku creates per app](https://devcenter.heroku.com/articles/git). This guide will use the latter approach where you will push your code to the repository created by Heroku which will trigger a build and deploy the application.

The application has the following components:

- **Backend**: Node.js REST API built with Express.js with resource endpoints that use Prisma Client to handle database operations against a PostgreSQL database (e.g. hosted on Heroku).
- **Frontend**: Static HTML page to interact with the API.

![architecture diagram](./heroku-architecture.png)

The focus of this guide is showing how project using Prisma can be deployed to Heroku. The starting point will the [Prisma Heroku example](https://github.com/prisma/prisma-examples/tree/latest/deployment-platforms/heroku) which contains an Express.js server with a couple of pre-configured REST endpoints and a simple frontend.

> **Note:** Throughout the guide you'll find various **checkpoints** that enable you to validate whether you performed the steps correctly.

## A note on deploying GraphQL servers to Heroku

While the example uses REST, the same principles apply to a GraphQL server, with the main difference being that you typically have a single GraphQL API endpoint rather than a route for every resource as with REST.

## Prerequisites

- [Heroku](https://www.heroku.com) account.
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.
- Node.js installed.
- PostgreSQL CLI `psql` installed.

> **Note:** Heroku provides a free plan which includes Node.js hosting and a PostgreSQL database, so no billing information is required.

## Prisma workflow

Prisma supports different workflows depending on whether you integrate with an existing database or create a new one from scratch. Regardless of the workflow, Prisma relies on the Prisma schema, i.e. `schema.prisma` file.

In this guide, you will start from scratch and create the database with [Prisma Migrate](/concepts/components/prisma-migrate). The workflow for that looks as follows:

1. Define the database schema using Prisma schema.
2. Run `prisma migrate dev --preview-feature` which will create the SQL to create the database schema and run it against the database.

> **Note:** Prisma Migrate is currently in [preview](/about/releases#preview) and is not recommended for use in production.


## 1. Download the example and install dependencies

Open your terminal and navigate to a location of your choice. Create the directory that will hold the application code and download the example code:

```no-lines
mkdir prisma-heroku
cd prisma-heroku
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=3 prisma-examples-latest/deployment-platforms/heroku
```

<!-- tar strip folder is a concatenation of the REPOSITORY-BRANCH/REF, e.g. prisma-examples-latest -->

**Checkpoint:** `ls -1` should show:

```no-lines
ls -1
Procfile
README.md
package.json
prisma
public
src
```

Install the dependencies:

```no-lines
npm install
```

> **Note:** The `Procfile` tells Heroku the command needed to start the application, i.e. `npm start`

## 2. Create a Git repository for the application

In the previous step, you downloaded the code. In this step, you will create a repository from the code so that you can push it to Heroku for deployment.

To do so, run `git init` from the source code folder:

```no-lines
git init
> Initialized empty Git repository in /Users/alice/prisma-heroku/.git/
```

With the repository initialized, add and commit the files:

```no-lines
git add .
git commit -m 'Initial commit'
```

**Checkpoint:** `git log -1` should show the commit:

```no-lines
git log -1
commit 895534590fdd260acee6396e2e1c0438d1be7fed (HEAD -> master)
```

## 3. Heroku CLI login

Make sure you're logged in to Heroku with the CLI:

```no-lines
heroku login
```

This will allow you to deploy to Heroku from the terminal.

**Checkpoint:** `heroku auth:whoami` should show your username:

```no-lines
heroku auth:whoami
> your-email
```

## 4. Create a Heroku app

To deploy an application to Heroku, you need to create an app. You can do so with the following command:

```no-lines
heroku apps:create your-app-name
```

> **Note:** Use a unique name of your choice instead of `your-app-name`.

**Checkpoint:** You should see the URL and the repository for your Heroku app:

```no-lines
heroku apps:create your-app-name
> Creating ⬢ your-app-name... done
> https://your-app-name.herokuapp.com/ | https://git.heroku.com/your-app-name.git
```

Creating the Heroku app will add the git remote Heroku created to your local repository. Pushing commits to this remote will trigger a deploy.

**Checkpoint:** `git remote -v` should show the Heroku git remote for your application:

```no-lines
heroku	https://git.heroku.com/your-app-name.git (fetch)
heroku	https://git.heroku.com/your-app-name.git (push)
```

If you don't see the heroku remote, use the following command to add it:

```no-lines
heroku git:remote --app your-app-name
```

## 5. Add a PostgreSQL database to your application

Heroku allows your to provision a PostgreSQL database as part of an application.

Create the database with the following command:

```no-lines
heroku addons:create heroku-postgresql:hobby-dev
```

**Checkpoint:** To verify the database was created you should see the following:

```no-lines
Creating heroku-postgresql:hobby-dev on ⬢ your-app-name... free
Database has been created and is available
 ! This database is empty. If upgrading, you can transfer
 ! data from another database with pg:copy
Created postgresql-parallel-73780 as DATABASE_URL
```

> **Note:** Heroku will automatically set the `DATABASE_URL` environment variable when the app is running on Heroku. Prisma will use this environment variable because it's declared in the _datasource_ block of the Prisma schema (`prisma/schema.prisma`) with `env("DATABASE_URL")`.

## 6. Set the DATABASE_URL environment variable locally

In the previous step you created the database and saw how Heroku defines `DATABASE_URL` for the application when running on Heroku. In this step, you will to set the `DATABASE_URL` environment variable locally so that you can run the database migration from locally using Prisma.

Get the connection URL with the Heroku CLI:

```no-lines
heroku pg:credentials:url

Connection information for default credential.
Connection URL:
   postgresql://__USER__:__PASSWORD__@__HOST__:__PORT__/__DATABASE__
```

Copy the connection URL and set it as an environment variable (make sure your .env is located in the prisma directory): 

```no-lines
export DATABASE_URL="postgresql://__USER__:__PASSWORD__@__HOST__:__PORT__/__DATABASE__"
```

> **Note:** It's considered best practice to keep secrets out of your codebase. If you open up the `prisma/schema.prisma` file, you should see `env("DATABASE_URL")` in the _datasource_ block. By setting an environment variable you keep secrets out of the codebase.

## 7. Save and run the database migration

With the Heroku app and database created, you will create the database schema with [Prisma Migrate](/concepts/components/prisma-migrate) using the `prisma migrate dev` command.

The command will create an SQL migration file based on the Prisma schema in the `prisma/migrations` folder and run it against the database to create the database schema..

To do so run the following command:

```no-lines
npx prisma migrate dev --preview-feature
```

You will be prompted to give the migration a name after which Migrate will run the migration.

> **Note:** Prisma Migrate is currently in [preview](/about/releases#preview). This means that it is not recommended to use in production.

**Checkpoint:** `heroku pg:psql --command="\dt"` should show the newly created database tables:

```no-lines
  --> Connecting to postgresql-parallel-111222
                List of relations
  Schema |    Name    | Type  |     Owner
  --------+------------+-------+----------------
  public | Post       | table | alice
  public | User       | table | alice
  public | _Migration | table | alice
  (3 rows)
```

## 8. Push to deploy

Deploy the app by pushing the changes to the Heroku app repository:

```no-lines
git push heroku master
```

This will trigger a build and deploy your application to Heroku.

**Checkpoint:** `git push` will emit the build progress and if succeeds will display the URL of the deployed app:

```no-lines
remote: -----> Launching...
remote:        Released v1
remote:        https://your-app-name.herokuapp.com/ deployed to Heroku
```

> **Note:** Heroku will also set the `PORT` environment variable to which your application will be bound.

## 9. Test your deployed application

You can use the static frontend to interact with the API you deployed via the preview URL.

Open up the preview URL in your browser, the URL should like this: `https://APP_NAME.herokuapp.com`. You should see the following:

![deployed-screenshot](./heroku-deployed.png)

The buttons allow you to make requests to the REST API and view the response:

- **Check API status**: Will call the REST API status endpoint that returns `{"up":true}`.
- **Seed data**: Will seed the database with a test `user` and `post`. Returns the created users.
- **Load feed**: Will load all `users` in the database with their related `profiles`.

For more insight into Prisma Client's API, look at the route handlers in the `src/index.js` file.

You can view the application's logs with the `heroku logs --tail` command:

```no-lines
2020-07-07T14:39:07.396544+00:00 app[web.1]:
2020-07-07T14:39:07.396569+00:00 app[web.1]: > prisma-heroku@1.0.0 start /app
2020-07-07T14:39:07.396569+00:00 app[web.1]: > node src/index.js
2020-07-07T14:39:07.396570+00:00 app[web.1]:
2020-07-07T14:39:07.657505+00:00 app[web.1]: 🚀 Server ready at: http://localhost:12516
2020-07-07T14:39:07.657526+00:00 app[web.1]: ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api
2020-07-07T14:39:07.842546+00:00 heroku[web.1]: State changed from starting to up
2020-07-07T14:39:08.197831+00:00 heroku[router]: at=info method=GET path="/" host=your-app-name.herokuapp.com request_id=1 fwd="1.1.1.1" dyno=web.1 connect=0ms service=20ms status=304 bytes=237 protocol=https
2020-07-07T14:39:16.876090+00:00 heroku[router]: at=info method=GET path="/api/" host=your-app-name.herokuapp.com request_id=2 fwd="1.1.1.1" dyno=web.1 connect=0ms service=7ms status=304 bytes=149 protocol=https
2020-07-07T14:39:28.261619+00:00 heroku[router]: at=info method=GET path="/api/seed" host=your-app-name.herokuapp.com request_id=3 fwd="1.1.1.1" dyno=web.1 connect=0ms service=175ms status=200 bytes=254 protocol=https
2020-07-07T14:39:30.645923+00:00 heroku[router]: at=info method=GET path="/api/feed" host=your-app-name.herokuapp.com request_id=4 fwd="1.1.1.1" dyno=web.1 connect=1ms service=24ms status=200 bytes=680 protocol=https
```

## Heroku specific notes

There are some implementation details relating to Heroku that this guide addresses and are worth reiterating:

- **Port binding**: web servers bind to a port so that they can accept connections. When deploying to Heroku The `PORT` environment variable is set by Heroku. Ensure you bind to `process.env.PORT` so that your application can accept requests once deployed. A common pattern is to try binding to try `process.env.PORT` and fallback to a preset port as follows:

```js
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})
```

- **Database URL**: As part of Heroku's provisioning process, a `DATABASE_URL` config var is added to your app’s configuration. This contains the URL your app uses to access the database. Ensure that your `schema.prisma` file uses `env("DATABASE_URL")` so that Prisma Client can successfully connect to the database.

## Summary

Congratulations! You have successfully deployed a Node.js app with Prisma to Heroku.

You can find the source code for the example in [this GitHub repository](https://github.com/prisma/prisma-examples/tree/latest/deployment-platforms/heroku).

For more insight into Prisma Client's API, look at the route handlers in the `src/index.js` file.
