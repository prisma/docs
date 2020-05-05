import React from 'react'
import styled from 'styled-components'

interface CodeProps {
  tabs?: any[]
}

type CodeBlockProps = CodeProps & React.ReactNode

const TabbedContent = ({ tabs, children }: CodeBlockProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const tabContent =
    children &&
    children.filter((child: any) => child.props && child.props.originalType === 'tab')[activeIndex]

  return (
    <Wrapper>
      {tabs && Array.isArray(tabs) && (
        <Tabs>
          {tabs.map((tab: any, index: number) => {
            const setCurrentActive = () => setActiveIndex(index)
            return (
              <div
                className={`tabHeading ${index === activeIndex ? 'active' : ''}`}
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
    color: #718096;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 3px 5px;
    svg {
      margin-right: 8px;
    }
  }

  .tabHeading.active {
    color: #1a202c;
    background: #edf2f7;
    border-radius: 5px;
  }
`
const Wrapper = styled.div`
  margin-top: 2rem;
  position: relative;

  tab > * {
    margin-top: 0.5em;
  }
`
