import { graphql, useStaticQuery } from 'gatsby';
import { LayoutQueryData } from '../interfaces/Layout.interface';

export const useLayoutQuery = () => {
  const { site }: LayoutQueryData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          # change siteMetaData in 'gatsby-config.js'
          title
          headerTitle
          logo {
            image
            link
          }
        }
      }
    }
  `);

  return { site };
};
