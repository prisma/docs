import * as algoliasearch from 'algoliasearch'
const paragraphs = require('../../paragraphs.json')

if (process.env.SKIP_ALGOLIA === 'true' || process.env.SKIP_ALGOLIA === '1'){
  process.exit(0)
}

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY,
)
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

async function clearAlgolia() {
  console.log(`Clearing algolia index ${process.env.ALGOLIA_INDEX_NAME}...`)
  await index.clearIndex({
    // filters: version,
  })
  console.log('Cleared index')
}

async function addParagraphsToAlgolia(paragraphs) {
  await index.addObjects(paragraphs)
  console.log(`added ${paragraphs.length} paragraphs to index`)
}

async function sync() {
  await clearAlgolia()
  await addParagraphsToAlgolia(
    paragraphs
      .filter(p => !p.title.toLowerCase().includes('test article'))
      .map(p => ({ ...p, _tags: p.version })),
  )
}

sync().catch(console.error)