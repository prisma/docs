import * as React from 'react';
import Helmet from 'react-helmet';
import favicon from '../images/favicon-32x32.png'

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
};

// TODO : Add more meta tags and links if needed.
const SEO = ({ title, description, keywords }: SEOProps) => (
  <Helmet>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
    {title && <title>{title}</title>}
    {description && <meta name="title" content={description} />}
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
    <link rel="icon" href={favicon} />
  </Helmet>
);

export default SEO;
