const path = require('path')
const fsPromises = require('fs').promises
const url = require('url')

const publicPath = `./public`

// Excluded paths from page listing as they're redirected to the page with the language and db selected
// https://github.com/prisma/homepage-v8/blob/b972182ebee2c824e6b2981088907b215d9bfee0/public/_redirects#L75-L78
const excludedPaths = [
  '/getting-started/quickstart',
  '/getting-started/setup-prisma/add-to-existing-project',
  '/getting-started/setup-prisma/start-from-scratch-sql ',
  '/getting-started/setup-prisma/start-from-scratch-prisma-migrate',
]

exports.onPostBuild = async ({ graphql, pathPrefix, basePath = pathPrefix }, pluginOptions) => {
  const outputFile = path.join(publicPath, '/pages.json')

  const query = `
    {
      site {
        siteMetadata {
          siteUrl
          pathPrefix
        }
      }
      allSitePage {
        edges {
          node {
            path
            pageContext
          }
        }
      }  
  }`
  const { data } = await graphql(query)

  // Construct the pages json by iterating over the mdx files.
  const pages = data.allSitePage.edges
    .map((edge, i) => {
      // Skip the 404 pages and pages without seoTitle
      if (!edge.node.pageContext || !edge.node.pageContext.seoTitle) return null
      console.log(edge.node.path)
      // Skip explicitly excluded paths
      if (excludedPaths.includes(edge.node.path)) return null

      return {
        title: edge.node.pageContext.seoTitle,
        url: url.resolve(
          data.site.siteMetadata.siteUrl,
          path.join(data.site.siteMetadata.pathPrefix, edge.node.path)
        ),
      }
    })
    .filter((edge) => edge !== null)

  await fsPromises.writeFile(outputFile, JSON.stringify(pages))
}
