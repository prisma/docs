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
    allMdx,
    mdx: {
      fields: { slug },
      frontmatter: { title, metaTitle, metaDescription, langSwitcher, dbSwitcher },
      body,
    },
  } = data;

  // Parent title extraction
  const allContent = allMdx && allMdx.edges && allMdx.edges.map((mdx: any) => mdx.node.fields);

  allContent?.map((content: any) => {
    content.parentTitle = '';
    const parts = content.slug.split('/');
    const slicedParts = parts.slice(1, parts.length - 1);
    slicedParts.forEach((part: any) => {
      const parent = allContent.find(ac => {
        const parentParts = ac.slug.split('/');
        return (
          parentParts[parentParts.length - 1] === 'index' &&
          parentParts[parentParts.length - 2] === part
        );
      });
      content.parentTitle = content.parentTitle + parent?.title + ' / ';
    });
  });

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    require('smooth-scroll')('a[href*="#"]');
  }

  const getParentTitle = () => allContent?.find(mdx => mdx.slug === slug).parentTitle.slice(0, -2);

  return (
    <Layout {...props}>
      <SEO title={metaTitle || title} description={metaDescription || title} />
      <section className="top-section">
        <TopSection
          location={props.location}
          title={title}
          parentTitle={getParentTitle()}
          langSwitcher={langSwitcher}
          dbSwitcher={dbSwitcher}
        />
      </section>
      <MDXRenderer>{body}</MDXRenderer>
      {/* <PageBottom /> */}
    </Layout>
  );
};

export default ArticleLayout;

export const query = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        title
        slug
        id
      }
      body
      tableOfContents
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
