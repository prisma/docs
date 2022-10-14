import * as React from 'react'
import styled from 'styled-components'
import { FooterProps } from '../interfaces/Layout.interface'
import { WebsiteFooter } from '@prisma/lens/dist/web'
import { FooterNewsletterForm } from './footer/FooterNewsletterForm'
import { defaultTheme } from './footer/theme'

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
  return (
    <FooterWrapper>
      <WebsiteFooter newsletterComponent={<FooterNewsletterForm theme={defaultTheme} />} />
    </FooterWrapper>
  )
}

export default FooterSec
