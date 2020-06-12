import { RouterProps } from '@reach/router'
import * as React from 'react'
import { ArticleQueryData } from '../interfaces/Article.interface'
import Layout from '../components/layout'
import TopSection from '../components/topSection'
import PageBottom from '../components/pageBottom'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { useNavigate } from '@reach/router'
import { MDXProvider } from "@mdx-js/react"

type ArticleLayoutProps = ArticleQueryData & RouterProps

const ArticleLayout = ({ data, ...props }: ArticleLayoutProps) => {
  if (!data) {
    return null
  }
  const {
    mdx: {
      fields: { slug, modSlug },
      frontmatter: { title, metaTitle, metaDescription, langSwitcher, dbSwitcher, toc },
      body,
      parent,
      tableOfContents,
    },
    site: {
      siteMetadata: { docsLocation },
    },
  } = data

  const navigate = useNavigate()

  return (
    <Layout {...props}>
      <SEO title={metaTitle || title} description={metaDescription || title} />
      <section className="top-section">
        <TopSection
          location={props.location}
          title={title}
          slug={modSlug}
          langSwitcher={langSwitcher}
          dbSwitcher={dbSwitcher}
          navigate={navigate}
          toc={toc || toc == null ? tableOfContents : []}
        />
      </section>
      <MDXProvider components={{ a: (props) => <a {...props} href={(/%5C/i.test(props.href))?props.href.replace(/%5C/g,'/').slice(3):props.href} /> 
    }}>
      <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
      <PageBottom editDocsPath={`${docsLocation}/${parent.relativePath}`} pageUrl={slug} />
    </Layout>
  )
}

export default ArticleLayout

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
        dbSwitcher
        toc
      }
    }
  }
`
