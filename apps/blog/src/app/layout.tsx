import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter, Barlow } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlow.variable} dark`}
      suppressHydrationWarning
    >
      <head></head>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
