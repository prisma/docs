import styled from 'styled-components'

export const Container = styled.div`
  box-sizing: border-box;
  margin: auto;
  width: 100%;
  padding: 0 2rem;
  @media only screen and (min-width: 940px) {
    padding: 0 1.5rem;
    max-width: 1248px; // 1200 plus 2 x padding
  }
`
