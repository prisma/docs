import { defaultTheme } from '../'
import * as t from '../primitives'

type ColorType = 'indigo' | 'teal' | 'white'
type BtnType = 'primary' | 'secondary' | 'link' | undefined

export const buttonCss = (
  type: BtnType,
  color: ColorType,
  icon: undefined | 'left' | 'right',
  disabled: boolean,
  transparent: boolean
) => {
  const btnType = defaultTheme.buttons[type ?? 'primary']
  return `
  display: inline-flex;
  justify-content: center;
  max-width: 100%;
  text-align: left;
  z-index: 1000;
  margin: ${type !== 'link' ? '4px;' : icon === 'left' ? `4px 4px 4px 12px;` : `4px 12px 4px 4px;`}
  width: max-content;
  align-items: center;
  box-sizing: border-box;
  border-radius: 6px;
  text-decoration: none;
  cursor: ${disabled ? 'auto' : 'pointer'};
  position: relative;
  line-height: 1;
  transition: ${btnType.transition};
  font-family: ${btnType.fontFamily};
  font-weight: ${btnType.fontWeight};
  font-size: 18px;
  border: none;
  ${!disabled ? `border: ${color ? btnType[color]?.border : btnType.border};` : ``}
  background-color: ${
    disabled
      ? t.colors.gray[300]
      : transparent
        ? 'transparent !important'
        : color
          ? btnType[color]?.backgroundColor
          : btnType.backgroundColor
  };
  color: ${
    disabled
      ? t.colors.gray[600]
      : color
        ? transparent
          ? btnType[color]?.backgroundColor
          : btnType[color]?.color
        : transparent
          ? btnType.backgroundColor
          : btnType.color
  };
  padding: ${
    type !== 'link'
      ? !icon
        ? '16px 24px'
        : icon === 'left'
          ? '16px 24px 16px 40px'
          : '16px 40px 16px 24px'
      : icon === 'left'
        ? '0 0 0 10px'
        : '0 10px 0 0'
  };
  ${
    icon === 'left'
      ? `
    flex-direction: row-reverse;
  `
      : ``
  }
  ${
    !disabled
      ? `
    &:hover {
      ${
        type !== 'link' && `border: ${color ? btnType[color]?.hover.border : btnType.hover.border};`
      }
      background-color: ${
        color ? btnType[color]?.hover.backgroundColor : btnType.hover.backgroundColor
      };
      color: ${btnType[color]?.hover[transparent ? `backgroundColor` : `color`]};
      ${type !== 'primary' ? `border-color: ${btnType[color]?.hover.color};` : ``}
      &:before {
        background-color: ${color ? btnType[color]?.hover.color : btnType.hover.color};
      }
      > .btn-arrow {
        transform: translate(4px, -50%);
      }
  };`
      : ``
  }
  &:focus {
    &:after {
      content: "";
      position: absolute;
      ${
        type === 'link'
          ? `
            width: calc(100% + 20px);
            height: calc(100% + 20px);
            left: -8px;
            top: -8px;
          `
          : `
            width: calc(100% + 4px);
            height: calc(100% + 4px);
            left: -4px;
            top: -4px;
          `
      }
      border-radius: 9px;
      box-sizing: content-box;
      border: 2px solid ${color ? btnType[color]?.hover.color : btnType.hover.color};
    }
  }
  &:active {
    ${
      type !== 'link' && !disabled
        ? `border: ${color ? btnType[color]?.active.border : btnType.active.border};`
        : ``
    }
    background-color: ${
      !disabled
        ? color
          ? btnType[color]?.active.backgroundColor
          : btnType.active.backgroundColor
        : t.colors.gray[300]
    };

    color: ${
      !disabled
        ? btnType[color]?.active[transparent ? `backgroundColor` : `color`]
        : t.colors.gray[600]
    };
    ${
      type !== 'primary' && !disabled
        ? `border-color: ${btnType[color]?.active[transparent ? `backgroundColor` : `color`]};`
        : ``
    }
    &:before {
      background-color: ${
        color
          ? btnType[color]?.active[transparent ? `backgroundColor` : `color`]
          : btnType.active.color
      };
    }
  }
  ${
    type === 'link' &&
    `
      &:before {
        content: "";
        position: absolute;
        height: 2px;
        width: calc(100% - 9px);
        ${icon === 'left' ? `right: 0;` : `left: 0;`}
        bottom: -4px;
        background-color: ${color ? btnType[color]?.color : btnType.color};
      };
    `
  }
`
}
