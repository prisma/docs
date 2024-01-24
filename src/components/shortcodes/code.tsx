import rangeParser from 'parse-numeric-range'
import Highlight, { themes } from 'prism-react-renderer'
import * as React from 'react'
import styled from 'styled-components'

import Copy from '../../icons/Copy'
import { defaultTheme } from '../../themes'
import { stringify } from '../../utils/stringify'
import CopyButton from './copy'
import FileWithIcon from './fileWithIcon'

import './prism/index.css'

require('./prism/prism-prisma')

interface CodeProps {
  copy?: boolean
}

type PreCodeProps = CodeProps & React.ReactNode

const diffBgColorMap: any = {
  '+': 'var(--code-added-bg-color)',
  '-': 'var(--code-deleted-bg-color)',
  '|': 'var(--code-highlight-bg-color)',
  '✎': 'var(--code-edit-bg-color)',
}

const symColorMap: any = {
  '+': 'var(--code-added-color)',
  '-': 'var(--code-deleted-color)',
  '|': 'var(--code-highlight-color)',
  '✎': 'var(--code-highlight-color)',
}

const symbols: any = {
  normal: '|',
  add: '+',
  delete: '-',
  edit: '✎',
}

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

const propList = ['copy', 'bash-symbol', 'terminal', 'no-lines']

