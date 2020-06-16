var visit = require('unist-util-visit')
const path = require('path')

function withPathPrefix(url, pathPrefix) {
  const prefixed = pathPrefix + url
  return prefixed.replace(/\/\//, '/')
}

const pathSep = path.sep || '/'

module.exports = function plugin(
  { markdownAST, markdownNode, pathPrefix, getNode },
  { redirects = [] } = {}
) {
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
      const newUrl = path
        .resolve(
          markdownNode.fields.slug
            .replace(`${pathSep}index`, '')
            .replace(/\d+-/g, '')
            .replace(/\/$/, '')
            .replace(/\\$/, '')
            .split(pathSep)
            .slice(0, parent.name === 'index' ? undefined : -1)
            .join(pathSep) || '/',
          node.url
        )
        .replace(/\/?(\?|#|$)/, '/$1')
        .replace(/\\?(\?|#|$)/, '/$1')

      const isRedirectPath = redirects.find(url => url.from === newUrl || `${url.from}/` === newUrl)
      node.url = withPathPrefix(isRedirectPath ? isRedirectPath.to : newUrl, pathPrefix)
    }
  }

  visit(markdownAST, 'link', visitor)

  return markdownAST
}
