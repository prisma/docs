 import * as React from 'react'
import styled from 'styled-components'
import TechnologySwitch from './techSwitcher'
import ParentTitle from './parentTitleComp'
import SwitcherBlock from './switcherBlock'

const TopSectionWrapper = styled.div`
  position: relative;
  hr.bigger-margin {
    margin-top: ${p => p.theme.space[48]};
    margin-bottom: 3.5rem;
  }

  @media only screen and (max-width: 767px) {
    hr.bigger-margin {
      margin-bottom: 6rem;
    }
  }
  .tech-switch-block {
    position: relative;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MainTitle = styled.h1`
  font-family: ${p => p.theme.fonts.display};
  font-size: ${p => p.theme.fontSizes[32]} !important;
  font-style: normal;
  font-weight: bold;
  letter-spacing: -0.02em;
  color: ${p => p.theme.colors.gray900};
  margin: 0;
  margin-top: 4px;
  &.inline-code {
    font-size: ${p => p.theme.fontSizes[32]};
    padding: 0px 0.2em;
    line-height: 3rem;
  }
  @media only screen and (max-width: ${p => p.theme.breakpoints.tablet}) {
    font-size: ${p => p.theme.fontSizes[24]};
  }
`

const SwitcherWrapper = styled.div`
  display: flex;
  @media only screen and (max-width: ${p => p.theme.breakpoints.tablet}) {
    flex-direction: column;
    width: 100%;
    top: -30px;
  }
`

const TopSection = ({
  location,
  title,
  slug,
  langSwitcher,
  dbSwitcher,
  navigate,
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
        {/* <SwitcherWrapper>
          {langSwitcher && (
            <TechnologySwitch
              type="lang"
              onChangeTech={langChanged}
              technologies={langSwitcher}
              defaultTech={langSelected}
            />
          )}
          {dbSwitcher && (
            <TechnologySwitch
              type="db"
              onChangeTech={dbChanged}
              technologies={dbSwitcher}
              defaultTech={dbSelected}
            />
          )}
        </SwitcherWrapper> */}
        {/* {(dbSwitcher || langSwitcher || (toc && toc.items && toc.items.length) > 0) && (
          <hr className={`${langSwitcher || dbSwitcher ? 'bigger-margin' : ''}`} />
        )} */}
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
