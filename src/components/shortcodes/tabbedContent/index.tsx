import { defaultTheme as theme } from '../../../theme'
import * as React from 'react'
import styled from 'styled-components'

import { defaultOSIndex } from './DefaultTabOS'

enum DefaultTabType {
  OS = 'OS',
}

interface CodeProps {
  tabs?: any[]
  defaultTabType?: DefaultTabType
  gettingStarted?: boolean
  children?: any
}

type CodeBlockProps = CodeProps & React.ReactNode

const TabbedContent = ({ tabs, defaultTabType, gettingStarted, children }: CodeBlockProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const tabContent =
    children &&
    children.filter((child: any) => child.props && child.props.originalType === 'tab')[activeIndex]

  React.useEffect(() => {
    if (tabs && tabs.length > 1) {
      // check if any default tab behaviour has been stipulated
      switch (defaultTabType) {
        case DefaultTabType.OS: {
          setActiveIndex(defaultOSIndex(tabs))
          break
        }
        default: {
          break
        }
      }
    } // else the current default of [0] will remain
  }, [])

  return (
    <Wrapper>
      {tabs && Array.isArray(tabs) && (
        <Tabs>
          {tabs.map((tab: any, index: number) => {
            const setCurrentActive = () => setActiveIndex(index)
            return (
              <div
                className={`tabHeading ${index === activeIndex ? 'active' : ''} ${
                  gettingStarted ? `getting-started` : ``
                }`}
                key={index}
                data-index={`${index}`}
                onClick={setCurrentActive}
              >
                {tab}
              </div>
            )
          })}
        </Tabs>
      )}
      {tabContent}
    </Wrapper>
  )
}

export default TabbedContent

const Tabs = styled.div`
  display: flex;
  .tabHeading {
    margin-right: 10px;
    font-weight: 600;
    color: ${theme.colors.gray[600]};
    cursor: pointer;
    font-size: ${theme.fontSizes[14]};
    display: flex;
    align-items: center;
    padding: 3px 5px;
    svg {
      margin-right: ${theme.space[8]};
    }
    &.getting-started {
      padding: 6px 12px;
      margin-right: 4px;
      border-radius: 4px 4px 0 0 !important;
      background-color: var(--border-color);
    }
  }

  .tabHeading.active {
    color: ${theme.colors.gray[900]};
    background: ${theme.colors.gray[100]};
    border-radius: ${theme.radii.small};
    svg path {
      stroke: ${theme.colors.gray[600]};
    }
    &.getting-started {
      background-color: ${theme.colors.indigo[600]};
      color: var(--white-color);
    }
  }
`
const Wrapper = styled.div`
  margin-top: ${theme.space[24]};
  position: relative;
  font-size: ${theme.fontSizes[14]};

  tab pre > * {
    margin-top: 0.5em;
  }
`
