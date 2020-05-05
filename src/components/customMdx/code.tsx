import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import CopyButton from './copy'
import Copy from '../../icons/Copy'
import { stringify } from '../../utils/stringify'
import styled from 'styled-components'
import './prism/index.css'
require('./prism/prism-prisma')

interface CodeProps {
  copy?: boolean
}

type PreCodeProps = CodeProps & React.ReactNode

function cleanTokens(tokens: any[]) {
  const tokensLength = tokens.length
  if (tokensLength === 0) {
    return tokens
  }
  const lastToken = tokens[tokensLength - 1]

  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1)
  }
  return tokens
}

const Code = ({ children, className, ...props }: PreCodeProps) => {
  let language = className && className.replace(/language-/, '')
  if (language == undefined) {
    language = 'bash'
  }
  const code = stringify(children)

  const hasCopy = props['copy'] || language === 'copy'
  const hasLineNo = props['line-number'] || language === 'line-number'
  const hasTerminalSymbol = props['bash-symbol'] || language === 'bash-symbol'

  const tokenCopyClass = hasCopy ? 'has-copy-button' : ''

  return (
    <>
      <div className="gatsby-highlight pre-highlight">
        <Highlight {...defaultProps} code={code} language={language} theme={theme}>
          {({ className: blockClassName, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={blockClassName} style={style}>
              {(props['copy'] || language === 'copy') && (
                <AbsoluteCopyButton className="copy-button">
                  <CopyButton text={code}>
                    <Copy />
                  </CopyButton>
                </AbsoluteCopyButton>
              )}
              <code>
                {cleanTokens(tokens).map((line: any, i: number) => {
                  let lineClass = {
                    backgroundColor: '',
                    symbColor: '',
                  }

                  let isDiff = false
                  let diffSymbol = ''
                  if (line[0] && line[0].content.length && line[0].content[0] === '+') {
                    lineClass = { backgroundColor: '#D9F4E6', symbColor: '#47BB78' }
                    isDiff = true
                    diffSymbol = '+'
                  } else if (line[0] && line[0].content.length && line[0].content[0] === '-') {
                    lineClass = { backgroundColor: '#F5E4E7', symbColor: '#E53E3E' }
                    isDiff = true
                    diffSymbol = '-'
                  } else if (line[0] && line[0].content.length && line[0].content[0] === '|') {
                    lineClass = { backgroundColor: '#E2E8F0', symbColor: '#A0AEC0' }
                    isDiff = true
                    diffSymbol = '|'
                  } else if (
                    line[0] &&
                    line[0].content === '' &&
                    line[1] &&
                    line[1].content === '+'
                  ) {
                    lineClass = { backgroundColor: '#D9F4E6', symbColor: '#47BB78' }
                    isDiff = true
                    diffSymbol = '+'
                  } else if (
                    line[0] &&
                    line[0].content === '' &&
                    line[1] &&
                    line[1].content === '-'
                  ) {
                    lineClass = { backgroundColor: '#F5E4E7', symbColor: '#E53E3E' }
                    isDiff = true
                    diffSymbol = '-'
                  } else if (
                    line[0] &&
                    line[0].content === '' &&
                    line[1] &&
                    line[1].content === '|'
                  ) {
                    lineClass = { backgroundColor: '#E2E8F0', symbColor: '#A0AEC0' }
                    isDiff = true
                    diffSymbol = '|'
                  }
                  const lineProps = getLineProps({ line, key: i })

                  lineProps.style = { ...lineClass } // display: isDiff ? 'flex': 'table-row'
                  return (
                    <Line key={line + i} {...lineProps}>
                      {hasTerminalSymbol && !isDiff && <LineNo>$</LineNo>}
                      {hasLineNo && !isDiff && <LineNo>{i + 1}</LineNo>}
                      {isDiff && (
                        <LineNo style={{ color: lineClass.symbColor }}>
                          {diffSymbol !== '|' ? diffSymbol : i + 1}
                        </LineNo>
                      )}
                      <LineContent className={`${tokenCopyClass}`}>
                        {line.map((token: any, key: any) => {
                          if (isDiff) {
                            if (
                              ((key === 0 || key === 1) &&
                                (token.content.charAt(0) === '+' ||
                                  token.content.charAt(0) === '-')) ||
                              token.content.charAt(0) === '|'
                            ) {
                              return (
                                <span
                                  {...getTokenProps({
                                    token: { ...token, content: token.content.slice(1) },
                                    key,
                                  })}
                                />
                              )
                            }
                          }
                          return <span {...getTokenProps({ token, key })} />
                        })}
                      </LineContent>
                    </Line>
                  )
                })}
              </code>
            </Pre>
          )}
        </Highlight>
      </div>
    </>
  )
}

export default Code

const AbsoluteCopyButton = styled.div`
  transition: opacity 100ms ease;
  position: absolute;
  top: 20px;
  right: 16px;
  z-index: 2;
  > div {
    right: -8px;
    top: -6px;
  }
`

const Pre = styled.pre`
  margin-top: 2rem;
  text-align: left;
  margin: 0 0 16px 0;
  padding: 2rem 1rem 1rem 1rem;
  overflow: auto;
  webkit-overflow-scrolling: touch;
`
const Line = styled.div`
  display: table-row;
`

const LineNo = styled.span`
  font-weight: 500;
  line-height: 24px;
  color: #cbd5e0;
  display: table-cell;
  text-align: right;
  padding-left: 1em;
  user-select: none;
  width: 24px;
`

const LineContent = styled.span`
  display: table-cell;
  padding: 0 1em;
  white-space: break-spaces;
  &.token-line {
    line-height: 1.3rem;
    height: 1.3rem;

    .has-copy-button {
      width: 95%;
      overflow-x: auto;
      &::-webkit-scrollbar {
        height: 0;
      }
    }
  }
`
