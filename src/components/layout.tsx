import { RouterProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components'
import { useLayoutQuery } from '../hooks/useLayoutQuery'
import Header from './header'
import Footer from './footer'
import { MDXProvider } from '@mdx-js/react'
import customMdx from '../components/customMdx'
import './layout.css'
import Sidebar from './sidebar'
import TOC from './toc'

interface LayoutContentProps {
  toc: any
  tocDepth?: number
}

type LayoutProps = React.ReactNode & RouterProps & LayoutContentProps

const Layout: React.FunctionComponent<LayoutProps> = ({ children, toc, tocDepth }) => {
  const { site } = useLayoutQuery()
  const { header, footer } = site.siteMetadata

  const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0 24px;
  `

  const Content = styled.article`
    margin: 0 0 1rem;
    position: relative;
    z-index: 100;
    flex: 1;
    @media (min-width: 0px) and (max-width: 1024px) {
      margin: 0;
      width: 100%;
      max-width: 100%;
    }
  `

  const MaxWidth = styled.div`
    > section {
      padding: 1rem 40px;
      &.top-section {
        padding-top: 0;
      }
      @media (min-width: 0px) and (max-width: 1024px) {
        margin-top: 0.5rem;
      }
      @media (min-width: 0px) and (max-width: 767px) {
        padding: 24px;
        &.top-section {
          padding-top: 24px;
        }
      }
    }
  `

  const NotMobile = styled.section`
    display: flex;
    @media (min-width: 0px) and (max-width: 768px) {
      display: none;
    }
  `

  const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    justify-content: center;
    display: flex;
    margin-top: 40px;
  `

  const TOCWrapper = styled.div`
    width: 180px;
    @media (min-width: 0px) and (max-width: 1024px) {
      display: none;
    }
  `

  return (
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
              <TOC headings={toc.items} tocDepth={tocDepth} />
            )}
          </TOCWrapper>
        </Container>
      </Wrapper>
      <Footer footerProps={footer} />
    </MDXProvider>
  )
}

export default Layout
