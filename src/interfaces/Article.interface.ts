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
    frontmatter: {
      title: string;
      metaTitle?: string;
      metaDescription?: string;
    };
  };
  allMdx: AllEdges;
}

export interface ArticleQueryData {
  data: ArticleData;
}

export interface Fields {
  fields: ArticleFields;
}
