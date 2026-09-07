import assert from "node:assert/strict";
import Mixedbread from "@mixedbread/sdk";
import { createUnifiedSearch } from "../src/lib/unified-search";

const requests: Record<string, any>[] = [];
let fail = false;
let headingText = "# Connection pooling";
const client = new Mixedbread({
  apiKey: "test-only-not-a-real-key",
  maxRetries: 0,
  fetch: async (input, init) => {
    const request = new Request(input, init);
    const body = await request.json();
    requests.push(body);
    if (fail) return Response.json({ error: "unavailable" }, { status: 503 });
    const docs = [
      {
        file_id: "docs",
        chunk_index: 0,
        type: "text",
        text: headingText,
        generated_metadata: { title: "Postgres", url: "/orm/latest/overview" },
      },
      {
        file_id: "docs",
        chunk_index: 1,
        generated_metadata: { title: "Duplicate", url: "https://www.prisma.io/docs/orm/overview" },
      },
      { file_id: "eclipse", generated_metadata: { title: "Eclipse", url: "/docs/eclipse/start" } },
      {
        file_id: "external",
        generated_metadata: { title: "External", url: "https://example.com/docs/test" },
      },
      { file_id: "missing", generated_metadata: {} },
    ];
    const blog = [
      {
        file_id: "blog",
        generated_metadata: {
          title: "Postgres post",
          metaTitle: "Postgres blog",
          slug: "postgres-post",
        },
      },
    ];
    return Response.json({
      data: [
        ...(body.store_identifiers.includes("web-search") ? docs : []),
        ...(body.store_identifiers.includes("blog-search") ? blog : []),
      ],
    });
  },
});
const { GET, searchPages } = createUnifiedSearch(() => client);
assert.deepEqual(await searchPages("   "), []);
assert.deepEqual(await searchPages("🦄"), []);
assert.equal(requests.length, 0);
const docs = await searchPages("postgres", "docs");
assert.deepEqual(requests.at(-1)?.store_identifiers, ["web-search"]);
assert.deepEqual(requests.at(-1)?.search_options, { rerank: true, return_metadata: true });
assert.deepEqual(
  docs.map((item) => item.url),
  ["/docs/orm/overview", "/docs/orm/overview#connection-pooling"],
);
const blog = await searchPages("postgres", "blog");
assert.deepEqual(requests.at(-1)?.store_identifiers, ["blog-search"]);
assert.equal(blog[0].url, "/blog/postgres-post");
assert.equal(blog[0].content, "Postgres blog");
const all = await searchPages("postgres");
assert.deepEqual(requests.at(-1)?.store_identifiers, ["web-search", "blog-search"]);
assert.ok(all.some((item) => item.url.startsWith("/docs/")));
assert.ok(all.some((item) => item.url.startsWith("/blog/")));
assert.ok(all.some((item) => item.url === "/postgres"));
const count = requests.length;
assert.ok((await searchPages("postgrez", "website")).some((item) => item.url === "/postgres"));
assert.equal(requests.length, count);
for (const source of ["docs", "blog", "website"]) {
  const response = await GET(
    new Request(`http://localhost:3001/docs/api/search?query=postgres&tag=${source}`),
  );
  assert.equal(response.status, 200);
  const expected =
    source === "docs"
      ? "http://localhost:3001"
      : source === "blog"
        ? "http://localhost:3002"
        : "http://localhost:3000";
  for (const item of await response.json()) assert.equal(new URL(item.url).origin, expected);
}
assert.equal(
  (await GET(new Request("http://localhost/api/search?query=test&tag=bad"))).status,
  400,
);
for (const [text, expected] of [
  ["## **Connection** `pooling`", "Connection pooling"],
  ["# [Connection](https://example.com) pooling", "Connection pooling"],
  ["# <em>Connection</em> pooling", "Connection pooling"],
  ["# connection_limit and pooling", "connection_limit and pooling"],
  ["# Connection pooling ###", "Connection pooling"],
  ["Ordinary paragraph", undefined],
  ["#not-a-heading", undefined],
] as const) {
  headingText = text;
  const results = await searchPages("postgres", "docs");
  assert.equal(results.find((result) => result.type === "heading")?.content, expected);
}
fail = true;
assert.equal((await GET(new Request("http://localhost/api/search?query=postgres"))).status, 503);
const unavailable = createUnifiedSearch(() => {
  throw new Error("Missing key");
});
assert.equal(
  (await unavailable.GET(new Request("http://localhost/api/search?query=postgres"))).status,
  503,
);
console.log(
  "Mixedbread request routing, reranking, result normalization, deduplication, Eclipse exclusion, cross-zone URLs, website search, and failure handling passed (mock transport; no live relevance/analytics assertion).",
);
