import * as React from 'react'
import { AnchorHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

import { darkTheme, defaultTheme as theme } from '../themes'
import { Icon } from './Icon'
import { FooterNewsletterForm } from './newsletter/FooterNewsletterForm'
import CustomLink from './customLink'

const FooterWrapper = styled.div`
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${theme.colors.gray[500]};
  > div {
    width: 100%;
  }
  @media (prefers-color-scheme: dark) {
    form {
      i {
        color: ${theme.colors.gray[300]} !important;
      }
      .input-el {
        background: ${theme.colors.gray[800]} !important;
        border-color: ${theme.colors.gray[700]} !important;
        color: ${theme.colors.gray[100]} !important;
        &::placeholder {
          color: ${theme.colors.gray[300]};
        }
      }
    }
  }
`

type ColorType = 'indigo' | 'teal' | 'white' | undefined

export const Container = styled.div`
  box-sizing: border-box;
  margin: auto;
  width: 100%;
  padding: 0 2rem;
  @media only screen and (min-width: 940px) {
    padding: 0 1.5rem;
    max-width: 1248px; // 1200 plus 2 x padding
  }
`

namespace S {
  export const defaultText = (footer: any) => css`
    color: ${footer.linkColor};
    font-size: ${footer.linkSize};
    font-weight: 400;
  `

  export const Container = styled.div<{ theme: any }>`
    position: absolute;
    left: 0;
    background-color: ${(props) => props.theme.footer.backgroundColor};
    padding: 72px 0 24px;
    width: 100%;
    @media only screen and (min-width: 768px) {
      padding: 46px 0 100px;
    }
  `

  export const Row = styled.div`
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI';
    @media only screen and (min-width: 940px) {
      display: flex;
    }
  `

  export const SocialLinksWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `

  export const PrismaLogo = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    .prisma-logo-img {
      margin-bottom: ${(props) => props.theme.space[8]};
    }
  `

  export const PrismaDataText = styled.div`
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI';
    ${(props) => defaultText(props.theme.footer)}
  `

  export const FooterWrapper = styled.div`
    display: flex;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI';
    flex-direction: column-reverse;
    @media only screen and (min-width: ${(props) => props.theme.breakpoints.tabletVertical}px) {
      flex-direction: column;
    }
  `

  export const NewsletterRow = styled.div`
    > h4 {
      margin-bottom: 16px;
      margin-right: 32px;
    }
    margin-bottom: 0;
    @media only screen and (min-width: ${(props) => props.theme.breakpoints.tabletVertical}px) {
      padding: 64px 0;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 64px;
      border-top: 1px solid ${(props) => props.theme.colors.gray[300]};
      border-bottom: 1px solid ${(props) => props.theme.colors.gray[300]};
    }
    @media only screen and (min-width: ${(props) => props.theme.breakpoints.tabletHorizontal}px) {
      margin-top: 64px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      > h4 {
        margin-bottom: 0;
      }
    }
  `

  export const Column = styled.div<{ flex?: number }>`
    margin-bottom: 48px;
    @media only screen and (min-width: ${(props) => props.theme.footer.mobileBreakpoint}px) {
      margin-bottom: 0;
      padding: 0 0.5rem;
      flex: ${(props) => props.flex || 1};
    }
  `

  export const Title = styled.h4`
    text-transform: uppercase;
    font-weight: 400;
    font-size: ${(props) => props.theme.footer.titleSize};
    color: ${(props) => props.theme.footer.titleColor};
    letter-spacing: 0.08em;
    margin-top: 0;
    margin-bottom: 1rem;
    @media only screen and (min-width: ${(props) => props.theme.footer.mobileBreakpoint}px) {
      margin-bottom: 0;
    }
  `

  type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    theme: any
    active?: boolean
    external?: boolean
    color?: ColorType
  }

  export const Link = ({ external, theme, color = 'indigo', ...rest }: LinkProps) => {
    return (
      <StyledLink {...rest} color={color} theme={theme} target={external ? '_blank' : '_self'}>
        {rest.children}
        {external && <Icon color="currentColor" icon={'fa-solid fa-arrow-up-right'} size="1rem" />}
      </StyledLink>
    )
  }

  const StyledLink = styled(CustomLink)<{
    color?: ColorType
  }>(
    ({ color = 'indigo' }) => css`
      ${(props) => defaultText(props.theme.footer)};
      display: flex;
      cursor: pointer;
      font-weight: 500;
      box-sizing: border-box;
      text-decoration: none;
      line-height: ${25 / 18};
      padding: 1rem 0;
      @media only screen and (min-width: ${(props) => props.theme.footer.mobileBreakpoint}px) {
        padding: 0.5rem 0;
      }
      &:hover {
        color: ${(props) => props.theme.footer.linkHoverColor[color]};
      }
      > i {
        margin: 5px 0 0 3px;
      }
      > span {
        margin-left: 6px;
      }
      .link-title-label {
        display: flex;
        align-items: center;
        .label {
          margin-left: 8px;
          background: ${theme.colors[color]['600']};
          border-radius: 99px;
          padding: 6px 8px;
          font-family: 'Barlow';
          font-style: normal;
          font-weight: 700;
          font-size: 8px;
          line-height: 100%;
          white-space: nowrap;
          /* identical to box height, or 8px */

          display: flex;
          align-items: center;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: white;
        }
      }
    `
  )

  export const SocialLinksContainer = styled.div<{
    color?: ColorType
    theme?: boolean
  }>(
    ({ color = 'indigo' }) => css`
      justify-content: start;
      gap: 20px;
      display: none;
      @media only screen and (min-width: 768px) {
        display: flex;
      }
      a {
        font-size: 1.375rem;
        color: ${(props) => props.theme.footer.linkColor};
        &:hover {
          color: ${(props) => props.theme.footer.linkHoverColor[color]};
        }
      }
      i {
        pointer-events: none;
      }
    `
  )
}

