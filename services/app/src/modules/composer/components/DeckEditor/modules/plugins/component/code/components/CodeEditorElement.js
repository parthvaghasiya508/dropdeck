import React, { useCallback } from 'react';
import { makeStyles } from "@material-ui/styles";
import { CODE } from "../type";

const styles = () => makeStyles((theme) => ({
  // code outer
  codeOuter: {
    backgroundColor: theme.dark() ? theme.palette.popover.border : `${theme.palette.gradient.stop00}aa`,
    border: '0px solid pink',
    boxSizing: 'border-box',
    padding: "0",
    margin: '0 0 0 -8px',
    width: '100%',
    borderRadius: 4,
    position: 'relative',
    // fade
    '&:after': {
      position: 'absolute',
      top: '0',
      bottom: '0',
      right: '0',
      width: '1rem',
      content: '""',
      background: theme.dark() ? `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${theme.palette.popover.border} 85%)` : `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${theme.palette.gradient.stop00}aa 85%)`,
      borderRadius: 4,
    },
  },
  // code
  root: {
    color: theme.palette.text.primary,
    borderRadius: 4,
    fontSize: "0.85em",
    boxSizing: 'border-box',
    padding: "8px",
    scrollbarWidth: 'thin',
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    overflowX: 'auto',
  },
  // code inner
  codeInner: {
    border: '0px solid yellow',
    flex: ' 0 0 auto',
  },

}), { meta: 'CodeElement' });
export const CodeEditorElement = ({ attributes, children }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  return (
    <div className={classes.codeOuter}>
      <code style={{ tabSize: 2 }} className={classes.root} {...attributes} data-slate-type={CODE}>
        <div className={classes.codeInner}>
          {children}
        </div>
      </code>
    </div>
  );
};
