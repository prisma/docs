import { BlogFooter } from '@/components/blog/blog-footer';
import { BlogNav } from '@/components/blog/blog-nav';

export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 [background:radial-gradient(54%_42%_at_50%_8%,color-mix(in_srgb,var(--primary)_34%,transparent),transparent_72%),radial-gradient(42%_34%_at_14%_24%,color-mix(in_srgb,var(--accent)_24%,transparent),transparent_74%),linear-gradient(180deg,color-mix(in_srgb,var(--background)_96%,black_4%)_0%,var(--background)_46%,color-mix(in_srgb,var(--background)_82%,black_18%)_100%)]"
      />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1260px] flex-col px-4 sm:px-8">
        <BlogNav />
        <div className="flex-1 pb-10 pt-6">{children}</div>
        <BlogFooter />
      </div>
    </div>
  );
}
