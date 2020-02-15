interface Site {
  siteMetadata: {
    title: string;
    description: string;
    keywords: string | undefined;
  };
}

export interface LayoutQueryData {
  site: Site;
}
