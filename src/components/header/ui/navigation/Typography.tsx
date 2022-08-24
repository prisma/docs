import styled from 'styled-components'
import * as t from '../../theme/primitives'

export const Heading = styled.span`
  color: ${t.colors.gray[600]};
  font-family: ${t.fonts.heading};
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1;
  text-transform: uppercase;
  margin: 0;
`

export const Text = styled.span`
  font-weight: 500;
  font-family: ${t.fonts.text};
  font-size: ${t.fontSizes['16']};
  line-height: 1.3;
  color: ${t.colors.blueGray['600']};
`

export const Link = styled.span`
  text-decoration: none;
  font-weight: 600;
  font-family: ${t.fonts.text};
  font-size: ${t.fontSizes['16']};
  color: ${t.colors.gray[800]};
  line-height: 1;
`
