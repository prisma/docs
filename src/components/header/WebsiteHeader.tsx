import * as React from 'react'
import { Container } from './Container'
import { Button } from './ui/controls/Button'
import { Label } from './ui/typography/Label'
import * as DD from './ui/navigation/Dropdown'
import * as NavBar from './ui/navigation/NavBar'
import styled, { css } from 'styled-components'
import { defaultTheme, darkTheme } from './theme'

interface HeaderProps {
  className?: string
  lightTheme?: boolean
  clearBg?: boolean
  notFixed?: boolean
}

const MobileHeader = styled.div<{ theme: any }>(
  ({ theme }) => css`
    width: 100%;
    justify-content: space-between;
    display: flex;
    height: 96px;
    align-items: center;
    box-sizing: border-box;
    padding: 0 32px;
    .menu-toggle-button {
      display: inline-flex;
      background-color: transparent;
      border: none;
      color: ${theme.header.mobileMenuButtonColor};
    }
    @media only screen and (min-width: ${theme.header.mobileNavigationBreakpoint}px) {
      padding: 0;
      display: initial;
      height: auto;
      width: auto;
      .menu-toggle-button {
        display: none;
      }
    }
  `
)

const HeaderWrapper = ({
  className,
  lightTheme = true,
  clearBg = false,
  notFixed = false,
}: HeaderProps) => {
  let themeToUse = lightTheme ? defaultTheme : darkTheme
  const headerAssets = 'https://prismalens.netlify.app/'

  return (
    <NavBar.NavBar lightTheme={lightTheme}>
      <NavBar.NavBarContext.Consumer>
        {({ state: { mobileOpen } }) => (
          <>
            <div className={className + (mobileOpen ? ' open' : '')}>
              <Container className="container">
                <NavBar.NavBarInner>
                  <MobileHeader theme={themeToUse}>
                    <a href="https://www.prisma.io/">
                      <img
                        src={themeToUse.header.logoUrl}
                        width={90}
                        height={27}
                        alt="prisma_logo"
                        style={{ cursor: 'pointer', display: 'block' }}
                      />
                    </a>

                    <NavBar.MenuButton />
                  </MobileHeader>

                  <NavBar.NavItemsContainer
                    lightTheme={lightTheme}
                    className={mobileOpen ? '' : 'hidden-on-mobile'}
                  >
                    <NavBar.NavItem
                      lightTheme={lightTheme}
                      title={'Product'}
                      dropdown={
                        <DD.Panel lightTheme={lightTheme}>
                          <DD.SectionHeader lightTheme={lightTheme}>Prisma ORM</DD.SectionHeader>
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/client/'}
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-Client.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Client"
                              ></img>
                            }
                            title={'Client'}
                            subtitle={'Write Queries the way you think'}
                          />
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/migrate/'}
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-Migrate.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Migrate"
                              ></img>
                            }
                            title={'Migrate'}
                            subtitle={'Generate customisable SQL migrations'}
                          />

                          <DD.SectionHeader lightTheme={lightTheme}>
                            Prisma Data Platform
                          </DD.SectionHeader>
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/data-platform/'}
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-DataBrowser.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Data Browser"
                              ></img>
                            }
                            title={'Data Browser'}
                            subtitle={'Explore and manipulate data in your projects'}
                          />
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/data-platform/proxy/'}
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-ServerlessDataProxy.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Data Proxy"
                              ></img>
                            }
                            title={'Data Proxy'}
                            subtitle={'Manage and scale your connection pool'}
                          />
                        </DD.Panel>
                      }
                    />

                    <NavBar.NavItem
                      lightTheme={lightTheme}
                      href="https://prisma.io/pricing/"
                      title={'Pricing'}
                    />

                    <NavBar.NavItem
                      lightTheme={lightTheme}
                      title={'Developer'}
                      dropdown={
                        <DD.Panel lightTheme={lightTheme} width={461}>
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/docs/'}
                            titleOnlyOnMobile
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-Docs.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Data Proxy"
                              ></img>
                            }
                            title={'Documentation'}
                            subtitle={
                              'Refer to our technical documentation to configure Prisma, access APIs, develop and deploy your app'
                            }
                          />
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/docs/getting-started/'}
                            titleOnlyOnMobile
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-GetStarted.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Get Started"
                              ></img>
                            }
                            title={'Get Started'}
                            subtitle={'Set up Prisma for your project'}
                          />
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://github.com/prisma/prisma-examples'}
                            titleOnlyOnMobile
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-PrismaExplained.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Prisma Examples"
                              ></img>
                            }
                            title={'Prisma Examples ->'}
                            subtitle={'Access dozens of ready-to-run Prisma example projects'}
                          />
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/dataguide/'}
                            titleOnlyOnMobile
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-DataGuide.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Data Guide"
                              ></img>
                            }
                            title={'Data Guide'}
                            subtitle={'Refer to expert articles on how databases work'}
                          />
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/stack/'}
                            titleOnlyOnMobile
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-PrismaInYourStack.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Prisma in your Stack"
                              ></img>
                            }
                            title={'Prisma in your Stack'}
                            subtitle={
                              'Learn about Prisma’s integration with modern technology stacks, platforms, and applications'
                            }
                          />
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/support/'}
                            titleOnlyOnMobile
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-Support.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Support"
                              ></img>
                            }
                            title={'Support'}
                            subtitle={'Find resources and get help from our support team'}
                          />
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/community/'}
                            titleOnlyOnMobile
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-Community.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Community"
                              ></img>
                            }
                            title={'Community'}
                            subtitle={'Join the growing Prisma community'}
                          />
                        </DD.Panel>
                      }
                    />

                    <NavBar.NavItem
                      lightTheme={lightTheme}
                      title={'Use Cases'}
                      dropdown={
                        <DD.Panel lightTheme={lightTheme} width={441}>
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/showcase/'}
                            titleOnlyOnMobile
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-CustomerStories.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Data Proxy"
                              ></img>
                            }
                            title={'Customer Stories'}
                            subtitle={'Learn about applications built with Prisma'}
                          />
                          <DD.IconLink
                            lightTheme={lightTheme}
                            href={'https://prisma.io/enterprise/'}
                            titleOnlyOnMobile
                            icon={
                              <img
                                src={headerAssets + `/header/icons/Icon-Enterprise.svg`}
                                className="image"
                                height={16}
                                width={16}
                                alt="Data Proxy"
                              ></img>
                            }
                            title={'Enterprise'}
                            subtitle={'Up-level your applications with our Data Platform'}
                          />
                        </DD.Panel>
                      }
                    />

                    <NavBar.NavItem
                      lightTheme={lightTheme}
                      title={'Company'}
                      dropdown={
                        <DD.Panel lightTheme={lightTheme} width={621}>
                          <div className="company-dropdown-container">
                            <div className="company-links">
                              <DD.Link lightTheme={lightTheme} href={'https://prisma.io/about/'}>
                                About
                              </DD.Link>
                              <DD.Link lightTheme={lightTheme} href={'https://prisma.io/blog/'}>
                                Blog
                              </DD.Link>
                              <DD.Link lightTheme={lightTheme} href={'https://prisma.io/jobs/'}>
                                Careers{' '}
                                <Label type={'secondary'} css={{ fontSize: 12 }}>
                                  We&apos;re Hiring
                                </Label>
                              </DD.Link>
                              <DD.Link lightTheme={lightTheme} href={'https://prisma.io/events/'}>
                                Events
                              </DD.Link>
                              <DD.Link
                                lightTheme={lightTheme}
                                href={'https://pris.ly/causes'}
                              >{`Causes ->`}</DD.Link>
                            </div>

                            <DD.VerticalDivider />

                            <div className="articles">
                              <DD.ArticlesHeader>Latest from the blog</DD.ArticlesHeader>

                              <DD.ArticleLink
                                href={
                                  'https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0'
                                }
                                image={
                                  <img
                                    src={headerAssets + `/header/blogpost1.webp`}
                                    alt="Landscape picture"
                                    width={148}
                                    height={83}
                                    style={{ borderRadius: '4px' }}
                                  />
                                }
                                title={'Building a REST API with NestJS and Prisma'}
                              />

                              <DD.ArticleLink
                                href={'https://www.prisma.io/blog/cockroach-ga-5JrD9XVWQDYL'}
                                image={
                                  <img
                                    src={headerAssets + `/header/blogpost2.webp`}
                                    alt="Landscape picture"
                                    width={148}
                                    height={83}
                                    style={{ borderRadius: '4px' }}
                                  />
                                }
                                title={'Prisma Support for CockroachDB Is Production Ready'}
                              />
                            </div>
                          </div>
                        </DD.Panel>
                      }
                    />
                  </NavBar.NavItemsContainer>

                  <div className={'header-cta-container' + (mobileOpen ? '' : ' hidden-on-mobile')}>
                    <Button href={'https://prisma.io/docs/getting-started/quickstart'}>
                      Get Started
                    </Button>
                  </div>
                </NavBar.NavBarInner>
              </Container>
            </div>
          </>
        )}
      </NavBar.NavBarContext.Consumer>
    </NavBar.NavBar>
  )
}

