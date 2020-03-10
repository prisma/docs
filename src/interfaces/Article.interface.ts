export interface ArticleFields {
  slug: string;
  title: string;
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
}

export interface ArticleQueryData {
  data: ArticleData;
}

export interface Fields {
  fields: ArticleFields;
}
