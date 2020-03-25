const path = require(`path`);
// const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);

    let value = parent.relativePath.replace(parent.ext, '');

    if (value === 'index') {
      value = '';
    }

    createNodeField({
      name: `slug`,
      node,
      value: `/${value}`,
    });
    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });
    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || '',
    });
    createNodeField({
      name: 'staticLink',
      node,
      value: node.frontmatter.staticLink || false,
    });
    createNodeField({
      name: 'duration',
      node,
      value: node.frontmatter.duration || '',
    });
    createNodeField({
      name: 'experimental',
      node,
      value: node.frontmatter.experimental || false,
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
                id
              }
              tableOfContents
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug ? node.fields.slug : '/',
          component: path.resolve(`./src/layouts/articleLayout.tsx`),
          context: {
            id: node.fields.id
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
