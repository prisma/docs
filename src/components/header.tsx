import { Icon, defaultTheme as theme, WebsiteHeader } from '@prisma/lens/dist/web'
import { useLocation } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components'

import Link from '../components/link'
import Sidebar from '../components/sidebar'
import useWindowDimensions from '../hooks/useWindowDimensions'
import DownChevron from '../icons/DownChevron'
import ExternalLink from '../icons/ExternalLink'
import Github from '../icons/Github'
import Logo from '../icons/Logo'
import RightChevron from '../icons/RightChevron'
import UpChevron from '../icons/UpChevron'
import { HeaderProps } from '../interfaces/Layout.interface'
import Search from '../components/search'
import { close } from 'inspector'

type HeaderViewProps = {
  headerProps: HeaderProps
  wide?: boolean
  mobileNavOpen?: any
  sidenavSearchOpened?: boolean
  homePage?: boolean
  closeSidenavSearch?: any
  setInputText?: any
}

const BucketHeader = styled.div<{ wide?: boolean }>`
  max-width: ${(props) => (!props.wide ? '1240' : '1440')}px;
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;

  > * {
    padding: 0;
    a {
      text-decoration: none;
    }
    .container {
      padding: 0;
    }
    .menu {
      background: transparent;
      border: 0;
    }

    .list {
      z-index: 120;
    }

    .menu,
    .list {
      a {
        color: currentcolor !important;
        text-decoration: none;

        &:hover {
          color: ${theme.colors.white} !important;
        }
      }
    }
  }
  @media (min-width: 0px) and (max-width: 1024px) {
    justify-content: space-between;
  }
`

const DocsMobileButton = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.radii.small};
  color: ${theme.colors.gray[700]};
  display: none;
  padding: 0 ${theme.space[14]};
  height: 40px;
  margin-left: ${theme.space[8]};
  font-weight: 600;
  position: relative;
  z-index: 3;
  justify-content: space-between;
  cursor: pointer;
  svg {
    margin-left: ${theme.space[8]};
  }
  @media (min-width: 0px) and (max-width: 1024px) {
    display: flex;
    align-items: center;
  }
`

const MobileOnlyNav = styled.div`
  display: none;
  position: fixed;
  width: 100%;
  z-index: 210;
  top: 70px;
  transition: top 0.35s;
  padding: ${theme.space[16]};
  border-radius: ${theme.radii.small};
  text-align: left;
  background: ${theme.colors.gray[800]};
  right: 0;
  padding: ${theme.space[32]} ${theme.space[16]};
  @media (min-width: 0px) and (max-width: 1024px) {
    display: block;
  }
`

const SecondLevelMobileOnlyNav = styled(MobileOnlyNav)`
  background: ${theme.colors.gray[100]};
  box-shadow: 0px 1px 0px ${theme.colors.gray[300]};
  top: 80px;
  padding: 0;
  height: calc(100% - 80px);
  z-index: 200;
`

const HeaderWrapper = styled.div`
  background: #fff;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
  position: fixed;
  z-index: 202;
  width: 100%;
  @media (min-width: 0px) and (max-width: ${theme.breakpoints.tabletVertical}) {
    padding: 12px 16px;
  }
  @media (min-width: 0px) and (max-width: 1024px) {
    z-index: 105;
    padding: 20px 16px;
  }
`

const NonMobileMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes[16]};
  a {
    padding: 30px 8px;
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px solid black;
    }
  }
  @media (min-width: 0px) and (max-width: 1024px) {
    display: none;
  }
`

