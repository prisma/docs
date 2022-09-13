import * as React from 'react'
import styled from 'styled-components'
import NewsLetter from '../components/newsletter'
import { FooterProps } from '../interfaces/Layout.interface'
import { WebsiteFooter } from '@prisma/lens/dist/web'

type FooterViewProps = {
  footerProps: FooterProps
}

const FooterWrapper = styled.div`
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${(p) => p.theme.colors.gray500};
  margin-top: 5rem;
  > div {
    width: 100%;
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
