import * as React from 'react';
import Helmet from 'react-helmet';

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
};

// TODO : Add more meta tags and links if needed.

const SEO = ({ title, description, keywords }: SEOProps) => (
  <Helmet>
    <meta charSet="utf-8" />
    {title && <title>{title}</title>}
    {description && <meta name="title" content={description} />}
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
  </Helmet>
);

export default SEO;
