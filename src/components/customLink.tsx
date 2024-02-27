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
  const target =
    href.includes('prisma.io') && !href.includes('slack.prisma.io') ? '_self' : '_blank'
  const rel = href.includes('prisma.io') ? '' : 'noopener noreferrer'

  return (
    <a href={href} target={target} rel={rel}>
      <CustomButton {...props} mdx={mdx}>
        {props.children}
      </CustomButton>
    </a>
  )
}

export default CustomLink
