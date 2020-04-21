import { RouterProps } from '@reach/router';
import * as React from 'react';
import { ArticleQueryData } from '../interfaces/Article.interface';
import Layout from '../components/layout';
import TopSection from '../components/topSection';
import PageBottom from '../components/pageBottom';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

type ArticleLayoutProps = ArticleQueryData & RouterProps;

const ArticleLayout = ({ data, ...props }: ArticleLayoutProps) => {
  if (!data) {
    return null;
  }
  const {
    mdx: {
      fields: { slug },
      frontmatter: { title, metaTitle, metaDescription, langSwitcher, dbSwitcher },
      // context: {
      //   slug,
      //   title,
      //   frontmatter: { title: fTitle, metaTitle, metaDescription, langSwitcher, dbSwitcher },
      //   parentPath,
      //   parentSlug,
      //   body,
      // },
      body,
      parent,
    },
    site: {
      siteMetadata: { docsLocation },
    },
  } = data;

  const [seoDetails, setSEODetails] = React.useState({
    seoTitle: metaTitle || title,
    seoUrl: slug,
  });

  const changeSEODetails = (newParams: string) => {
    const lang = new URLSearchParams(newParams).get('lang');
    const db = new URLSearchParams(newParams).get('db');

    console.log(lang, db)
    setSEODetails({
      seoTitle: title + `-${lang}-${db}`,
      seoUrl: slug + newParams,
    });
  };

  return (
    <Layout {...props}>
      <SEO
        title={seoDetails.seoTitle}
        description={metaDescription || title}
        slug={seoDetails.seoUrl}
      />
      <section className="top-section">
        <TopSection
          location={props.location}
          title={title}
          slug={slug}
          langSwitcher={langSwitcher}
          dbSwitcher={dbSwitcher}
          onChangeParam={changeSEODetails}
          // parentSlug={parentSlug}
        />
      </section>
      <MDXRenderer>{body}</MDXRenderer>
      <PageBottom editDocsPath={`${docsLocation}/${parent.relativePath}`} pageUrl={slug} />
    </Layout>
  );
};

export default ArticleLayout;

// export const query = graphql`
//   query($path: String!) {
//     site {
//       siteMetadata {
//         docsLocation
//       }
//     }
//     sitePage(path: { eq: $path }) {
//       context {
//         slug
//         title
//         frontmatter {
//           title
//           metaTitle
//           metaDescription
//           langSwitcher
//           dbSwitcher
//         }
//         parentPath
//         parentSlug
//         body
//       }
//     }
//   }
// `;

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        docsLocation
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      body
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        title
        metaTitle
        metaDescription
        langSwitcher
        dbSwitcher
      }
    }
  }
`;
