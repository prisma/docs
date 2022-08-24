import styled, { css } from 'styled-components'
import * as React from 'react'
import { AnchorHTMLAttributes } from 'react'
import * as NT from './Typography'
import * as t from '../theme/primitives'
import theme from '../theme/default'
import { defaultTheme, darkTheme } from '../theme'

export const Panel = styled.div<{ width?: number; lightTheme: boolean }>(
  ({ width, lightTheme }) => {
    const themeToUse = lightTheme ? defaultTheme : darkTheme
    return css`
      width: ${width || 407}px;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: ${t.space['20']} 0 ${t.space['20']};
      background-color: ${themeToUse.header.mobileDropdownPanelBackgroundColor};
      @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
        background-color: white;
      }
    `
  }
)

export const SectionHeader = styled(NT.Heading.withComponent('h4'))<{
  lightTheme: boolean
}>(({ lightTheme }) => {
  const themeToUse = lightTheme ? defaultTheme : darkTheme
  return css`
    margin-top: ${33 / 16}rem;
    margin-bottom: ${t.space['18']};
    padding: 0 ${t.space['24']};
    color: ${themeToUse.header.mobileDropdownPanelHeadingColor};
    @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
      padding: 0 ${t.space['32']};
      color: ${t.gray['600']};
    }
    &:first-child {
      margin-top: ${t.space['12']};
    }
  `
})

export const ArticlesHeader = styled(NT.Heading.withComponent('h4'))`
  margin-top: 12px;
  margin-bottom: 32px;
`

export const Link = styled(NT.Link.withComponent('a'))<{
  lightTheme: boolean
  active?: boolean
}>(({ lightTheme, active }) => {
  const themeToUse = lightTheme ? defaultTheme : darkTheme
  return css`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 15px 24px;
    transition: color 0.1s ease;
    font-weight: 500;
    color: ${active ? t.indigo['600'] : themeToUse.header.mobileDropdownPanelLinkTitleColor};
    @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
      padding: 12px 12px;
      font-weight: 600;
      color: ${active ? t.indigo['600'] : t.colors.gray[800]};
    }
    &:hover {
      @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
        color: ${t.indigo['600']};
      }
    }
  `
})

const IconLinkStyles = styled.a<{
  titleOnlyOnMobile: boolean
  lightTheme: boolean
}>(({ titleOnlyOnMobile, lightTheme }) => {
  const themeToUse: any = lightTheme ? defaultTheme : darkTheme
  return css`
    cursor: pointer;
    display: flex;
    gap: 12px;
    align-items: start;
    text-decoration: none;

    padding: ${t.space['15']} ${t.space['24']} ${t.space['15']} ${t.space['24']};
    @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
      padding: ${t.space['12']} ${t.space['16']} ${t.space['12']} ${t.space['32']};
      margin-bottom: ${t.space['6']};
    }

    &:last-child {
      margin-bottom: 0;
    }

    .link-icon {
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      transition: background-color 0.1s ease;
      background-color: ${t.colors.blueGray['100']};
      border-radius: 5px;
      width: 38px;
      height: 38px;
      display: none;
      @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
        display: flex;
      }
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .link-title {
      transition: color 0.1s ease;
      line-height: 1;
      color: ${themeToUse.header.mobileDropdownPanelLinkTitleColor};
      margin-bottom: ${titleOnlyOnMobile ? 0 : t.space['4']};
      font-weight: ${titleOnlyOnMobile ? 500 : 600};
      @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
        color: ${t.colors.gray['800']};
        font-weight: 600;
        margin-bottom: ${t.space['4']};
      }
    }
    .link-subtitle {
      transition: color 0.1s ease;
      font-weight: 400;
      line-height: ${18 / 14};
      font-size: ${t.fontSizes['14']};
      display: ${titleOnlyOnMobile ? 'none' : 'initial'};
      color: ${themeToUse.header.mobileDropdownPanelLinkSubTitleColor};
      @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
        color: ${t.colors.gray['600']};
        display: initial;
      }
    }

    &:hover {
      @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
        .link-icon {
          background-color: ${t.colors.indigo['100']};
        }
        .link-title {
          color: ${t.colors.indigo['600']};
        }
        .link-subtitle {
          color: ${t.colors.indigo['400']};
        }
      }
    }

    &.active-link {
      .link-icon {
        background-color: ${t.colors.indigo['100']};
      }
      .link-title {
        color: ${t.colors.indigo['600']};
      }
      .link-subtitle {
        color: ${t.colors.indigo['400']};
      }
    }
  `
})
const LinkTitle = NT.Link.withComponent('div')
type IconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  icon: React.ReactNode
  title: React.ReactNode
  subtitle: React.ReactNode
  titleOnlyOnMobile?: boolean
  active?: boolean
  lightTheme: boolean
}
export const IconLink = ({
  href,
  icon,
  title,
  subtitle,
  titleOnlyOnMobile = false,
  active,
  lightTheme,
  ...rest
}: IconLinkProps) => {
  return (
    <IconLinkStyles
      {...rest}
      href={href}
      lightTheme={lightTheme}
      titleOnlyOnMobile={titleOnlyOnMobile}
      className={active ? 'active-link' : ''}
    >
      <div className="link-icon">{icon}</div>
      <div>
        <LinkTitle className="link-title">{title}</LinkTitle>
        <div className="link-subtitle">{subtitle}</div>
      </div>
    </IconLinkStyles>
  )
}

const ArticleLinkStyles = styled.a`
  display: flex;
  gap: 18px;
  margin-bottom: 32px;
  text-decoration: none;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
  .article-image {
    flex-shrink: 0;
    width: 148px;
  }
  p {
    transition: color 0.1s ease;
    margin: 0;
  }
  &:hover {
    p {
      color: ${t.indigo['600']};
    }
  }
`
const ArticleTitle = NT.Text.withComponent('p')
type ArticleLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  image: React.ReactNode
  title: React.ReactNode
}
export const ArticleLink = ({ image, title, ...rest }: ArticleLinkProps) => {
  return (
    <ArticleLinkStyles {...rest}>
      <div className="article-image">{image}</div>
      <ArticleTitle>{title}</ArticleTitle>
    </ArticleLinkStyles>
  )
}

export const HorizontalDivider = styled.div`
  height: 1px;
  margin: ${t.space['24']} ${t.space['32']} ${t.space['32']};
  background-color: ${t.colors.blueGray['300']};
  display: none;
  @media only screen and (min-width: ${defaultTheme.header.mobileNavigationBreakpoint}px) {
    display: block;
  }
`

export const VerticalDivider = styled.div`
  width: 1px;
  background-color: ${t.colors.blueGray['300']};
  margin: ${t.space['12']} 0;
  display: none;
  @media only screen and (min-width: ${defaultTheme.header.mobileNavigationBreakpoint}px) {
    display: block;
  }
`

export const Spacer = styled.div<{ height?: number; width?: number }>(
  ({ width, height }) => css`
    display: none;
    height: ${height + 'px' || 'initial'};
    width: ${width + 'px' || 'initial'};
    @media only screen and (min-width: ${defaultTheme.header.mobileNavigationBreakpoint}px) {
      display: block;
    }
  `
)
