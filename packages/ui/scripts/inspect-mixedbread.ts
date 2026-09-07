import assert from "node:assert/strict";
import Mixedbread from "@mixedbread/sdk";
import { searchPages, GET } from "../src/lib/unified-search";

const client = new Mixedbread({ apiKey: process.env.MIXEDBREAD_API_KEY });
for (const name of ["web-search", "blog-search", "website-search"]) {
  try {
    const store = await client.stores.retrieve(name);
    console.log(JSON.stringify({ name, status: store.status }));
  } catch (error) {
    if (error instanceof Mixedbread.APIError)
      console.log(JSON.stringify({ name, status: error.status }));
    else throw error;
    if (process.argv.includes("--verify"))
      throw new Error(`Required search store unavailable: ${name}`);
  }
}
if (process.argv.includes("--verify")) {
  for (const source of ["website", "docs", "blog", "all"] as const) {
    const result = await searchPages("Prisma Postgres", source);
    assert.ok(result.length, `${source}: no live results`);
    assert.ok(result.every((item) => !/\/eclipse(?:\/|$)/.test(item.url)));
    if (source === "website") assert.ok(result.some((item) => item.url === "/postgres"));
    if (source === "docs" || source === "blog")
      assert.ok(
        result.every((item) => item.url === `/${source}` || item.url.startsWith(`/${source}/`)),
      );
    console.log(
      JSON.stringify({
        source,
        count: result.length,
        urls: result.slice(0, 3).map((item) => item.url),
      }),
    );
    const response = await GET(
      new Request(`https://www.prisma.io/api/search?query=Prisma%20Postgres&tag=${source}`),
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.ok(
      body.every((item: { url: string }) => new URL(item.url).origin === "https://www.prisma.io"),
    );
  }
  console.log("Live Mixedbread-only search and HTTP handler verification passed for all sources.");
}
