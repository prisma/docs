import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import config from '../../config';

const Container = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 3rem;
  font-weight: 500;
  color: #2f3747;
  font-weight: bold;
  display: flex;
  padding: 40px;
  justify-content: center;
`;

export default function DocHome() {
  return (
    <Container>
      <Helmet
        title={config.siteMetadata.title}
        meta={[
          { name: 'description', content: config.siteMetadata.description },
          {
            name: 'keywords',
            content: config.siteMetadata.keywords || undefined,
          },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <Link to="/01/">Prisma 2.0 Docs</Link>
    </Container>
  );
}
