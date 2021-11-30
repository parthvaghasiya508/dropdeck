import * as React from 'react';
import { CODE_MARK } from "../Marks";

const Code = ({ attributes, children }) => <span className="inlineCode" {...attributes}>{ children }</span>;

export const renderLeafCode = (typeCode = CODE_MARK) => ({ children, leaf, attributes }) => {
  if (leaf[typeCode] && !!leaf.text) {
    return <Code {...attributes}>{children}</Code>;
  }
  return children;
};
