// @ts-nocheck
import React, { AnchorHTMLAttributes, HTMLAttributes } from 'react'
import styled from 'styled-components'

import { buttonCss } from '../../themes/css/button'

type ColorType = 'indigo' | 'teal' | 'white' | undefined
type BtnType = 'primary' | 'secondary' | 'link' | undefined

export type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    type?: BtnType
    color?: ColorType
    icon?: undefined | 'left' | 'right'
    disabled?: boolean
    transparent?: boolean
    external?: boolean
    href?: string
  }

const StyledLink = styled.a`
  ${(props) => buttonCss(props.type, props.color, props.icon, props.disabled, props.transparent)}
`
const StyledBtn = styled.button`
  ${(props) => buttonCss(props.type, props.color, props.icon, props.disabled, props.transparent)}
`
const StyledIcon = styled.svg`
  fill: currentColor;
  color: inherit;
  transition: transform 0.2s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  path {
    transition: left, right 0.2s ease;
    fill: inherit;
  }
  ${(props) =>
    props.type !== 'link'
      ? props.icon === 'left'
        ? `
      left: 16px;
  `
        : `
    right: 16px;
  `
      : props.icon === 'left'
        ? `
    left: -10px;
`
        : `
  right: -6px;
`}
`

export const Button = ({
  type = 'primary',
  color = 'indigo',
  icon = undefined,
  disabled = false,
  href = undefined,
  external = false,
  ...rest
}: ButtonProps) => {
  return href ? (
    <StyledLink
      href={href}
      type={type}
      color={color}
      icon={icon}
      disabled={disabled}
      {...(external && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      {...rest}
    >
      {rest.children}
      {(type === 'link' || icon) && (
        <StyledIcon
          className="btn-arrow"
          xmlns="http://www.w3.org/2000/svg"
          width={external ? `10` : `12`}
          viewBox={`0 0 ${external ? `320 512` : `448 512`}`}
          disabled={disabled}
          external={external}
          icon={icon}
          type={type}
          color={color}
        >
          {external ? (
            <path d="M320 128c0-17.7-14.3-32-32-32L64 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l146.7 0L9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 205.3 256 352c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224z" />
          ) : (
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          )}
        </StyledIcon>
      )}
    </StyledLink>
  ) : (
    <StyledBtn href={href} type={type} color={color} icon={icon} disabled={disabled} {...rest}>
      {rest.children}
      {(type === 'link' || icon) && (
        <StyledIcon
          className="btn-arrow"
          xmlns="http://www.w3.org/2000/svg"
          width={external ? `9` : `12`}
          viewBox={`0 0 ${external ? `320 512` : `448 512`}`}
          disabled={disabled}
          external={external}
          icon={icon}
          type={type}
          color={color}
        >
          {external ? (
            <path d="M320 128c0-17.7-14.3-32-32-32L64 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l146.7 0L9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 205.3 256 352c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224z" />
          ) : (
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          )}
        </StyledIcon>
      )}
    </StyledBtn>
  )
}
