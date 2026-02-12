import { generateFiles } from "fumadocs-openapi";
import { openapi } from "@/lib/openapi";

void generateFiles({
  input: openapi,
  output: "./content/docs/management-api/endpoints",
  includeDescription: true,
  per: "operation",
  groupBy: "tag",
  name: (output, document) => {
    if (output.type === "operation") {
      // @ts-ignore
      const operation = document.paths![output.item.path]![output.item.method]!;

      const operationId = operation.operationId || "";

      const cleanName = operationId
        .replace(/V\d+/g, "")
        .replace(/By[A-Z][a-z]*/g, "")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase();

      return cleanName;
    }

    return output.item.name;
  },
  beforeWrite(files) {
    for (const file of files) {
      const frontmatterMatch = file.content.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        if (frontmatter.includes("_openapi:")) {
          const apiPageMatch = file.content.match(/<APIPage[^>]*operations=\{(\[.*?\])\}/s);
          if (apiPageMatch) {
            try {
              const operations = JSON.parse(apiPageMatch[1].replace(/'/g, '"'));
              if (operations[0]?.path) {
                const path = operations[0].path;

                const updatedFrontmatter = frontmatter.replace(
                  /(_openapi:\s*\n\s*method:)/,
                  `_openapi:\n  path: "${path}"\n  method:`,
                );

                file.content = file.content.replace(frontmatter, updatedFrontmatter);
              }
            } catch (e) {
              console.warn(`Failed to parse operations for ${file.path}:`, e);
            }
          }
        }
      }
    }
  },
});
