import React from 'react'
import styled from 'styled-components'
import File from '../../icons/File'
import Display from '../../icons/Display'
import Code from '../../icons/Code'
import Database from '../../icons/Database'

interface CodeProps {
  tabs?: TabItem[]
}

const icons = {
  file: <File />,
  database: <Database />,
  display: <Display />,
  code: <Code />,
}

interface TabItem {
  icon: keyof typeof icons
  text: string
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
          {tabs.map((tab: TabItem, index: number) => {
            const setCurrentActive = () => setActiveIndex(index)
            return (
              <div
                className={`tabHeading ${index === activeIndex ? 'active' : ''}`}
                key={index}
                data-index={`${index}`}
                onClick={setCurrentActive}
              >
                {icons[tab.icon]}
                {tab.text}
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
    padding: 3px 5px;
    font-size: 14px;
    display: flex;
    align-items: center;
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
