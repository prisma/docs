import { Link } from 'gatsby';
import * as React from 'react';
import Layout from '../components/layout';

const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    <Link to="/about">Go to the About page</Link>
  </Layout>
);

export default SecondPage;
