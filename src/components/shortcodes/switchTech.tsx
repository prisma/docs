import * as React from 'react'
import styled from 'styled-components'

interface CodeProps {
  technologies?: string[]
}

type CodeBlockProps = CodeProps & React.ReactNode
let c = 0
const SwitchTech = ({ technologies, children }: CodeBlockProps) => {
  c++
  return (
    <SwitchWrapper id={`techswitch-${technologies.join('-')}-no-${c}`}>{children}</SwitchWrapper>
  )
}

export default SwitchTech

const SwitchWrapper = styled.section`
  display: none;
  position: relative;
  &.show {
    display: block;
  }
`
