import { Footer } from '@prisma/lens/dist/web'
import * as React from 'react'
import styled from 'styled-components'

import { FooterProps } from '../interfaces/Layout.interface'
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
      <Footer />
    </FooterWrapper>
  )
}

export default FooterSec