const WebsiteHeader = styled(HeaderWrapper)(
  ({ lightTheme = true, clearBg = false, notFixed = false }: HeaderProps) => {
    const themeToUse = lightTheme ? defaultTheme : darkTheme
    const clearHeader = clearBg
    const fixedHeader = !notFixed
    return css`
      position: ${fixedHeader ? 'fixed' : 'relative'};
      top: 0;
      left: 0;
      background-color: ${clearHeader ? 'transparent' : themeToUse.header.backgroundColor};
      width: 100%;
      z-index: 9999;
      border-bottom: none;
      @media only screen and (max-width: ${themeToUse.header.mobileNavigationBreakpoint - 1}px) {
        background-color: ${themeToUse.header.backgroundColor};
        border-bottom: 1px solid ${themeToUse.header.mobileLinkDividerColor};
      }

      &.open {
        height: 100vh;
        overflow: scroll;
      }

      .container {
        @media only screen and (max-width: ${themeToUse.header.mobileNavigationBreakpoint - 1}px) {
          padding: 0;
        }
      }

      .hidden-on-mobile {
        @media only screen and (max-width: ${themeToUse.header.mobileNavigationBreakpoint - 1}px) {
          display: none;
        }
      }

      .header-cta-container {
        width: 100%;
        a {
          width: 100%;
        }
        padding: 24px 24px 24px;
        @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
          padding: 0;
          width: auto;
          a {
            width: auto;
          }
        }
      }

      .company-dropdown-container {
        display: flex;
        flex-direction: row;
        .company-links {
          flex-shrink: 0;
          width: 100%;
          @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
            padding: 0 12px 0 20px;
            box-sizing: content-box;
            width: 187px;
          }
        }
        .articles {
          padding: 0 24px;
          display: none;
          @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
            display: block;
          }
        }
      }
    `
  }
)

export { WebsiteHeader }
