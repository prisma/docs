import { Suspense } from "react";
import { BlogGrid } from "@/components/BlogGrid";
import { getBlogPosts } from "@/lib/blog-data";

export default function BlogHome() {
  const posts = getBlogPosts();

  return (
    <main className="mx-auto w-full max-w-[920px]">
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            <section className="pb-5 pt-16 text-center">
              <h1 className="text-6xl font-bold leading-none tracking-tight sm:text-7xl">
                Blog
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Loading posts...
              </p>
            </section>
          </div>
        }
      >
        <BlogGrid items={posts} pageSize={12} />
      </Suspense>
    </main>
  );
}
