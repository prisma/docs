import * as React from 'react'
import styled from 'styled-components'

interface Props {
  isFirstLink?: boolean
}

const ButtonContainer = styled.section<Props>`
  display: flex;
  justify-content: ${(props) => (props.isFirstLink ? 'flex-end' : 'space-between')};
  align-items: center;
  padding: 1rem 0 1rem 0;
  border-top: solid 2px ${(p) => p.theme.colors.gray100};
  padding-top: 2rem;
  margin: 2rem 0;

  @media (max-width: 992px) {
    flex-direction: column;

    & > a {
      margin-bottom: 1.5rem;
    }
  }
`

const NavigationLinksContainer: React.FC<Props> = ({ children, isFirstLink }) => {
  return <ButtonContainer isFirstLink={isFirstLink}>{children}</ButtonContainer>
}

export default NavigationLinksContainer
