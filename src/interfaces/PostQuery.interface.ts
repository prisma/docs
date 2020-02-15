export interface PostQueryData {
  data: {
    mdx: {
      frontmatter: {
        path: string;
        title: string;
        date: string;
      };
    };
  };
};
