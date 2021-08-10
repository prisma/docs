import Link from '../components/link'
import * as React from 'react'
import styled from 'styled-components'
import { WebsiteFooter } from '@prisma/lens/dist/web'
import NewsLetter from '../components/newsletter'

type FooterViewProps = {
  footerProps: FooterProps
}

const FooterWrapper = styled.div`
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${(p) => p.theme.colors.gray500};
  > * {
    .group {
      a {
        color: currentcolor !important;
        text-decoration: none;

        &:hover {
          color: ${(p) => p.theme.colors.gray600} !important;
        }
      }
    }
    @media (min-width: 0px) and (max-width: ${(p) => p.theme.breakpoints.tablet}) {
      flex-direction: column;
      padding: ${(p) => p.theme.fontSizes[48]} 0.5rem;
    }
  }
`

const FooterSec = ({ footerProps }: FooterViewProps) => {
  const { newsletter } = footerProps
  return (
    <FooterWrapper>
      <WebsiteFooter newsletterComponent={<NewsLetter newsletter={newsletter} />} />
    </FooterWrapper>
  )
}

export default FooterSec
