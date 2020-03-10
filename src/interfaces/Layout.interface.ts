interface Logo {
  image: string;
  link: string;
}

interface SiteMeta {
  siteMetadata: {
    headerTitle: string;
    title: string;
    logo: Logo;
  };
}

export interface LayoutQueryData {
  site: SiteMeta;
}

export interface HeaderProps {
  siteTitle: string;
  logo: Logo;
}
