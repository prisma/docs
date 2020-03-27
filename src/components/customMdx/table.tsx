import React from 'react';
import styled from 'styled-components';

type TableProps = React.ReactNode;

const Table = ({ children, ...props }: TableProps) => {
  return (
    <TableWrapper>
      <table {...props}>{children}</table>
    </TableWrapper>
  );
};

export default Table;

const TableWrapper = styled.div`
  overflow-x: auto;
`;
