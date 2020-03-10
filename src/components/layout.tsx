import { RouterProps } from '@reach/router';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useLayoutQuery } from '../hooks/useLayoutQuery';
import Header from './header';
import TOC from './toc';
// import { MDXProvider } from "@mdx-js/react";
// import customMdx from "../components/customMdx";
import './layout.css';
import Sidebar from './sidebar';

interface ThemeProps {
  colorPrimary: string;
}

const theme: ThemeProps = {
  colorPrimary: '#663399',
};

type LayoutProps = React.ReactNode & RouterProps;

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const { site } = useLayoutQuery();
  const { headerTitle, logo } = site.siteMetadata;

  const Wrapper = styled.div`
    display: flex;
    width: 100%;
    @media only screen and (max-width: 767px) {
      display: block;
    }
  `;

  const Content = styled.main`
    flex: 1;
    margin: 3rem 0;
    @media only screen and (max-width: 1023px) {
      padding-left: 0;
    }
  `;

  const MaxWidth = styled.div`
    @media only screen and (max-width: 50rem) {
      width: 100%;
      position: relative;
    }
  `;
  const LeftSideBarWidth = styled.div`
    width: 360px;
    @media only screen and (max-width: 50rem) {
      width: 100%;
      position: relative;
    }
  `;

  const RightSideBarWidth = styled.div`
    width: 360px;
    @media only screen and (max-width: 50rem) {
      width: 100%;
      position: relative;
    }
  `;

  const Footer = styled.div`
    height: 300px;
    background: #082133;
  `;

  // TODO: Add table of contents to right side
  // TODO: Custom MDX Components
  return (
    <ThemeProvider theme={theme}>
      {/* <MDXProvider components={customMdx}> */}
      <Header siteTitle={headerTitle} logo={logo} />
      <Wrapper>
        <LeftSideBarWidth className={'hiddenMobile'}>
          <Sidebar />
        </LeftSideBarWidth>
        <Content>
          <MaxWidth>{children}</MaxWidth>
        </Content>
        <RightSideBarWidth className={'hiddenMobile'}>
          <TOC />
        </RightSideBarWidth>
      </Wrapper>
      {/* <Footer/> */}
      <Footer/>
      {/* </MDXProvider> */}
    </ThemeProvider>
  );
};

export default Layout;
