import * as React from 'react';
import { MATH_MARK } from "../Marks";

const Code = ({ attributes, children }) => <span className="inlineCode" {...attributes}>{ children }</span>;

export const renderLeafMath = (typeCode = MATH_MARK) => ({ children, leaf, attributes }) => {
  if (leaf[typeCode] && !!leaf.text) {
    return <Code {...attributes}>{children}</Code>;
  }
  return children;
};
