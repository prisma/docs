import { BlogShell } from '@/components/blog/blog-shell';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BlogShell>{children}</BlogShell>;
}
