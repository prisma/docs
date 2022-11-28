import * as React from 'react'
import { Helmet } from 'react-helmet'
import favicon from '../images/favicon-32x32.png'
import { useStaticQuery, graphql } from 'gatsby'
import { useLocation } from '@reach/router'

type SEOProps = {
  title?: string
  description?: string
  homepage?: boolean
}

const SEO = ({ title, description, homepage }: SEOProps) => {
  const location = useLocation()
  const { site } = useStaticQuery(query)
  const {
    siteMetadata: {
      pathPrefix,
      titlePrefix,
      titleSuffix,
      siteUrl,
      keywords,
      twitter: { site: tSite, creator: tCreator, image: tUrl },
      og: {
        site_name: oSite,
        type: oType,
        image: { alt: oImgAlt, url: oUrl, type: oImgType, width: oImgWidth, height: oImgHeight },
      },
    },
  } = site

  let canonicalUrl = `${siteUrl}${location.pathname}`

  return (
    <Helmet htmlAttributes={{ lang: 'en' }}>
      {/* <meta charSet="utf-8" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>
        {homepage ? '' : titlePrefix}
        {title}
        {homepage ? '' : titleSuffix}
      </title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={tSite} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={tCreator} />
      <meta name="twitter:image" content={`${siteUrl + pathPrefix}${tUrl}`} />
      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={oSite} />
      <meta property="og:type" content={oType} />
      <meta property="og:image" content={`${siteUrl + pathPrefix}${oUrl}`} />
      <meta property="og:image:alt" content={oImgAlt} />
      <meta property="og:image:type" content={oImgType} />
      <meta property="og:image:width" content={oImgWidth} />
      <meta property="og:image:height" content={oImgHeight} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href={favicon} />
    </Helmet>
  )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        pathPrefix
        titlePrefix
        titleSuffix
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
