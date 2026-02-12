import { Provider } from "@/components/provider";
import { getBaseUrl } from "@/lib/urls";
import "./global.css";
import { Inter, Barlow } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: "Prisma Documentation",
  description:
    "Documentation for Prisma ORM, Prisma Postgres, Prisma Accelerate, and the Prisma ecosystem. Build type-safe database applications with ease.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
