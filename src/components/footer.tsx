import * as React from 'react'
import styled from 'styled-components'

import { Footer } from '../components/footer/Footer'
import { FooterProps } from '../interfaces/Layout.interface'
import { FooterNewsletterForm } from './footer/FooterNewsletterForm'
import { defaultTheme as theme } from './footer/theme'

type FooterViewProps = {
  footerProps: FooterProps
}

const FooterWrapper = styled.div`
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${theme.colors.gray[500]};
  margin-top: 5rem;
  > div {
    width: 100%;
  }
`

const FooterSec = ({ footerProps }: FooterViewProps) => {
  return (
    <FooterWrapper>
      <Footer newsletterComponent={<FooterNewsletterForm theme={theme} />} />
    </FooterWrapper>
  )
}

export default FooterSec
