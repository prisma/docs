import React from 'react'
import styled from 'styled-components'
import { defaultTheme } from '../../theme'
import { Icon } from '../Icon'

export const Database = ({ color }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="14"
    viewBox="0 0 448 512"
    style={{ marginRight: `4px`, transform: `translateY(2px)` }}
  >
    <path
      fill={color ? color : 'currentColor'}
      d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"
    />
  </svg>
)

export const Bolt = ({ color }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="14"
    viewBox="0 0 448 512"
    style={{ marginRight: `4px`, transform: `translateY(2px)` }}
  >
    <path
      fill={color ? color : 'currentColor'}
      d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"
    />
  </svg>
)

export const SignalStream = ({ color }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="18"
    viewBox="0 0 576 512"
    style={{ marginRight: `4px`, transform: `translateY(2px)` }}
  >
    <path
      fill={color ? color : 'currentColor'}
      d="M108.2 71c13.8 11.1 16 31.2 5 45C82.4 154.4 64 203 64 256s18.4 101.6 49.1 140c11.1 13.8 8.8 33.9-5 45s-33.9 8.8-45-5C23.7 386.7 0 324.1 0 256S23.7 125.3 63.2 76c11.1-13.8 31.2-16 45-5zm359.7 0c13.8-11.1 33.9-8.8 45 5C552.3 125.3 576 187.9 576 256s-23.7 130.7-63.2 180c-11.1 13.8-31.2 16-45 5s-16-31.2-5-45c30.7-38.4 49.1-87 49.1-140s-18.4-101.6-49.1-140c-11.1-13.8-8.8-33.9 5-45zM232 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm-27.5-74.7c-17.8 19.8-28.5 46-28.5 74.7s10.8 54.8 28.5 74.7c11.8 13.2 10.7 33.4-2.5 45.2s-33.4 10.7-45.2-2.5C129 342.2 112 301.1 112 256s17-86.2 44.8-117.3c11.8-13.2 32-14.3 45.2-2.5s14.3 32 2.5 45.2zm214.7-42.7C447 169.8 464 210.9 464 256s-17 86.2-44.8 117.3c-11.8 13.2-32 14.3-45.2 2.5s-14.3-32-2.5-45.2c17.8-19.8 28.5-46 28.5-74.7s-10.8-54.8-28.5-74.7c-11.8-13.2-10.7-33.4 2.5-45.2s33.4-10.7 45.2 2.5z"
    />
  </svg>
)

export const BorderBoxWrapper = styled.div<{ border: boolean }>`
  padding: 24px 24px 32px 24px;
  border-radius: 8px;
  background: var(--main-bgd-color);
  > * {
    font-family: Inter;
    text-align: left;
    letter-spacing: 0em;
    line-height: 20px;
    font-size: 14px;
    :first-child {
      margin-top: 0;
    }
    :last-child {
      margin-bottom: 0;
    }
  }
`

export const BoxTitle = styled.h1<{}>`
  font-family: Barlow, system-ui, Arial, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 2.5rem !important;
  line-height: 48px;
  letter-spacing: -0.8px;
`

export const BorderBox = ({ border, ...props }: any) => (
  <BorderBoxWrapper {...props}>{props.children}</BorderBoxWrapper>
)

export const CategoryTitle = styled.div`
  font-family: Barlow;
  font-size: 32px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.800000011920929px;
  text-align: left;
  margin: 60px 0 24px;
  svg {
    width: 21px;
    height: 24px;
    transform: translateY(-1px);
    margin-right: 10px !important;
    color: ${defaultTheme.colors.indigo[600]};
  }
`

const LinkCardWrapper = styled.a`
  border: 1px solid var(--border-color);
  padding: 20px 24px;
  border-radius: 8px;
  color: var(--main-font-color);
  transition: all 300ms ease-out;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  &:hover {
    background: var(--main-bgd-color);
    border-color: #5a67d8;
  }
  .title {
    display: inline-block;
    h6 {
      font-size: 18px;
      display: inline-block;
      margin: 0;
      font-family: Barlow;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
    }
  }
  p {
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    margin-bottom: 0;
    text-align: left;
  }
`

export const Grid = styled.div`
  gap: 16px;
  display: grid;
  grid-template-columns: none;
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const LinkCard = ({ icon, title, desc, link }: any) => {
  return (
    <LinkCardWrapper href={link}>
      <div className="title">
        <Icon icon={icon} btn="left" size="18px" />
        <h6>{title}</h6>
      </div>
      <p>{desc}</p>
    </LinkCardWrapper>
  )
}

export const Tab = styled.div`
  padding: 15px;
  background-color: var(--main-bgd-color);
  border: 1px solid ${defaultTheme.colors.indigo[600]};
  border-radius: 0px 8px 8px 8px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  p {
    margin-top: 0;
  }
`

const SquareWrapper = styled.div`
  width: 90px;
  height: 90px;
  padding: 22px;
  display: inline-block;
  border: 1px solid var(--border-color);
  background: var(--header-bg-color);
  border-radius: 8px;
  transition: all 300ms ease-out;
  cursor: pointer;
  &:hover {
    background: var(--main-bgd-color);
    border-color: ${defaultTheme.colors.indigo[600]};
  }
  &:active,
  &:focus {
    background: var(--code-inline-bgd-color);
    border-color: ${defaultTheme.colors.indigo[700]};
  }
  svg {
    width: 100%;
    height: 100%;
  }
`

export const SquareLogo = ({ image, alt }: any) => {
  return <SquareWrapper>{image}</SquareWrapper>
}

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
`
