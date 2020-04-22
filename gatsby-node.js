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
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                metaTitle
                metaDescription
                langSwitcher
                dbSwitcher
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
          node.frontmatter.langSwitcher.forEach(lang =>
            createPage({
              path: `${node.fields.slug.replace(/\d+-/g, '')}-${lang}`,
              component: path.resolve(`./src/layouts/articleLayout.tsx`),
              context: {
                slug: node.fields.slug + '-' +lang,
                title: `${node.frontmatter.title}-${lang}`,
                frontmatter: node.frontmatter,
                parentSlug: node.fields.slug.replace(/\d+-/g, ''),
                parentPath: node.parent.relativePath,
                body: node.body,
              },
            })
          );
        }
        createPage({
          path: node.fields.slug ? node.fields.slug.replace(/\d+-/g, '') : '/',
          component: path.resolve(`./src/layouts/articleLayout.tsx`),
          context: {
            slug: node.fields.slug,
            title: node.frontmatter.title,
            frontmatter: node.frontmatter,
            parentSlug: node.fields.slug.replace(/\d+-/g, ''),
            parentPath: node.parent.relativePath,
            body: node.body,
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
