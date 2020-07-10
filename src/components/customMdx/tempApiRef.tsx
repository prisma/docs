import React from 'react'
import styled from 'styled-components'

type ApiRefProps = React.ReactNode

const ApiRef = ({ children, ...props }: ApiRefProps) => {
  return <ApiRefWrapper {...props}>{children}</ApiRefWrapper>
}

export default ApiRef

const ApiRefWrapper = styled.div`
  background: var(--code-bgd-color) !important;
  padding: 5px 24px;
  display: block;
  border-left: 8px solid var(--list-bullet-color);
  margin: 2rem 0px;
`
