import * as React from 'react'
import styled from 'styled-components'
import { Button } from './button'
import {
  ArticleLink,
  ArticlesHeader,
  IconLink,
  Link,
  Panel,
  SectionHeader,
  VerticalDivider,
} from './dropdown'
import {
  MenuButton,
  NavBar,
  NavBarContext,
  NavBarInner,
  NavItem,
  NavItemsContainer,
} from './navbar'
import * as t from './themePrimitives'

const headerAssets = 'https://prismalens.netlify.app/'

const Container = styled.div`
  box-sizing: border-box;
  margin: auto;
  width: 100%;
  padding: 0 2rem;
  @media only screen and (min-width: 940px) {
    padding: 0 1.5rem;
    max-width: 1248px; // 1200 plus 2 x padding
  }
`

const Label = styled.span`
  border-radius: 4px;
  background-color: ${t.colors.teal[500]};
  padding: ${t.space[4]} ${t.space[8]};
  color: white;
  line-height: 1;
  display: inline-block;
  font-weight: 600;
  font-size: ${t.fontSizes[14]};
  font-size: 12px;
`

const MobileHeader = styled.div`
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
    color: ${t.headerDark.mobileMenuButtonColor};
  }
  @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
    padding: 0;
    display: initial;
    height: auto;
    width: auto;
    .menu-toggle-button {
      display: none;
    }
  }
`

const WebsiteHeader = () => (
  <WebsiteHeaderWrapper>
    <NavBar>
      <NavBarContext.Consumer>
        {({ state: { mobileOpen } }: any) => (
          <>
            <div className={mobileOpen ? ' open' : ''}>
              <Container className="container">
                <NavBarInner>
                  <MobileHeader>
                    <a href="https://www.prisma.io/">
                      <img
                        src={t.headerDark.logoUrl}
                        width={90}
                        height={27}
                        alt="prisma_logo"
                        style={{ cursor: 'pointer', display: 'block' }}
                      />
                    </a>

                    <MenuButton />
                  </MobileHeader>

                  <NavItemsContainer className={mobileOpen ? '' : 'hidden-on-mobile'}>
                    <NavItem
                      title={'Product'}
                      dropdown={
                        <Panel>
                          <SectionHeader>Prisma ORM</SectionHeader>
                          <IconLink
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
                          <IconLink
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

                          <SectionHeader>Prisma Data Platform</SectionHeader>
                          <IconLink
                            href={'https://prisma.io/data-platform'}
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
                          <IconLink
                            href={'https://prisma.io/data-platform/proxy'}
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
                        </Panel>
                      }
                    />

                    <NavItem href="https://prisma.io/pricing" title={'Pricing'} />

                    <NavItem
                      title={'Developer'}
                      active
                      dropdown={
                        <Panel width={461}>
                          <IconLink
                            href={'https://prisma.io/docs/'}
                            titleOnlyOnMobile
                            active
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
                          <IconLink
                            href={'https://prisma.io/docs/getting-started'}
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
                          <IconLink
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
                          <IconLink
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
                          <IconLink
                            href={'https://prisma.io/stack'}
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
                          <IconLink
                            href={'https://prisma.io/support'}
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
                          <IconLink
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
                        </Panel>
                      }
                    />

                    <NavItem
                      title={'Use Cases'}
                      dropdown={
                        <Panel width={441}>
                          <IconLink
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
                          <IconLink
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
                        </Panel>
                      }
                    />

                    <NavItem
                      title={'Company'}
                      dropdown={
                        <Panel width={621}>
                          <div className="company-dropdown-container">
                            <div className="company-links">
                              <Link href={'https://prisma.io/about/'}>About</Link>
                              <Link href={'https://prisma.io/blog/'}>Blog</Link>
                              <Link href={'https://prisma.io/jobs/'}>
                                Careers <Label>We&apos;re Hiring</Label>
                              </Link>
                              <Link href={'https://prisma.io/events/'}>Events</Link>
                              <Link href={'https://pris.ly/causes'}>{`Causes ->`}</Link>
                            </div>

                            <VerticalDivider />

                            <div className="articles">
                              <ArticlesHeader>Latest from the blog</ArticlesHeader>

                              <ArticleLink
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

                              <ArticleLink
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
                        </Panel>
                      }
                    />
                  </NavItemsContainer>

                  <div className={'header-cta-container' + (mobileOpen ? '' : ' hidden-on-mobile')}>
                    <Button href={'https://prisma.io/docs/getting-started/quickstart'}>
                      Get Started
                    </Button>
                  </div>
                </NavBarInner>
              </Container>
            </div>
          </>
        )}
      </NavBarContext.Consumer>
    </NavBar>
  </WebsiteHeaderWrapper>
)

const WebsiteHeaderWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  z-index: 9999;
  border-bottom: none;
  @media only screen and (max-width: ${t.headerDark.mobileNavigationBreakpoint - 1}px) {
    background-color: ${t.headerDark.backgroundColor};
    border-bottom: 1px solid ${t.headerDark.mobileLinkDividerColor};
  }
  &.open {
    height: 100vh;
    overflow: scroll;
  }
  .container {
    @media only screen and (max-width: ${t.headerDark.mobileNavigationBreakpoint - 1}px) {
      padding: 0;
    }
  }
  .hidden-on-mobile {
    @media only screen and (max-width: ${t.headerDark.mobileNavigationBreakpoint - 1}px) {
      display: none;
    }
  }
  .header-cta-container {
    width: 100%;
    a {
      width: 100%;
    }
    padding: 24px 24px 24px;
    @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
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
      @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
        padding: 0 12px 0 20px;
        box-sizing: content-box;
        width: 187px;
      }
    }
    .articles {
      padding: 0 24px;
      display: none;
      @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
        display: block;
      }
    }
  }
`

export default WebsiteHeader
