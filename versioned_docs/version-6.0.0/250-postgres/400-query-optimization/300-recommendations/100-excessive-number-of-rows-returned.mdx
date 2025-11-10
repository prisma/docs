---
title: 'Excessive number of rows returned'
metaTitle: 'Optimize Recommendations: Excessive number of rows returned'
metaDescription: "Learn about the recommendation provided by Optimize for excessive number of rows returned."
tocDepth: 3
toc: true
---

Optimize provides recommendations to help you identify and resolve performance issues caused by excessive number of rows returned from a query.

The following query targeting a `User` model does not provide a [`take` option](/orm/reference/prisma-client-reference#findmany):

```ts
await prisma.user.findMany({ where: { email: "janedoe@gmail.com" }})
```

## What is the problem?

When a query is executed without specifying a limit, it will return all relevant rows, which can lead to several issues:

### User experience

- **Viewing data:** Users typically need only a portion of the data at any given time, not all of it at once.
- **Impact on the user's device:** Displaying all the data at once can strain the user's device resources. For example, loading thousands of rows in a web application can slow down or freeze the browser, consuming significant memory and CPU resources.
- **Waiting time:** Retrieving a large number of rows can significantly increase the time it takes to get the data from the database to the user's device.

### Resource Utilization

- **Unnecessary data load:** Processing more data than required wastes valuable resources.
- **Memory usage:** Excessive memory consumption can lead to inefficiency and, in severe cases, cause the system to run out of memory, disrupting the service.
