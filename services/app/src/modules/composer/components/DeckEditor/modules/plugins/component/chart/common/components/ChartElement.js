import React from "react";

export const ChartElement = ({ element, children, attributes }) => (
  <div>
    <ul {...attributes}>
      {children}
    </ul>
  </div>
);
