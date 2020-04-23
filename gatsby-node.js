const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    let value = parent.relativePath.replace(parent.ext, '');
    if (value === 'index') {
      value = '';
    }

    createNodeField({
      node,
      name: `slug`,
      value: `/${value}`,
    });
    createNodeField({
      node,
      name: 'id',
      value: node.id,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const getTitle = (frontmatter, lang, db) => {
    let pageSeoTitle = frontmatter.metaTitle || frontmatter.title
    if (lang || db) {
      const titleEntry = frontmatter.techMetaTitles ? frontmatter.techMetaTitles.find(item => item.name === `${lang}-${db}`) : null
      pageSeoTitle =  titleEntry ? titleEntry.value : pageSeoTitle
    } 
    
    return pageSeoTitle
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
      }
    `).then(result => {
      result.data.allMdx.edges.forEach(({ node }) => {
        if (node.frontmatter.langSwitcher) {
          if (node.frontmatter.dbSwitcher) {
            node.frontmatter.langSwitcher.forEach(lang =>
              node.frontmatter.dbSwitcher.forEach(db =>
                createPage({
                  path: `${node.fields.slug.replace(/\d+-/g, '')}-${lang}-${db}`,
                  component: path.resolve(`./src/layouts/articleLayout.tsx`),
                  context: {
                    id: node.fields.id,
                    seoTitle: getTitle(node.frontmatter, lang, db)
                  },
                })
              )
            );
          } else {
            node.frontmatter.langSwitcher.forEach(lang =>
              createPage({
                path: `${node.fields.slug.replace(/\d+-/g, '')}-${lang}`,
                component: path.resolve(`./src/layouts/articleLayout.tsx`),
                context: {
                  id: node.fields.id,
                  seoTitle: `${node.frontmatter.title}-${lang}`
                },
              })
            );
          }
        }

        if (node.frontmatter.dbSwitcher && !node.frontmatter.langSwitcher) {
          node.frontmatter.dbSwitcher.forEach(db =>
            createPage({
              path: `${node.fields.slug.replace(/\d+-/g, '')}-${db}`,
              component: path.resolve(`./src/layouts/articleLayout.tsx`),
              context: {
                id: node.fields.id,
                seoTitle: `${node.frontmatter.title}-${db}`
              },
            })
          );
        }
        createPage({
          path: node.fields.slug ? node.fields.slug.replace(/\d+-/g, '') : '/',
          component: path.resolve(`./src/layouts/articleLayout.tsx`),
          context: {
            id: node.fields.id,
            seoTitle: getTitle(node.frontmatter)
          },
        });
      });
      resolve();
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      },
    },
  });
};

// title: `${node.frontmatter.title}-${lang}`,
// frontmatter: node.frontmatter,
// parentSlug: node.fields.slug.replace(/\d+-/g, ''),
// parentPath: node.parent.relativePath,
// body: node.body,
