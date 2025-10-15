---
title: 'Working with dates in PostgreSQL'
metaTitle: 'PostgreSQL Date Types - Format, Functions, and More'
metaDescription: 'Read on to learn about how to work with date types in PostgreSQL, including information on formats, functions, and more.'
---

## Introduction

The ability to store date values inside of your database allows you to add a time element to your queries and analysis of your data. It is important to know how to work with date types in your respective database so that you can be accurate in your reporting whether it's order information, peoples' ages, or any other use case.

In this guide, we are going to discuss storing `DATE` types in PostgreSQL and the various ways that you can work with them.

## PostgreSQL `DATE` data type

The [`DATE` type in PostgreSQL](https://www.prisma.io/dataguide/postgresql/introduction-to-data-types#dates-and-time) can store a date without an associated time value:

```sql
DATE
```

PostgreSQL uses 4 bytes to store a date value. The range of values for date values in PostgreSQL is 4713 BC to 5874897 AD.

When storing a date value, PostgreSQL uses the `yyyy-mm-dd` format e.g. 1994-10-27. This format is also used in PostgreSQL for [inserting data](https://www.prisma.io/dataguide/postgresql/inserting-and-modifying-data).

In PostgreSQL, it is possible to set a default date value of the current date. This can be done when creating your table by using the `DEFAULT` and `CURRENT_DATE` keywords. The `last_checkout` column from our library checkouts table accepts the current date by default:

```sql
CREATE TABLE checkouts (
		author_id serial PRIMARY KEY,
		author_name VARCHAR (255) NOT NULL,
		book_title VARCHAR (255) NOT NULL,
		published_date DATE NOT NULL,
		last_checkout DATE NOT NULL DEFAULT CURRENT_DATE
);
```

Following this table structure, we can insert data with the `INSERT INTO` statement:

```sql
INSERT INTO checkouts (author_name, book_title, published_date)
VALUES('James Joyce', 'Ulysses', '1922-02-02');
```

Then when querying the `checkouts` table, we get the following:

```sql
SELECT * FROM checkouts;

 author_id | author_name | book_title | published_date | last_checkout
-----------+-------------+------------+----------------+---------------
         1 | James Joyce |   Ulysses  |   1922-02-02   |  2021-09-27
(1 row)
```

## PostgreSQL `DATE` functions

By knowing the ins and outs of the `DATE` type in PostgreSQL, you are then able to use functions working with the information that you store. We'll walk through some common functions building off of the table introduced in the prior section.

### Get the current date

In PostgreSQL, you can get the current date and time by using the built-in `NOW()` function. The following statement will return both the day and time:

```sql
SELECT NOW();

              now
-------------------------------
 2021-09-27 15:22:53.679985+02
(1 row)
```

If the time is not of interest, you can also specify to only return the date with double colons `::` to cast a `DATETIME` value to the `DATE` value:

```sql
SELECT NOW()::date;

    now
------------
 2021-09-27
(1 row)
```

Using `CURRENT_DATE` is another way to get the current date as demonstrated below:

```sql
SELECT CURRENT_DATE;

 current_date
--------------
 2021-09-27
(1 row)
```

All three of these options will return you the date in the `yyyy-mm-dd` format. Within PostgreSQL, you can adjust the format of this output if desired.

### Output a date value in a specific format

To output a date value in a specific format, you use the `TO_CHAR()` function. This function accepts two parameters:

1. the value you want to format
2. the template that defines the output format

```sql
SELECT TO_CHAR(NOW()::date, 'dd/mm/yyyy');

  to_char
------------
 27/09/2021
(1 row)
```

You can also display the date in a format like `Sep 27, 2021`:

```sql
SELECT TO_CHAR(NOW():: DATE, 'Mon dd, yyyy');

   to_char
--------------
 Sep 27, 2021
(1 row)
```

Depending on the requirements of a system, you may need a date formatted in a specific way. This is a scenario where being able to specify the output in PostgreSQL is useful.

### Get the interval between two dates

PostgreSQL allows you to get the [interval](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-interval/) between two dates using the `-` operator. Using this operator allows you to calculate things like the tenure of an employee or time since the publishing of a book.

In our example we want to find how many days it's been since Joyce's <u>Ulysses</u> was published by subtracting the current date from the `published_date`:

```sql
SELECT
				author_name,
				book_title,
				now()::date - published_date as diff
FROM
				checkouts;
```

Resulting in:

```sql
 author_name | book_title |            diff
-------------+------------+----------------------------
 James Joyce |  Ulysses   |         36397 days
(1 row)
```

### Calculating age using date values

We can continue with the same example to calculate the age at the current date in years, months, and days using the `AGE()` function. The following statement uses the `AGE()` function to calculate the age of a publication from our library `checkouts` tables:

```sql
SELECT
				author_name,
				book_title,
				AGE(published_date)
FROM
				checkouts;
```

With this function we can calculate how old a book in inventory is:

```sql
 author_name | book_title |           age
-------------+------------+-------------------------
 James Joyce |  Ulysses   | 99 years 7 mons 25 days
(1 row)

```

It is important to note that if you pass a single date into the `AGE()` function, then it will automatically use the current date to subtract and calculate. You are also able to pass two dates into the function to calculate age such as:

```sql
SELECT
				author_name,
				book_title,
				AGE('2000-01-01', published_date),
FROM
				checkouts;
```

Resulting in:

```sql
 author_name | book_title |           age
-------------+------------+--------------------------
 James Joyce |  Ulysses   | 77 years 10 mons 27 days
(1 row)
```

### Extracting year, quarter, month, week, or day from a date value

The last function that we are going to cover is the `EXTRACT()` function in PostgreSQL that allows you to separate the components of date like the year, quarter, month, and day.

The following statement pulls out the year, month, and day from the published date of <u>Ulysses</u>:

```sql
SELECT
			author_name,
			book_title,
			EXTRACT(YEAR FROM published_date) AS YEAR,
			EXTRACT(MONTH FROM published_date) AS MONTH,
			EXTRACT(DAY FROM published_date) AS DAY
FROM
			checkouts;
```

The results will look like the following:

```sql
 author_name | book_title | year | month | day
-------------+------------+------+-------+-----
 James Joyce |  Ulysses   | 1922 |   2   |  2
(1 row)
```

This is a useful function to be aware of when you may only need a portion of a date value for a calculation with your data for example.

## Conclusion

In this guide, we covered the basics of what you can do with the `DATE` data type in PostgreSQL. It is important to know how date data works inside of your database. Having a grasp on the ways you can access it and operate on it allows you to make age calculations, execute extractions in your queries, and also configure your output if necessary for matching another system's requirements.

## FAQ

<details>
<summary>What is the date format in PostgreSQL?</summary>

The date format for the date data type in PostgreSQL is `yyyy-mm-dd`. This is the format used for both storing data and for inserting data.

</details>

<details>
<summary>What is the `DATE_PART()` function in PostgreSQL?</summary>

The `DATE_PART()` function in PostgreSQL is used to subquery for subfields from a date or time value.

The basic syntax looks like:

```sql
SELECT DATE_PART(field, source);
```

For example, you can write the following and return the hour, `20`:

```sql
SELECT DATE_PART('hour', timestamp '2001-02-16 20:38:40');
```

</details>

<details>
<summary>How does the `to_date` function work in PostgreSQL?</summary>

The `TO_DATE()` function in PostgreSQL can be used to convert a string of text into a date type.

The basic syntax looks as follows:

```sql
TO_DATE(text, format);
```

An example such as:

```sql
TO_DATE('20220317', 'YYYYMMDD');
```

Returns an output of `2022-03-17`.

</details>

<details>
<summary>How do you extract a date from a timestamp in PostgreSQL?</summary>

To extract a part of a date in PostgreSQL, you can use the `EXTRACT()` function. This function can parse out the year, month, or day from a date type as well as specify quarter.

The basic syntax looks as follows:

```sql
SELECT EXTRACT(field FROM source);
```

An example would be:

```sql
SELECT EXTRACT(YEAR FROM TIMESTAMP '2022-03-17 20:38:16');
```

This statement’s return will be `2022`.

</details>

<details>
<summary>How do you truncate a date in PostgreSQL?</summary>

You can truncate a timestamp in PostgreSQL by using the `DATE_TRUNC()` function. This function truncates a `TIMESTAMP` or `INTERVAL` based on a specified date part such as year, month, day, etc.

The basic syntax looks as follows:

```sql
DATE_TRUNC('datepart' field);
```

An example would be:

```sql
DATE_TRUNC('hour', TIMESTAMP '2022-03-17 02:09:30');
```

The return for this statement would be `2022-03-17 02:00:00`.

</details>
