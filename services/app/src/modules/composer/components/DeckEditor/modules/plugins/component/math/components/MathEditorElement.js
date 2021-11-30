import React, { useCallback } from 'react';
import { makeStyles } from "@material-ui/styles";

const styles = () => makeStyles((theme) => ({
  root: {
    margin: '-2px 0 0 -8px',
    backgroundColor: theme.dark() ? theme.palette.popover.border : `${theme.palette.gradient.stop00}aa`,
    color: theme.palette.text.primary,
    padding: "6px 8px",
    borderRadius: 4,
    fontSize: "0.85em",
    whiteSpace: 'unset',
    wordBreak: 'break-all',
  },
}), { meta: 'MathElement' });
export const MathEditorElement = ({ attributes, children }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  return (<pre style={{ tabSize: 2 }} className={classes.root} {...attributes}>{children}</pre>);
};
