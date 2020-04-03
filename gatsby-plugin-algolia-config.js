require('dotenv').config({
  path: `.env`,
});

const handleRawBody = node => {
  // We want to split `rawBody` from the node
  const { rawBody, ...rest } = node;

  // To improve search with smaller record sizes, we will divide all
  // blog posts into sections (essentially by paragraph).

  // Since the body of my posts is markdown, we will split
  // whereever there are two adjacent new lines, this is a
  // reasonable proxy for paragraphs
  rawBodyWithoutFrontmatter = rawBody.split('---');
  const sections = rawBodyWithoutFrontmatter[2].split('\n\n');

  // Now, we're goint to map over each section, returning
  // an object that contains all the frontmatter and excerpt,
  // but only has the specific content on that key.
  // This way the results are still associated with the
  // correct post.
  const records = sections.map(section => ({
    ...rest,
    content: section.replace(/[^a-zA-Z0-9]/g, ' '),
  }));

  return records;
};

const unnestFrontmatter = node => {
  const { fields, ...rest } = node;

  return {
    ...fields,
    ...rest,
  };
};

const settings = { searchableAttributes: ['content'] };

const queries = [
  {
    query: `
        {
          allMdx {
            edges {
              node {
                objectID: id
                fields {
                  slug
                  title
                }
                rawBody
              }
            }
          }
        }
      `,
    transformer: ({ data }) =>
      data.allMdx.edges
        .map(edge => edge.node)
        .map(unnestFrontmatter)
        // Now we take rawBody and manipulate it into many more records
        .map(handleRawBody)
        // And we flatten those records into a single array
        // alternatively, flatMap is available wherever ES2019 is implemented
        .reduce((acc, cur) => [...acc, ...cur], []),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    settings,
  },
];

module.exports = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  apiKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  queries,
};
