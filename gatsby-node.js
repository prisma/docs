const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    createNodeField({
      name: "title",
      node,
      value: node.frontmatter.title || 'Prisma'
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
            }
          }
        }
      }
    `).then(result => {
      result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/layouts/articleLayout.tsx`),
          context: {
            slug: node.fields.slug,
          },
        });
      });
      resolve();
    });
  });
};


// const componentWithMDXScope = require('gatsby-plugin-mdx/component-with-mdx-scope');
// const { toLower } = require("lodash")
// const path = require("path");
// const { createFilePath } = require("gatsby-source-filesystem")
// const { introspectionQuery, graphql, printSchema } = require("gatsby/graphql")
// const config = require("./config");
// const write = require("write")

// // exports.onCreateNode = ({ node, getNode, actions }) => {
// //   if (node.internal.type === "Mdx") {
// //     const route = toLower(
// //       createFilePath({
// //         node,
// //         getNode,
// //         trailingSlash: false,
// //       })
// //     )

// //     // Add a new field -- route -- which can be accessed from the schema under
// //     // fields { route }.
// //     actions.createNodeField({
// //       node,
// //       name: "route",
// //       value: route,
// //     })
// //   }
// // }

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;

//   const { data } = await graphql(`
//     {
//       allMdx {
//         edges {
//           node {
//             fields {
//               id
//             }
//             tableOfContents
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `).catch(error => console.error(error));

//   data.allMdx.edges.forEach(({ node }) => {
//     createPage({
//       path: node.fields.slug ? node.fields.slug : "/",
//       component: path.resolve("./src/layouts/articleLayout.tsx"),
//       context: {
//         id: node.id,
//       },
//     });
//   });
// };


// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === `Mdx`) {
//     const parent = getNode(node.parent);
//     let value = parent.relativePath.replace(parent.ext, "");

//     if (value === "index") {
//       value = "";
//     }

//     if(config.gatsby && config.gatsby.trailingSlash) {
//       createNodeField({
//         name: `slug`,
//         node,
//         value: value === "" ? `/` : `/${value}/`
//       });
//     } else {
//       createNodeField({
//         name: `slug`,
//         node,
//         value: `/${value}`
//       });
//     }

//     createNodeField({
//       name: "id",
//       node,
//       value: node.id
//     });

//     createNodeField({
//       name: "title",
//       node,
//       value: node.frontmatter.title || 'Prisma'
//     });
//   }
// };

// /**
//  * Generate GraphQL schema.json file to be read by tslint
//  * Thanks: https://gist.github.com/kkemple/6169e8dc16369b7c01ad7408fc7917a9
//  */
// // exports.onPostBootstrap = async ({ store }) => {
// //   try {
// //     const { schema } = store.getState()
// //     const jsonSchema = await graphql(schema, introspectionQuery)
// //     const sdlSchema = printSchema(schema)

// //     write.sync("schema.json", JSON.stringify(jsonSchema.data), {})
// //     write.sync("schema.graphql", sdlSchema, {})

// //     console.log("\n\n[gatsby-plugin-extract-schema] Wrote schema\n") // eslint-disable-line
// //   } catch (error) {
// //     console.error(
// //       "\n\n[gatsby-plugin-extract-schema] Failed to write schema: ",
// //       error,
// //       "\n"
// //     )
// //   }
// // }







