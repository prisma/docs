var visit = require('unist-util-visit')
const path = require('path')
var vercelSettings = require('../../vercel.json')

const techStrings = [
  'node',
  'typescript',
  'postgresql',
  'mysql',
  'sqlserver',
  'planetscale',
  'cockroachdb',
]
function getCacheKey(node) {
  return `remark-check-links-${node.id}-${node.internal.contentDigest}`
}

const isDirectMatch = (url, source) =>
  (url.includes('#') ? url.split('#')[0] : url) === source.replace('/docs', '')
const isSourcePartofUrl = (url, source) =>
  source.includes(':/any*') && ('/docs' + url).includes(source.replace('/:any*', ''))

function getHeadingsMapKey(link, pathUrl) {
  let key = link
  const hashIndex = link.indexOf('#')
  const hasHash = hashIndex !== -1
  if (hasHash) {
    key = link.startsWith('#') ? pathUrl : link.slice(0, hashIndex)
  }

  return {
    key,
    hasHash,
    hashIndex,
  }
}

function createPathPrefixer(pathPrefix) {
  return function withPathPrefix(url) {
    var prefixed = pathPrefix + url
    return prefixed.replace(/\/\//, '/')
  }
}

module.exports = async function plugin(
  { markdownAST, markdownNode, files, getNode, cache, getCache, pathPrefix },
  { exceptions = [], ignore = [], verbose = true } = {}
) {
  const withPathPrefix = createPathPrefixer(pathPrefix)
  const pathSep = '/'
  var pattern = /^https?:\/\//i
  if (!markdownNode.fields) {
    // let the file pass if it has no fields
    return markdownAST
  }

  const links = []
  const headings = []

  function visitor(node, index, parent) {
    if (parent.type === 'heading') {
      headings.push(parent.data.id.replace(/inlinecode/g, ''))
      return
    }

    // if(node.isDomainUrl) { console.log(node) }

    if (!node.url.startsWith('mailto:') && !/^https?:\/\//.test(node.url)) {
      let tranformedUrl = node.url
      links.push({
        ...node,
        tranformedUrl,
        frontmatter: markdownNode.frontmatter,
      })
    }

    if (node.isDomainUrl) {
      let tranformedUrl = node.url
      links.push({
        ...node,
        tranformedUrl,
        frontmatter: markdownNode.frontmatter,
      })
    }
  }

  visit(markdownAST, 'link', visitor)

  const parent = await getNode(markdownNode.parent)
  const setAt = Date.now()
  await cache.set(getCacheKey(parent), {
    path: withPathPrefix(
      markdownNode.fields.slug
        .replace(new RegExp('\\b' + `${pathSep}index` + '\\b'), '')
        .replace(/\d+-/g, '')
        .concat(pathSep)
    ),
    links,
    headings,
    setAt,
  })

  // wait to see if all of the Markdown and MDX has been visited
  const linksMap = {}
  const headingsMap = {}
  for (const file of files) {
    if (/^mdx?$/.test(file.extension) && file.relativePath !== 'docs/README.md') {
      const key = getCacheKey(file)
      let visited = await cache.get(key)
      if (!visited && getCache) {
        // the cache provided to `gatsby-mdx` has its own namespace, and it
        // doesn't have access to `getCache`, so we have to check to see if
        // those files have been visited here.
        const mdxCache = getCache('gatsby-plugin-mdx')
        visited = await mdxCache.get(key)
      }
      if (visited && setAt >= visited.setAt) {
        linksMap[visited.path] = visited.links
        headingsMap[visited.path] = visited.headings
        continue
      }

      // don't continue if a page hasn't been visited yet
      return
    }
  }

  let totalBrokenLinks = 0
  let totalBrokenAnchors = 0
  let totalDomainLinks = 0
  let totalTrailingSlashLinks = 0
  let totalRedirectedLinks = 0

  const prefixedIgnore = ignore.map(withPathPrefix)
  const prefixedExceptions = exceptions.map(withPathPrefix)
  const pathKeys = Object.keys(linksMap)
  const pathKeysWithoutIndex = pathKeys.map((p) =>
    p.replace(new RegExp('\\b' + `${pathSep}index` + '\\b'), '').replace(/\/$/, '')
  )

  for (const pathL in linksMap) {
    if (prefixedIgnore.includes(pathL)) {
      // don't check links on ignored pages
      continue
    }

    const linksForPath = linksMap[pathL]
    if (linksForPath.length) {
      const brokenLinks = linksForPath.filter((link) => {
        // return true for broken links, false = pass
        const { key, hasHash, hashIndex } = getHeadingsMapKey(link.tranformedUrl, pathL)

        if (link.originalUrl === '') {
          return true
        }

        if (prefixedExceptions.includes(key) || /^https?:\/\//.test(key)) {
          // do not test this link as it is on the list of exceptions
          return false
        }
        const url = hasHash ? link.tranformedUrl.slice(0, hashIndex) : link.tranformedUrl
        const urlToCheck = url.slice(-1) === pathSep ? url.slice(0, -1) : url
        const headings = headingsMap[key]
        if (headings) {
          if (hasHash) {
            const id = link.tranformedUrl.slice(hashIndex + 1)
            return !prefixedExceptions.includes(id) && !headings.includes(id)
          }

          return false
        }
        return !pathKeysWithoutIndex.includes(urlToCheck)
      })

      const brokenAnchors = linksForPath.filter((link) => {
        // return true for broken links, false = pass
        const { key, hasHash, hashIndex } = getHeadingsMapKey(link.tranformedUrl, pathL)

        if (prefixedExceptions.includes(key) || /^https?:\/\//.test(key)) {
          // do not test this link as it is on the list of exceptions
          return false
        }
        const url = hasHash ? link.tranformedUrl.slice(0, hashIndex) : link.tranformedUrl
        const urlToCheck = url.slice(-1) === pathSep ? url.slice(0, -1) : url
        const keyToLook = `${key}${key.endsWith('/') ? '' : '/'}`
        const headings = headingsMap[keyToLook]
        if (headings) {
          if (hasHash) {
            const id = link.tranformedUrl.slice(hashIndex + 1)
            return !prefixedExceptions.includes(id) && !headings.includes(id)
          }

          return false
        }
        return !pathKeysWithoutIndex.includes(urlToCheck)
      })

      const domainLinks = linksForPath.filter((link) => {
        return link.isDomainUrl
      })

      const trailingSlashLinks = linksForPath.filter((link) => {
        return link.isTrailingSlashUrl
      })

      const redirectedLinks = linksForPath.filter((link) => {
        if (
          link &&
          vercelSettings &&
          vercelSettings.redirects &&
          vercelSettings.redirects.some(
            (r) =>
              isDirectMatch(link.originalUrl, r.source) ||
              isSourcePartofUrl(link.originalUrl, r.source)
          )
        ) {
          return true
        }
      })

      const brokenLinkCount = brokenLinks.length
      const brokenAnchorCount = brokenAnchors.length
      const domainLinksCount = domainLinks.length
      const trailingSlashLinksCount = trailingSlashLinks.length
      const redirectedLinksCount = redirectedLinks.length
      totalBrokenLinks += brokenLinkCount
      totalBrokenAnchors += brokenAnchorCount
      totalDomainLinks += domainLinksCount
      totalTrailingSlashLinks += trailingSlashLinksCount
      totalRedirectedLinks += redirectedLinksCount

      if (brokenLinkCount && verbose) {
        console.warn(`${brokenLinkCount} broken links found on ${pathL.replace(/\/$/, '')}`)
        for (const link of brokenLinks) {
          let prefix = '-'
          if (link.position) {
            const { line, column } = link.position.start

            // account for the offset that frontmatter adds
            const offset = link.frontmatter ? Object.keys(link.frontmatter).length + 2 : 0

            prefix = [String(line + offset).padStart(3, ' '), String(column).padEnd(4, ' ')].join(
              ':'
            )
          }

          if (techStrings.some((tech) => link.originalUrl.includes(tech))) {
            console.warn(
              `${prefix} ${link.originalUrl} contains tech switcher strings. Please add this to the exceptions list in gatsby-config.ts`
            )
          } else {
            console.warn(`${prefix} ${link.originalUrl}`)
          }
        }
        console.log('')
      }

      if (brokenAnchorCount && verbose) {
        console.warn(`${brokenAnchorCount} broken anchors found on ${pathL.replace(/\/$/, '')}`)
        for (const link of brokenAnchors) {
          let prefix = '-'
          if (link.position) {
            const { line, column } = link.position.start

            // account for the offset that frontmatter adds
            const offset = link.frontmatter ? Object.keys(link.frontmatter).length + 2 : 0

            prefix = [String(line + offset).padStart(3, ' '), String(column).padEnd(4, ' ')].join(
              ':'
            )
          }
          console.warn(`${prefix} ${link.originalUrl}`)
        }
        console.log('')
      }

      if (domainLinksCount && verbose) {
        console.warn(`${domainLinksCount} domain urls found on ${pathL.replace(/\/$/, '')}`)
        for (const link of domainLinks) {
          let prefix = '-'
          if (link.position) {
            const { line, column } = link.position.start

            // account for the offset that frontmatter adds
            const offset = link.frontmatter ? Object.keys(link.frontmatter).length + 2 : 0

            prefix = [String(line + offset).padStart(3, ' '), String(column).padEnd(4, ' ')].join(
              ':'
            )
          }
          console.warn(`${prefix} ${link.originalUrl}`)
        }
        console.log('')
      }

      if (trailingSlashLinksCount && verbose) {
        console.warn(
          `${trailingSlashLinksCount} trailing slash urls found on ${pathL.replace(/\/$/, '')}`
        )
        for (const link of trailingSlashLinks) {
          let prefix = '-'
          if (link.position) {
            const { line, column } = link.position.start

            // account for the offset that frontmatter adds
            const offset = link.frontmatter ? Object.keys(link.frontmatter).length + 2 : 0

            prefix = [String(line + offset).padStart(3, ' '), String(column).padEnd(4, ' ')].join(
              ':'
            )
          }
          console.warn(`${prefix} ${link.originalUrl}`)
        }
        console.log('')
      }

      if (redirectedLinksCount && verbose) {
        console.warn(
          `${redirectedLinksCount} redirected links found on ${pathL.replace(/\/$/, '')}`
        )
        for (const link of redirectedLinks) {
          let prefix = '-'
          if (link.position) {
            const { line, column } = link.position.start

            // account for the offset that frontmatter adds
            const offset = link.frontmatter ? Object.keys(link.frontmatter).length + 2 : 0

            prefix = [String(line + offset).padStart(3, ' '), String(column).padEnd(4, ' ')].join(
              ':'
            )
          }
          console.warn(`${prefix} ${link.originalUrl}`)
        }
        console.log('')
      }
    }
  }
  if (
    totalBrokenLinks ||
    totalBrokenAnchors ||
    totalDomainLinks ||
    totalTrailingSlashLinks ||
    totalRedirectedLinks
  ) {
    let message = `
        Broken (or redirected) internal links: ${totalBrokenLinks}
        Broken anchors: ${totalBrokenAnchors}
        Domain name in links: ${totalDomainLinks}
        Links with trailing slashes: ${totalTrailingSlashLinks}
      `

    if (totalRedirectedLinks) {
      message = `${message}
        Redirected links found: ${totalRedirectedLinks}. Please run 'npm run redirect-transform' to replace these urls with correct paths
      `
    }
    if (process.env.NODE_ENV === 'production') {
      // break builds with broken links before they get deployed for reals
      // throw new Error(message)
      console.warn(message)
    }

    if (verbose) {
      console.warn(message)
    }
  } else if (verbose) {
    console.info('No internal broken links found')
  }

  return markdownAST
}
