import { source, sourceV6 } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  const allPages = [...source.getPages(), ...sourceV6.getPages()];

  const sortedPages = allPages.sort((a, b) =>
    a.data.title.localeCompare(b.data.title)
  );

  const docsList = sortedPages
    .map((page) => {
      const title = page.data.title;
      const description = page.data.description || "";
      const path = page.url;

      return `- [\`${title}\`](${path}): ${description}`;
    })
    .join("\n");

  const content = `# Prisma Documentation

## Docs

${docsList}

## Options

- [Full documentation with content](/llms-full.txt)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
