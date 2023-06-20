import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

interface IconProps {
  icon: IconProp
  color?: string
  className?: string
  width?: string
  height?: string
  btn?: boolean
}

const FontAwesomeIconHolder = styled(FontAwesomeIcon)<{
  width: string
  height: string
  btn: boolean
}>`
  ${(props) => (props.width !== '100%' ? `max-width: ${props.width}` : ``)};
  ${(props) => (props.height !== '100%' ? `max-height: ${props.height}` : ``)};
  ${(props) => (props.btn ? `margin-left: 8px;` : '')}
  height: 100%;
  width: 100%;
`

export const Icon = ({ icon, color, className, width, height, btn }: IconProps) => (
  <FontAwesomeIconHolder
    className={className}
    icon={icon}
    color={color ? color : 'currentColor'}
    width={width ? width : 'unset'}
    height={height ? height : 'unset'}
    btn={btn ? btn : false}
  />
)
