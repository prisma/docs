import styled, { css } from 'styled-components'
import { AnchorHTMLAttributes, HTMLAttributes } from 'react'
import { buttonCss, arrowIcon } from './theme/button'
import { defaultTheme } from './theme'
import * as React from 'react'

type ColorType = 'indigo' | 'teal' | 'white'
type TypeBtn = 'primary' | 'secondary' | 'link'

type BtnType = {
  type?: TypeBtn
  color?: ColorType
  icon?: undefined | 'left' | 'right'
  disabled?: boolean
  href?: string
}

type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  BtnType

export const Button = ({
  type = 'primary',
  color = 'indigo',
  icon = undefined,
  disabled = false,
  href = undefined,
  ...rest
}: ButtonProps) => {
  const BtnLink = styled.a`
    ${buttonCss(type, color, icon, disabled, defaultTheme)}
  `
  const BtnNormal = styled.button`
    ${buttonCss(type, color, icon, disabled, defaultTheme)}
  `
  const ArrowComp = styled.span`
    ${arrowIcon(type, color, icon, disabled, defaultTheme)}
  `
  return href ? (
    <BtnLink href={href} {...rest}>
      {rest.children}
      {(type === 'link' || icon) && <ArrowComp />}
    </BtnLink>
  ) : (
    <BtnNormal {...rest}>
      {rest.children}
      {(type === 'link' || icon) && <ArrowComp />}
    </BtnNormal>
  )
}
