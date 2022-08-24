import { css } from 'styled-components'
import * as React from 'react'
import { HTMLAttributes } from 'react'
import theme from '../theme/default'

type LabelType = 'default' | 'primary' | 'secondary'
type LabelProps = HTMLAttributes<HTMLSpanElement> & {
  type?: LabelType
}

export const Label = ({ type = 'default', ...rest }: LabelProps) => {
  const label = theme.labels[type]
  return (
    <span
      css={css`
        border-radius: ${label.borderRadius};
        background-color: ${label.backgroundColor};
        padding: ${label.padding};
        color: ${label.color};
        font-size: ${label.fontSize};
        line-height: 1;
        display: inline-block;
        font-weight: 600;
      `}
      {...rest}
    />
  )
}
