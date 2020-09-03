import Link from '../components/link'
import * as React from 'react'
import styled from 'styled-components'
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
import { useLocation } from '@reach/router'

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
    linear-gradient(180deg, ${p => p.theme.colors.gray900} 0%, ${p => p.theme.colors.gray800} 100%),
    linear-gradient(180deg, ${p => p.theme.colors.gray900} 0%, rgba(27, 32, 43, 0) 100%),
    ${p => p.theme.colors.gray800};
  img {
    margin-bottom: 0;
  }
  padding: ${p => p.theme.space[24]} ${p => p.theme.space[16]};
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
    padding: 0 ${p => p.theme.space[16]};
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
      color: ${p => p.theme.colors.white} !important;
    }
  }

  margin: 0 1rem 0;
  @media (min-width: 0px) and (max-width: 1024px) {
    margin: 0 3rem 0;
  }

  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-end;
    margin: 0;
    a {
      margin-bottom: ${p => p.theme.space[20]};
    }
  }
`

const DocsMobileButton = styled.div`
  background: ${p => p.theme.colors.white};
  border-radius: ${p => p.theme.radii.small};
  color: ${p => p.theme.colors.gray700};
  display: none;
  padding: 0 ${p => p.theme.space[14]};
  height: 40px;
  margin-left: ${p => p.theme.space[8]};
  font-weight: 600;
  position: relative;
  z-index: 300;
  justify-content: space-between;
  svg {
    margin-left: ${p => p.theme.space[8]};
  }
  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
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
  padding: ${p => p.theme.space[16]};
  border-radius: ${p => p.theme.radii.small};
  text-align: left;
  background: ${p => p.theme.colors.gray800};
  right: 0;
  padding: ${p => p.theme.space[32]} ${p => p.theme.space[16]};
  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
    display: block;
  }
`

const SecondLevelMobileOnlyNav = styled(MobileOnlyNav)`
  background: ${p => p.theme.colors.gray200};
  box-shadow: 0px 1px 0px ${p => p.theme.colors.gray300};
  top: 0;
  padding: 0;
  z-index: 200;
`

const MobileOnlyMenu = styled(MobileOnlyNav)`
  text-align: right;
  position: absolute;
`

const SecondLevelHeader = styled.div`
  background: ${p => p.theme.colors.gray200};
  padding: 20px 16px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 105;
  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
    padding: 12px 16px;
  }
`

const MenuMobileBtn = styled.a`
  display: none;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: ${p => p.theme.colors.gray500} !important;
  text-transform: uppercase;
  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
    display: block;
  }
`

const NonMobileMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: ${p => p.theme.fontSizes[16]};
  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
    display: none;
  }
`

const NavLink = styled(Link)`
  transition: color 0.1s ease-in;
  padding: 0 0.75rem;
  margin: 0 0.5rem;
  color: ${p => p.theme.colors.gray400} !important;
  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
    margin: 0;
    padding: 0;
  }
`
const DarkNavLink = styled(NavLink)`
  color: ${p => p.theme.colors.gray700} !important;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  .menu-item {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${p => p.theme.colors.gray300};
    color: ${p => p.theme.colors.gray600};
    font-weight: 600;
    &:hover {
      color: ${p => p.theme.colors.gray900};
    }
  }

  &:hover {
    color: ${p => p.theme.colors.gray900} !important;
  }
  &.active-item {
    background: ${p => p.theme.colors.white};
    border-radius: ${p => p.theme.radii.small};
    color: ${p => p.theme.colors.gray500} !important;
    padding: 4px 6px;
  }

  svg {
    display: none;
  }

  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
    &.active-item {
      background: transparent;
      color: ${p => p.theme.colors.gray700} !important;
      padding: ${p => p.theme.space[24]};
    }
    svg {
      display: block;
    }
  }
`

const SecondLevelMobileNavLink = styled.div`
  padding: ${p => p.theme.space[24]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${p => p.theme.colors.gray300};
  color: ${p => p.theme.colors.gray600};
  font-weight: 600;
  &:hover {
    color: ${p => p.theme.colors.gray900};
  }
`

const NavButton = styled(NavLink)`
  background: ${p => p.theme.colors.green500};
  border-radius: ${p => p.theme.radii.small};
  padding: 5px;
  color: ${p => p.theme.colors.white} !important;

  &:hover {
    background: ${p => p.theme.colors.green600};
  }

  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
    color: ${p => p.theme.colors.gray400} !important;
    background: transparent;
    padding: 0;
    margin: 0;
  }
`

const SecondLevelNav = styled.div`
  margin-left: 45px;
  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
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

  const location = useLocation()

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
