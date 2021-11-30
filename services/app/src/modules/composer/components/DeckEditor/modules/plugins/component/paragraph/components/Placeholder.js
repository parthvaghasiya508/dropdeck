import React from "react";

export const Placeholder = () => (
  <div contentEditable={false} style={{ display: 'inline', userSelect: 'none' }}>
    ...try typing &lsquo;<strong>image</strong>&rsquo;, or hit &lsquo;<strong>/</strong>&rsquo; for more options!
  </div>
);
