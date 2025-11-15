---
title: 'Introduction to PostgreSQL connection URIs'
metaTitle: 'Understanding connection URI strings in PostgreSQL'
metaDescription: 'Learn how to encode PostgreSQL connection details in connection URIs for applications and libraries'
---

## Introduction

Connecting to your database server is usually one of the first tasks you need to accomplish when designing and configuring database-backed applications. While there are many methods of providing the address, listening port, credentials, and other details to applications, connection URIs, sometimes called connection strings or connection URLs, are one of the most powerful and flexible ways of specifying complex configuration in a compact format.

In this guide, we'll talk about how to format a connection URI with your PostgreSQL database information and [authentication](/orm/more/help-and-troubleshooting/dataguide/database-glossary#authentication) details. Connection URIs are divided into sections, so we'll cover each part as we go along.

## Percent encoding values

Before we begin, we should mention that PostgreSQL connection URIs expect [percent-encoded values](https://en.wikipedia.org/wiki/Percent-encoding). This means that any characters that have a special meaning within the URL must be converted to their percent-encoded counterparts to ensure that libraries and applications can interpret them correctly.

Characters you should percent-encode include:

- (space): `%20`
- `%`: `%25`
- `&`: `%26`
- `/`: `%2F`
- `:`: `%3A`
- `=`: `%3D`
- `?`: `%3F`
- `@`: `%40`
- `[`: `%5B`
- `]`: `%5D`

These have special meaning within the connection URI.

So if your password is...:

```
pe@ce&lo\/3
```

...you'll want to specify it within the connection URI as:

```
pe%40ce%26lo\%2F3
```

If you are unsure about whether a character should be percent-encoded, it's usually best to encode it anyways. For example, if you are unsure if the `\` character is reserved, you can use its percent-encoded equivalent, `%5C`, to be safe:

```
pe%40ce%26lo%5C%2F3
```

Keep this in mind as you build your connection URIs.

## A quick overview

Before we get into the details, we can look at the spec for a PostgreSQL connection URI:

```
postgres[ql]://[username[:password]@][host[:port],]/database[?parameter_list]

\_____________/\____________________/\____________/\_______/\_______________/
     |                   |                  |          |            |
     |- schema           |- userspec        |          |            |- parameter list
                                            |          |
                                            |          |- database name
                                            |
                                            |- hostspec
```

The parts in square brackets indicate optional parts. You may have noticed that most parts of the URI are optional. It might also be apparent that there are many pieces of information you can encode in the URI.

A quick description of each of the individual components:

- `postgres[ql]`: The schema identifier. Can be `postgresql` or simply `postgres`.
- `userspec`: An optional component of the URI that can be used to specify the user and password to connect as.
  - `username`: An optional username. If included, it should start after the second slash (`/`) and continue until a colon (`:`) (if a password is also provided) or until an at sign (`@`) (if a password is not provided).
  - `password`: An optional password. If included, it begins after a colon (`:`) and continues until the at sign (`@`).
- `hostspec`: An optional component used to specify the hostname and port to connect to.
  - `host`: An optional IP address, DNS name, or locally resolvable name of the server to connect to. The host continues until a colon (`:`) (if a port is included) or until a slash (if a port is not included)
  - `port`: An optional port specification to indicate which port PostgreSQL is listening to on the server. The port begins with a colon (`:`) and continues until the slash (`/`)
- `database name`: The name of the individual database to connect to.
- `parameter list`: An optional list of additional parameters that can affect the connection behavior. The parameter list begins with a question mark (`?`).
  - `parameter pairs`: The parameter list is composed of key-value pairs. The key and value within each pair are separated by an equal sign (`=`) and each pair is separated from the next by an ampersand (`&`).

Here is an example of a PostgreSQL connection URI that incorporates all of these components:

```
postgresql://sally:sallyspassword@dbserver.example:5555/userdata?connect_timeout=10&sslmode=require&target_session_attrs=primary
    ^          ^         ^               ^           ^     ^          ^
    |- schema  |         |- password     |- host     |     |          |- parameter list
               |                                     |     |
               |- username                           |     |- database
                                                     |
                                                     |- port
```

## Specifying the URI type

The item in a connection URI is usually the protocol specification or application type. Since the URI will be used to connect and authenticate to a PostgreSQL database, we need to use a signifier that signifies that to the applications and libraries we're using.

The [PostgreSQL project accepts both `postgresql://` and `postgres://`](https://www.postgresql.org/docs/current/libpq-connect.html#id-1.7.3.8.3.6) as valid URI schema designators. Therefore, you should start your connection URI with either of these two strings:

```
postgresql://
postgres://
```

The schema designator will ensure that the information that follows is interpreted in the correct context.

## Specifying a username and password

The next part of the URI is the user credentials. This is called the `userspec` in the specification. The `userspec` is technically optional, but is typically required if you don't want to rely on defaults configured by either your application or the database.

If included, the `userspec` begins after the colon and double forward slash (`://`) and ends with an at sign (`@`).

To specify only a username, you can place it in between those two symbols:

```
postgresql://username@
```

To specify a username _and_ a password, provide the username first, followed by a colon (`:`), and then the password and at sign:

```
postgresql://username:password@
```

Applications are able to interpret this data as the `userspec` by noting the inclusion of the terminating at sign (`@`). If only one field is provided (if no colon is present between the slashes and the at sign), it is interpreted as a username.

## Specifying where the server is listening

After the `userspec` comes the `hostspec` which defines where the server is listening. The `hostspec` is, again, optional, but almost always useful if you aren't relying on defaults set in your client or library.

The `hostspec` consists of a `host` and an optional `port`. The `host` can either be a locally resolvable host name, a name resolved by an external name system like DNS, or an IP address or other direct address. The port signifies the port number where PostgreSQL is listening.

To specify that the application should attempt to connect to the default PostgreSQL port (5432) on the local computer, you can use:

```
postgresql://localhost
```

If you needed to include a username and password, that information would come first and be separated by the at sign:

```
postgresql://username:password@localhost
```

To specify a remote server running on a non-standard port, separate those details with a colon. For example, to connect to port 3333 on a host at `198.51.100.22`, you could use:

```
postgresql://username:password@198.51.100.22:3333
```

You can actually provide more than one host and port pairs, separated by the commas (`,`) to tell the application to try the latter servers if the first cannot be reached. For example, to extend the previous example to include a fallback server listening on port 5555 on `198.51.100.33`, you could use:

```
postgresql://username:password@198.51.100.22:3333,198.51.100.33:5555
```

Conforming clients and applications will try to first connect to the server listening at `198.51.100.22:3333`. If that fails, they will try to reach a PostgreSQL database listening on `198.51.100.33:5555`.

## Providing the database name

After the `hostspec`, the next piece of data is the database name. While not true for all database management systems, with PostgreSQL, you must connect to a specific database when establishing a connection.

The database name begins with a forward slash (`/`) and proceeds until either the end of the line or a question mark (`?`). You must include the database name if you aren't relying on the default values.

To connect to a database called `sales` hosted on a PostgreSQL server listening on `198.51.100.22:3333`, you could type:

```
postgresql://username:password@198.51.100.22:3333/sales
```

## Specifying additional parameters

The last part of the connection URI is used to provide additional parameters for the connection. The list of parameters is introduced by a leading question mark (`?`) and continues until the end of the line.

Each parameter listed is defined as a key and value pair joined with an equals sign (`=`). After the first parameter pair, each additional key-value pair is separated by an ampersand (`&`).

For example, to specify that the client should apply a 10 second timeout for the connection we were previously defining, you could use:

```
postgresql://username:password@198.51.100.22:3333/sales?connect_timeout=10
```

If you wanted to provide additional parameters, you'd add them afterwards with an ampersand (`&`) between each pair. For instance, we could additionally specify that we require SSL and want to connect only if the server is a primary in a replica set, we could additionally add:

```
postgresql://username:password@198.51.100.22:3333/sales?connect_timeout=10&sslmode=require&target_session_attrs=primary
```

The PostgreSQL documentation has a [full list of parameters](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-PARAMKEYWORDS) that you can read to learn more.

## Conclusion

In this guide, we discussed what a PostgreSQL connection URI is, how to interpret the various components, and how to construct your own URIs given a set of connection information. Connection URIs encode all of the information required to connect to a given database within a single string. Because of this flexibility and due to their wide adoption, understanding how to parse and construct those strings can be pretty helpful.
