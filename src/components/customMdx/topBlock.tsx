import * as React from 'react'
import styled from 'styled-components'

type TopBlockProps = {
  children: any
}

const TopBlock = ({ children, ...props }: TopBlockProps) => {
  return <section {...props}>{children}</section>
}

export default TopBlock

// const TopBlockWrapper = styled.section`
//   /* padding: ${(p) => p.theme.space[4]} ${(p) => p.theme.space[40]}; */
// `
