var visit = require('unist-util-visit')
const path = require('path')

function withPathPrefix(url, pathPrefix) {
  const prefixed = pathPrefix + url
  return prefixed.replace(/\/\//, '/')
}

module.exports = function plugin({ markdownAST, markdownNode, pathPrefix, getNode }) {
  function visitor(node) {
    node.originalUrl = node.url
    if (
      markdownNode.fields &&
      markdownNode.fields.slug &&
      !node.url.startsWith('/') &&
      !node.url.startsWith('#') &&
      !node.url.startsWith('mailto:') &&
      !/^https?:\/\//.test(node.url)
    ) {
      const parent = getNode(markdownNode.parent)
      node.url = withPathPrefix(
        path
          .resolve(
            markdownNode.fields.slug
              .replace(`${path.sep}index`, '')
              .replace(/\d+-/g, '')
              .replace(/\/$/, '')
              .split(path.sep)
              .slice(0, parent.name === 'index' ? undefined : -1)
              .join(path.sep) || '/',
            node.url
          )
          .replace(/\/?(\?|#|$)/, '/$1'),
        pathPrefix
      )
    }
  }

  visit(markdownAST, 'link', visitor)

  return markdownAST
}
