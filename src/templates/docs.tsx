import { RouterProps, navigate } from '@reach/router'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import * as React from 'react'
import Layout from '../components/layout'
import PageBottom from '../components/pageBottom'
import SEO from '../components/seo'
import TopSection from '../components/topSection'
import { ArticleQueryData } from '../interfaces/Article.interface'
import { CreatePageContext } from '../interfaces/Layout.interface'

type ArticleLayoutProps = ArticleQueryData & RouterProps & CreatePageContext

const ArticleLayout = ({ data, ...props }: ArticleLayoutProps) => {
  if (!data) {
    return null
  }
  const {
    mdx: {
      fields: { slug, modSlug },
      frontmatter: { title, langSwitcher, dbSwitcher, toc, tocDepth, codeStyle, wide, hideTitle },
      body,
      parent,
      tableOfContents,
    },
    site: {
      siteMetadata: { docsLocation },
    },
  } = data
  return (
    <Layout
      {...props}
      toc={toc || toc == null ? tableOfContents : []}
      tocDepth={tocDepth}
      wide={wide}
      slug={slug}
    >
      <section className="top-section">
        <TopSection
          location={props.location}
          title={title}
          hideTitle={hideTitle}
          slug={modSlug}
          langSwitcher={langSwitcher}
          dbSwitcher={dbSwitcher}
          navigate={navigate}
          codeStyle={codeStyle}
        />
      </section>
      <MDXRenderer>{body}</MDXRenderer>
      <PageBottom editDocsPath={`${docsLocation}/${parent.relativePath}`} pageUrl={slug} />
    </Layout>
  )
}

export default ArticleLayout

export const Head = ({ pageContext: { seoTitle, seoDescription } }: ArticleLayoutProps) => {
  return <SEO title={seoTitle} homepage={false} description={seoDescription} />
}

export const query = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        slug
        modSlug
      }
      body
      parent {
        ... on File {
          relativePath
        }
      }
      tableOfContents
      frontmatter {
        title
        metaTitle
        metaDescription
        langSwitcher
        search
        wide
        dbSwitcher
        toc
        tocDepth
        codeStyle
      }
    }
  }
`
