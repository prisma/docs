import * as React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
  font-family: 'Open Sans';
  margin-top: 200px;
  padding: 40px;
`;

const NotFoundPage = () => (
  <Layout>
    <NotFoundWrapper>
      <h1>NOT FOUND :(</h1>
      <i>You just hit a route that doesn&#39;t exist... the sadness.</i>
    </NotFoundWrapper>
  </Layout>
);

export default NotFoundPage;
