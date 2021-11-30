import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import Label from "./controls/Label";

const KeyboardButtonLabel = ({ children }) => (
  <Label variant="inherit" className="keyboard">{children}</Label>
);
export default KeyboardButtonLabel;
