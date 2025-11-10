---
title: 'Using @db.VarChar(n)'
metaTitle: 'Optimize Recommendations: Avoid usage of `@db.VarChar(n)`'
metaDescription: "Learn about the recommendation provided by Optimize for using `@db.VarChar(n)` native type."
tocDepth: 3
toc: true
---

Optimize provides recommendations to help you identify and resolve performance issues caused by the use of `@db.VarChar(n)` type in PostgreSQL.

The `@db.VarChar(n)` native type has been used within the `Item` model on the name field:

```prisma
model Item {
  // ...
  name String @db.VarChar(1)
  // ...
}
```

### Why this is a problem

The `@db.VarChar(n)` type restricts content to a maximum length of `n`, which can cause unexpected issues in production if not properly managed by the application. In PostgreSQL, `varchar(n)` performs the same as `text`, and no additional optimizations are provided for `varchar(n)`, making the choice between them more about convention than performance.