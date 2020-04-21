import { RouterProps } from '@reach/router'
import * as React from 'react'
import { ArticleQueryData } from '../interfaces/Article.interface'
import Layout from '../components/layout'
import TopSection from '../components/topSection'
import PageBottom from '../components/pageBottom'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

type ArticleLayoutProps = ArticleQueryData & RouterProps

const ArticleLayout = ({ data, ...props }: ArticleLayoutProps) => {
  if (!data) {
    return null
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
  } = data

  const [seoTitle, setSEOTitle] = React.useState(title || metaTitle)
  const [seoUrl, setSEOUrl] = React.useState(slug)

  const changeSEODetails = (newParams: string) => {
    const lang = new URLSearchParams(newParams).get('lang')
    const db = new URLSearchParams(newParams).get('db')

    const newUrl = slug + newParams
    const newTitleString = `${lang ? `-${lang}${db ? '-' : ''}` : ''}${db ? db : ''}`
    if (!(seoTitle && seoTitle.includes(newTitleString))) {
      setSEOTitle(title + newTitleString)
    }
    if (!seoUrl.includes(newParams)) {
      setSEOUrl(newUrl)
    }
  }

  // To show the SEO details during initial load
  React.useEffect(() => {
    const params = `?${langSwitcher ? `lang=${langSwitcher[0]}${dbSwitcher ? '&' : ''}` : ''}${
      dbSwitcher ? `db=${dbSwitcher[0]}` : ''
    }`
    changeSEODetails(params)
  }, [])

  return (
    <Layout {...props}>
      <SEO title={seoTitle} description={metaDescription || title} slug={seoUrl} />
      <section className="top-section">
        <TopSection
          location={props.location}
          title={title}
          slug={slug}
          langSwitcher={langSwitcher}
          dbSwitcher={dbSwitcher}
          onChangeParam={changeSEODetails}
        />
      </section>
      <MDXRenderer>{body}</MDXRenderer>
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
`
