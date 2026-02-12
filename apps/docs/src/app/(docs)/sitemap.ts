import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { getBaseUrl } from "@/lib/urls";

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const url = (path: string): string => new URL(path, baseUrl).toString();

  const items = source.getPages().map((page) => {
    const lastModified = (page.data as { lastModified?: Date }).lastModified;

    return {
      url: url(page.url),
      lastModified: lastModified ? new Date(lastModified) : undefined,
      changeFrequency: "weekly",
      priority: page.url.startsWith("/orm/v6") ? 0.4 : 0.5,
    } as MetadataRoute.Sitemap[number];
  });

  return [
    {
      url: url("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: url("/showcase"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/docs"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...items.filter((v) => v !== undefined),
  ];
}
