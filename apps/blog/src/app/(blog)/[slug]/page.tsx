import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { BlogPostHeader } from '@/components/blog/blog-post-header';
import { BlogPostTOC } from '@/components/blog/blog-post-toc';
import { normalizePostMeta } from '@/lib/blog-data';
import { blog } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  const post = normalizePostMeta(page);
  const MDX = page.data.body;

  return (
    <main className="mx-auto w-full max-w-[1040px]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10">
        <article className="min-w-0">
          <BlogPostHeader
            author={post.author}
            dateLabel={post.dateLabel}
            description={post.description}
            tags={post.tags}
            title={post.title}
            type={post.type}
          />
          <BlogPostTOC className="mt-6 lg:hidden" items={(page.data.toc ?? []) as any[]} />
          <div className="prose mt-6 max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-a:text-primary prose-pre:rounded-xl">
            <MDX
              components={getMDXComponents({
                a: createRelativeLink(blog, page),
              })}
            />
          </div>
        </article>

        <div className="relative hidden lg:block">
          <BlogPostTOC
            className="sticky top-[118px]"
            items={(page.data.toc ?? []) as any[]}
          />
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}
