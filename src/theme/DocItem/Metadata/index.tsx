import React from "react";
import { PageMetadata } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";

import type { DocFrontMatter } from "@docusaurus/plugin-content-docs";

type PrismaDocFrontMatter = DocFrontMatter & {
  metaTitle: string;
  metaDescription: string;
};

export default function DocItemMetadata(): JSX.Element {
  const { metadata, frontMatter, assets } = useDoc();
  const prismaFrontMatter = frontMatter as PrismaDocFrontMatter;
  return (
    <PageMetadata
      title={prismaFrontMatter.metaTitle ?? prismaFrontMatter.title ?? metadata.title}
      description={prismaFrontMatter.metaDescription ?? metadata.description}
      keywords={prismaFrontMatter.keywords}
      image={assets.image ?? prismaFrontMatter.image}
    />
  );
}
