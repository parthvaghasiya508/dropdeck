import React, { useEffect } from "react";
import { ProgressSpinner } from "../../../../../../components/ProgressSpinner";
import Logos from "../../../../../../../../../../common/api/sdk/services/Logos";

export const LogoSearch = ({ query, onSubmit, children, onCancel }) => {
  useEffect(() => {
    Logos.get(query)
      .then((payload) => {
        onSubmit(payload);
      })
      .catch((e) => {
        onCancel();
      });

  }, []);
  return (
    <React.Fragment>
      <ProgressSpinner/>
      {children}
    </React.Fragment>
  );
};
