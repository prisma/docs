import * as React from 'react'

const CustomLink = ({ href, ...props }: any) => {
  return <a href={href} {...props} />
}

export default CustomLink
