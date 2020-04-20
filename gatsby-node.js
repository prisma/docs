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

// const matchesLangDb = (slug, langSwitcher, dbSwitcher) => {
//   return `${slug.replace(/\d+-/g, '')}/*`;
// };

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
                langSwitcher
                dbSwitcher
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug ? node.fields.slug.replace(/\d+-/g, '') : '/',
          component: path.resolve(`./src/layouts/articleLayout.tsx`),
          matchPath:
            node.frontmatter.langSwitcher || node.frontmatter.dbSwitcher
              ? `${node.fields.slug.replace(/\d+-/g, '')}/*`
              : ``,
          context: {
            slug: node.fields.slug,
          },
        });
        // if(node.frontmatter.langSwitcher) {
        //   node.frontmatter.langSwitcher.forEach(lang => createPage({
        //     path: node.fields.slug ? `${node.fields.slug.replace(/\d+-/g, '')}-${lang}` : '/',
        //     component: path.resolve(`./src/layouts/articleLayout.tsx`),
        //     // matchPath:
        //     //   node.frontmatter.langSwitcher || node.frontmatter.dbSwitcher
        //     //     ? `${node.fields.slug.replace(/\d+-/g, '')}/*`
        //     //     : ``,
        //     context: {
        //       slug: `${node.fields.slug.replace(/\d+-/g, '')}-${lang}`
        //     },
        //   }))
        // }
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