interface FooterProps {
  className?: string
  color?: ColorType
  lightTheme?: boolean
  absoluteLinks?: boolean
  newsletterComponent?: any
}

const FooterSec = ({
  className,
  lightTheme = false,
  absoluteLinks = true,
  newsletterComponent,
  color = 'indigo',
}: FooterProps) => {
  const themeToUse = lightTheme ? theme : darkTheme
  const newsletter = newsletterComponent ? (
    newsletterComponent
  ) : (
    <FooterNewsletterForm theme={themeToUse} color={color} />
  )
  return (
    <FooterWrapper>
      <S.Container theme={themeToUse} className={className}>
        <Container>
          <S.FooterWrapper theme={themeToUse}>
            <S.Row>
              <S.Column theme={themeToUse}>
                <S.Title theme={themeToUse}>Product</S.Title>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/client`}
                >
                  Client
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/migrate`}
                >
                  Migrate
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/data-platform/accelerate`}
                >
                  <div className="link-title-label">Accelerate</div>
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/data-platform/pulse`}
                >
                  <div className="link-title-label">
                    Pulse
                    <span className="label">Early Access</span>
                  </div>
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/pricing`}
                >
                  Pricing
                </S.Link>
              </S.Column>

              <S.Column theme={themeToUse}>
                <S.Title theme={themeToUse}>Developers</S.Title>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/docs`}
                >
                  Docs
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/docs/getting-started`}
                >
                  Get Started
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href="https://github.com/prisma/prisma-examples"
                  referrerPolicy="no-referrer"
                  external={true}
                >
                  Prisma Examples
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/dataguide`}
                >
                  Data Guide
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/stack`}
                >
                  Prisma in your Stack
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/support`}
                >
                  Support
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/community`}
                >
                  Community
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  referrerPolicy="no-referrer"
                  href="https://www.prisma-status.com"
                  external={true}
                >
                  Data Platform Status
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  referrerPolicy="no-referrer"
                  href="https://marketplace.visualstudio.com/items?itemName=Prisma.prisma"
                  external={true}
                >
                  VS Code Extension
                </S.Link>
              </S.Column>
              <S.Column theme={themeToUse}>
                <S.Title theme={themeToUse}>Use Cases</S.Title>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/showcase`}
                >
                  Customer Stories
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/enterprise`}
                >
                  Enterprise
                </S.Link>
              </S.Column>

              <S.Column theme={themeToUse}>
                <S.Title theme={themeToUse}>Company</S.Title>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/about`}
                >
                  About
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/blog`}
                >
                  Blog
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/careers`}
                >
                  Careers{' '}
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  href={`${absoluteLinks ? 'https://www.prisma.io' : ''}/events`}
                >
                  Events
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  referrerPolicy="no-referrer"
                  href="https://pris.ly/causes"
                  external={true}
                >
                  Causes
                </S.Link>
                <S.Link
                  color={color}
                  theme={themeToUse}
                  referrerPolicy="no-referrer"
                  external={true}
                  href="https://pris.ly/privacy"
                >
                  Terms & Privacy
                </S.Link>
              </S.Column>
            </S.Row>
            <S.NewsletterRow theme={themeToUse}>
              <S.Title theme={themeToUse}>Newsletter</S.Title>
              {newsletter}
            </S.NewsletterRow>
          </S.FooterWrapper>
          <S.SocialLinksWrapper>
            <S.PrismaLogo theme={themeToUse}>
              <div className="prisma-logo-img">
                <img src={themeToUse.footer.logoUrl} width={90} height={27} alt="prisma_logo" />
              </div>
              <S.PrismaDataText theme={themeToUse}>
                &copy; {new Date().getFullYear()} Prisma Data, Inc.
              </S.PrismaDataText>
            </S.PrismaLogo>
            <S.SocialLinksContainer theme={themeToUse} color={color}>
              <a href="https://discord.gg/KQyTW2H5ca" target="_blank" rel="noopener">
                <Icon color="currentColor" size="inherit" icon={'fa-brands fa-discord'} />
              </a>
              <a href="https://twitter.com/prisma" target="_blank" rel="noopener">
                <Icon color="currentColor" size="inherit" icon={'fa-brands fa-x-twitter'} />
              </a>
              <a href="https://www.youtube.com/c/PrismaData" target="_blank" rel="noopener">
                <Icon color="currentColor" size="inherit" icon={'fa-brands fa-youtube'} />
              </a>
              <a href="https://slack.prisma.io" target="_blank" rel="noopener">
                <Icon color="currentColor" size="inherit" icon={'fa-brands fa-slack'} />
              </a>
              <a href="https://github.com/prisma" target="_blank" rel="noopener">
                <Icon size="inherit" icon={'fa-brands fa-github'} color="currentColor" />
              </a>
            </S.SocialLinksContainer>
          </S.SocialLinksWrapper>
        </Container>
      </S.Container>
    </FooterWrapper>
  )
}

export default FooterSec
