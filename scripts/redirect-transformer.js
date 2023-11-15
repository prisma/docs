const fs = require('fs')
const { join, extname } = require('path')
const remark = require('remark')
const mdx = require('remark-mdx')
var visit = require('unist-util-visit')
var vercelSettings = require('../vercel.json')

function* walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(join(dir, file.name))
    } else {
      yield join(dir, file.name)
    }
  }
}

const isDirectMatch = (url, source) =>
  (url.includes('#') ? url.split('#')[0] : url) === source.replace('/docs', '')
const isSourcePartofUrl = (url, source) =>
  source.includes(':/any*') && ('/docs' + url).includes(source.replace('/:any*', ''))

for (const filePath of walkSync(`${__dirname}/../content`)) {
  if (extname(filePath) === '.mdx') {
    const file = fs.readFileSync(filePath, 'utf8')
    const contents = remark().use(mdx).parse(file)
    visit(contents, 'link', function visitor(node) {
      if (
        node.url &&
        !/^https?:\/\//.test(node.url) &&
        vercelSettings &&
        vercelSettings.redirects &&
        vercelSettings.redirects.some(
          (r) => isDirectMatch(node.url, r.source) || isSourcePartofUrl(node.url, r.source)
        )
      ) {
        const redirectItem = vercelSettings.redirects.filter((r) =>
          isDirectMatch(node.url, r.source)
        )
        const transformedSrc = redirectItem[0].source.replace('/docs', '').replace('/:any*', '')
        var regex = new RegExp(transformedSrc, 'g')
        const newMdx = file.replace(
          regex,
          redirectItem[0].destination.replace('/docs', '').replace('/:any*', '')
        )
        fs.writeFileSync(filePath, newMdx)
      }
    })
  }
}
