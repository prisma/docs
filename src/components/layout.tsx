import { RouterProps } from '@reach/router'
import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useLayoutQuery } from '../hooks/useLayoutQuery'
import Header from './header'
import Footer from './footer'
import { MDXProvider } from '@mdx-js/react'
import customMdx from '../components/customMdx'
import './layout.css'
import SidebarLayout from './sidebar'
import TOC from './toc'
// import { LensProvider, theme } from '@prisma/lens/dist/web'
import { theme } from '@prisma/lens/dist/web'
import { LensProvider } from '@prisma/lens'
import StickyBox from 'react-sticky-box'

const Wrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: center;
  ${(p) => (p.fullWidth ? 'padding: 0' : 'padding: 0 24px')};
  @media (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    padding: 0;
  }
`

const Content = styled.article<{ fullWidth?: boolean }>`
  margin: 0 0 ${(p) => p.theme.space[16]};
  ${(p) => (p.fullWidth ? 'max-width: 100%' : 'max-width: 748px')};
  position: relative;
  z-index: 100;
  width: 100%;
  @media (min-width: 0px) and (max-width: 1024px) {
    margin: 0;
    max-width: 100%;
  }
  @media (min-width: 1024px) and (max-width: 1200px) {
    margin: 0;
    ${(p) => (p.fullWidth ? 'max-width: 100%' : 'max-width: 570px')};
  }
`

const MaxWidth = styled.div`
  > section {
    padding: 0 ${(p) => p.theme.space[40]};
    &.top-section {
      padding-top: 0;
    }
    @media (min-width: 0px) and (max-width: 1024px) {
      margin-top: ${(p) => p.theme.space[8]};
    }
    @media (min-width: 0px) and (max-width: 1024px) {
      padding: 0 ${(p) => p.theme.space[24]};
      &.top-section {
        padding-top: ${(p) => p.theme.space[24]};
      }
    }
  }
`

const NotMobile = styled.section`
  display: flex;
  height: fit-content;
  @media (min-width: 0px) and (max-width: 1024px) {
    display: none;
  }
  &.fixed {
    position: sticky;
  }
`

const Container = styled.div<{ fullWidth?: boolean }>`
  ${(p) => (p.fullWidth ? 'max-width: 100%;' : 'max-width: 1200px')};
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: flex-start;
  ${(p) => (p.fullWidth ? `margin-top: 0` : `margin-top: ${p.theme.space[40]};`)}
  @media (max-width: 1024px) {
    ${(p) => (p.fullWidth ? `margin-top: 0` : `margin-top: ${p.theme.space[8]};`)}
  }
`

const TOCWrapper = styled.div`
  width: 180px;
  height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: 0;

  @media (min-width: 0px) and (max-width: 1024px) {
    display: none;
  }
  &.fixed {
    position: sticky;
  }
`

interface LayoutContentProps {
  toc: any
  tocDepth?: number
  slug?: string
  homePage?: boolean
}

type LayoutProps = React.ReactNode & RouterProps & LayoutContentProps

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  toc,
  tocDepth,
  location,
  slug,
  homePage,
}) => {
  const { site } = useLayoutQuery()
  const { header, footer } = site.siteMetadata

  return (
    <ThemeProvider theme={theme}>
      <LensProvider>
        <MDXProvider components={customMdx}>
          <Header headerProps={header} />
          <Wrapper fullWidth={homePage}>
            <Container fullWidth={homePage}>
              {!homePage && (
                <StickyBox offsetTop={20} offsetBottom={20}>
                  <NotMobile id="sidebar-holder">
                    <SidebarLayout isMobile={false} location={location} slug={slug} />
                  </NotMobile>
                </StickyBox>
              )}
              <Content fullWidth={homePage}>
                <MaxWidth>{children}</MaxWidth>
              </Content>
              {!homePage && (
                //  <StickyBox offsetTop={20} offsetBottom={20}>
                // <Sticky enabled={true} top={50} bottomBoundary={1200}>
                <TOCWrapper id="toc-holder">
                  {toc && toc.items && toc.items.length > 0 && (
                    <TOC headings={toc.items} tocDepth={tocDepth} location={location} />
                  )}
                </TOCWrapper>
                // </Sticky>
                // </StickyBox>
              )}
            </Container>
          </Wrapper>
          <Footer footerProps={footer} />
        </MDXProvider>
      </LensProvider>
    </ThemeProvider>
  )
}

export default Layout
