import Link from '../components/link'
import * as React from 'react'
import styled, { css } from 'styled-components'
import styledTS from 'styled-components-ts'
import HeaderLogo from '../icons/Logo'
import Github from '../icons/Git'
import Clear from '../icons/Clear'
import Search from '../components/search'
import Sidebar from '../components/sidebar'
import { HeaderProps } from '../interfaces/Layout.interface'
import DownChevron from '../icons/DownChevron'
import UpChevron from '../icons/UpChevron'
import RightChevron from '../icons/RightChevron'
import useWindowDimensions from '../hooks/useWindowDimensions'

const secondLevelHeaderMenuItems = [
  { text: 'Learn Prisma', expandContent: 'mainDocs', to: '/', matchPath: '/', type: 'section' },
  {
    text: 'API Reference',
    // expandContent: 'apiDocs',
    to: '/reference/tools-and-interfaces/prisma-schema/prisma-schema-reference',
    // matchPath: '/reference/tools-and-interfaces/prisma-schema/prisma-schema-reference',
    type: 'link',
  },
  { text: 'FAQ', to: '/more/faq', type: 'link' },

  { text: 'Prisma 1', to: 'https://www.prisma.io/docs/1.34', type: 'link' },
]

type HeaderViewProps = {
  headerProps: HeaderProps
}

const HeaderWrapper = styled.div`
  background: radial-gradient(
      37.86% 77.79% at 50% 100%,
      rgba(113, 128, 150, 0.25) 0%,
      rgba(113, 128, 150, 0) 100%
    ),
    linear-gradient(180deg, var(--main-font-color) 0%, var(--tag-media-color) 100%),
    linear-gradient(180deg, var(--gradient2-color) 0%, rgba(27, 32, 43, 0) 100%),
    var(--gradient1-color);
  img {
    margin-bottom: 0;
  }
  padding: 24px 16px;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  @media (min-width: 0px) and (max-width: 1024px) {
    justify-content: space-between;
  }
`

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 0px) and (max-width: 1024px) {
    padding: 0 16px;
  }
`

const LogoContainer = styled.div`
  padding-right: 0.75rem;
`

const SearchComponent = styled(Search)`
  position: absolute;
  top: 12px;
  left: 12px;
`

const NavLinks = styled.div`
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  align-items: center;
  a {
    font-weight: 600;
    &:hover,
    &:active,
    &:focus {
      color: var(--white-color) !important;
    }
  }

  margin: 0 1rem 0;
  @media (min-width: 0px) and (max-width: 1024px) {
    margin: 0 3rem 0;
  }

  @media (min-width: 0px) and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    margin: 0;
    a {
      margin-bottom: 20px;
    }
  }
`

const DocsMobileButton = styled.div`
  background: #ffffff;
  border-radius: 6px;
  color: #4a5568;
  display: none;
  padding: 0 14px;
  height: 40px;
  margin-left: 8px;
  font-weight: 600;
  position: relative;
  z-index: 300;
  justify-content: space-between;
  svg {
    margin-left: 8px;
  }
  @media (min-width: 0px) and (max-width: 768px) {
    display: flex;
    align-items: center;

    
  }
`

const MobileOnlyNav = styled.div`
  display: none;
  position: relative;
  z-index: 210;
  top: 70px;
  transition: top 0.35s;
  padding: 1rem;
  border-radius: 6px;
  text-align: left;
  background: #2f3747;
  right: 0;
  padding: 2rem 1rem;
  @media (min-width: 0px) and (max-width: 768px) {
    display: block;
  }
`

const SecondLevelMobileOnlyNav = styled(MobileOnlyNav)`
  background: #edf2f7;
  box-shadow: 0px 1px 0px #e2e8f0;
  top: 0;
  padding: 0;
  z-index: 200;
`

const MobileOnlyMenu = styled(MobileOnlyNav)`
  text-align: right;
  position: absolute;
`

const SecondLevelHeader = styledTS<{ isSticky: boolean }>(styled.div)`
  background: #EDF2F7;
  padding: 20px 16px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 105;
  ${({ isSticky }: any) =>
    isSticky &&
    css`
      z-index: 120;
      padding: 8px;
      margin-top: 0;
      margin-left: -8px;
      width: 100% !important;
      background: radial-gradient(
          37.86% 77.79% at 50% 100%,
          rgba(113, 128, 150, 0.25) 0%,
          rgba(113, 128, 150, 0) 100%
        ),
        linear-gradient(180deg, var(--main-font-color) 0%, var(--tag-media-color) 100%),
        linear-gradient(180deg, var(--gradient2-color) 0%, rgba(27, 32, 43, 0) 100%),
        var(--gradient1-color);
    `};
  @media (min-width: 0px) and (max-width: 768px) {
    padding: 12px 16px;
  }
`

const MenuMobileBtn = styled.a`
  display: none;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: var(--list-bullet-color) !important;
  text-transform: uppercase;
  @media (min-width: 0px) and (max-width: 768px) {
    display: block;
  }
`

const NonMobileMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  @media (min-width: 0px) and (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  transition: color 0.1s ease-in;
  padding: 0 0.75rem;
  margin: 0 0.5rem;
  color: var(--code-linenum-color) !important;
  @media (min-width: 0px) and (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`
