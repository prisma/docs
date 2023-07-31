import { MDXProvider } from '@mdx-js/react'
import { LensProvider, defaultTheme as theme } from '@prisma/lens/dist/web'
import { RouterProps } from '@reach/router'
import React, { useState } from 'react'
import StickyBox from 'react-sticky-box'
import styled from 'styled-components'

import { useLayoutQuery } from '../hooks/useLayoutQuery'
import Footer from './footer'
import Header from './header'
import Search from './search'
import shortcodes from './shortcodes'
import SidebarLayout from './sidebar'
import TableOfContents from './toc'

import '../styles/layout.css'
import SearchBox from './search/minimalInput'

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
  ${(p) => (p.homePage ? 'padding: 80px 0 0 0' : 'padding: 80px 0')};
  @media (max-width: ${theme.breakpoints.tabletVertical}) {
    padding: 0;
  }
`

const Content = styled.article<{ homePage?: boolean; wide?: boolean }>`
  ${(p) =>
    p.homePage
      ? 'max-width: 100%;'
      : p.wide
      ? 'min-width: 0; max-width: 988px; flex-shrink: 1;'
      : 'max-width: 748px; margin: 0 20px;'}
  flex: 1;
  position: relative;
  z-index: 100;
  width: 100%;
  @media (min-width: 0px) and (max-width: 1024px) {
    margin: 0;
    max-width: 100%;
  }
  @media (min-width: 1024px) and (max-width: 1240px) {
    margin: 0;
    ${(p) => (p.homePage ? 'max-width: 100%' : 'max-width: 570px')};
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
    ${(p) => (p.homePage ? `margin-top: 0` : `margin-top: ${theme.space[80]};`)}
  }
`

const TOCWrapper = styled.div<{ wide?: boolean }>`
  width: 180px;
  height: 100vh;
  flex-shrink: 0;
  overflow-y: auto;
  position: sticky;
  top: 96px;
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
  display: ${(p) => (p.open ? 'none' : 'block')};
  ${(p) =>
    p.open &&
    `
    position: absolute;
    width: max-available;
  `}
  padding: 0 0 22px 0;
  @media (min-width: 0px) and (max-width: 1024px) {
    display: none;
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
  const { site } = useLayoutQuery()
  const { header, footer } = site.siteMetadata
  const [mobileNavOpen, setMobileNav] = useState(false)
  const [showDocsBtn, setShowDocsBtn] = React.useState(true)
  const changeHitsStatus = (status: boolean) => {
    console.log(status)
    setShowDocsBtn(!status)
  }

  const [value, setValue] = useState('')

  const closeSidenavSearch = () => setShowDocsBtn(true)

  const showHeaderSearch = () => setShowDocsBtn(false)

  const setInputText = (input: any) => setValue(input)
  return (
    <LensProvider>
      <MDXProvider components={shortcodes}>
        <LayoutWrapper>
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
              {!homePage && location && (
                <StickyBox offsetTop={120} offsetBottom={20}>
                  <SearchComponentDesktop open={!showDocsBtn}>
                    {/* <Search
                      hitsStatus={changeHitsStatus}
                      location={location}
                      closeSidenavSearch={closeSidenavSearch}
                    /> */}
                    <SearchBox showHeaderSearch={showHeaderSearch} value={value} />
                  </SearchComponentDesktop>
                  <NotMobile id="sidebar-holder">
                    <SidebarLayout isMobile={false} location={location} slug={slug} />
                  </NotMobile>
                </StickyBox>
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
    </LensProvider>
  )
}
