import { defaultTheme as theme } from '@prisma/lens/dist/web'
import * as React from 'react'
import styled from 'styled-components'

type TableProps = React.ReactNode

const Table = ({ children, ...props }: TableProps) => {
  return (
    <TableWrapper>
      <table {...props}>{children}</table>
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
`
