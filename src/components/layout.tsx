import { RouterProps } from '@reach/router'
import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useLayoutQuery } from '../hooks/useLayoutQuery'
import Header from './header'
import Footer from './footer'
import { MDXProvider } from '@mdx-js/react'
import customMdx from '../components/customMdx'
import './layout.css'
import Sidebar from './sidebar'
import TOC from './toc'
import theme from 'prisma-lens'

interface LayoutContentProps {
  toc: any
  tocDepth?: number
}

type LayoutProps = React.ReactNode & RouterProps & LayoutContentProps

const Layout: React.FunctionComponent<LayoutProps> = ({ children, toc, tocDepth, location }) => {
  const { site } = useLayoutQuery()
  const { header, footer } = site.siteMetadata

  const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0 ${p => p.theme.space[24]};
  `

  const Content = styled.article`
    margin: 0 0 ${p => p.theme.space[16]};
    position: relative;
    z-index: 100;
    // flex: 1;
    max-width: 748px;
    @media (min-width: 0px) and (max-width: 1024px) {
      margin: 0;
      width: 100%;
      max-width: 100%;
    }

    @media (min-width: 1024px) and (max-width: 1200px) {
      margin: 0;
      width: 100%;
      max-width: 570px;
    }
  `

  const MaxWidth = styled.div`
    > section {
      padding: 1rem ${p => p.theme.space[40]};
      &.top-section {
        padding-top: 0;
      }
      @media (min-width: 0px) and (max-width: 1024px) {
        margin-top: 0.5rem;
      }
      @media (min-width: 0px) and (max-width: 1024px) {
        padding: ${p => p.theme.space[24]};
        &.top-section {
          padding-top: ${p => p.theme.space[24]};
        }
      }
    }
  `

  const NotMobile = styled.section`
    display: flex;
    @media (min-width: 0px) and (max-width: 1024px) {
      display: none;
    }
  `

  const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    justify-content: center;
    display: flex;
    margin-top: ${p => p.theme.space[40]};
  `

  const TOCWrapper = styled.div`
    width: 180px;
    @media (min-width: 0px) and (max-width: 1024px) {
      display: none;
    }
  `

  return (
    <ThemeProvider theme={theme}>
    <MDXProvider components={customMdx}>
      <Header headerProps={header} />
      <Wrapper>
        <Container>
          <NotMobile>
            <Sidebar isMobile={false} />
          </NotMobile>
          <Content>
            <MaxWidth>{children}</MaxWidth>
          </Content>
          <TOCWrapper>
            {toc && toc.items && toc.items.length > 0 && (
              <TOC headings={toc.items} tocDepth={tocDepth} location={location} />
            )}
          </TOCWrapper>
        </Container>
      </Wrapper>
      <Footer footerProps={footer} />
    </MDXProvider>
    </ThemeProvider>
  )
}

export default Layout
