import * as React from 'react';
import { EMPHASIS } from "../Marks";

const Emphasis = ({ attributes, children }) => <span className="emphasis" {...attributes}>{ children }</span>;

export const renderLeafEmphasis = (typeEm = EMPHASIS) => ({ children, leaf, attributes }) => {
  if (leaf[typeEm] && !!leaf.text) {
    return <Emphasis {...attributes}>{children}</Emphasis>;
  }
  return children;
};
