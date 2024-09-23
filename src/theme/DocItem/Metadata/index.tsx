import React from "react";
import { PageMetadata } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client";

import type { DocFrontMatter } from "@docusaurus/plugin-content-docs";

type PrismaDocFrontMatter = DocFrontMatter & {
  metaTitle: string;
  metaDescription: string;
};

export default function DocItemMetadata(): JSX.Element {
  const { metadata, frontMatter, assets } = useDoc();
  const prismaFrontMatter = frontMatter as PrismaDocFrontMatter;

  const title = prismaFrontMatter.metaTitle ?? prismaFrontMatter.title ?? metadata.title;
  const description = prismaFrontMatter.metaDescription ?? metadata.description;
  const keywords = prismaFrontMatter.keywords;
  const image = assets.image ?? prismaFrontMatter.image;

  return (
    <PageMetadata title={title} description={description} keywords={keywords} image={image}>
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </PageMetadata>
  );
}
