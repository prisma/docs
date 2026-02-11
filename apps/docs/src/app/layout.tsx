import { Provider } from "@/components/provider";
import "./global.css";
import { Inter, Barlow } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
