import React from 'react'
import CopyButton from './copy'
import Copy from '../../icons/Copy'
import { stringify } from '../../utils/stringify'
import styled from 'styled-components'
import Highlight from 'react-highlight'

interface CodeProps {
  copy?: boolean
}

type PreCodeProps = CodeProps & React.ReactNode

const HighlightCode = (props: PreCodeProps) => {
  const language = props.className.split('-')[1]
  const code = stringify(props.children)
  return (
    <>
      <div className="pre-highlight">
        {(props['copy'] || language === 'copy') && (
          <AbsoluteCopyButton className="copy-button">
            <CopyButton text={code}>
              <Copy />
            </CopyButton>
          </AbsoluteCopyButton>
        )}
        <Highlight language={language}>{props.children}</Highlight>
      </div>
    </>
  )
}

export default HighlightCode

const AbsoluteCopyButton = styled.div`
  transition: opacity 100ms ease;
  position: absolute;
  top: 24px;
  right: 16px;
  z-index: 2;
  > div {
    right: -8px;
    top: -12px;
  }
`
