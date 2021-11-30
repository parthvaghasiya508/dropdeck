import React from "react";

export const TableRowElement = ({
  element,
  attributes,
  children,
}) => (
  <tr {...attributes}>{ children }</tr>
);
