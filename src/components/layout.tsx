import { MDXProvider } from '@mdx-js/react'
import { RouterProps } from 'react-router-dom'
import React, { useState } from 'react'
import StickyBox from 'react-sticky-box'
import styled from 'styled-components'

// import { useLayoutQuery } from '../hooks/useLayoutQuery'
import siteConfig from '../../config'
import { defaultTheme as theme } from '../themes'
import Footer from './footer'
import Header from './header'
import SearchBox from './search/minimalInput'
import shortcodes from './shortcodes'
import SidebarLayout from './sidebar'
import TableOfContents from './toc'
import { WebProvider } from './WebProvider'

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

const Wrapper = styled.div<{ homePage?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: center;
  //${(p) => (p.homePage ? 'padding: 80px 0 0 0' : 'padding: 80px 0')};
  @media (max-width: ${theme.breakpoints.tabletVertical}) {
    padding: 0;
  }
`

const Content = styled.article<{ homePage?: boolean; wide?: boolean }>`
  ${(p) =>
    p.homePage
      ? 'max-width: 100%;'
      : p.wide
        ? 'min-width: 0; max-width: 988px; flex-shrink: 1; padding: 0 1rem;'
        : 'max-width: 748px; margin: 0 20px;'}
  flex: 1;
  position: relative;
  z-index: 100;
  width: 100%;
  @media (min-width: 0px) and (max-width: 1024px) {
    margin: 0;
    max-width: 100%;
  }
  @media (min-width: 1025px) and (max-width: 1240px) {
    margin: 0;
    ${(p) => (p.homePage ? 'max-width: 100%' : 'max-width: 570px')};
  }
  section {
    > h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      &:has(> inlinecode) {
        line-height: 1.5;
      }
    }
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

const Container = styled.div<{ homePage?: boolean; wide?: boolean }>`
  ${(p) => (p.homePage ? 'max-width: 100%;' : p.wide ? 'max-width: 1440px' : 'max-width: 1240px')};
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: flex-start;
  position: relative;

  ${(p) => (p.homePage ? `margin-top: 0` : `margin-top: ${theme.space[40]};`)}
  @media (max-width: 1024px) {
    ${(p) => (p.homePage ? `margin-top: 0` : `margin-top: 118px;`)}
  }
`

const TOCWrapper = styled.div<{ wide?: boolean }>`
  width: 180px;
  height: 85vh;
  flex-shrink: 0;
  overflow-y: auto;
  position: sticky;
  top: 20px;
  ${(p) => p.wide && `margin-right: -100px;`}

  @media (min-width: 0px) and (max-width: 1024px) {
    display: none;
  }
  &.fixed {
    position: sticky;
  }
`

const FooterWrapper = styled.div`
  button {
    z-index: 10;
  }
`

const SearchComponentDesktop = styled.div<{ open?: boolean }>`
  width: calc(100% - ${theme.space[16]});
  padding: 0 0 22px 0;
  @media (min-width: 0px) and (max-width: 1024px) {
    display: none;
  }
`

const CustomSticky = styled(StickyBox)`
  width: 272px;
  margin: 0px -${theme.space[16]} 0 ${theme.space[16]};
  @media (min-width: 0px) and (max-width: 1024px) {
    width: auto;
  }
`

const LayoutWrapper = styled.div<{ mobileNavOpen?: boolean }>`
  ${(p) => p.mobileNavOpen && 'position: fixed;'}
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
  const { header, footer } = siteConfig
  const [mobileNavOpen, setMobileNav] = useState(false)
  const [showDocsBtn, setShowDocsBtn] = React.useState(true)
  const queryString = new URLSearchParams(location?.search).get('query')
  const [value, setValue] = useState(queryString || '')

  const closeSidenavSearch = () => setShowDocsBtn(true)

  const showHeaderSearch = () => setShowDocsBtn(false)

  const setInputText = (input: any) => setValue(input)
  return (
    <WebProvider>
      <script src="https://kit.fontawesome.com/1772ab679c.js" crossOrigin="anonymous"></script>
      <MDXProvider components={shortcodes}>
        <LayoutWrapper className="dark">
          <Header
            headerProps={header}
            wide={wide}
            mobileNavOpen={setMobileNav}
            homePage={homePage}
            sidenavSearchOpened={!showDocsBtn}
            closeSidenavSearch={closeSidenavSearch}
            setInputText={setInputText}
          />
          <Wrapper homePage={homePage}>
            <Container homePage={homePage} wide={wide}>
              {!homePage && (
                <CustomSticky offsetTop={20} offsetBottom={20}>
                  <SearchComponentDesktop open={!showDocsBtn}>
                    <SearchBox showHeaderSearch={showHeaderSearch} value={value} path={location} />
                  </SearchComponentDesktop>
                  <NotMobile id="sidebar-holder">
                    <SidebarLayout isMobile={false} location={location} slug={slug} />
                  </NotMobile>
                </CustomSticky>
              )}
              <Content homePage={homePage} wide={wide}>
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
        </LayoutWrapper>
      </MDXProvider>
      <FooterWrapper>
        <Footer footerProps={footer} />
      </FooterWrapper>
    </WebProvider>
  )
}
