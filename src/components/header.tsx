import { useLocation } from 'react-router-dom'
import * as React from 'react'
import styled from 'styled-components'

import Link from '../components/link'
import Search from '../components/search'
import Sidebar from '../components/sidebar'
import ExternalLink from '../icons/ExternalLink'
import Github from '../icons/Github'
import Logo from '../icons/Logo'
import RightChevron from '../icons/RightChevron'
import UpChevron from '../icons/UpChevron'
import { HeaderProps } from '../interfaces/Layout.interface'
import { defaultTheme as theme } from '../themes'
import { Button } from './button'
import { Icon } from './Icon'
import CustomLink from './customLink'

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
  justify-content: flex-start;
  align-items: center;

  .log-btn {
    padding: 6px 16px;
    font-size: 16px;
    font-weight: 700;
    line-height: 22.4px;

    @media (min-width: 0px) and (max-width: 600px) {
      display: none;
    }
  }

  .log-btn-mobile {
    font-size: 20px;
    line-height: 28px;
    padding: 10px;
    width: calc(100% - 70px);
    margin: 24px 35px 0 35px;
    @media (min-width: 600px) {
      display: none;
    }
  }

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
  @media (min-width: 0px) and (max-width: 940px) {
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
  @media (min-width: 0px) and (max-width: 940px) {
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
  @media (min-width: 0px) and (max-width: 940px) {
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

const HeaderWrapper = styled.div<{ open: boolean }>`
  background: var(--header-bg-color);
  padding: 0 16px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
  //position: fixed;
  z-index: 202;
  width: 100%;
  @media (min-width: 0px) and (max-width: ${theme.breakpoints.tabletVertical}) {
    padding: 12px 16px;
  }
  @media (min-width: 0px) and (max-width: 940px) {
    z-index: 105;
    padding: 20px 16px;
    ${(p) => p.open && `position: fixed;`}
  }

  .dark {
    display: none;
  }

  .light {
    display: block;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #242c3a;

    .dark {
      display: block;
    }

    .light {
      display: none;
    }
  }
`

const NonMobileMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes[16]};
  a,
  button {
    padding: 30px 8px;
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px solid black;
    }
  }
  @media (min-width: 0px) and (max-width: 940px) {
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
    padding: 32px 30px;
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
  @media (min-width: ${theme.breakpoints.tabletVertical}) and (max-width: 940px) {
    font-size: 14px;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--main-font-color) !important;
    &.active-item span {
      background: ${theme.colors.gray[800]};
      color: ${(props) => theme.colors[props.dataPlatform ? 'teal' : 'indigo'][400]} !important;
    }
  }
`

const SecondLevelMobileNavLink = styled.div`
  padding: ${theme.space[24]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  color: #1a202c;
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
  openSearch?: boolean
}>`
  position: ${(p) => (p.open ? 'fixed' : 'absolute')};
  top: 80px;
  left: 50%;
  display: block;
  transform: translateX(-50%);
  transition: all 50ms ease-out;
  padding: 16px;
  width: 100%;
  z-index: ${(p) => (p.open ? 200 : 101)};
  background: ${(p) => (p.sidenavSearchOpened ? 'transparent' : theme.colors.gray[100])};
  @media (min-width: 1025px) {
    position: absolute;
    ${(p) => !p.homePage && !p.sidenavSearchOpened && 'display: none;'}
    ${(p) => !p.homePage && p.sidenavSearchOpened && 'margin-top: 1rem;'}
  }
  @media (prefers-color-scheme: dark) {
    background: #242c3a;
  }
`
const SecondLevelNav = styled.div<{ wide?: boolean }>`
  ${(p) => (p.wide ? `padding: 0 2.5rem 0 0;` : `margin-left: 48px;`)}
  width: fit-content;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (min-width: 0px) and (max-width: 940px) {
    margin: 92px 0 0 0;
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
        !item.hidden && (
          <MenuItem
            componentToShow={<Sidebar isMobile={true} slug={item.bucketName} />}
            type={item.type}
            text={item.text}
            link={item.to}
          />
        )
      )
    })}
  </SecondLevelNav>
)

const HomeIcons = styled.div`
  display: flex;
  align-items: center;
  button {
    color: var(--main-font-color);
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
      //color: #2d3748;
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
  background: white;
  overflow: scroll;
`

const GithubLink = styled.a`
  margin-left: auto;
  @media (min-width: 0px) and (max-width: 600px) {
    display: none;
  }
  > svg {
    height: 35px;
    width: 31px;
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
      (item) => item.type === 'bucket' && !item.hidden
    )
    const externalLinkItems = headerProps.secondLevelHeaderMenuItems.filter(
      (item) => item.type === 'external-link' && !item.hidden
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
                dataPlatform={
                  item.to.includes('/accelerate') ||
                  item.to.includes('/pulse') ||
                  item.to.includes('/platform')
                }
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
      <HeaderWrapper open={showMobileNav}>
        <BucketHeader wide={wide}>
          <HomeIcons>
            <CustomLink href="https://www.prisma.io">
              <Logo className="light" fill={'#2d3748'} />
              <Logo className="dark" fill={'#ffffff'} />
            </CustomLink>
            <CustomLink href="https://www.prisma.io/docs">Docs</CustomLink>
          </HomeIcons>
          <NonMobileMenu style={headerProps.wide ? { paddingRight: '200px' } : {}}>
            <SecondLevelMenu />
          </NonMobileMenu>
          <GithubLink href="https://github.com/prisma" target="_blank">
            <Github className="light" fill={'#2d3748'} width={24} height={24} />
            <Github className="dark" fill={'#ffffff'} width={24} height={24} />
          </GithubLink>
          <Button
            type="primary"
            color="teal"
            className="log-btn"
            href="https://console.prisma.io/login?utm_source=docs&utm_medium=login"
          >
            Login
          </Button>
          <DocsMobileButton onClick={toggleMobileNav}>
            {showMobileNav ? (
              <Icon icon="fa-regular fa-xmark" size="28px" />
            ) : (
              <Icon icon="fa-regular fa-bars" size="28px" />
            )}
          </DocsMobileButton>

          {showMobileNav && (
            <SecondLevelMobileOnlyNav>
              <OverflowContainer>
                <SecondLevelMobileMenu headerProps={headerProps} wide={wide} />
                <Button
                  type="primary"
                  color="teal"
                  className="log-btn-mobile"
                  href="https://console.prisma.io/login?utm_source=docs&utm_medium=login"
                >
                  Login
                </Button>
              </OverflowContainer>
            </SecondLevelMobileOnlyNav>
          )}
        </BucketHeader>
      </HeaderWrapper>
      {(location || sidenavSearchOpened) && (
        <SearchComponentDesktop
          open={showMobileNav}
          homePage={homePage}
          openSearch={!showDocsBtn}
          sidenavSearchOpened={sidenavSearchOpened}
        >
          <Search
            hitsStatus={changeHitsStatus}
            location={location}
            sidenavSearchOpened={sidenavSearchOpened}
            closeSidenavSearch={closeSidenavSearch}
            path="home"
            setInputText={setInputText}
            wide={wide}
          />
        </SearchComponentDesktop>
      )}
    </>
  )
}

export default Header
