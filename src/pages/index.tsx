import React from 'react';
import config from '../../config';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function DocHome() {
  return (
    <Layout>
      <SEO
        title={config.siteMetadata.title}
        description={config.siteMetadata.description}
        keywords={config.siteMetadata.keywords || undefined}
      />
    </Layout>
  );
}
