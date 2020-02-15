import { graphql, useStaticQuery } from 'gatsby';
import { PostsQueryData } from '../interfaces/PostsQuery.interface';

export const useListingQuery = () => {
  const { allMdx }: PostsQueryData = useStaticQuery(graphql`
    query LISTING_QUERY {
      allMdx(limit: 10, sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            excerpt
            frontmatter {
              path
              title
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `);

  return { allMdx };
};
