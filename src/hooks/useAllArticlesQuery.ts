import { graphql, useStaticQuery } from 'gatsby';
import { AllArticles } from '../interfaces/AllArticles.interface';

export const useAllArticlesQuery = () => {
  const { allMdx }: AllArticles = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
              title
              duration
              staticLink
              experimental
            }
          }
        }
      }
    }
  `);

  return { allMdx };
};