const Code = ({ children, className, ...props }: PreCodeProps) => {
  const codeEl = React.useRef<any>(null)
  const preEl = React.useRef<any>(null)
  let language = className && className.replace(/language-/, '')
  let breakWords = false
  const [debugState, setDebugState] = React.useState<string>('')

  let diffArray: any = []

  if (props && props.metastring && props.metastring.includes('highlight')) {
    const parts = props.highlight.split('|')
    parts.forEach((part: any) => {
      diffArray = [part.split(';'), ...diffArray]
    })
  }

  if (propList.includes(language) && !props['no-break-terminal']) {
    breakWords = true
  }

  const code = stringify(children)

  const hasCopy = props['copy'] || language === 'copy'
  const noCopy = props['no-copy']

  let hasNoLine = true
  const isTerminal = props['terminal'] || language === 'terminal'
  const wrapContent = props['wrap']
  const hasTerminalSymbol = props['bash-symbol'] || language === 'bash-symbol' || isTerminal
  const fileName = props['file'] || language === 'file'

  if (!fileName) {
    hasNoLine = true
  } else {
    hasNoLine = props['no-lines'] || language === 'no-lines'
  }

  const tokenCopyClass = `${hasCopy ? 'has-copy-button' : ''} ${breakWords ? 'break-words' : ''}`

  React.useEffect(() => {
    if (codeEl.current !== null && preEl.current !== null) {
      if (debugState.length === 0)
        setDebugState(
          `${codeEl.current.getBoundingClientRect().width},${preEl.current.getBoundingClientRect().width - 44
          }`
        )
    }
  }, [])

  return (
    <CodeWrapper className="codeWrapperDiv">
      {fileName && (
        <div className="file">
          <FileWithIcon text={fileName} icon="file" />
        </div>
      )}
      <div className="gatsby-highlight pre-highlight">
        <Highlight code={code} language={language} theme={themes.github}>
          {({ className: blockClassName, style, tokens, getLineProps, getTokenProps }) => (
            <Pre
              ref={preEl}
              className={`
                ${wrapContent ? 'wrap-content' : ''}
                ${blockClassName} 
                ${isTerminal ? 'is-terminal' : ''} 
                ${parseInt(debugState.split(',')[0]) <= parseInt(debugState.split(',')[1]) ||
                  wrapContent
                  ? `not-scrollable`
                  : ``
                }

              `}
              style={style}
            >
              {!noCopy && (
                <AbsoluteCopyButton className="copy-button">
                  <CopyButton text={code}>
                    <Copy className="light" />
                    <Copy fill="#1A202C" className="dark" />
                  </CopyButton>
                </AbsoluteCopyButton>
              )}
              <code
                ref={codeEl}
                style={{
                  width:
                    parseInt(debugState.split(',')[0]) <= parseInt(debugState.split(',')[1]) + 40 ||
                      wrapContent
                      ? 'auto'
                      : 'max-content',
                  overflow: 'visible',
                }}
              >
                {cleanTokens(tokens).map((line: any, i: number) => {
                  let lineClass = {
                    backgroundColor: '',
                    symbColor: '',
                    className: '',
                  }

                  let isDiff = false
                  let diffSymbol = ''
                  if (
                    (line[0] &&
                      line[0].content.length &&
                      (line[0].content[0] === '+' ||
                        (line[0].content[0] === '-' && line[0].content[1] !== '-') ||
                        line[0].content[0] === '|' ||
                        line[0].content[0] === '✎')) ||
                    (line[0] &&
                      line[0].content === '' &&
                      line[1] &&
                      (line[1].content === '+' ||
                        (line[1].content === '-' && line[2].content !== '-') ||
                        line[1].content === '|' ||
                        line[1].content === '✎'))
                  ) {
                    diffSymbol =
                      line[0] && line[0].content.length ? line[0].content[0] : line[1].content
                    lineClass = {
                      backgroundColor: diffBgColorMap[diffSymbol],
                      symbColor: symColorMap[diffSymbol],
                      className: '',
                    }
                    isDiff = true
                  }

                  if (diffArray.length !== 0) {
                    diffArray.forEach((arr: any) => {
                      if (rangeParser(arr[0]).includes(i + 1)) {
                        diffSymbol = symbols[arr[1]]
                        lineClass = {
                          backgroundColor: diffBgColorMap[diffSymbol],
                          symbColor: symColorMap[diffSymbol],
                          className: '',
                        }
                        isDiff = true
                        lineClass.className = 'highlighted-line'
                      }
                    })
                  }

                  const lineProps = getLineProps({ line, key: i })

                  lineProps.style = { ...lineClass }
                  lineProps.className = lineProps.className + ' ' + lineClass.className

                  return (
                    <Line key={line + i} {...lineProps}>
                      {hasTerminalSymbol && !isDiff && <LineNo className="line-no">$</LineNo>}
                      {!hasTerminalSymbol && !isDiff && !hasNoLine && (
                        <LineNo className="line-no">{i + 1}</LineNo>
                      )}
                      {isDiff && !hasNoLine && (
                        <LineNo className="line-no" style={{ color: lineClass.symbColor }}>
                          {['+', '-', '✎'].includes(diffSymbol) ? diffSymbol : i + 1}
                        </LineNo>
                      )}
                      <LineContent className={`${tokenCopyClass}`}>
                        {line.map((token: any, key: any) => {
                          if (isDiff) {
                            if (
                              (key === 0 || key === 1) &&
                              (token.content.charAt(0) === '+' ||
                                token.content.charAt(0) === '-' ||
                                token.content.charAt(0) === '|' ||
                                token.content.charAt(0) === '✎')
                            ) {
                              return (
                                <span
                                  {...getTokenProps({
                                    token: {
                                      ...token,
                                      content: token.content.slice(1),
                                    },
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
    </CodeWrapper>
  )
}

export default Code

const CodeWrapper = styled.div`
  margin-top: ${defaultTheme.space[24]};
  margin-bottom: ${defaultTheme.space[24]};
  .file {
    font-weight: 600;
    color: ${defaultTheme.colors.gray[600]};
    font-size: ${defaultTheme.fontSizes[14]};
    font-family: ${defaultTheme.fonts.text};
    margin-bottom: 0.5rem;
  }
`

const AbsoluteCopyButton = styled.div`
  transition: opacity 100ms ease;
  position: absolute;
  top: 20px;
  right: 16px;
  z-index: 2;

  > div {
    right: -${defaultTheme.space[8]};
    top: -6px;
  }

  .dark {
    display: none;
  }

  .light {
    display: block;
  }

  @media (prefers-color-scheme: dark) {
    .dark {
      display: block;
    }

    .light {
      display: none;
    }
  }
`

const Pre = styled.pre`
  margin-top: ${defaultTheme.space[32]};
  text-align: left;
  margin: 0 0 16px 0;
  padding: 2rem 1rem 1rem 1rem;
  webkit-overflow-scrolling: touch;
  overflow-x: visible;
  &.wrap-content {
    overflow-x: auto;
    code {
      white-space: break-spaces;
      .token-line {
        display: inline-flex;
        > span:last-child {
          align-self: center;
        }
      }
    }
  }
  &:not(.wrap-content) {
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #c5c6c8;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-corner {
      background-color: transparent;
      border-color: transparent;
    }
    &.not-scrollable {
      overflow-x: hidden;
      code {
        display: inline;
      }
    }
  }
`
const Line = styled.div`
  display: block;
  @media (prefers-color-scheme: dark) {
    &.highlighted-line {
      .token.plain {
        color: ${defaultTheme.colors.gray[900]};
      }
    }
  }
`

const LineNo = styled.span`
  font-weight: 500;
  line-height: ${defaultTheme.space[24]};
  color: ${defaultTheme.colors.gray[400]};
  display: inline-block;
  text-align: right;
  user-select: none;
  width: 24px;
`

const LineContent = styled.span`
  padding: 0 ${defaultTheme.space[16]};
  &.break-words {
    display: inline-table;
    white-space: break-spaces;
    width: 95%;
  }

  &.token-line {
    line-height: 1.3rem;
    height: 1.3rem;
  }
`
