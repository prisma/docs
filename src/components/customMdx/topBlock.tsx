import React from 'react'
import styled from 'styled-components'

type TopBlockProps = React.ReactNode

const TopBlock = ({ children, ...props }: TopBlockProps) => {
  return <TopBlockWrapper {...props}>{children}</TopBlockWrapper>
}

export default TopBlock

const TopBlockWrapper = styled.div`
  background: ${p => p.theme.colors.white};
  box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.05), 0px 1px 3px rgba(47, 55, 71, 0.1);
  border-radius: ${p => p.theme.radii.small};
  padding: ${p => p.theme.space[32]} ${p => p.theme.space[40]};
  margin-top: -${p => p.theme.space[8]};
  border-top: 1px solid ${p => p.theme.colors.gray300};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`
