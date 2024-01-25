import { defaultTheme as theme } from '../../themes'
import * as React from 'react'
import styled from 'styled-components'

type TableProps = React.ReactNode

const Table = ({ children, ...props }: TableProps) => {
  const tableContent = React.useRef<any>(null)
  const tableWrapper = React.useRef<any>(null)
  const [widthState, setWidthState] = React.useState<String>('')

  React.useEffect(() => {
    if (tableContent.current !== null && tableWrapper.current !== null) {
      if (widthState.length === 0)
        setWidthState(
          `${tableContent.current.getBoundingClientRect().width},${
            tableWrapper.current.getBoundingClientRect().width
          }`
        )
    }
  }, [tableContent.current, tableWrapper.current])

  return (
    <TableWrapper
      className={
        parseInt(widthState.split(',')[0]) <= parseInt(widthState.split(',')[1])
          ? `not-scrollable`
          : ``
      }
      ref={tableWrapper}
    >
      <table {...props} ref={tableContent}>
        {children}
      </table>
    </TableWrapper>
  )
}

export default Table

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 1em;
  @media (min-width: 0px) and (max-width: ${theme.breakpoints.tabletVertical}) {
    margin-right: -${theme.space[24]};
    margin-left: -${theme.space[24]};

    table {
      border-left: 0;
      border-right: 0;
      border-radius: 0 !important;
    }
  }
  @media (prefers-color-scheme: dark) {
    table,
    th,
    td,
    tr {
      border-color: ${theme.colors.gray[800]};
      color: ${theme.colors.gray[100]};
    }
  }

  code.inline-code,
  .inline-code,
  inlinecode {
    font-size: 13px;
  }
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #c5c6c8;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
    border-color: transparent;
  }
  &.not-scrollable {
    overflow-x: hidden;
    code {
      display: inline;
    }
  }
`
