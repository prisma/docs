import * as React from 'react'
import styled from 'styled-components'
import { WebsiteFooter } from '@prisma/lens/dist/web'

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
  // > * {
  //   .group {
  //     a {
  //       color: currentcolor !important;
  //       text-decoration: none;

  //       &:hover {
  //         color: ${(p) => p.theme.colors.gray600} !important;
  //       }
  //     }
  //   }
  //   @media (min-width: 0px) and (max-width: ${(p) => p.theme.breakpoints.tablet}) {
  //     flex-direction: column;
  //     padding: ${(p) => p.theme.fontSizes[48]} 0.5rem;
  //   }
  // }
`

const FooterSec = () => {
  return (
    <FooterWrapper>
      <WebsiteFooter />
    </FooterWrapper>
  )
}

export default FooterSec
