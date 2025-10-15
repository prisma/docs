---
title: 'An introduction to PostgreSQL data types'
metaTitle: 'PostgreSQL Data Types - Numeric, Text, and More'
metaDescription: "PostgreSQL's data type system allows you to define your data structures and store data in various formats.  These are some of the most common data types."
---

## Introduction

One of the primary features of relational databases in general is the ability to define [schemas](/orm/more/help-and-troubleshooting/dataguide/database-glossary#schema) or [table structures](/orm/more/help-and-troubleshooting/dataguide/database-glossary#table) that exactly specify the format of the data they will contain. This is done by prescribing the columns that these structures contain along with their [_data type_](/orm/more/help-and-troubleshooting/dataguide/database-glossary#data-type) and any constraints.

Data types specify a general pattern for the data they accept and store. Values must adhere to the requirements that they outline in order to be accepted by PostgreSQL. While it is possible to define custom requirements, data types provide the basic building blocks that allow PostgreSQL to validate input and work with the data using appropriate operations.

PostgreSQL includes [a wide range of data types](https://www.postgresql.org/docs/current/datatype.html) that are used to label and validate that values conform to appropriate types. In this guide, we will discuss the most common data types available in PostgreSQL, the different input and output formats they use, and how to configure various fields to meet your applications' needs.

### What are the data types in PostgreSQL?

Before going into detail, let's take a broad view of what data types PostgreSQL provides.

PostgreSQL supports a wide range of data types suitable for various types of simple and complex data. These include:

- `integer`
- `smallint`
- `bigint`
- `serial`
- `smallserial`
- `bigserial`
- `numeric`
- `float`
- `double precision`
- `money`
- `char`
- `varchar`
- `text`
- `boolean`
- `date`
- `time`
- `timestamp`
- `timestamptz`
- `interval`
- `enum`
- `uuid`
- `json`
- `jsonb`
- `xml`
- `inet` (network address)
- `cidr` (network address)
- `macaddr`
- `polygon`
- `line`
- `lseg` (line segment)
- `box` (rectangular box)
- `bytea` (hex format)
- `tsvector` (text search)
- `tsquery` (text search)

We'll cover the most common of these in more depth throughout this guide.

### Getting started with PostgreSQL data types

PostgreSQL comes with a large number of types built-in to the software itself. It also allows you to define your own complex types by combining types of different kinds and specifying their parameters. This allows administrators to precisely define the types of data they expect each column to accept when using `CREATE TABLE` among other commands. PostgreSQL can then automatically check proposed values to ensure they match the provided criteria.

As you get started with types, it's important to remember that types alone are not always a complete solution to data validation, but a component. Other database tools, like [constraints](https://www.prisma.io/dataguide/postgresql/column-and-table-constraints) also have a role to play in defining correctness. Still, data types are often the first line of defense against invalid data.

For many cases, the general types provided by PostgreSQL are appropriate for the kinds of data you'll be storing. However, sometimes, more specific types are available that can provide additional operators, associated functions, or built-in constraint-like validation. For example, while you could store the coordinates of a geometric point in two different number columns, the provided [`point` type](https://www.postgresql.org/docs/current/datatype-geometric.html#id-1.5.7.16.5) is purpose built to store and validate exactly this type of information. When choosing types, check to see that you are using the most specific type applicable to your use case.

## Numbers and numeric values

PostgreSQL includes a good range of numeric data types suitable for different scenarios. These include _integers_, _floating points_, _arbitrary precision_, and a special integer type with additional features called _serial_.

### Integers

The _integer_ data type is a category of types used to store numbers without any fractions or decimals. These can be either positive or negative values, and different integer types can store different ranges of numbers. Integer types with smaller ranges of acceptable values take up space than those with wider ranges.

The basic list of integer types includes the following:

| Integer type | Length  | Applicable range                            | Comment                                                                                                                                           |
| ------------ | ------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `integer`    | 4 bytes | -2147483648 to 2147483647                   | This is the most common integer type to use as it represents a good trade off between storage and expressiveness for many practical applications. |
| `smallint`   | 2 bytes | -32768 to 32767                             | It is rare to use this except in places with tight storage constraints.                                                                           |
| `bigint`     | 8 bytes | -9223372036854775808 to 9223372036854775807 | Typically this type is reserved for scenarios where the `integer` type would have an insufficient range.                                          |

The types above are limited by their valid range. Any value outside of the range will result in an error.

In addition to the standard integer types mentioned above, PostgreSQL includes a set of special integer types called _serial_ types. These types are primarily used to create unique identifiers, or [_primary keys_](/orm/more/help-and-troubleshooting/dataguide/database-glossary#primary-key), for records.

By default, serial types will automatically use the next integer in an internally tracked sequence when new records are added. So if the last integer used in a serial column was 8559, by default, the next record will automatically use 8560. To guarantee that each value is unique, you can further add a `UNIQUE` constraint on the column.

There is a serial type for each of the integer sizes mentioned earlier, which dictates the type of integer used in the sequence:

- **`serial`:** a serial type that automatically increments a column with the next `integer` value.
- **`smallserial`:** a serial type that automatically increments a column with the next `smallint` value.
- **`bigserial`:** a serial type that automatically increments a column with the next `bigint` value.

### Arbitrary precision

Arbitrary precision types are used to control the amount of _precision_ or specificity possible for a number with decimals. In PostgreSQL, this can be controlled by manipulating two factors: precision and scale.

_Precision_ is the maximum amount of total digits that a number can have. In contrast, _scale_ is the number of digits to the right of the decimal point. By manipulating these numbers, you can control how large the fractional and non-fractional components of a number are allowed to be.

These two arguments are used to control arbitrary precision using the _`numeric`_ data type. The `numeric` type takes zero to two arguments.

With no arguments, the column can store values of any precision and scale:

```
NUMERIC
```

When a single argument is provided, it is interpreted as the precision of the column with scale set to 0. Though not stored this way on disk, this effectively allows you to specify the maximum number of digits in an integer-like number (no fractional or decimal components). For example, if you need a 5 digit whole number, you can specify:

```
NUMERIC(5)
```

Specify precision followed by scale when configuring a column using both controls. PostgreSQL will round the decimal component of any input to the correct number of digits using the scale number. Afterwards, it will check whether the complete rounded number (both the whole and decimal components) exceeds the given precision number. If it does, PostgreSQL will produce an error.

For example, we can specify a column with a total precision of 5 and a scale of 2:

```
NUMERIC(5, 2)
```

This column would have the following behavior:

| Input value | Rounded value | Accepted (fits precision)? |
| ----------- | ------------- | -------------------------- |
| 400.28080   | 400.28        | Yes                        |
| 8.332799    | 8.33          | Yes                        |
| 11799.799   | 11799.80      | No                         |
| 11799       | 11799         | Yes                        |
| 2802.27     | 2802.27       | No                         |

### Floating point

Floating point numbers are another way to express decimal numbers, but without exact, consistent precision. Instead, floating point types only have a concept of a maximum precision which is often related to the architecture and platform of the hardware.

For example, to limit a floating point column to 8 digits of precision, you can type:

```
FLOAT(8)
```

Because of these design choices, floating point numbers can work with numbers with large number of decimals efficiently, but not always exactly. The internal representation of numbers may cause slight differences between the input and output. This can cause unexpected behavior when comparing values, doing floating point math, or performing operations that require exact values.

### Double precision (floating point) vs numeric

Both floating point numbers provided by types like `float` and `double precision` and arbitrary precision numbers provided by the `numeric` type can be used to store decimal values. How do you know which one to use?

The general rule is that if you need exactness in your calculations, the `numeric` type is always the better choice. The `numeric` type will store values exactly as they are provided, meaning that the results are entirely predictable when retrieving or computing over values. The `numeric` type is called arbitrary precision because you specify the amount of precision the type requires and it will store that exact amount of digits in the field.

In contrast, types like `float` and `double precision` are variable precision types. The amount of precision they maintain depends on the input value. When they reach the end of their allowed level of precision, they may round the remaining digits, leading to differences between the submitted and retrieved values.

So when would you use variable precision types? Variable precision types like `float` and `double precision` are well suited for scenarios where exact values are not necessary (for example, if they'll be rounded anyways) and when speed is highly valuable. Variable precision will generally offer performance benefits over the `numeric` type.

### Monetary values

PostgreSQL includes a special `money` type that is used to store numeric values representing monetary units.

The `money` type does not take arguments, so the column definitions use only the type:

```
MONEY
```

The `money` type has a fixed fractional component that takes its precision from the `lc_monetary` PostgreSQL localization option. If that variable is undefined, the precision is taken from the `LC_MONETARY` environment variable in Linux or Unix-like environments or equivalent locale settings in other operating systems. In many instances, the precision will be set to use two decimal places to match common usage.

Because of this precision, [it is recommended](https://www.postgresql.org/message-id/flat/7696-1364569697-520061%40sneakemail.com#df183031e88ecf9e3d77e58ec710c7b1) to only use the `money` type when fractions of cents are not possible or important. Similarly, since no currency is attached to the type, it is not well suited for situations where currency conversions are necessary. The `money` type has great performance for simple use cases, however, so in spite of these constraints, it can still be valuable.

Because of the dependency on locale settings of the PostgreSQL installation or execution environment, `money` values, it is critical to ensure that these values match when transferring data between different systems.

Care must also be taken when casting values in and out of the `money` type since it can lose precision data when converting between certain types. It is safe for `money` values to cast to and from the `numeric` type (used for arbitrary precision, as shown above), so it is recommended to always use `numeric` as an intermediary before performing converting to other types.

## Text and characters

PostgreSQL's character types and string types can be placed into two categories: _fixed length_ and _variable length_. The choice between these two affects how PostgreSQL allocates space for each value and how it validates input.

The simplest character-based data type within PostgreSQL is the _`char`_ type. With no arguments, the `char` type accepts a single character as input:

```
CHAR
```

When a positive integer is provided in the declaration, the `char` column will store a fixed length character string equal to the number of characters specified:

```
CHAR(10)
```

If a string is provided with fewer characters, blank spaces will be appended to pad the length:

| Input  | # of input characters | Stored value                               | # of stored characters |
| ------ | --------------------- | ------------------------------------------ | ---------------------- |
| 'tree' | 4                     | 'tree&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' | 10                     |

If a string is given with greater than the allowed number of characters, PostgreSQL will raise an error. As an exception to this rule, if the overflowing characters are all spaces, PostgreSQL will simply truncate the excess spaces to fit the field. PostgreSQL doesn't recommend using `char` unless these characteristics are specifically desirable.

The alternative to fixed length character fields are variable length fields. For this, PostgreSQL provides the _`varchar`_ type. The `varchar` type stores characters with no fixed size. By default, with no integer given, `varchar` columns will accept strings of any length:

```
VARCHAR
```

By defining a `varchar` with a positive integer, you can set a maximum string length:

```
VARCHAR(10)
```

This differs from using the `char` type with an integer in that `varchar` will not pad the value if the input does not meet the maximum field length:

| Input  | # of input characters | Stored value | # of stored characters |
| ------ | --------------------- | ------------ | ---------------------- |
| 'tree' | 4                     | 'tree'       | 4                      |

If the string is greater than the maximum length, PostgreSQL will throw an error. The same truncation behavior that's present in `char` fields occurs here: if the overflowing characters are spaces, they will be truncated to fit inside the maximum character length.

The third data type that PostgreSQL provides for strings and character storage is called _`text`_. This type operates exactly like the `varchar` type without a maximum field length. It is used to store strings of any length:

```
TEXT
VARCHAR
```

There is no difference between these two type declarations, so they can be used interchangeably.

## Booleans

PostgreSQL uses the `boolean` or `bool` type to express true and false values:

```
BOOLEAN
```

In keeping with [SQL standards](https://en.wikipedia.org/wiki/Three-valued_logic#SQL), the PostgreSQL boolean data type can actually express three states:

- **true**: Represented by the SQL keyword `TRUE`. As input values, the following strings also evaluate to true: true, yes, on, and 1. The output function represents true values with the string "t".
- **false**: Represented by the SQL keyword `FALSE`. As input values, the following strings also evaluate to false: false, no, off, and 0. The output function represents false values with the string "f".
- **unknown**: Represented by the SQL keyword `NULL`. In the context of SQL, a `NULL` value in a boolean column is meant to indicate that the value is unknown.

As mentioned above, PostgreSQL is somewhat flexible on boolean input values, but stores values using the dedicated `TRUE`, `FALSE`, and `NULL` keywords.

Care must be taken when working with the boolean `NULL`. While PostgreSQL can correctly interpret `TRUE` and `FALSE` as booleans, it cannot make that assumption for `NULL` due to its multiple uses. You can explicitly cast `NULL` values to the `boolean` type in these situations to avoid this ambiguity:

```
NULL::boolean
```

## Dates and time

PostgreSQL has robust support for representing dates, times, and temporal intervals.

### Dates

The `date` type can store a date without an associated time value:

```
DATE
```

When processing input for `date` columns, PostgreSQL can interpret many different formats to determine the correct date to store. Some formats are based on well known standards, while others are colloquial formats used in many real world contexts.

The full range of input formats for dates that PostgreSQL understands is shown in the ["Date Input" table in the PostgreSQL documentation](https://www.postgresql.org/docs/current/datatype-datetime.html#DATATYPE-DATETIME-DATE-TABLE).

To deal with ambiguous input, like 07/12/2019 (which could be interpreted as either July 12, 2019 or December 07, 2019 depending on format), you can set the expected ordering using the [`DateStyle` parameter](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-DATESTYLE). This can be set to `DMY`, `MDY`, or `YMD` to define the expected ordering. By default, PostgreSQL will set it to `MDY` or use the `lc_time` locale to determine the appropriate ordering.

PostgreSQL can also output dates using various formats:

- **ISO**: Outputs dates according to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601). March 18, 2009 would be represented as `2009-03-18`.
- **SQL**: The traditional SQL date format. March 18, 2009 would be represented as `03/18/2009`.
- **Postgres**: Mirrors ISO format for dates. March 18, 2009 would be represented as `2009-03-18`.
- **German**: The German regional style. March 18, 2009 would be represented as `18.03.2009`.

Both the `SQL` and `Postgres` formats respect the `DateStyle` value, mentioned earlier, to determine the ordering of the month, day, and years in output.

### Time

The `time` data type (also called `time without time zone`) can store a specific time of day without an associated timezone or date.

> PostgreSQL does not recommend using `time with time zone`, the `time` type's variant that pairs a time zone with the clock time. This is due to complications and ambiguities that arise that cannot be resolved without additional context, like an associated date. For times that require a time zone component, the `timezonetz` type, covered in the next section, is a good alternative that provides the date component context.

When processing input for `time` columns, PostgreSQL can interpret many different formats to determine the correct time to store. Most of these are variations on the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601), with flexibility to catch different variations.

The full range of input formats for times that PostgreSQL understands is shown in the ["Time Input" table in the PostgreSQL documentation](https://www.postgresql.org/docs/current/datatype-datetime.html#DATATYPE-DATETIME-TIME-TABLE).

PostgreSQL can store time values with a microsecond resolution. The amount of precision can be defined when the column is created by specifying a '(p)' or precision value, which can be any integer between 0 and 6.

For example, to store time values with 3 decimal places of fractional seconds, you could define the time column like this:

```
TIME (3)
```

If no `(p)` value is provided, the column will store according to the input's precision, up to 6 decimal places.

When outputting times, PostgreSQL relies on the same format definitions available for date options. These are mostly result in the same or similar outputs:

- **ISO**: Outputs time according to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601). 04:28 PM and 52 seconds would be represented as `16:28:52`.
- **SQL**: The traditional SQL time format. 04:28 PM and 52 seconds would be represented as `16:28:52.00`.
- **Postgres**: Uses the Unix date / time format. 04:28 PM and 52 seconds would be represented as `16:28:52`.
- **German**: The German regional style. 04:28 PM and 52 seconds would be represented as `16:28:52.00`.

As you can see, the output format doesn't have much of an affect on time representations as it does on dates. The main difference can be seen in the timestamp output that we'll see next.

## Timestamps

PostgreSQL can represent [timestamps](https://en.wikipedia.org/wiki/Timestamp), a combination of a date and time used to represent a specific moment in time, in two different variations: with and without an associated [time zone](https://en.wikipedia.org/wiki/Time_zone). Timestamps with a specified time zone can be stored in the `timestamptz` data type (also known as `timestamp with time zone`), while the `timestamp` data type (can also write as `timestamp without time zone`) is used for timestamps without a time zone.

Like the `time` type, the `timestamp` and `timestamptz` types can take a `(p)` value to control the amount of precision that is stored. This can again be a number between zero and six.

To declare a `timestamp` column with 3 digits of precision, you could type:

```
TIMESTAMP (3)
```

To do the same with a timestamp that includes a timezone, type:

```
TIMESTAMP (3)
```

When inputting values for `timestamp` columns, all that is needed is a valid [date format](#dates) followed by a valid [time format](#time), separated by a space. PostgreSQL also recognizes the "Postgres original style" format, which is similar to the [default output used by the Unix date command](https://www.gnu.org/software/coreutils/manual/html_node/date-invocation.html#date-invocation), but with the time zone, if present, at the end:

```
Wed Mar 18 16:28:52 2009 EST
```

For `timestamp` columns, any provided time zone values will be ignored.

Providing values for `timestamptz` fields are exactly the same as for `timestamp` but with the addition of a time zone. Time zones can be specified in [a number of different formats](https://www.postgresql.org/docs/current/datatype-datetime.html#DATATYPE-TIMEZONE-TABLE), which use labels, abbreviations, or offsets from UTC. The time zone indicator designation is included after the date and time in timestamps.

When storing `timestamptz` values, PostgreSQL converts the input to UTC for storage. This simplifies the storage since the time zone used for output may be different from the input.

When outputting timestamps, the same four formats that influence `date` and `time` can influence how PostgreSQL represents timestamp values:

- **ISO**: Outputs timestamps according to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601). The point in time of 04:28 PM and 52 seconds on March 18, 2009 in Eastern Standard Time would be represented as `2009-03-18 16:28:52-05`. For `timestamp` columns, which do not include the time zone, the `-05` would be omitted. Rather than separating the date and time components with a capital 'T', as ISO 8601 defines, PostgreSQL uses a space to delimit these fields.
- **SQL**: The traditional SQL date format. The point in time of 04:28 PM and 52 seconds on March 18, 2009 in Eastern Standard Time would be represented as `03/18/2009 16:28:52.00 EST`. For `timestamp` columns, which do not include the time zone, the `EST` would be omitted.
- **Postgres**: Resembles the format used by the Unix `date` command. The point in time of 04:28 PM and 52 seconds on March 18, 2009 in Eastern Standard Time would be represented as `Wed Mar 18 16:28:52 2009 EST`. For `timestamp` columns, which do not include the time zone, the `EST` would be omitted.
- **German**: The German regional style. The point in time of 04:28 PM and 52 seconds on March 18, 2009 in Eastern Standard Time would be represented as `18.03.2009 16:28:52.00 EST`. For `timestamp` columns, which do not include the time zone, the `EST` would be omitted.

### Intervals

PostgreSQL can also store and work with values that represent temporal intervals. These basically describe the amount of time between two specific timestamps.

Like `time`, `timestamp` and `timestamptz`, the `interval` data type can represent time differences to the microsecond level. Again, the `(p)` argument is used to represent the amount of precision, or decimal places, the number will record, which can range from zero to six:

```
INTERVAL (3)
```

While the `(p)` argument affects how fractions of seconds are stored, the `interval` type has another argument that can alter the amount of specificity more generally. By providing one of the follow values when defining an `interval` column, you can control the level of detail by limiting the fields used to store interval data:

- `YEAR`: Store only the number of years
- `MONTH`: Store only the number of months
- `DAY`: Store only the number of days
- `HOUR`: Store only the number of hours
- `MINUTE`: Store only the number of minutes
- `SECOND`: Store only the number of seconds
- `YEAR TO MONTH`: Store only the number of years and months
- `DAY TO HOUR`: Store only the number of days and hours
- `DAY TO MINUTE`: Store only the number of days, hours, and minutes
- `DAY TO SECOND`: Store only the number of days, hours, minutes, and seconds
- `HOUR TO MINUTE`: Store only the number of hours and minutes
- `HOUR TO SECOND`: Store only the number of hours, minutes, and seconds
- `MINUTE TO SECOND`: Store only the number of minutes and seconds

When specifying both the fields to store and precision, the fields come first. Therefore, to create a column with 5 digits of precision that only stores the days, hours, minutes, and seconds of a given interval, you could type:

```
INTERVAL DAY TO SECOND (5)
```

Be aware that you can only specify precision if your declared field ranges include the seconds value, since this is the only case where this argument matters.

There are a number of different ways to format input when adding values to an `interval` column. The most straightforward way is to specify the amount and the unit of each column or field you wish to provide, separated by a space. For example:

```
7 days 3 hours 27 minutes 8 seconds
```

To indicate that the interval is counting in the opposite direction, add the `ago` keyword at the end:

```
7 days 3 hours 27 minutes 8 seconds ago
```

The interval described above can also be represented without units by providing a day field followed by the clock units separated by colons:

```
7 3:27:08
```

Similarly, intervals that only express years and months can be represented by a year, a dash, and a month. So 38 years and 4 months would look like:

```
38-4
```

PostgreSQL also understands abbreviated input based on [ISO 8601 timestamps](https://en.wikipedia.org/wiki/ISO_8601), which can be used to represent intervals that use a greater number of fields. There are two separate input formats based on this standard.

The first uses the following unit abbreviations, represented by the bold component of the following fields:

- **Y**ears
- **M**onths
- **W**eeks
- **D**ays
- **H**ours
- **M**inutes
- **S**econds

You may notice that **M** is used to label both months and minutes. In this format, the date component is separated from the time component by a "**T**". If the M appears before the T, it is interpreted as months; if it occurs after the T, it means minutes.

Formats based on ISO 8601 begin with a **P** and then contain the interval string. So to represent an interval of 4 years, 2 months, 7 days, 3 hours, 27 minutes, and 8 seconds, the following string would work:

```
P4Y2M7DT3H27M8S
```

The other ISO 8601 format does not use unit abbreviations at all. Instead, it separates the date components with dashes and the time components with colons. Again, the string begins with a P and separates the date and time components with a T. The same interval expressed earlier could be written as:

```
P4-2-7T3:27:8
```

PostgreSQL can output values from `interval` columns in several formats. The output style is determined by the `intervalstyle` setting, which can be one of the following:

- **postgres**: The default style. This format uses the units `years`, `mons`, and `days`, each separated by a space to represent date components. It uses `HH:MM:SS` to represent time components.
- **postgres_verbose**: This format begins with an ampersand (@). It includes units or unit abbreviations for all fields, separated by spaces: `years`, `mons`, `days`, `hours`, `mins`, and `secs`.
- **sql_standard**: Follows the SQL standard output spec. Years and months are separated by a dash: `YYYY-MM`. Afterwards, day and time components are represented by an independent day field and a `HH:MM:SS` time field. The complete representation would look like: `YYYY-MM D HH:MM:SS`
- **iso_8601**: This style produces output with ISO 8601's "format with designators" (the first ISO 8601 style described above). Replacing the pound signs with actual values, the output would look like this: `P#Y#M#DT#H#M#S`

## Other useful types

Along with the types we covered with some depth above, there are additional types that are useful in specific scenarios. We'll cover these briefly to give you an idea of how to use them and when they may be useful.

### Does PostgreSQL support user defined types?

PostgreSQL supports user defined types in a few different ways.

#### Enumerated types

PostgreSQL enumerated types are user-defined types that have a set number of valid values. This functions similar to a drop down menu in that a choice can be made from a specific set of options. For example, an `enum` type called `season` could be created with the values `winter`, `spring`, `summer`, and `autumn`.

To use an `enum` type as a column, you must first define it to declare its name and range of values. You can create the `season` type we described above by typing:

```
CREATE TYPE season AS ENUM ('winter', 'spring', 'summer', 'autumn');
```

The syntax specifies the type name, the `ENUM` category, as well as the possible values.

Afterwards, you can define a column to be of the `season` type as you would any other column when creating a table:

```
SEASON
```

#### Other user defined types

Other types can also be defined with the `CREATE TYPE` command. These include:

- **Composite types:** Composite types are types that are defined as a combination of two or more different types. For instance, you could create an `event` type that combines a geographical location and a timestamp to pinpoint a specific time and place.
- **Range types:** Range types include a valid range for a specified data type. While PostgreSQL includes [some range types](https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-BUILTIN) by default, the `CREATE TYPE` command allows you to create your own.
- **Base types:** Base types are used to define a completely new type of data that isn't reliant on modifying existing types. To do this, you'll need to code up type functions in C to show PostgreSQL how to input, output, and process the data.

### UUID

[Universally Unique Identifiers](https://en.wikipedia.org/wiki/Universally_unique_identifier), or UUIDs, are 128-bit numbers used to distinctively identify pieces of information. They are used in many different contexts in order to assign a global identifier that is extremely unlikely to be assigned elsewhere. PostgreSQL includes the `uuid` type to work with these values:

```
UUID
```

UUIDs have 32 digits, and are generally visually separated into five groups with hyphens (8 digits, 4 digits, 4 digits, 4 digits, and finally 12 digits):

```
########-####-####-####-############
```

Each placeholder contains a hexadecimal digit (0 through 9, plus the lower case letters "a" through "f"). PostgreSQL uses this standard format for output.

For input, PostgreSQL understands a number of formats including using upper case letters, different digit groupings, no digit groupings, and surrounding the UUID with curly brackets.

### JSON

PostgreSQL supports columns in [JSON](https://en.wikipedia.org/wiki/JSON) using the `json` and `jsonb` format. Data stored as `json` is stored as-is, while data stored with `jsonb` is interpreted and processed and stored in binary for faster execution and processing. PostgreSQL can also index `jsonb` columns for better performance. In general, `jsonb` is recommended for JSON data for this reason:

```
JSONB
```

There are some slight differences between the two formats. The `json` type preserves incidental white space, key ordering, and duplicate keys. The `jsonb` format removes insignificant white space, overwrites duplicate keys, and provides no key ordering guarantees.

PostgreSQL includes [JSON operators](https://www.postgresql.org/docs/current/functions-json.html), can [index `jsonb` columns](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING), test whether [`jsonb` objects contain other `jsonb` objects](https://www.postgresql.org/docs/current/datatype-json.html#JSON-CONTAINMENT), and can [transform values to data types used in different languages](https://www.postgresql.org/docs/current/datatype-json.html#id-1.5.7.22.19). These are outside of the scope of this guide, but will be covered in a future article on working with JSON with PostgreSQL.

## Conclusion

We've covered many of the most common data types used in PostgreSQL in this guide. While these provide a good starting point for data types in PostgreSQL, [additional types are available](https://www.postgresql.org/docs/current/datatype.html) to store other forms of data. Using the most appropriate types for your data allows you to use the database system to validate and operate on your data easily.

Understanding data types is essential when designing [schemas and tables](https://www.prisma.io/dataguide/postgresql/create-and-delete-databases-and-tables#create-tables-within-databases) in PostgreSQL. It also affects how to interact with the database from your applications, as the type system influences how data must be formatted and how it may be expressed when outputted. Learning about the options available within PostgreSQL and the side effects your choices might have is the best way to plan ahead when designing your data structures.

If you are using [Prisma Client](/orm/prisma-client) to work with your PostgreSQL databases, you can find a mapping between some of the common PostgreSQL and Prisma types in [Prisma's PostgreSQL data connectors docs](/orm/overview/databases/postgresql#type-mapping-between-postgresql-and-prisma-schema).
