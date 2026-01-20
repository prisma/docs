import defaultMdxComponents from "fumadocs-ui/mdx";
import { APIPage } from "@/components/api-page";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import * as CodeBlockTabsComponents from "fumadocs-ui/components/codeblock";
import type { MDXComponents } from "mdx/types";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { FolderCards } from "@/components/folder-cards";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  const mdxComponents = {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...CodeBlockTabsComponents,
    ...components,
    APIPage,
    img: (props: any) => <ImageZoom {...(props as any)} />,
  };

  const pageContext = (components as any)?._pageContext;

  return {
    ...mdxComponents,
    FolderCards: (props: any) => (
      <FolderCards
        folder={props.folder || pageContext?.folder}
        version={props.version || pageContext?.version}
        components={mdxComponents}
      />
    ),
  };
}
