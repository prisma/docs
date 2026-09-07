import Mixedbread from "@mixedbread/sdk";
const client = new Mixedbread({ apiKey: process.env.MIXEDBREAD_API_KEY });
for (const name of ["web-search", "blog-search", "website-search"]) {
  try {
    const store = await client.stores.retrieve(name);
    console.log(JSON.stringify({ name, id: store.id, status: store.status }));
    const result = await client.stores.search({
      query: "postgres",
      store_identifiers: [name],
      top_k: 2,
      search_options: { return_metadata: true },
    });
    for (const chunk of result.data)
      console.log(
        JSON.stringify({
          store: name,
          store_id: chunk.store_id,
          metadata: chunk.metadata,
          generated_metadata: chunk.generated_metadata,
        }),
      );
  } catch (error) {
    if (error instanceof Mixedbread.APIError)
      console.log(JSON.stringify({ name, status: error.status }));
    else throw error;
  }
}
