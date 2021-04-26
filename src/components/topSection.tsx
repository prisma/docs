import * as React from 'react'
import styled from 'styled-components'
import ParentTitle from './parentTitleComp'
import SwitcherBlock from './switcherBlock'

const TopSectionWrapper = styled.div`
  position: relative;

  .tech-switch-block {
    position: relative;
  }

  @media (min-width: 0px) and (max-width: ${(p) => p.theme.breakpoints.phone}) {
    .tech-switch-block {
      width: 100%;
    }
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 0px) and (max-width: ${(p) => p.theme.breakpoints.phone}) {
    flex-direction: column;
    align-items: baseline;
  }
`

const MainTitle = styled.h1`
  font-family: ${(p) => p.theme.fonts.display};
  font-size: ${(p) => p.theme.fontSizes[40]} !important;
  font-style: normal;
  font-weight: bold;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.gray900};
  margin: 0;
  margin-top: 4px;
  &.inline-code {
    font-size: ${(p) => p.theme.fontSizes[32]};
    padding: 0px 0.2em;
    line-height: 3rem;
  }
  @media (min-width: 0px) and (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    font-size: ${(p) => p.theme.fontSizes[24]};
  }
`

const TopSection = ({
  location,
  navigate,
  title,
  slug,
  langSwitcher,
  dbSwitcher,
  toc,
  codeStyle,
}: any) => {
  return (
    <TopSectionWrapper>
      <Header>
        <div className="title">
          <ParentTitle slug={slug} />
          <MainTitle className={`${codeStyle ? 'inline-code' : ''}`}>{title}</MainTitle>
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
