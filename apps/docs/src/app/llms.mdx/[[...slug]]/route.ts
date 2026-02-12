import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;

function escapeYaml(value: string): string {
  // Wrap in double quotes and escape special characters
  return '"' + value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"';
}

export async function GET(_req: Request, { params }: RouteContext<"/llms.mdx/[[...slug]]">) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const content = await getLLMText(page);
  const frontmatter = `---
title: ${escapeYaml(page.data.title)}
description: ${escapeYaml(page.data.description || '')}
url: ${escapeYaml(page.url)}
---

`;

  return new Response(frontmatter + content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

export function generateStaticParams() {
  const allParams = source.generateParams();
  const allSlugs = allParams.map((p) => p.slug ?? []);
  const isPrefix = (a: string[], b: string[]) =>
    a.length < b.length && a.every((seg, i) => seg === b[i]);

  return allParams.filter((p) => {
    const s = p.slug ?? [];
    return !allSlugs.some((other) => isPrefix(s, other));
  });
}
