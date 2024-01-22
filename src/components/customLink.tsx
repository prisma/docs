import * as React from 'react'
import styled from 'styled-components'

const CustomButton = styled.button<{ mdx?: string }>`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  ${(props) =>
    props.mdx &&
    `
    color: var(--link-color);
    cursor: pointer;
    text-decoration: underline;
  `};
`

const CustomLink = ({ href, mdx, ...props }: any) => {
  const goToPath = () => {
    window.open(
      href,
      href.includes('prisma.io') && !href.includes('slack.prisma.io') ? '_self' : '_blank',
      href.includes('prisma.io') ? '' : 'noopener'
    )
  }
  return (
    <CustomButton onClick={goToPath} {...props} mdx={mdx}>
      {props.children}
    </CustomButton>
  )
}

export default CustomLink
