import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import config from '../../config';
import Layout from '../components/layout';
import TopSection from '../components/topSection';
import SEO from '../components/seo';

// const Container = styled.span`
//   font-family: 'Rubik', sans-serif;
//   font-size: 3rem;
//   font-weight: 500;
//   color: #2f3747;
//   font-weight: bold;
//   display: flex;
//   padding: 40px;
//   justify-content: center;
// `;

const BlockContent = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.05),
    0px 1px 3px rgba(47, 55, 71, 0.1);
  border-radius: 5px;
  margin-top: 1rem;
  padding: 40px;
`;

export default function DocHome({ ...props }: any) {
  return (
    <Layout>
      <SEO
        title={config.siteMetadata.title}
        description={config.siteMetadata.description}
        keywords={config.siteMetadata.keywords || undefined}
      />
      <BlockContent>
        <TopSection
          location={props.location}
          title={'Prisma Docs'}
          indexPage={true}
        />
      </BlockContent>
    </Layout>
  );
}
