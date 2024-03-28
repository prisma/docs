import * as theme from '../css/primitives'
import * as React from 'react'
import styled from 'styled-components'

import SwitcherBlock from './shortcodes/switcherBlock'

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


const TopSection = ({
  location,
  slug,
  langSwitcher,
  dbSwitcher,
}: any) => {
  return (
    <TopSectionWrapper>
      <Header>
        <div className="tech-switch-block">
          {(langSwitcher || dbSwitcher) && (
            <SwitcherBlock
              langSwitcher={langSwitcher}
              dbSwitcher={dbSwitcher}
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
