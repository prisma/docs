import { defaultTheme as theme } from '../../themes'
import * as React from 'react'
import styled from 'styled-components'

interface CodeProps {
  languages?: string[]
}

type CodeBlockProps = CodeProps & React.ReactNode

const CodeBlock = ({ languages, children }: CodeBlockProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const child: any = React.Children.toArray(children)[activeIndex]
  const code = child && child.props && child.props.children

  return (
    <Wrapper>
      {languages && Array.isArray(languages) && (
        <Tabs>
          {languages.map((lang, index) => {
            const setCurrentActive = () => setActiveIndex(index)
            return (
              <div
                className={`tab ${index === activeIndex ? 'active' : ''}`}
                key={lang}
                data-index={`${index}`}
                onClick={setCurrentActive}
              >
                {lang}
              </div>
            )
          })}
        </Tabs>
      )}
      {code}
    </Wrapper>
  )
}

export default CodeBlock

const Tabs = styled.div`
  display: flex;
  .tab {
    margin-right: 10px;
    color: ${theme.colors.gray[600]};
    cursor: pointer;
  }

  .tab.active {
    font-weight: 600;
    color: ${theme.colors.gray[900]};
  }

  @media (prefers-color-scheme: dark) {
    .tab.active {
      color: ${theme.colors.gray[500]};
    }
  }
`
const Wrapper = styled.div`
  margin-top: 2rem;
  position: relative;
`
