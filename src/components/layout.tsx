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
import theme from 'prisma-lens'
import { stickWhenNeeded } from '../utils/stickWhenNeeded'

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
  homePage
}) => {
  const { site } = useLayoutQuery()
  const { header, footer } = site.siteMetadata

  const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    //padding: 0 ${p => p.theme.space[24]};
    @media (max-width: ${p => p.theme.breakpoints.tablet}) {
      padding: 0;
    }
  `

  const Content = styled.article`
    margin: 0 0 ${p => p.theme.space[16]};
    position: relative;
    z-index: 100;
    // flex: 1;
    //max-width: 748px;
    width: 100%;
    @media (min-width: 0px) and (max-width: 1024px) {
      margin: 0;
      max-width: 100%;
    }

    @media (min-width: 1024px) and (max-width: 1200px) {
      margin: 0;
      max-width: 570px;
    }
  `

  const MaxWidth = styled.div`
    > section {
      padding: 0 ${p => p.theme.space[40]};
      &.top-section {
        padding-top: 0;
      }
      @media (min-width: 0px) and (max-width: 1024px) {
        margin-top: 0.5rem;
      }
      @media (min-width: 0px) and (max-width: 1024px) {
        padding: 0 ${p => p.theme.space[24]};
        &.top-section {
          padding-top: ${p => p.theme.space[24]};
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
    ${(p) => p.fullWidth ? 'max-width: 100%;': 'max-width: 1200px'};
    width: 100%;
    justify-content: center;
    display: flex;
    ${(p) => p.fullWidth ? `margin-top: 0` :`margin-top: ${p.theme.space[40]};`}
    @media (max-width: 1024px) {
      ${(p) => p.fullWidth ? `margin-top: 0` :`margin-top: ${p.theme.space[8]};`}
    }
  `

  const TOCWrapper = styled.div`
    width: 180px;
    height: fit-content;
    @media (min-width: 0px) and (max-width: 1024px) {
      display: none;
    }

    &.fixed {
      position: sticky;
    }
  `

  React.useEffect(() => {
    stickWhenNeeded('#sidebar-holder')
    stickWhenNeeded('#toc-holder')
  })

  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={customMdx}>
        <Header headerProps={header} />
        <Wrapper style={{padding: homePage ? '0' : '0 24px'}}>
          <Container fullWidth={homePage}>
            {!homePage && <NotMobile id="sidebar-holder">
              <SidebarLayout isMobile={false} location={location} slug={slug} />
            </NotMobile>}
            <Content style={{maxWidth: homePage ? '100%' : '748px'}}>
              <MaxWidth>{children}</MaxWidth>
            </Content>
            {!homePage && <TOCWrapper id="toc-holder">
              {toc && toc.items && toc.items.length > 0 && (
                <TOC headings={toc.items} tocDepth={tocDepth} location={location} />
              )}
            </TOCWrapper>}
          </Container>
        </Wrapper>
        <Footer footerProps={footer} />
      </MDXProvider>
    </ThemeProvider>
  )
}

export default Layout
