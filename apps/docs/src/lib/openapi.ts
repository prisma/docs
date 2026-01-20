import { createOpenAPI } from "fumadocs-openapi/server";

export const openapi = createOpenAPI({
  input: async () => {
    const res = await fetch("https://api.prisma.io/v1/doc");
    const doc = await res.json();
    doc.servers = [{ url: "https://api.prisma.io" }];
    return { "management-api": doc };
  },
  proxyUrl: "/api/proxy",
});
