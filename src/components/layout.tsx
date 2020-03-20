import { RouterProps } from "@reach/router";
import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useLayoutQuery } from "../hooks/useLayoutQuery";
import Header from "./header";
import Footer from "./footer";

import { MDXProvider } from "@mdx-js/react";
import customMdx from "../components/customMdx";
import "./layout.css";
import Sidebar from "./sidebar";

interface ThemeProps {
  colorPrimary: string;
}

const theme: ThemeProps = {
  colorPrimary: "#663399",
};

type LayoutProps = React.ReactNode & RouterProps;

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const { site } = useLayoutQuery();
  const { header, footer } = site.siteMetadata;

  const Wrapper = styled.div`
    display: flex;
    width: 100%;
    // padding: 0 12rem;
    padding: 0 10%;
    @media only screen and (max-width: 767px) {
      display: block;
    }
  `;

  const Content = styled.article`
    width: 0;
    flex: 1;
    margin: -80px 0 1rem 24px;
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
  // const LeftSideBarWidth = styled.div`
  //   max-width: 215px;
  //   width: 20%;
  //   @media only screen and (max-width: 50rem) {
  //     width: 100%;
  //     position: relative;
  //   }
  // `;

  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={customMdx}>
        <Header headerProps={header} />
        <Wrapper>
          {/* <LeftSideBarWidth> */}
            <Sidebar />
          {/* </LeftSideBarWidth> */}
          <Content>
            <MaxWidth>{children}</MaxWidth>
          </Content>
        </Wrapper>
        <Footer footerProps={footer} />
      </MDXProvider>
    </ThemeProvider>
  );
};

export default Layout;
