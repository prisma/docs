import React from 'react'
import styled from 'styled-components'

interface ExpandedProps {
  expanded?: boolean
}
type CodeWithResultProps = React.ReactNode & ExpandedProps

const CodeWithResult = ({ children, expanded }: CodeWithResultProps) => {
  const [showResult, setShowResult] = React.useState(expanded)
  const cmd =
    children && children.filter((child: any) => child.props && child.props.mdxType === 'Cmd')
  const result =
    children && children.filter((child: any) => child.props && child.props.mdxType === 'CmdResult')

  const toggleResult = () => setShowResult(!showResult)

  return (
    <Wrapper>
      <div className="cmd">{cmd}</div>
      <div className="result">
        <div onClick={toggleResult} className="show-btn">
          {showResult ? `Hide CLI output` : `Show CLI output`}
        </div>
        {showResult && <div className="result-code">{result}</div>}
      </div>
    </Wrapper>
  )
}

export default CodeWithResult

const Wrapper = styled.div`
  margin-top: 2rem;
  .cmd .pre-highlight pre {
    border-radius: 8px 8px 0px 0px;
  }

  .result {
    background-color: var(--main-font-color) !important;
    color: var(--code-inline-bgd-color) !important;
    border-radius: 0px 0px 8px 8px;
    margin-top: -13px;

    pre {
      background-color: var(--main-font-color) !important;
      color: var(--code-inline-bgd-color) !important;

      .token.plain {
        color: var(--code-inline-bgd-color) !important;
      }

      border-radius: 0px 0px 8px 8px;
      margin-top: 0;
    }

    .show-btn {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 100%;
      letter-spacing: 0.01em;
      color: var(--code-inner-color);
      height: 24px;
      display: flex;
      padding-left: 1rem;
      align-items: center;
      cursor: pointer;
    }
  }
`