const path = require('path')
// const docTemplate = path.resolve(`./src/templates/docs.tsx`);

exports.onCreateNode = ({ node, getNode, actions }: any) => {
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

const getTitle = (frontmatter: any, lang?: any, db?: any) => {
  let pageSeoTitle = frontmatter.metaTitle || frontmatter.title
  if (lang || db) {
    const queryParam = `${lang ? `${lang}${db ? '-' : ''}` : ''}${db ? `${db}` : ''}`
    const titleEntry = frontmatter.techMetaTitles
      ? frontmatter.techMetaTitles.find((item: any) => item.name === queryParam)
      : null
    pageSeoTitle = titleEntry ? titleEntry.value : `${pageSeoTitle} : ${queryParam}`
  }
  return pageSeoTitle
}

const getDesc = (frontmatter: any, lang?: any, db?: any) => {
  let pageSeoDesc = frontmatter.metaDescription || frontmatter.title
  if (lang || db) {
    const queryParam = `${lang ? `${lang}${db ? '-' : ''}` : ''}${db ? `${db}` : ''}`
    const descEntry = frontmatter.techMetaDescriptions
      ? frontmatter.techMetaDescriptions.find((item: any) => item.name === queryParam)
      : null
    pageSeoDesc = descEntry ? descEntry.value : pageSeoDesc
  }

  return pageSeoDesc
}

exports.createPages = async ({ graphql, actions, reporter }: any) => {
  const { createPage, createRedirect } = actions

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
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
          internal {
            contentFilePath
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
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes
  const redirects = result.data.site.siteMetadata.redirects

  // you'll call `createPage` for each result
  posts.forEach((node: any) => {
    // createPage({
    //   // As mentioned above you could also query something else like frontmatter.title above and use a helper function
    //   // like slugify to create a slug
    //   path: node.fields.modSlug
    //     ? node.fields.modSlug.replace(/\d{2,}-/g, "")
    //     : "/",
    //   // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
    //   component: `${docTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
    //   // You can use the values in this context in
    //   // our page layout component
    //   context: {
    //     id: node.id,
    //     seoTitle: getTitle(node.frontmatter),
    //     seoDescription: getDesc(node.frontmatter),
    //   },
    // });
    const { langSwitcher, dbSwitcher } = node.frontmatter
    if (langSwitcher && dbSwitcher) {
      langSwitcher.forEach((lang: any) =>
        dbSwitcher.forEach((db: any) => {
          createPage({
            path: `${node.fields.modSlug.replace(/\d{2,}-/g, '')}-${lang}-${db}`,
            component: path.resolve('./src/templates/docs.tsx'),
            context: {
              id: node.fields.id,
              seoTitle: getTitle(node.frontmatter, lang, db),
              seoDescription: getDesc(node.frontmatter, lang, db),
            },
          })
        })
      )
    } else if (langSwitcher && !dbSwitcher) {
      langSwitcher.forEach((lang: any) =>
        createPage({
          path: `${node.fields.modSlug.replace(/\d{2,}-/g, '')}-${lang}`,
          component: path.resolve('./src/templates/docs.tsx'),
          context: {
            id: node.fields.id,
            seoTitle: getTitle(node.frontmatter, lang, null),
            seoDescription: getDesc(node.frontmatter, lang, null),
          },
        })
      )
    } else if (!langSwitcher && dbSwitcher) {
      node.frontmatter.dbSwitcher.forEach((db: any) =>
        createPage({
          path: `${node.fields.modSlug.replace(/\d{2,}-/g, '')}-${db}`,
          component: path.resolve('./src/templates/docs.tsx'),
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
        component: path.resolve('./src/templates/docs.tsx'),
        context: {
          id: node.fields.id,
          seoTitle: getTitle(node.frontmatter),
          seoDescription: getDesc(node.frontmatter),
        },
      })
    }
  })

  redirects
    .filter((redirect: any) => !redirect.from.includes('#'))
    .map((redirect: any) =>
      createRedirect({
        fromPath: redirect.from,
        toPath: redirect.to,
        statusCode: 301,
      })
    )
}

exports.createSchemaCustomization = ({ actions }: any) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      navTitle: String
      metaTitle: String
      metaDescription: String
      langSwitcher: [String!]
      dbSwitcher: [String!]
      staticLink: Boolean
      duration: String
      preview: Boolean
      deprecated: Boolean
      earlyaccess: Boolean
      highlight: Boolean
      toc: Boolean
      hidePage: Boolean
      tocDepth: Int
      codeStyle: Boolean
    }
  `
  createTypes(typeDefs)
}

exports.onCreateWebpackConfig = ({ stage, actions }: any) => {
  actions.setWebpackConfig({
    devtool: false,
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      },
    },
  })
}
