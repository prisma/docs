---
title: 'Connecting to PostgreSQL databases'
metaTitle: "Connecting to PostgreSQL databases | Prisma's Data Guide"
metaDescription: "Before you can manage your data with PostgreSQL, you need to be able to connect to the database server. In this guide, we'll use the `psql` command line client to demonstrate how to connect to PostgreSQL databases."
metaImage: '/social/generic-postgresql.png'
---

## Introduction

One of the first things you'll need to think about when working with a [PostgreSQL](/orm/more/help-and-troubleshooting/dataguide/database-glossary#postgresql) database is how to connect and interact with the database instance. This requires coordination between the database client — the component you use to interact with the database, and the database server — the actual PostgreSQL instance that stores, organizes, and provides access to your data.

Because of this, you need to understand how to connect as a client by providing the required information to authenticate. In this guide, we'll cover how to connect to a PostgreSQL database using the native [`psql` command line client](https://www.postgresql.org/docs/current/app-psql.html) — one of the most common and useful ways of interacting with a database instance.

In a companion guide, you can find out how to [configure PostgreSQL's authentication to meet your project's needs](https://www.prisma.io/dataguide/postgresql/authentication-and-authorization/configuring-user-authentication). Consider reading both guides for a more complete picture of how authentication works in PostgreSQL.

If your database client or library requests a connection URI, you may want to look at our guide on [understanding PostgreSQL connection URIs](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris) instead.

## Basic information about the `psql` client

The `psql` client, the native command line client for PostgreSQL, can connect to database instances to offer an interactive session or to send commands to the server. It is especially useful when implementing your initial settings and getting the basic configuration in place, prior to interacting with the database through application libraries. In addition, `psql` is great for interactive exploration or ad-hoc queries while developing the access patterns your programs will use.

The way that you connect depends on the configuration of the PostgreSQL server and the options available for you to authenticate to an account. In the following sections, we'll go over some of the basic connection options. For clarity's sake, we'll differentiate between local and remote connections:

- **local connection**: a connection where the client and the PostgreSQL instance are located on the same server
- **remote connection**: where the client is connecting to a network-accessible PostgreSQL instance running on a different computer

Let's start with connecting to a database from the same computer.

## Connecting to a local database with `psql`

Without any arguments, the `psql` command attempts to connect to a [Unix socket file](https://en.wikipedia.org/wiki/Unix_file_types) to access a local database. It uses your operating system username as the PostgreSQL username and database name that you are trying to connect to.

By default, modern versions of PostgreSQL are configured for something called [peer authentication](https://www.postgresql.org/docs/current/auth-peer.html). **Peer authentication** authenticates users automatically if a valid PostgreSQL user exists that matches the user's operating system username.

So if your current user is a valid PostgreSQL user on your local database, you can connect by typing:

```bash
psql
```

However, it's unlikely that your normal operating system username already has an associated PostgreSQL username. So usually, you'll need to log into PostgreSQL using an operating system username that already has an associated PostgreSQL role.

By default, the super user, or administrative account, for PostgreSQL is called `postgres`. Upon installation, a user called `postgres` is also created on the operating system. So, to log into PostgreSQL as the `postgres` user, you need to connect as the `postgres` operating system user. There are a number of ways to do this.

The easiest way to get a shell as the `postgres` user on most systems is to use the `sudo` command. To open a shell session for the `postgres` user and then log into the database, you can type:

```bash
sudo --login --user=postgres
psql
```

If you don't need to perform any additional shell commands as the `postgres` user, you can also just run the `psql` command directly as the `postgres` user. This will log you in to a PostgreSQL session immediately instead of taking you to a shell first:

```bash
sudo --login --user=postgres psql
```

Either of these methods should allow you to log into the `postgres` PostgreSQL user account.

## Connecting to a remote database

For security reasons and because of the reliance on a local socket file, peer authentication cannot be used for remote connections. Instead, users will need to log in using another method.

The available authentication methods vary based on the PostgreSQL instance's configuration. Most commonly, though, you will be able to authenticate by providing the following pieces of information:

| **Option**              | **Description**                                                                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **hostname**            | The network host name or the IP address of the PostgreSQL server. The `-h` option is used to specify the hostname.                                                                                    |
| **network port**        | The network port that the PostgreSQL server is running on. By default, this is port 5432. This can be omitted if the default is used. To specify a different port, you can use the `-p` option.       |
| **PostgreSQL username** | The database username you wish to connect as. If not specified, your operating system username will be used. The `-U` option is used to override the default and define the username to connect with. |
| **PostgreSQL password** | The PostgreSQL password associated with the specified username. Since `psql` will prompt you for a password if it isn't provided, this can often be omitted.                                          |
| **PostgreSQL database** | The PostgreSQL database name that you want to access. If not specified, your operating system username will be used as the database name. To specify a different database, use the `-d` option.       |

There are multiple ways of providing your connection information to `psql`. Here, we'll cover the two of the most common: by passing options and with a connection string.

### Passing connection information to `psql` with options

So the basic format for connecting to a remote database typically looks something like this:

```bash
psql -h <hostname> -p <port> -U <username> -d <database>
```

The remote server will indicate that it requires a password for most accounts, at which point `psql` will prompt you for the password. If you authenticate successfully, a new interactive PostgreSQL session will be started.

As an example, we can imagine wanting to connect to a database with the following requirements:

- hostname: `myhost`
- port: 1234
- database: `applicationdb`
- username: `myapplicationuser`
- password: `mypass`

Calling `psql` with the following options would allow you to authenticate:

```bash
psql -h myhost -p 1234 -U myapplicationuser -d applicationdb
```

Upon pressing enter, you'd be prompted a password where you can authenticate with `mypass`.

### Passing connection information to `psql` with a connection string

This same information can also be encoded into a [PostgreSQL _connection string_](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris). A connection string provides the same information in a single URI string that uses certain characters as delimiters between the different fields.

Connection strings have the following general format:

```
postgresql://<username>:<password>@<hostname>:<port>/<database>
```

Each of the fields can be omitted if they are unneeded or if the default values are valid.

We can optionally use a connection string to connect with `psql` instead of the using the options that we used in our previous example:

```bash
psql postgresql://myapplicationuser:mypass@myhost:1234/applicationdb
```

The `psql` tool can use either of these formats, so use whichever you prefer. Other tools or libraries that you encounter might nudge you into relying on one more than the other.

## Adjusting a PostgreSQL server's authentication configuration

If you want to modify the rules that dictate how users can authenticate to your PostgreSQL instances, you can do so by modifying your server's configuration. You can find out [how to modify PostgreSQL's authentication configuration in this article](https://www.prisma.io/dataguide/postgresql/authentication-and-authorization/configuring-user-authentication).

## Conclusion

In this guide, we covered PostgreSQL authentication from the client side. We demonstrated how to use the `psql` command line client to connect to both local and remote database instances using a variety of methods.

Knowing how to connect to various PostgreSQL instances is vital as you start to work the database system. You may run a local PostgreSQL instance for development that doesn't need any special authentication, but your databases in staging and production will almost certainly require authentication. Being able to authenticate in either case will allow you to work well in different environments.
