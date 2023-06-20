import { RouterProps } from '@reach/router'
import * as React from 'react'
import { ArticleQueryData } from '../interfaces/Article.interface'
import Layout from '../components/layout'
import TopSection from '../components/topSection'
import PageBottom from '../components/pageBottom'
import SEO from '../components/seo'
import { graphql, useStaticQuery } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { navigate } from '@reach/router'
import { CreatePageContext } from '../interfaces/Layout.interface'

type ArticleLayoutProps = ArticleQueryData & RouterProps & CreatePageContext

const ArticleLayout = ({ data, ...props }: ArticleLayoutProps) => {
  if (!data) {
    return null
  }
  const {
    mdx: {
      fields: { slug, modSlug },
      frontmatter: { title, langSwitcher, dbSwitcher, toc, tocDepth, codeStyle, wide },
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
  return <SEO title={seoTitle} description={seoDescription} homepage />
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
