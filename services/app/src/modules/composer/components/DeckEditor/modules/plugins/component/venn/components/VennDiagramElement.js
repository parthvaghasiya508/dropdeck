import React from "react";

export const VennDiagramElement = ({ element, children, attributes }) => (
  <div>
    <ul {...attributes}>
      {children}
    </ul>
  </div>
);
