import { createOpenAPI } from "fumadocs-openapi/server";

export const openapi = createOpenAPI({
  // Use the remote Prisma Management API OpenAPI spec
  input: ["https://api.prisma.io/v1/doc"],
  proxyUrl: "/api/proxy",
});
