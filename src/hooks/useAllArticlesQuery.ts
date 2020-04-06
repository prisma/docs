import { graphql, useStaticQuery } from 'gatsby';
import { AllArticles } from '../interfaces/AllArticles.interface';

export const useAllArticlesQuery = () => {
  const { allMdx }: AllArticles = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: fields___slug }) {
        edges {
          node {
            rawBody
            objectID: id
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