const DarkNavLink = styled(NavLink)`
  color: #4a5568 !important;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  .menu-item {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e2e8f0;
    color: #718096;
    font-weight: 600;
    &:hover {
      color: var(--main-font-color);
    }
  }

  &:hover {
    color: var(--main-font-color) !important;
  }
  &.active-item {
    background: #ffffff;
    border-radius: 6px;
    color: #a0aec0 !important;
    padding: 4px 6px;
  }

  svg {
    display: none;
  }

  @media (min-width: 0px) and (max-width: 768px) {
    &.active-item {
      background: transparent;
      color: #4a5568 !important;
      padding: 24px;
    }
    svg {
      display: block;
    }
  }
`

const SecondLevelMobileNavLink = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-weight: 600;
  &:hover {
    color: var(--main-font-color);
  }
`

const NavButton = styled(NavLink)`
  background: #48bb78;
  border-radius: 6px;
  padding: 5px;
  color: white !important;

  &:hover {
    background: #38a169;
  }

  @media (min-width: 0px) and (max-width: 768px) {
    color: var(--code-linenum-color) !important;
    background: transparent;
    padding: 0;
    margin: 0;
  }
`

const SecondLevelNav = styled.div`
  margin-left: 45px;
  @media (min-width: 0px) and (max-width: 768px) {
    margin: 0;
  }
`

const Header = ({ headerProps }: HeaderViewProps) => {
  const [showDocsBtn, setShowDocsBtn] = React.useState(true)
  const [showMobileNav, setShowMobileNav] = React.useState(false)
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)

  const toggleMobileNav = () => setShowMobileNav(!showMobileNav)
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu)

  const changeHitsStatus = (status: boolean) => setShowDocsBtn(!status)

  const { width } = useWindowDimensions()

  const Menu = (
    <>
      <NavLinks>
        {headerProps.links.map((headerlink: any, index: number) =>
          headerlink.type !== 'button' ? (
            <NavLink
              key={index}
              to={headerlink.link}
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {headerlink.name}
            </NavLink>
          ) : (
            <NavButton
              key={index}
              to={headerlink.link}
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {headerlink.name}
            </NavButton>
          )
        )}
      </NavLinks>
      <Link
        to={'https://github.com/prisma'}
        style={{
          color: 'white',
          textDecoration: 'none',
        }}
      >
        <Github style={{ height: '24px' }} />
      </Link>
    </>
  )

  const SecondLevelMenu = () => {
    return (
      <SecondLevelNav>
        {secondLevelHeaderMenuItems.map(item => {
          const isCurrent = location && item.matchPath && location.pathname.includes(item.matchPath)
          return (
            <DarkNavLink
              to={item.to}
              // activeClassName="active-item"
              className={isCurrent ? 'active-item' : 'non-active'}
            >
              {item.text}
            </DarkNavLink>
          )
        })}
      </SecondLevelNav>
    )
  }

  interface MenuItemProps {
    componentToShow?: any
    type: string
    text: string
    link?: string
  }

  const MenuItem = ({ componentToShow, type, text, link }: MenuItemProps) => {
    const [showExpanded, setShowExpanded] = React.useState(false)
    const toggle = () => setShowExpanded(!showExpanded)
    return type === 'section' ? (
      <>
        <SecondLevelMobileNavLink onClick={toggle}>
          {text}
          {showExpanded ? <UpChevron /> : <RightChevron />}
        </SecondLevelMobileNavLink>
        {showExpanded && componentToShow}
      </>
    ) : (
      <DarkNavLink to={link}>
        <div className="menu-item">
          {text}
          {showExpanded ? <UpChevron /> : <RightChevron />}
        </div>
      </DarkNavLink>
    )
  }

  const SecondLevelMobileMenu = () => (
    <SecondLevelNav>
      {secondLevelHeaderMenuItems.map(item => {
        return (
          <MenuItem
            componentToShow={item.expandContent === 'mainDocs' ? <Sidebar isMobile={true} /> : null}
            type={item.type}
            text={item.text}
            link={item.to}
          />
        )
      })}
    </SecondLevelNav>
  )

  return (
    <>
      {/* Top level header */}
      <HeaderWrapper>
        <Container>
          <HeaderNav>
            <div style={{ display: 'flex' }}>
              <Link
                to={headerProps.logoLink || '/'}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LogoContainer>
                  <HeaderLogo style={{ height: '24px' }} />
                </LogoContainer>
              </Link>
            </div>
            <NonMobileMenu>{Menu}</NonMobileMenu>
            <MenuMobileBtn onClick={toggleMobileMenu}>
              {showMobileMenu ? <Clear /> : 'Menu'}
            </MenuMobileBtn>
          </HeaderNav>
        </Container>

        {showMobileMenu && <MobileOnlyMenu>{Menu}</MobileOnlyMenu>}
      </HeaderWrapper>

      {/* Second level header */}
      <SecondLevelHeader>
        <Container style={{ display: 'flex' }}>
          <SearchComponent hitsStatus={changeHitsStatus} />
          {showDocsBtn && <NonMobileMenu>
            <SecondLevelMenu />
          </NonMobileMenu>}
          {showDocsBtn && (
            <DocsMobileButton onClick={toggleMobileNav}>
              {width > 640 ? 'Documentation' : 'Docs'}
              {showMobileNav ? <UpChevron /> : <DownChevron />}
            </DocsMobileButton>
          )}
        </Container>
      </SecondLevelHeader>

      {showMobileNav && (
        <SecondLevelMobileOnlyNav>
          <SecondLevelMobileMenu />
        </SecondLevelMobileOnlyNav>
      )}
    </>
  )
}

export default Header