const NavLink = styled(Link)<{ wide?: boolean }>`
  transition: all 0.1s ease-in;
  color: ${theme.colors.gray[400]} !important;
  @media (min-width: 0px) and (max-width: ${theme.breakpoints.tabletVertical}) {
    margin: 0;
    padding: 0;
  }
`
const DarkNavLink = styled(NavLink)<{ wide?: boolean; dataPlatform?: boolean }>`
  color: ${theme.colors.gray[800]} !important;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  span {
    padding: 8px;
    border-radius: 8px;
  }
  &.link {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    color: ${theme.colors.gray[600]} !important;
  }

  .menu-item {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${theme.colors.gray[300]};
    color: ${theme.colors.gray[600]};
    font-weight: 600;
    &:hover {
      color: ${theme.colors.gray[900]};
    }
  }

  &:hover {
    //color: ${(props) => theme.colors[props.dataPlatform ? 'teal' : 'indigo'][700]} !important;
    border-color: ${(props) =>
      theme.colors[props.dataPlatform ? 'teal' : 'indigo'][700]} !important;
    //background: ${theme.colors.gray[200]};
  }
  &.active-item span {
    background: ${theme.colors.gray[200]};
    color: ${(props) => theme.colors[props.dataPlatform ? 'teal' : 'indigo'][700]} !important;
  }

  @media (min-width: 0px) and (max-width: ${theme.breakpoints.tabletVertical}) {
    &.active-item {
      background: transparent;
      color: ${theme.colors.gray[700]} !important;
      padding: 0.25rem 0.5rem;
    }
    svg {
      display: block;
    }
  }
  @media (min-width: ${theme.breakpoints.tabletVertical}) and (max-width: 1024px) {
    font-size: 14px;
  }
`

const SecondLevelMobileNavLink = styled.div`
  padding: ${theme.space[24]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${theme.colors.gray[300]};
  color: ${theme.colors.gray[600]};
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.gray[900]};
  }
`

const SearchComponentDesktop = styled.div<{
  open?: boolean
  homePage?: boolean
  sidenavSearchOpened?: boolean
}>`
  position: ${(p) => (p.open ? 'fixed' : 'absolute')};
  top: 80px;
  left: 50%;
  display: block;
  transform: translateX(-50%);
  padding: 24px 10px;
  width: 100%;
  z-index: ${(p) => (p.open ? 200 : 101)};
  background: ${(p) =>
    p.homePage || p.sidenavSearchOpened ? 'transparent' : theme.colors.gray[100]};
  @media (min-width: 1024px) {
    position: absolute;
    ${(p) => !p.homePage && !p.sidenavSearchOpened && 'display: none;'}
    ${(p) => !p.homePage && p.sidenavSearchOpened && 'margin-top: 1rem;'}
  }
`
const SecondLevelNav = styled.div<{ wide?: boolean }>`
  ${(p) => (p.wide ? `padding: 0 2.5rem 0 0;` : `margin-left: 48px;`)}
  width: fit-content;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (min-width: 0px) and (max-width: 1024px) {
    margin: 94px 0 0 0;
    flex-direction: column;
    ${(p) => p.wide && `padding: 0;`}
  }
  > div {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-top: 2px;
  }
`

interface MenuItemProps {
  componentToShow?: any
  type: string
  text: string
  link?: string
  setCheckState?: (arg0: string) => void
}

const MenuItem = ({ componentToShow, type, text, link }: MenuItemProps) => {
  const isCurrent = location && link && location.pathname.includes(link)
  const [showExpanded, setShowExpanded] = React.useState(isCurrent)
  const toggle = () => setShowExpanded(!showExpanded)
  return type === 'bucket' ? (
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
        <ExternalLink />
      </div>
    </DarkNavLink>
  )
}

const SecondLevelMobileMenu = ({ headerProps, wide }: HeaderViewProps) => (
  <SecondLevelNav wide={wide}>
    {headerProps.secondLevelHeaderMenuItems.map((item) => {
      return (
        <MenuItem
          componentToShow={<Sidebar isMobile={true} slug={item.bucketName} />}
          type={item.type}
          text={item.text}
          link={item.to}
        />
      )
    })}
  </SecondLevelNav>
)

