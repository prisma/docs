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
      body,
      parent,
    },
    site: {
      siteMetadata: { docsLocation },
    },
  } = data;

  return (
    <Layout {...props}>
      <SEO title={metaTitle || title} description={metaDescription || title} slug={slug} />
      <section className="top-section">
        <TopSection
          location={props.location}
          title={title}
          slug={slug}
          langSwitcher={langSwitcher}
          dbSwitcher={dbSwitcher}
        />
      </section>
      <MDXRenderer>{body}</MDXRenderer>
      <PageBottom editDocsPath={`${docsLocation}/${parent.relativePath}`} pageUrl={slug}/>
    </Layout>
  );
};

export default ArticleLayout;

export const query = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
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
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
        }
      }
    }
  }
`;
