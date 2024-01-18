import { defaultTheme as theme } from '../theme'
import * as React from 'react'
import styled from 'styled-components'

import ParentTitle from './parentTitleComp'
import SwitcherBlock from './switcherBlock'

const TopSectionWrapper = styled.div`
  position: relative;

  .tech-switch-block {
    position: relative;
  }

  @media (min-width: 0px) and (max-width: ${theme.breakpoints.mobile}) {
    .tech-switch-block {
      width: 100%;
    }
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  @media (min-width: 0px) and (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: baseline;
  }
`

const MainTitle = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes[40]} !important;
  font-style: normal;
  font-weight: bold;
  letter-spacing: -0.02em;
  color: ${theme.colors.gray[900]};
  margin: 0;
  margin-top: 4px;
  &.inline-code {
    font-size: ${theme.fontSizes[32]};
    padding: 0px 0.2em;
    line-height: 3rem;
  }
  @media (min-width: 0px) and (max-width: ${theme.breakpoints.tabletVertical}) {
    font-size: ${theme.fontSizes[24]};
  }

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[100]};
  }
`

const TopSection = ({
  location,
  navigate,
  title,
  slug,
  langSwitcher,
  dbSwitcher,
  codeStyle,
  hideTitle = false,
}: any) => {
  return (
    <TopSectionWrapper>
      <ParentTitle slug={slug} />
      <Header>
        <div className="title">
          {!hideTitle ? (
            <MainTitle className={`${codeStyle ? 'inline-code' : ''}`}>{title}</MainTitle>
          ) : null}
        </div>
        <div className="tech-switch-block">
          {(langSwitcher || dbSwitcher) && (
            <SwitcherBlock
              langSwitcher={langSwitcher}
              dbSwitcher={dbSwitcher}
              navigate={navigate}
              location={location}
              slug={slug}
            />
          )}
        </div>
      </Header>
    </TopSectionWrapper>
  )
}

export default TopSection
