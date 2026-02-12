import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'My App',
    },
    links: [
      {
        url: '/docs',
        text: 'Docs',
      },
      {
        url: '/blog',
        text: 'Blog',
      },
    ],
  };
}

export default function Layout({ children, }: { children: React.ReactNode; }) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
