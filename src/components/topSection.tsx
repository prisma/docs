import * as React from 'react'
import styled from 'styled-components'
import TOC from './toc'
import ParentTitle from './parentTitleComp'
import SwitcherBlock from './switcherBlock'
import { useNavigate } from '@reach/router'

const TopSectionWrapper = styled.div`
  position: relative;
  hr.bigger-margin {
    margin-top: 3rem;
    margin-bottom: 3.5rem;
  }
  .tech-switch-block {
    position: relative;
  }
`

const MainTitle = styled.h1`
  font-family: 'Montserrat';
  font-size: 2rem !important;
  font-style: normal;
  font-weight: bold;
  letter-spacing: -0.02em;
  color: var(--main-font-color);
  margin: 0;
  margin-top: 4px;
  &.inline-code {
    font-size: 2rem;
    padding: 0px 0.2em;
    line-height: 3rem;
  }
  @media only screen and (max-width: 767px) {
    font-size: 24px;
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
  tocDepth,
  codeStyle,
}: any) => {
  return (
    <TopSectionWrapper>
      <ParentTitle slug={slug} />
      <MainTitle className={`${codeStyle ? 'inline-code' : ''}`}>{title}</MainTitle>
      <div className="tech-switch-block">
        {(dbSwitcher || langSwitcher || (toc && toc.items && toc.items.length) > 0) && (
          <hr className={`${langSwitcher || dbSwitcher ? 'bigger-margin' : ''}`} />
        )}
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
      {toc && toc.items && toc.items.length > 0 && <TOC headings={toc.items} tocDepth={tocDepth} />}
    </TopSectionWrapper>
  )
}

export default TopSection
