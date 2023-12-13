import * as React from 'react'

const CustomLink = ({ href, ...props }: any) => {
  const path = href.includes('https://www.prisma.io')
    ? href.replace('https://www.prisma.io', '')
    : href
  return (
    <a
      href={href.includes('https://www.prisma.io') ? 'https://www.prisma.io' + path : path}
      {...props}
    />
  )
}

export default CustomLink
