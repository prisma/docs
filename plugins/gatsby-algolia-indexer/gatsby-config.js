const mdxToSearchable = require('./mdx-to-searchable')
const withDefaults = require('./options')

const settings = {
  searchableAttributes: ['apiReference', 'title', 'heading', 'content'],
  attributesToHighlight: ['title', 'heading', 'content'],
  attributesToSnippet: ['title:20', 'heading:20', 'content:25'],
  hitsPerPage: 20,
  attributeForDistinct: 'slug',
  distinct: 2,
  separatorsToIndex: '!#()[]{}*+-_一,:;<>?@/^|%&~£¥$§€†‡',
}

// Util functions

const flat = (array) => {
  var result = []
  array.forEach(function (a) {
    result.push(a)
    if (Array.isArray(a.items)) {
      result = result.concat(flat(a.items))
    }
  })
  return result
}

const removeInlineCode = (heading, path) =>
  path
    ? heading.replace(/inlinecode/g, '')
    : heading.replace('<inlinecode>', '').replace('</inlinecode>', '')

const isApiTerm = (term) => term.includes('AlgoliaTerm') && term.split('"')[1] === 'apiReference'

const getApiVal = (term) => term.split('"')[3]

const removeFrontmatter = (rawMdx) => rawMdx.split('---').slice(2).join('---')

const unnestFrontmatter = (node) => {
  const { fields, frontmatter, ...rest } = node

  return {
    ...fields,
    ...frontmatter,
    ...rest,
  }
}

// Transform function

const handleRawBody = (node) => {
  const { rawBody, ...rest } = node

  const techParams = `${
    rest.langSwitcher ? `${rest.langSwitcher[0]}${rest.dbSwitcher ? '-' : ''}` : ''
  }${rest.dbSwitcher ? `${rest.dbSwitcher[0]}` : ''}`

  const getTitlePath = (item) => {
    const tocItem =
      rest.tableOfContents &&
      rest.tableOfContents.items &&
      item.heading &&
      flat(rest.tableOfContents.items).find(
        (t) => t.title && removeInlineCode(t.title) === item.heading.replace(/`/g, '')
      )
    return tocItem && tocItem.url ? removeInlineCode(tocItem.url, true) : ''
  }

  const data = mdxToSearchable(removeFrontmatter(rawBody))

  const records = data.map((item, index) => {
    const record = {
      id: index,
      objectID: rest.objectID,
      title: rest.title,
      slug: rest.modSlug,
      apiReference: isApiTerm(item.text) ? getApiVal(item.text) : null,
      heading: item.heading ? removeInlineCode(item.heading) : null,
      content: item.text.includes('\n') ? item.text.split(' ').slice(0, 20).join(' ') : item.text,
      path: `${rest.modSlug.replace(/\d{2,}-/g, '')}${
        techParams ? '-' + techParams : ''
      }${getTitlePath(item)}`,
    }
    return record
  })

  return records
}

module.exports = (options) => {
  const { appId, adminKey, indexName } = withDefaults(options)
  const queries = [
    {
      query: `{
        allMdx{
          edges {
            node {
              rawBody
              fields {
                slug
                modSlug
              }
              frontmatter {
                title
                langSwitcher
                dbSwitcher
              }
              tableOfContents
            }
          }
        }
      }`,
      indexName,
      settings,
      transformer: ({ data }) =>
        data.allMdx.edges
          .map((edge) => edge.node)
          .map(unnestFrontmatter)
          .map(handleRawBody)
          .reduce((acc, cur) => [...acc, ...cur], []),
    },
  ]

  return {
    plugins: [
      {
        resolve: `gatsby-plugin-algolia`,
        options: {
          appId,
          apiKey: adminKey,
          queries,
        },
      },
    ],
  }
}
