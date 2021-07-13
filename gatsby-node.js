const path = require(`path`)
const { execSync } = require('child_process')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    let value = parent.relativePath.replace(parent.ext, '')
    if (value === 'index') {
      value = ''
    }

    createNodeField({
      node,
      name: `slug`,
      value: `/${value}`,
    })
    createNodeField({
      node,
      name: 'id',
      value: node.id,
    })
    createNodeField({
      node,
      name: 'modSlug',
      value: `/${value.replace('/index', '')}`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const getTitle = (frontmatter, lang, db) => {
    let pageSeoTitle = frontmatter.metaTitle || frontmatter.title
    if (lang || db) {
      const queryParam = `${lang ? `${lang}${db ? '-' : ''}` : ''}${db ? `${db}` : ''}`
      const titleEntry = frontmatter.techMetaTitles
        ? frontmatter.techMetaTitles.find((item) => item.name === queryParam)
        : null
      pageSeoTitle = titleEntry ? titleEntry.value : pageSeoTitle
    }
    return pageSeoTitle
  }

  const getDesc = (frontmatter, lang, db) => {
    let pageSeoDesc = frontmatter.metaDescription || frontmatter.title
    if (lang || db) {
      const queryParam = `${lang ? `${lang}${db ? '-' : ''}` : ''}${db ? `${db}` : ''}`
      const descEntry = frontmatter.techMetaDescriptions
        ? frontmatter.techMetaDescriptions.find((item) => item.name === queryParam)
        : null
      pageSeoDesc = descEntry ? descEntry.value : pageSeoDesc
    }

    return pageSeoDesc
  }

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMdx {
          edges {
            node {
              fields {
                slug
                id
                modSlug
              }
              frontmatter {
                title
                metaTitle
                metaDescription
                langSwitcher
                dbSwitcher
                techMetaTitles {
                  name
                  value
                }
                techMetaDescriptions {
                  name
                  value
                }
              }
              body
              parent {
                ... on File {
                  relativePath
                }
              }
            }
          }
        }
        site {
          siteMetadata {
            redirects {
              from
              to
            }
          }
        }
      }
    `).then((result) => {
      result.data.allMdx.edges.forEach(({ node }) => {
        const { langSwitcher, dbSwitcher } = node.frontmatter
        if (langSwitcher && dbSwitcher) {
          langSwitcher.forEach((lang) =>
            dbSwitcher.forEach((db) => {
              createPage({
                path: `${node.fields.modSlug.replace(/\d{2,}-/g, '')}-${lang}-${db}`,
                component: path.resolve(`./src/layouts/articleLayout.tsx`),
                context: {
                  id: node.fields.id,
                  seoTitle: getTitle(node.frontmatter, lang, db),
                  seoDescription: getDesc(node.frontmatter, lang, db),
                },
              })
            })
          )
        } else if (langSwitcher && !dbSwitcher) {
          langSwitcher.forEach((lang) =>
            createPage({
              path: `${node.fields.modSlug.replace(/\d{2,}-/g, '')}-${lang}`,
              component: path.resolve(`./src/layouts/articleLayout.tsx`),
              context: {
                id: node.fields.id,
                seoTitle: getTitle(node.frontmatter, lang, null),
                seoDescription: getDesc(node.frontmatter, lang, null),
              },
            })
          )
        } else if (!langSwitcher && dbSwitcher) {
          node.frontmatter.dbSwitcher.forEach((db) =>
            createPage({
              path: `${node.fields.modSlug.replace(/\d{2,}-/g, '')}-${db}`,
              component: path.resolve(`./src/layouts/articleLayout.tsx`),
              context: {
                id: node.fields.id,
                seoTitle: getTitle(node.frontmatter, null, db),
                seoDescription: getDesc(node.frontmatter, null, db),
              },
            })
          )
        } else if (!langSwitcher && !dbSwitcher) {
          createPage({
            path: node.fields.modSlug ? node.fields.modSlug.replace(/\d{2,}-/g, '') : '/',
            component: path.resolve(`./src/layouts/articleLayout.tsx`),
            context: {
              id: node.fields.id,
              seoTitle: getTitle(node.frontmatter),
              seoDescription: getDesc(node.frontmatter),
            },
          })
        }
      })
      resolve()
      const redirects = result.data.site.siteMetadata.redirects
      redirects.map((redirect) =>
        createRedirect({
          fromPath: redirect.from,
          toPath: redirect.to,
          statusCode: 301,
        })
      )
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      },
    },
  })
}

exports.onPostBuild = () => {
  let cmd = ['npx', 'percy', 'snapshot', path.resolve(__dirname, 'public')]

  if (!process.env.PERCY_TOKEN) {
    cmd.push('--dry-run')
  }

  execSync(cmd.join(' '), { stdio: 'inherit' })
}
