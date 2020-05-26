require('dotenv').config({
  path: `.env`,
})

const handleRawBody = node => {
  const { rawBody, ...rest } = node
  const rawBodyWithoutFrontmatter = rawBody
    .split('---')
    .slice(2)
    .join('---')
  const blocks = rawBodyWithoutFrontmatter
    .split(/#{3,}/i)
    .join(' ')
    .split('##')
  const headingWithcontent = blocks
    .filter(block => block !== '\n\n')
    .map(block => {
      const parts = block.split('\n\n')
      return { heading: parts[0].trim(), content: parts.splice(1).join('\n\n') }
    })
  let finalSections = []
  headingWithcontent.map(fSec => {
    const sections = fSec.content.split('\n\n')
    const filteredSections = sections.filter(
      section =>
        section !== ' ' &&
        section !== '' &&
        !section.includes('</details') &&
        !section.includes('ButtonLink') &&
        !section.includes('SwitchTech') &&
        !section.includes('TabbedContent') &&
        !section.includes('ParallelBlocks') &&
        !section.includes('CodeWithResult') &&
        !section.includes('CodeBlock') &&
        !section.includes('tab>')
    )
    filteredSections.map(
      para => (para !== '\n' || para !== '') && finalSections.push({ para, heading: fSec.heading })
    )
  })

  const getTitlePath = fSection => {
    const tocItem =
      rest.tableOfContents &&
      rest.tableOfContents.items &&
      rest.tableOfContents.items.find(t => t.title === fSection.heading.replace(/`/g, ''))
    return tocItem ? tocItem.url : ''
  }

  const records = finalSections.map(fSection => ({
    objectID: rest.objectID,
    title: rest.title,
    slug: rest.modSlug,
    heading: fSection.heading,
    content: fSection.para.replace(/[\*\/\n/{\}\|\-\`\<\>\[\]]+/g, ' ').trim(),
    path: `${rest.modSlug.replace(/\d+-/g, '')}${getTitlePath(fSection)}`,
  }))

  return records
}

const unnestFrontmatter = node => {
  const { fields, frontmatter, ...rest } = node

  return {
    ...fields,
    ...frontmatter,
    ...rest,
  }
}

const settings = {
  searchableAttributes: ['title', 'heading', 'content'],
  attributesToHighlight: ['title', 'heading', 'content'],
  attributesToSnippet: ['title:20', 'heading:20', 'content:25'],
  hitsPerPage: 20,
  separatorsToIndex: '!#()[]{}*+-_一,:;<>?@/^|%&~£¥$§€†‡',
}

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
                  modSlug
                }
                frontmatter {
                  title
                }
                tableOfContents
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
]

module.exports = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  apiKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  queries,
}
