import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import CopyButton from './copy'
import Copy from '../../icons/Copy'
import { stringify } from '../../utils/stringify'
import styled from 'styled-components'

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
  if (language === 'prisma') {
    language = 'sql'
  } else if (language == undefined) {
    language = 'shell'
  }
  const code = stringify(children)

  const tokenCopyClass = props['copy'] || language === 'copy' ? 'has-copy-button' : ''

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
                {cleanTokens(tokens).map((line: any, i: number) => (
                  <div {...getLineProps({ line, key: i })}>
                    <div className={tokenCopyClass}>
                      {line.map((token: any, key: any) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  </div>
                ))}
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
  top: 24px;
  right: 16px;
  z-index: 2;
  > div {
    right: -8px;
    top: -2px;
  }
`

export const Pre = styled.pre`
  margin-top: 2rem;
  text-align: left;
  margin: 0 0 16px 0;
  padding: 2rem 1rem 1rem 1rem;
  overflow: auto;
  word-wrap: normal;
  webkit-overflow-scrolling: touch;

  & .token-line {
    line-height: 1.3rem;
    height: 1.3rem;
    font-size: 15px;

    .has-copy-button {
      width: 95%;
      overflow-x: auto;
      &::-webkit-scrollbar {
        height: 0;
      }
    }
  }
`
