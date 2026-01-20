import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import logoDark from "../../public/img/logo-dark.svg";
import logoWhite from "../../public/img/logo-white.svg";

export const logo = (
  <>
    <Image alt="Prisma" src={logoDark} aria-label="Prisma" className="dark:hidden" />
    <Image alt="Prisma" src={logoWhite} aria-label="Prisma" className="hidden dark:block" />
  </>
);

export const links: LinkItemType[] = [
  {
    text: "Overview",
    url: "/",
    active: "nested-url",
  },
  {
    text: "ORM",
    url: "/orm",
    active: "nested-url",
  },
  {
    text: "Postgres",
    url: "/postgres",
    active: "nested-url",
  },
  {
    text: "Guides",
    url: "/guides",
    active: "nested-url",
  },
  {
    text: "Studio",
    url: "/studio",
    active: "nested-url",
  },
  {
    text: "Accelerate",
    url: "/accelerate",
    active: "nested-url",
  },
  {
    text: "Optimize",
    url: "/optimize",
    active: "nested-url",
  },
  {
    text: "AI",
    url: "/ai",
    active: "nested-url",
  },
  {
    text: "Platform",
    url: "/platform",
    active: "nested-url",
  },
  {
    text: "Management API",
    url: "/management-api",
    active: "nested-url",
  },
];

export const docsLinks: LinkItemType[] = [];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <>{logo} <span className="font-mono text-lg">/docs</span></>,
      transparentMode: 'none',
    },
    githubUrl: "https://github.com/prisma/docs",
  };
}
