import { defaultTheme as theme } from '@prisma/lens/dist/web'
import React from 'react'
import { AlertCircle } from 'react-feather'
import styled from 'styled-components'

interface AdmonitionType {
  type?: string
}

type AdmonitionProps = React.ReactNode & AdmonitionType

const colorMap: any = {
  info: theme.colors.gray[200],
  warning: theme.colors.orange[300],
  alert: theme.colors.red[600],
}

const Admonition = ({ children, type, ...props }: AdmonitionProps) => {
  return (
    <AdmonitionWrapper {...props} type={type}>
      {type === 'alert' && (
        <span className="alert-circle">
          <AlertCircle color="white" />
        </span>
      )}
      {children && Array.isArray(children) ? (
        <FlexContainer>
          {children.map((child: any, index: number) => (
            <ChildContainer key={index}>
              {child && child.props && child.props.children}
            </ChildContainer>
          ))}
        </FlexContainer>
      ) : (
        children
      )}
    </AdmonitionWrapper>
  )
}

export default Admonition

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ChildContainer = styled.div`
  margin: 0;

  li {
    margin-left: 24px;
    &:first-of-type {
      margin-top: 16px;
    }
    &:last-of-type {
      margin-bottom: 16px;
    }
  }
`

const AdmonitionWrapper = styled.span<{ type?: string }>`
  font-family: Inter;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.colors.gray[600]} !important;
  padding-left: ${(p) => (p.type === 'alert' ? '3rem' : '1.5rem')};
  padding-bottom: 8px;
  margin: 2rem 0px;
  position: relative;
  display: block;
  max-width: 100%;
  pre {
    font-weight: normal;
  }

  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 100%;
    left: 0px;
    background: ${(p) => (p.type ? colorMap[p.type] : colorMap['info'])} !important;
    border-radius: 5px;
  }

  &.alert {
    min-height: 50px;
  }

  .alert-circle {
    position: absolute;
    width: 34px;
    height: 100%;
    left: 0px;
    display: flex;
    justify-content: center;
    padding: 12px 0;
    background: ${(p) => (p.type ? colorMap[p.type] : colorMap['info'])} !important;
    border-radius: 5px;
  }

  code {
    color: ${theme.colors.gray[600]} !important;
  }

  p {
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[500]} !important;
  }
`
