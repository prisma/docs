import { css } from 'styled-components'
import * as t from './primitives'

type ColorType = 'indigo' | 'teal' | 'white'
type BtnType = 'primary' | 'secondary' | 'link'
export const buttonCss = (
  type: BtnType,
  color: ColorType,
  icon: undefined | 'left' | 'right',
  disabled: boolean,
  theme: any
) => {
  const btnType = theme.buttons[type]
  return css`
    display: inline-flex;
    justify-content: center;
    z-index: 1000;
    margin: 4px;
    width: max-content;
    align-items: center;
    box-sizing: border-box;
    border-radius: 6px;
    text-decoration: none;
    height: 48px;
    cursor: ${disabled ? 'auto' : 'pointer'};
    position: relative;
    line-height: 1;
    transition: ${theme.buttons[type].transition};
    font-family: ${theme.buttons[type].fontFamily};
    font-weight: ${theme.buttons[type].fontWeight};
    font-size: 18px;
    border: none;
    ${!disabled && `border: ${color ? btnType[color]?.border : theme.buttons[type].border};`}
    background-color: ${disabled
      ? t.colors.gray[300]
      : color
      ? btnType[color]?.backgroundColor
      : theme.buttons[type].backgroundColor};
    color: ${disabled
      ? t.colors.gray[600]
      : color
      ? btnType[color]?.color
      : theme.buttons[type].color};
    padding: ${type !== 'link'
      ? icon && !disabled
        ? icon === 'left'
          ? '16px 24px 16px 48px'
          : '16px 48px 16px 24px'
        : '16px 24px'
      : '0 20px 0 0'};
    ${!disabled
      ? `
    &:hover {
      ${
        type !== 'link' &&
        `border: ${color ? btnType[color]?.hover.border : theme.buttons[type].hover.border};`
      }
      background-color: ${
        color ? btnType[color]?.hover.backgroundColor : theme.buttons[type].hover.backgroundColor
      };
      color: ${btnType[color]?.hover.color};
      ${type !== 'primary' ? `border-color: ${btnType[color]?.hover.color};` : ``}
      &:before {
        background-color: ${color ? btnType[color]?.hover.color : theme.buttons[type].hover.color};
      }
      > span {
        transform: translateX(4px);
        &:before {
          background-color: ${
            color ? btnType[color]?.hover.color : theme.buttons[type].hover.color
          };
        }
        &:after {
          border-color: ${color ? btnType[color]?.hover.color : theme.buttons[type].hover.color};
        }
      }
  };`
      : ``}
    &:focus {
      &:after {
        content: '';
        position: absolute;
        width: calc(100% + 8px);
        height: calc(100% + 8px);
        left: -4px;
        top: -4px;
        border-radius: 8px;
        border: 2px solid ${t.colors.indigo[700]};
      }
    }
    &:active {
      ${type !== 'link' &&
      `border: ${color ? btnType[color]?.active.border : theme.buttons[type].active.border};`}
      background-color: ${color
        ? btnType[color]?.active.backgroundColor
        : theme.buttons[type].active.backgroundColor};
      color: ${btnType[color]?.active.color};
      ${type !== 'primary' ? `border-color: ${btnType[color]?.active.color};` : ``}
      &:before {
        background-color: ${color
          ? btnType[color]?.active.color
          : theme.buttons[type].active.color};
      }
      > span {
        transform: translateX(4px);
        &:before {
          background-color: ${color
            ? btnType[color]?.active.color
            : theme.buttons[type].active.color};
        }
        &:after {
          border-color: ${color ? btnType[color]?.active.color : theme.buttons[type].active.color};
        }
      }
    }
    ${type === 'link' &&
    `
    &:before {
      content: "";
      position: absolute;
      height: 2px;
      width: calc(100% + 6px);
      left: 0;
      bottom: -4px;
      background-color: ${color ? btnType[color]?.color : theme.buttons[type].color};
    };
  `}
  `
}

export const arrowIcon = (
  type: BtnType,
  color: ColorType,
  icon: undefined | 'left' | 'right',
  disabled: boolean,
  theme: any
) => {
  const btnType = theme.buttons[type]
  return `
    ${
      !disabled || type === 'link'
        ? `
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: transform 200ms;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      ${icon === 'left' ? `left: 24px` : type === 'link' ? `right: 0` : `right: 19px`};
      height: 1.5px;
      background-color: ${color ? btnType[color]?.color : theme.buttons[type].color};
    }
    &:after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      top: 50%;
      border-top: 1.5px solid ${color ? btnType[color]?.color : theme.buttons[type].color};
      border-right: 1.5px solid ${color ? btnType[color]?.color : theme.buttons[type].color};
      transform: translateY(-50%) rotate(45deg);
      ${icon === 'left' ? `left: 24px` : type === 'link' ? `right: 0` : `right: 19px`};
    }
  `
        : ``
    }
  `
}
