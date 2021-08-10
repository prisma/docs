import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  padding: 1rem;
  background-color: ${(p) => p.theme.colors.gray100};
  border-radius: 8px;
  min-height: 100px;
  margin: 2rem 0;
  position: relative;

  &::before {
    content: '💡';
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    top: -15px;
    left: -10px;
    width: 50px;
    height: 50px;
    border-bottom-right-radius: 50%;
    background-color: white;
    z-index: 999;
  }

  & > div {
    margin-left: 1.5rem;
  }
`

const Tip = ({ children }: any) => {
  return (
    <Wrapper>
      <div>{children}</div>
    </Wrapper>
  )
}

export default Tip
