export interface ArticleFields {
  slug: string;
}

export interface ArticleFrontmatter {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  langSwitcher?: string[];
  dbSwitcher?: string[];
  staticLink?: boolean;
  duration?: string;
  experimental?: boolean;
}

export interface ArticleData {
  mdx: {
    fields: ArticleFields;
    body: string;
    parent: any;
    frontmatter: ArticleFrontmatter;
  };
  site: {
    siteMetadata: {
      docsLocation: string;
    };
  };
}

// export interface ArticleData {
//   sitePage: {
//     context: any;
//   };
//   site: {
//     siteMetadata: {
//       docsLocation: string;
//     };
//   };
// }

export interface ArticleQueryData {
  data: ArticleData;
}

export interface Fields {
  fields: ArticleFields;
}
