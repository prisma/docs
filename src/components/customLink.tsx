import * as React from 'react'
import styled from 'styled-components'

const CustomButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`

const CustomLink = ({ href, ...props }: any) => {
  const path = href.includes('https://www.prisma.io')
    ? href.replace('https://www.prisma.io', '')
    : href

  const goToPath = (e: any) => {
    //e.preventDefault()
    window.open(href, '_self')
  }
  return (
    <CustomButton
      onClick={goToPath}
      //href={href}
      //   href={href.includes('https://www.prisma.io') ? 'https://www.prisma.io' + path : path}
      {...props}
    />
  )
}

export default CustomLink
