import styled from 'styled-components'
import * as t from './themePrimitives'

export const Button = styled.a`
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
  cursor: pointer;
  position: relative;
  line-height: 1;
  transition: background-color 0.1s ease, color 0.2s ease;
  color: ${t.colors.text};
  font-family: ${t.fonts.text};
  font-weight: 500;
  border: 1px solid #5a67d8;
  background-color: #5a67d8;
  color: white;
  padding: 16px 24px;
  font-size: 18px;
  &:hover {
    border: 1px solid #4c51bf;
    background-color: #4c51bf;
    color: white;
  }
`
