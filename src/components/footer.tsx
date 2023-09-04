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
  > div {
    width: 100%;
  }
  form {
    i {
      color: ${theme.colors.gray[300]} !important;
    }
    .input-el {
      background: ${theme.colors.gray[800]} !important;
      border-color: ${theme.colors.gray[700]} !important;
      color: ${theme.colors.gray[100]} !important;
      &::placeholder {
        color: ${theme.colors.gray[300]};
      }
    }
  }
`

const FooterSec = ({ footerProps }: FooterViewProps) => {
  return (
    <FooterWrapper>
      <Footer lightTheme={false} />
    </FooterWrapper>
  )
}

export default FooterSec
