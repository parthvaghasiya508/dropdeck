import React from "react";
import { MARK_LOGO_NODE, MARK_LOGO_STATUS } from "./decorateLogoDomain";

export const renderLeafWithCapsule = ({ children, leaf }) => {
  if (leaf[MARK_LOGO_NODE]) {
    const status = leaf[MARK_LOGO_STATUS] ? leaf[MARK_LOGO_STATUS] : "missing";
    return (
      <div className="logo">
        <span className={status}>
          {children}
        </span>
      </div>
    );
  }
  return children;
};
