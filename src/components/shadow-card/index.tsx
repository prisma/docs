import React from 'react'
import styled from 'styled-components'

import { defaultTheme as theme } from '../../themes'

const CardLibWrapper = styled.div`
  box-shadow: 0px 5px 3px rgba(23, 43, 77, 0.04), 0px 8px 5px rgba(23, 43, 77, 0.08);
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  cursor: pointer;
  max-width: 100%;
  margin: 0;
  &:hover {
    transform: scale(1.02);
  }
  transition: transform 100ms ease;
  .content {
    padding: 32px 24px;
    text-align: left;
    p {
      color: #4a5568;
    }
    a {
      text-decoration: none;
    }

    &:hover .link > span:first-of-type {
      text-decoration: underline;
    }
  }

  @media (prefers-color-scheme: dark) {
    background: ${theme.colors.gray[900]};
  }
`

const ShadowCard = ({ starter, className, ...rest }: any) => (
  <CardLibWrapper className={className} {...rest}>
    {rest.children}
  </CardLibWrapper>
)

export default ShadowCard
