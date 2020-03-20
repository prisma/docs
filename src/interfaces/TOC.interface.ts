import { EdgeNode } from "./EdgeNode.interface";

export interface AllArticlesTOC {
  allMdx: AllEdgesTOC;
}

export interface AllEdgesTOC {
  edges?: [EdgeNode<TableOfContents>];
}

export interface TableOfContents {
  fields: {
    slug: string;
  };
  tableOfContents: {
    items: {
      url: string;
      title: string;
    }[];
  };
}
