import { AllEdges } from './AllArticles.interface';

export interface ArticleFields {
  slug: string;
  title: string;
  staticLink?: boolean;
  duration?: string;
  experimental?: boolean;
}

export interface ArticleData {
  mdx: {
    fields: ArticleFields;
    body: string;
    parent: any;
    frontmatter: {
      title: string;
      metaTitle?: string;
      metaDescription?: string;
      langSwitcher?: boolean;
      dbSwitcher?: boolean;
    };
  };
  allMdx: AllEdges;
  site: {
    siteMetadata: {
      docsLocation: string;
    };
  };
}

export interface ArticleQueryData {
  data: ArticleData;
}

export interface Fields {
  fields: ArticleFields;
}
