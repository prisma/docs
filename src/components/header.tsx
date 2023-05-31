import { WebsiteHeader } from '@prisma/lens/dist/web'
import { useLocation } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components'

import Link from '../components/link'
import Search from '../components/search'
import Sidebar from '../components/sidebar'
import useWindowDimensions from '../hooks/useWindowDimensions'
import DownChevron from '../icons/DownChevron'
import ExternalLink from '../icons/ExternalLink'
import RightChevron from '../icons/RightChevron'
import UpChevron from '../icons/UpChevron'
import { HeaderProps } from '../interfaces/Layout.interface'

type HeaderViewProps = {
  headerProps: HeaderProps
  wide?: boolean
}

const HeaderWrapper = styled.div`
  background: radial-gradient(
      37.86% 77.79% at 50% 100%,
      rgba(113, 128, 150, 0.25) 0%,
      rgba(113, 128, 150, 0) 100%
    ),
    linear-gradient(
      180deg,
      ${(p) => p.theme.colors.gray[900]} 0%,
      ${(p) => p.theme.colors.gray[800]} 100%
    ),
    linear-gradient(180deg, ${(p) => p.theme.colors.gray[900]} 0%, rgba(27, 32, 43, 0) 100%),
    ${(p) => p.theme.colors.gray[800]};
  img {
    margin-bottom: 0;
  }
  //padding: ${(p) => p.theme.space[24]} ${(p) => p.theme.space[16]};
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  max-width: 1200px;
  width: 100%;

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
          color: ${(p) => p.theme.colors.white} !important;
        }
      }
    }
  }
  @media (min-width: 0px) and (max-width: 1024px) {
    justify-content: space-between;
  }
`

const SearchComponent = styled(Search)`
  position: absolute;
  top: 12px;
  left: 12px;
`

const DocsMobileButton = styled.div`
  background: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.radii.small};
  color: ${(p) => p.theme.colors.gray[700]};
  display: none;
  padding: 0 ${(p) => p.theme.space[14]};
  height: 40px;
  margin-left: ${(p) => p.theme.space[8]};
  font-weight: 600;
  position: relative;
  z-index: 300;
  justify-content: space-between;
  cursor: pointer;
  svg {
    margin-left: ${(p) => p.theme.space[8]};
  }
  @media (min-width: 0px) and (max-width: 1024px) {
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
  padding: ${(p) => p.theme.space[16]};
  border-radius: ${(p) => p.theme.radii.small};
  text-align: left;
  background: ${(p) => p.theme.colors.gray[800]};
  right: 0;
  padding: ${(p) => p.theme.space[32]} ${(p) => p.theme.space[16]};
  @media (min-width: 0px) and (max-width: 1024px) {
    display: block;
  }
`

const SecondLevelMobileOnlyNav = styled(MobileOnlyNav)`
  background: ${(p) => p.theme.colors.gray[200]};
  box-shadow: 0px 1px 0px ${(p) => p.theme.colors.gray[300]};
  top: 0;
  padding: 0;
  z-index: 200;
`

const SecondLevelHeader = styled.div`
  background: ${(p) => p.theme.colors.gray[200]};
  padding: 20px 16px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 105;
  @media (min-width: 0px) and (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    padding: 12px 16px;
  }
`

const NonMobileMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(p) => p.theme.fontSizes[16]};
  @media (min-width: 0px) and (max-width: 1024px) {
    display: none;
  }
`

const NavLink = styled(Link)<{ wide?: boolean }>`
  transition: color 0.1s ease-in;
  ${(p) =>
    p.wide
      ? `padding: 0.25rem 0.5rem;`
      : `padding: 0 0.5rem;
  margin: 0 0.5rem;`}
  color: ${(p) => p.theme.colors.gray[400]} !important;
  @media (min-width: 0px) and (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    margin: 0;
    padding: 0;
  }
`
const DarkNavLink = styled(NavLink)<{ wide?: boolean }>`
  color: ${(p) => p.theme.colors.gray[700]} !important;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  &.link {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    color: ${(p) => p.theme.colors.gray[600]} !important;
  }

  .menu-item {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${(p) => p.theme.colors.gray[300]};
    color: ${(p) => p.theme.colors.gray[600]};
    font-weight: 600;
    &:hover {
      color: ${(p) => p.theme.colors.gray[900]};
    }
  }

  &:hover {
    color: ${(p) => p.theme.colors.gray[900]} !important;
  }
  &.active-item {
    background: ${(p) => p.theme.colors.white};
    border-radius: ${(p) => p.theme.radii.small};
    color: ${(p) => p.theme.colors.gray[500]} !important;
    padding: 0.25rem 0.5rem;
  }

  @media (min-width: 0px) and (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    &.active-item {
      background: transparent;
      color: ${(p) => p.theme.colors.gray[700]} !important;
      padding: 0.25rem 0.5rem;
    }
    svg {
      display: block;
    }
  }
  @media (min-width: ${(p) => p.theme.breakpoints.tablet}) and (max-width: 1024px) {
    font-size: 14px;
  }
`

const SecondLevelMobileNavLink = styled.div`
  padding: ${(p) => p.theme.space[24]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${(p) => p.theme.colors.gray[300]};
  color: ${(p) => p.theme.colors.gray[600]};
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: ${(p) => p.theme.colors.gray[900]};
  }
`

const SecondLevelNav = styled.div<{ wide?: boolean }>`
  ${(p) => (p.wide ? `padding: 0 2.5rem 0 0;` : `margin-left: 48px;`)}
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (min-width: 0px) and (max-width: 1024px) {
    margin: 0;
    flex-direction: column;
    ${(p) => p.wide && `padding: 0;`}
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

const HeaderSec = ({ headerProps, wide }: HeaderViewProps) => {
  const [showDocsBtn, setShowDocsBtn] = React.useState(true)
  const [showMobileNav, setShowMobileNav] = React.useState(false)

  const toggleMobileNav = () => setShowMobileNav(!showMobileNav)
  const changeHitsStatus = (status: boolean) => setShowDocsBtn(!status)

  const { width } = useWindowDimensions()

  const location = useLocation()

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
                className={isCurrent ? 'active-item' : 'non-active'}
              >
                {item.text}
              </DarkNavLink>
            )
          })}
        </div>

        {/* <div>
          {externalLinkItems.map((item) => (
            <DarkNavLink className="link" to={item.to}>
              {item.text} &nbsp;&nbsp;
              <ExternalLink />
            </DarkNavLink>
          ))}
        </div> */}
      </SecondLevelNav>
    )
  }

  return (
    <>
      {/* Top level header */}
      <HeaderWrapper>
        <Container>
          <WebsiteHeader lightTheme={false} clearBg={true} notFixed={true} />
        </Container>
      </HeaderWrapper>

      {/* Second level header */}
      <SecondLevelHeader>
        <Container
          style={headerProps.wide ? { display: 'flex', maxWidth: '1440px' } : { display: 'flex' }}
        >
          <SearchComponent hitsStatus={changeHitsStatus} location={location} />
          {showDocsBtn && (
            <NonMobileMenu
              style={
                headerProps.wide ? { width: '100%', paddingRight: '200px' } : { width: '100%' }
              }
            >
              <SecondLevelMenu />
            </NonMobileMenu>
          )}
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
          <SecondLevelMobileMenu headerProps={headerProps} wide={wide} />
        </SecondLevelMobileOnlyNav>
      )}
    </>
  )
}

export default HeaderSec
