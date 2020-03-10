import { RouterProps } from '@reach/router';
import * as React from 'react';
import { ArticleQueryData } from '../interfaces/Article.interface';
import Layout from '../components/layout';
import NextArticle from '../components/nextPrev';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import Helmet from 'react-helmet';

type ArticleLayoutProps = ArticleQueryData & RouterProps;

const ArticleLayout: React.FunctionComponent<ArticleLayoutProps> = ({
  data,
}) => {
  if (!data) {
    return null;
  }
  const {
    mdx: {
      fields: { slug },
      frontmatter: { title, metaTitle, metaDescription },
      body,
    },
  } = data;
  return (
    <Layout>
      <Helmet>
        {metaTitle ? <title>{metaTitle}</title> : <title>{title}</title>}
        {metaTitle ? <meta name="title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta name="description" content={metaDescription} />
        ) : null}
      </Helmet>
      <h1>{title}</h1>
      <MDXRenderer>{body}</MDXRenderer>
      <NextArticle currentRoute={slug} />
    </Layout>
  );
};

export default ArticleLayout;

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        title
        slug
      }
      body
      frontmatter {
        title
        metaTitle
        metaDescription
      }
    }
  }
`;
