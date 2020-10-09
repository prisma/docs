const path = require('path')
const fsPromises = require('fs').promises
const url = require('url')

const publicPath = `./public`

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
      allMdx {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              id
            }
          }
        }
      }
      allSitePage {
        edges {
          node {
            path
            context {
              id
            }
          }
        }
      }  
  }`
  const { data } = await graphql(query)

  // Create an object mapping the id -> path
  const pathById = {}
  data.allSitePage.edges.forEach(edge => {
    // Some pages have no ID, e.g. 404 pages.
    if (!edge.node.context) return
    pathById[edge.node.context.id] = edge.node.path
  })

  // Construct the pages json by iterating over the mdx files.
  const pages = data.allMdx.edges.map((edge, i) => {
    return {
      title: edge.node.frontmatter.title,
      url: url.resolve(
        data.site.siteMetadata.siteUrl,
        path.join(data.site.siteMetadata.pathPrefix, pathById[edge.node.fields.id])
      ),
    }
  })
  await fsPromises.writeFile(outputFile, JSON.stringify(pages))
}
