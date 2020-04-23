import * as React from 'react'
import Helmet from 'react-helmet'
import favicon from '../images/favicon-32x32.png'
import { useStaticQuery, graphql } from 'gatsby'
import { urlGenerator } from '../utils/urlGenerator'

type SEOProps = {
  title?: string
  description?: string
  keywords?: string
  slug?: string
}

const SEO = ({ title, description, keywords, slug }: SEOProps) => {
  const { site } = useStaticQuery(query)
  const {
    siteMetadata: {
      pathPrefix,
      siteUrl,
      twitter: { site: tSite, creator: tCreator, image: tUrl },
      og: {
        site_name: oSite,
        // type: oType,
        // image: { alt: oImgAlt, url: oUrl, type: oImgType, width: oImgWidth, height: oImgHeight },
      },
    },
  } = site

  let canonicalUrl = pathPrefix ? siteUrl + pathPrefix : siteUrl
  canonicalUrl = slug ? canonicalUrl + urlGenerator(slug) : canonicalUrl

  return (
    <Helmet
      title={title}
      meta={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:site',
          content: tSite,
        },
        {
          name: 'twitter:card',
          content: "summary_large_image",
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:creator',
          content: tCreator,
        },
        {
          name: 'twitter:image',
          content: `${siteUrl + pathPrefix}${tUrl}`,
        },
        {
          name: 'og:title',
          content: title,
        },
        {
          name: 'og:url',
          content: canonicalUrl,
        },
        {
          name: 'og:image',
          content: `${siteUrl + pathPrefix}${tUrl}`,
        },
        {
          name: 'og:site_name',
          content: oSite,
        },
        {
          name: 'og:description',
          content: description,
        },
      ]}
      link={[
        {
          href: canonicalUrl,
          rel: 'canonical',
        },
        {
          href: favicon,
          rel: 'icon',
        },
      ]}
    >
    </Helmet>
  )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        pathPrefix
        siteUrl
        twitter {
          site
          creator
          image
        }
        og {
          site_name
          type
          image {
            url
            alt
            type
            height
            width
          }
        }
      }
    }
  }
`
