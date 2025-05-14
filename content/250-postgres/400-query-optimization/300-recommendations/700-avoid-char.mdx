---
title: 'Using @db.Char(n)'
metaTitle: 'Optimize Recommendations: Avoid usage of `@db.Char(n)`'
metaDescription: "Learn about the recommendation provided by Optimize for using `@db.Char(n)` native type."
---

Optimize provides recommendations to help you identify and resolve performance issues caused by the use of `@db.Char(n)` type in PostgreSQL.

In the following example, the `@db.Char(n)` native type has been used within the `Item` model on the `name` field:

```prisma
model Item {
  // ...
  name String @db.Char(1)
  // ...
}
```

### Why this is a problem

The `@db.Char(n)` type enforces a fixed length of `n`, which can cause unexpected issues in production if not properly managed by the application. In PostgreSQL, `char(n)` pads shorter values with spaces, leading to problems during comparisons and other operations. Unlike some databases that optimize `char(n)`, PostgreSQL does not offer such optimizations, making careful handling essential.
