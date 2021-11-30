import * as React from 'react';
import styled from 'styled-components';

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TableElement = ({
  element,
  attributes,
  children,
}) => (
  <StyledTable {...attributes}>
    <tbody>{children}</tbody>
  </StyledTable>
);
