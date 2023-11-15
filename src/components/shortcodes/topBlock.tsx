import React from 'react'

type TopBlockProps = {
  children: any
}

const TopBlock = ({ children, ...props }: TopBlockProps) => {
  return <section {...props}>{children}</section>
}

export default TopBlock
