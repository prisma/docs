require('dotenv').config({
  path: `.env`,
});

const queries = [
  {
    query: `
        {
          allMdx {
            edges {
              node {
                excerpt
                frontmatter {
                  title
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `,
    transformer: ({ data }) =>
      data.allMdx.edges.map(({ node: { excerpt, frontmatter: { title }, fields: { slug } } }) => ({
        title,
        description: excerpt,
        path: slug,
      })),
  },
];

module.exports = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  apiKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  queries,
  // chunkSize: 10000
};
