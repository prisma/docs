import { useLocation } from '@reach/router'
import { withPrefix } from 'gatsby'
import isAbsoluteUrl from 'is-absolute-url'
import * as path from 'path-browserify'
import * as React from 'react'
import styled from 'styled-components'

import ArrowRight from '../../icons/ArrowRight'
import { defaultTheme as theme } from '../../theme'

export interface ButtonProps {
  href?: string
  target?: string
  block?: boolean
  color?: ButtonColor
  disabled?: boolean
  arrow?: boolean
  children?: any
  onClick?: any
  arrowLeft?: boolean
  theme?: any
}

type ButtonColor = 'red' | 'green' | 'grey' | 'grey-bg' | 'dark'
const colorMap = {
  red: '#ffffff',
  green: '#ffffff',
  grey: '#3d556b',
  'grey-bg': '#ffffff',
  dark: '#ffffff',
}

const backgroundColorMap: any = {
  red: '#ff4f56',
  green: '#ff4f56',
  grey: '#ffffff',
  'grey-bg': '#8fa6b2',
  dark: 'rgb(12, 52, 75)',
}

export const ButtonWrapper = styled.a<{ block?: boolean; disabled?: boolean; color?: ButtonColor }>`
  padding: 11px 14px;
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
  ${(p) => (p.block ? 'width: 100%;' : '')}
  border: none;
  text-decoration: none;
  height: 40px;
  font-size: ${theme.fontSizes[16]};
  box-sizing: border-box;
  outline: none;
  opacity: ${(p) => (p.disabled ? '0.2' : 1)};
  text-transform: uppercase;
  letter-spacing: 0.4px;
  background: ${(p) => backgroundColorMap[p.color || 'green']};
  color: ${(p) => colorMap[p.color || 'green']} !important;
  line-height: 1;
  font-size: 14px;
  font-weight: 700;
  cursor: ${(p) => (p.disabled ? 'default' : 'pointer')};
  pointer-events: ${(p) => (p.disabled ? 'none' : 'all')};
  border-radius: 6px;
  transition: color 150ms ease 0s, background 150ms ease 0s, transform 100ms ease 0s;
  white-space: nowrap;
  word-break: keep-all;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 0.5rem;

  transition: opacity 0.3s ease;
  -webkit-transition: opacity 0.3s ease;
  -moz-transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`

const getAbsPath = (href: any, location: any) => {
  return withPrefix(
    path
      .resolve(
        location.pathname
          .replace('/docs', '')
          .replace('docs', '')
          .replace(/\/$/, '')
          .split(path.sep)
          .slice(0, -1)
          .join(path.sep) || '/',
        href
      )
      .replace(/\/?(\?|$)/, '/$1')
      .replace(/\/$/, '')
  )
}
const ButtonLink = ({ href, ...props }: ButtonProps) => {
  const location = useLocation()
  const newHref = isAbsoluteUrl(href || '') ? href : getAbsPath(href, location)
  return (
    <ButtonWrapper href={newHref} {...props}>
      {props.arrowLeft && <StyledArrowLeft />}
      {props.children}
      {props.arrow && <StyledArrow />}
    </ButtonWrapper>
  )
}

const StyledArrow = styled(ArrowRight)`
  margin-left: 12px;
`

const StyledArrowLeft = styled(ArrowRight)`
  margin-right: 12px;
  transform: rotate(180deg);
`

export const Database = (
  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
    <path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z" />
  </svg>
)

export default ButtonLink
