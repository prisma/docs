import { MDXProvider } from '@mdx-js/react'
import { LensProvider, defaultTheme as theme } from '@prisma/lens/dist/web'
import { RouterProps } from '@reach/router'
import React, { useState } from 'react'
import StickyBox from 'react-sticky-box'
import styled from 'styled-components'

import { useLayoutQuery } from '../hooks/useLayoutQuery'
import Footer from './footer'
import Header from './header'
import shortcodes from './shortcodes'
import SidebarLayout from './sidebar'
import TableOfContents from './toc'

import '../styles/layout.css'

interface LayoutContentProps {
  toc: any
  tocDepth?: number
  slug?: string
  homePage?: boolean
  children: React.ReactNode
  wide?: boolean
}

type LayoutProps = RouterProps & LayoutContentProps

const Wrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: center;
  ${(p) => (p.fullWidth ? 'padding: 0' : 'padding: 0 24px')};
  @media (max-width: ${theme.breakpoints.tabletVertical}) {
    padding: 0;
  }
`

const Content = styled.article<{ fullWidth?: boolean; wide?: boolean }>`
  ${(p) =>
    p.fullWidth
      ? 'max-width: 100%;'
      : p.wide
      ? 'min-width: 0; max-width: 988px; flex-shrink: 1;'
      : 'max-width: 748px;'}
  flex: 1;
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

const MaxWidth = styled.div<{ wide?: boolean }>`
  > section {
    padding: 0 ${(p) => `${theme.space[40]}${p.wide ? ` 0 0` : ``}`};
    &.top-section {
      padding-top: 0;
    }
    @media (min-width: 0px) and (max-width: 1024px) {
      margin-top: ${theme.space[8]};
    }
    @media (min-width: 0px) and (max-width: 1024px) {
      padding: 0 ${theme.space[24]};
      &.top-section {
        padding-top: ${theme.space[24]};
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

const Container = styled.div<{ fullWidth?: boolean; wide?: boolean }>`
  ${(p) => (p.fullWidth ? 'max-width: 100%;' : p.wide ? 'max-width: 1440px' : 'max-width: 1200px')};
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: flex-start;
  ${(p) => (p.fullWidth ? `margin-top: 0` : `margin-top: ${theme.space[40]};`)}
  @media (max-width: 1024px) {
    ${(p) => (p.fullWidth ? `margin-top: 0` : `margin-top: ${theme.space[8]};`)}
  }
`

const TOCWrapper = styled.div<{ wide?: boolean }>`
  width: 180px;
  height: 100vh;
  flex-shrink: 0;
  overflow-y: auto;
  position: sticky;
  top: 0;
  ${(p) => p.wide && `margin-right: -100px;`}

  @media (min-width: 0px) and (max-width: 1024px) {
    display: none;
  }
  &.fixed {
    position: sticky;
  }
`

const BannerWrapper = styled.div<{ light: boolean }>`
  a {
    color: ${(props) => (props.light ? theme.colors.gray['800'] : theme.colors.gray['300'])};
  }
  b {
    ${(props) => !props.light && `color: ${theme.colors.teal['400']};`}
  }
  width: 100%;
  transition: margin-top 50ms ease-in;
  top: 0;
  z-index: -1;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
  font-size: 18px;
`

const FooterWrapper = styled.div`
  button {
    z-index: 10;
  }
`

export default function Layout({
  children,
  toc,
  tocDepth,
  location,
  slug,
  homePage,
  wide,
}: LayoutProps) {
  const { site } = useLayoutQuery()
  const { header, footer } = site.siteMetadata
  const [mobileNavOpen, setMobileNav] = useState(false)

  return (
    <LensProvider>
      <MDXProvider components={shortcodes}>
        <div style={mobileNavOpen ? { position: 'fixed' } : {}}>
          <Header headerProps={header} wide={wide} mobileNavOpen={setMobileNav} />
          <Wrapper
            fullWidth={homePage}
            style={homePage ? { paddingTop: '80px' } : { padding: '80px 0' }}
          >
            <Container fullWidth={homePage} wide={wide}>
              {!homePage && (
                <StickyBox offsetTop={120} offsetBottom={20}>
                  <NotMobile id="sidebar-holder">
                    <SidebarLayout isMobile={false} location={location} slug={slug} />
                  </NotMobile>
                </StickyBox>
              )}
              <Content fullWidth={homePage} wide={wide}>
                <MaxWidth wide={wide}>{children}</MaxWidth>
              </Content>
              {!homePage && (
                <TOCWrapper id="toc-holder">
                  {toc && toc.items && toc.items.length > 0 && (
                    <TableOfContents headings={toc.items} tocDepth={tocDepth} />
                  )}
                </TOCWrapper>
              )}
            </Container>
          </Wrapper>
          <FooterWrapper>
            <Footer footerProps={footer} />
          </FooterWrapper>
        </div>
      </MDXProvider>
    </LensProvider>
  )
}