const HomeIcons = styled.div`
  display: flex;
  align-items: center;
  a {
    transition: transform 0.18s ease-out;
    &:hover {
      transform: translateY(-2px);
    }
    &:first-of-type {
      svg {
        height: 36px;
      }
    }
    &:last-of-type {
      color: #2d3748;
      font-family: 'Inter';
      font-size: 22px;
      font-style: normal;
      font-weight: 500;
      padding-left: 22px;
      position: relative;
      line-height: 100%;
      &:before {
        position: absolute;
        content: '/';
        left: 6px;
        color: #a0aec0;
      }
    }
  }
`

const OverflowContainer = styled.div`
  height: 100%;
  overflow: scroll;
`

const GithubLink = styled.a`
  @media (min-width: 0px) and (max-width: 1024px) {
    display: none;
  }
`

const Header = ({
  headerProps,
  wide,
  mobileNavOpen,
  homePage,
  sidenavSearchOpened,
  closeSidenavSearch,
  setInputText,
}: HeaderViewProps) => {
  const [showMobileNav, setShowMobileNav] = React.useState(false)
  const [showDocsBtn, setShowDocsBtn] = React.useState(true)
  const changeHitsStatus = (status: boolean) => setShowDocsBtn(!status)

  const toggleMobileNav = () => setShowMobileNav(!showMobileNav)

  const location = useLocation()

  React.useEffect(() => {
    mobileNavOpen(showMobileNav)
  }, [showMobileNav])

  const SecondLevelMenu = () => {
    const bucketItems = headerProps.secondLevelHeaderMenuItems.filter(
      (item) => item.type === 'bucket'
    )
    const externalLinkItems = headerProps.secondLevelHeaderMenuItems.filter(
      (item) => item.type === 'external-link'
    )
    return (
      <SecondLevelNav wide={wide}>
        <div>
          {bucketItems.map((item) => {
            const bucketStringPosition = process.env.NODE_ENV === 'production' ? 2 : 1
            const bucketPath = `/${location.pathname.split('/')[bucketStringPosition]}`
            const isCurrent = location && item.to && bucketPath !== '' && item.to === bucketPath
            return (
              <DarkNavLink
                to={item.to}
                state={{ bucketName: item.bucketName }}
                activeClassName="active-item"
                dataPlatform={item.to.includes('data-platform')}
                className={isCurrent ? 'active-item' : 'non-active'}
              >
                <span>{item.text}</span>
              </DarkNavLink>
            )
          })}
        </div>
      </SecondLevelNav>
    )
  }

  return (
    <>
      <HeaderWrapper>
        <BucketHeader wide={wide}>
          <HomeIcons>
            <a href="https://www.prisma.io">
              <Logo />
            </a>
            <a href="/">Docs</a>
          </HomeIcons>
          <NonMobileMenu style={headerProps.wide ? { paddingRight: '200px' } : {}}>
            <SecondLevelMenu />
          </NonMobileMenu>
          <DocsMobileButton onClick={toggleMobileNav}>
            {showMobileNav ? (
              <Icon icon="fa-regular fa-xmark" size="28px" />
            ) : (
              <Icon icon="fa-regular fa-bars" size="28px" />
            )}
          </DocsMobileButton>

          <GithubLink href="https://github.com/prisma">
            <Github width={24} height={24} />
          </GithubLink>

          {showMobileNav && (
            <SecondLevelMobileOnlyNav>
              <OverflowContainer>
                <SecondLevelMobileMenu headerProps={headerProps} wide={wide} />
              </OverflowContainer>
            </SecondLevelMobileOnlyNav>
          )}
        </BucketHeader>
      </HeaderWrapper>
      {(location || sidenavSearchOpened) && (
        <SearchComponentDesktop
          open={showMobileNav}
          homePage={homePage}
          sidenavSearchOpened={sidenavSearchOpened}
        >
          <Search
            hitsStatus={changeHitsStatus}
            location={location}
            sidenavSearchOpened={sidenavSearchOpened}
            closeSidenavSearch={closeSidenavSearch}
            path="home"
            setInputText={setInputText}
          />
        </SearchComponentDesktop>
      )}
    </>
  )
}

export default Header
