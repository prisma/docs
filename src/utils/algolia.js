require('dotenv').config({
  path: `.env`,
});

const handleRawBody = node => {
  const { rawBody, ...rest } = node;
  rawBodyWithoutFrontmatter = rawBody
    .split('---')
    .slice(2)
    .join('---');
  const sections = rawBodyWithoutFrontmatter.split('\n\n');
  const filteredSections = sections.filter(
    section =>
      section !== ' ' &&
      section !== '' &&
      !section.includes('##') &&
      !section.includes('<summary>') &&
      !section.includes('</details') &&
      !section.includes('```') &&
      !section.includes('ButtonLink') &&
      !section.includes('SwitchTech') &&
      !section.includes('|')
  );
  const records = filteredSections.map(fSection => ({
    ...rest,
    content: fSection
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .replace(/\s\s+/g, ' ')
      .trim(),
  }));

  return records;
};

const unnestFrontmatter = node => {
  const { fields, frontmatter, ...rest } = node;

  return {
    ...fields,
    ...frontmatter,
    ...rest,
  };
};

const settings = {
  searchableAttributes: ['content'],
  attributesToSnippet: ['content:25'],
};

const queries = [
  {
    query: `
        {
          allMdx(sort: {fields: fields___slug}) {
            edges {
              node {
                rawBody
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `,
    transformer: ({ data }) =>
      data.allMdx.edges
        .map(edge => edge.node)
        .map(unnestFrontmatter)
        .map(handleRawBody)
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
