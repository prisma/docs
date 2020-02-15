import { RouterProps } from '@reach/router';
import * as React from 'react';
import Layout from '../components/layout';
import Listing from '../components/listing';

const IndexPage: React.FunctionComponent<RouterProps> = ({ location }) => (
  <Layout location={location}>
    <Listing />
  </Layout>
);

export default IndexPage;
