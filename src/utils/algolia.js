const config = require('../../config.js');

const docQuery = `{
  allMdx {
    edges {
      node {
        objectID: id
        fields {
          slug
          title
        }
        rawBody
        headings {
          value
        }
        frontmatter {
          title
          metaDescription 
        }
        excerpt(pruneLength: 50000)
      }
    }
  }
}`;

// const flatten = arr =>
//   arr.map(({ node: { frontmatter, fields, ...rest } }) => ({
//     ...frontmatter,
//     ...fields,
//     ...rest,
//   }));

const unnestFrontmatter = node => {
  const { frontmatter, ...rest } = node;

  return {
    ...frontmatter,
    ...rest,
  };
};

// I'm defining a function that will map over our data nodes
// We're going to return an array of record objects
const handleRawBody = node => {
  // We want to split `rawBody` from the node
  const { rawBody, ...rest } = node;

  // To improve search with smaller record sizes, we will divide all
  // blog posts into sections (essentially by paragraph).

  // Since the body of my posts is markdown, we will split
  // whereever there are two adjacent new lines, this is a
  // reasonable proxy for paragraphs
  const sections = rawBody.split('\n\n');

  // Now, we're goint to map over each section, returning
  // an object that contains all the frontmatter and excerpt,
  // but only has the specific content on that key.
  // This way the results are still associated with the
  // correct post.
  const records = sections.map(section => ({
    ...rest,
    content: section,
  }));

  return records;
};

const settings = {
  attributesToSnippet: [`excerpt:20`],
  attributeForDistinct: 'slug',
  distinct: true,
};

const indexName = config.header.search ? config.header.search.indexName : '';

const queries = [
  {
    query: docQuery,
    transformer: ({ data }) =>
      data.allMdx.edges
        .map(edge => edge.node)
        .map(unnestFrontmatter)
        // Now we take rawBody and manipulate it into many more records
        .map(handleRawBody)
        // And we flatten those records into a single array
        // alternatively, flatMap is available wherever ES2019 is implemented
        .reduce((acc, cur) => [...acc, ...cur], []),
    indexName: `${indexName}`,
    settings,
  },
];

module.exports = queries;
