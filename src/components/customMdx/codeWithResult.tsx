import React from 'react'
import styled from 'styled-components'

type CodeWithResultProps = React.ReactNode

const CodeWithResult = ({ children }: CodeWithResultProps) => {
  const [showResult, setShowResult] = React.useState(false)
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
  margin-top: ${p => p.theme.space[32]};
  .cmd .pre-highlight pre {
    border-radius: 8px 8px 0px 0px;
  }

  .result {
    background: ${p => p.theme.colors.gray300};
    border-radius: 0px 0px 8px 8px;
    margin-top: -13px;

    pre {
      background: ${p => p.theme.colors.gray300} !important;
      border-radius: 0px 0px 8px 8px;
      margin-top: 0;
    }

    .show-btn {
      font-family: ${p => p.theme.fonts.text};
      font-style: normal;
      font-weight: 600;
      font-size: ${p => p.theme.fontSizes[12]};
      line-height: 100%;
      letter-spacing: 0.01em;
      color: ${p => p.theme.colors.gray600};
      height: 24px;
      display: flex;
      padding-left: ${p => p.theme.space[16]};
      align-items: center;
      cursor: pointer;
    }
  }
`
