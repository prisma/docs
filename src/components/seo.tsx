import * as React from 'react';
import Helmet from 'react-helmet';
import favicon from '../images/favicon-32x32.png';
import config from '../../config';
import { urlGenerator } from '../utils/urlGenerator';

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  slug?: string;
};

// TODO : Add more meta tags and links if needed.
const SEO = ({ title, description, keywords, slug }: SEOProps) => {
  let canonicalUrl = config.gatsby.siteUrl;
  canonicalUrl = config.gatsby.pathPrefix ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
  canonicalUrl = slug ? canonicalUrl + urlGenerator(slug) : canonicalUrl;
  const siteUrl = config.gatsby.siteUrl + config.gatsby.pathPrefix;
  return (
    <Helmet>
      {/* <meta charSet="utf-8" /> */}
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      {title && <title>{title}</title>}
      {description && <meta name="title" content={description} />}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={config.siteMetadata.twitter.site} />
      <meta name="twitter:title" content={config.siteMetadata.title} />
      <meta name="twitter:description" content={config.siteMetadata.description} />
      <meta name="twitter:creator" content={config.siteMetadata.twitter.creator} />
      <meta name="twitter:image" content={`${siteUrl}${config.siteMetadata.twitter.image.url}`} />
      <meta name="twitter:image:alt" content={config.siteMetadata.image.alt} />
      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={config.siteMetadata.og.type} />
      <meta property="og:title" content={config.siteMetadata.title} />
      <meta property="og:description" content={config.siteMetadata.description} />
      <meta property="og:site_name" content={config.siteMetadata.og.site_name} />
      <meta property="og:image" content={`${siteUrl}${config.siteMetadata.og.image.url}`} />
      <meta property="og:image:alt" content={config.siteMetadata.og.image.alt} />
      <meta property="og:image:type" content={config.siteMetadata.og.image.type} />
      <meta property="og:image:width" content={config.siteMetadata.og.image.width} />
      <meta property="og:image:height" content={config.siteMetadata.og.image.height} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href={favicon} />
    </Helmet>
  );
};

export default SEO;
