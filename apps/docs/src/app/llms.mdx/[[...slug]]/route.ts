import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/llms.mdx/[[...slug]]">) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

export function generateStaticParams() {
  // Only pre-render leaf pages to avoid file/dir conflicts during static export.
  // A slug is considered non-leaf if it is a prefix of any other slug.
  return Promise.resolve(source.generateParams()).then((params: Array<{ slug?: string[] }>) => {
    const allSlugs = params.map((p) => p.slug ?? []);
    const isPrefix = (a: string[], b: string[]) =>
      a.length < b.length && a.every((seg, i) => seg === b[i]);

    return params.filter((p) => {
      const s = p.slug ?? [];
      return !allSlugs.some((other) => isPrefix(s, other));
    });
  });
}
