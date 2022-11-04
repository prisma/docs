import styled from 'styled-components'
import Button from './Button'
import { theme } from '../../theme'

export const SecondaryButton = styled(Button)`
  background: ${theme.colors.gray300};
  color: ${theme.colors.text};
  &:hover {
    background: ${theme.colors.gray200};
  }
`
