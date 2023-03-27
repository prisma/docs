var visit = require('unist-util-visit')
const path = require('path')

function withPathPrefix(url, pathPrefix) {
  const prefixed = pathPrefix + url
  return prefixed.replace(/\/\//, '/')
}

const pathSep = '/'

module.exports = function plugin(
  { markdownAST, markdownNode, pathPrefix, getNode },
  { redirects = [] } = {}
) {
  function visitor(node) {
    node.originalUrl = node.url
    var pattern = /^https?:\/\//i
    if (
      markdownNode.fields &&
      markdownNode.fields.slug &&
      (node.url.includes('prisma.io/docs') ||
        node.url.includes('prisma.io/blog') ||
        node.url.includes('prisma.io/dataguide'))
    ) {
      console.warn(
        `${markdownNode.fields.slug} contains links with domain name prisma.io: ${node.url} - Please use relative urls instead.`
      )
    }
    if (
      markdownNode.fields &&
      markdownNode.fields.slug &&
      !pattern.test(node.url) &&
      node.url.endsWith('/')
    ) {
      console.warn(
        `${markdownNode.fields.slug} contains links with trailing slashes: ${node.url} - Please remove trailing slashes.`
      )
    }

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
            .replace(new RegExp('\\b' + `${pathSep}index` + '\\b'), '')
            .replace(/\d{2,}-/g, '')
            .replace(/\/$/, '')
            .split(pathSep)
            .slice(0, parent.name === 'index' ? undefined : -1)
            .join(pathSep) || '/',
          node.url
        )
        .replace(/\/?(\?|$)/, '/$1')
        .replace(/\/$/, '')

      if (/^..\\/.test(newUrl)) {
        //Code specifically for local run, to fix broken links on
        let newUrl2 = path.resolve(
          markdownNode.fields.slug.replace(/(\/.+)\/.*/, '$1').replace(/\/\d{2,}-/g, '/'),
          node.url
        )

        newUrl2 = newUrl2
          .replace(/\\/g, '/')
          .slice(2)
          .replace(/(^.*)#.*/, '$1')

        const isRedirectPath = redirects.find((url) => newUrl2.includes(url.from))
        if (isRedirectPath) newUrl2 = isRedirectPath.to

        let hashVal = node.url.match(/#.*/)
        if (hashVal) newUrl2 += hashVal[0]

        node.url = newUrl2.replace(/^([^#]*)$/, '$1/')
      } else {
        const isRedirectPath = redirects.find((url) => newUrl.includes(url.from))
        node.url = withPathPrefix(
          isRedirectPath ? newUrl.replace(isRedirectPath.from, isRedirectPath.to) : newUrl,
          pathPrefix
        )
      }
    }
  }

  visit(markdownAST, 'link', visitor)

  return markdownAST
}
