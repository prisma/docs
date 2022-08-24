import { AnchorHTMLAttributes, HTMLAttributes } from 'react'
import { css } from 'styled-components'
import { buttonCss, arrowIcon } from '../theme/css/button'
import { defaultTheme } from '../theme'
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
  return href ? (
    <a css={buttonCss(type, color, icon, disabled, defaultTheme)} href={href} {...rest}>
      {rest.children}
      {(type === 'link' || icon) && (
        <span css={arrowIcon(type, color, icon, disabled, defaultTheme)} />
      )}
    </a>
  ) : (
    <button css={buttonCss(type, color, icon, disabled, defaultTheme)} {...rest}>
      {rest.children}
      {(type === 'link' || icon) && (
        <span css={arrowIcon(type, color, icon, disabled, defaultTheme)} />
      )}
    </button>
  )
}
