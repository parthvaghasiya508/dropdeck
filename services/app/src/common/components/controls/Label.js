import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const styles = () => makeStyles((theme) => ({
  root: {
    pointerEvents: 'none',
    cursor: 'default',
    userSelect: 'none'
  },
}));

/**
 * Label text for UI. Removes user select and cursor changes.
 *
 * @param children
 * @param variant
 * @param className
 * @param style
 * @param color
 * @returns {JSX.Element}
 * @constructor
 */
const Label = ({ children, variant, className, style, color = "textPrimary" }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  if (variant === "span") {
    return <span className={`${classes.root}${className ? ` ${className}` : ""}`} style={style}>{children}</span>;
  }

  return (
    <Typography color={color} className={`${classes.root}${className ? ` ${className}` : ""}`} variant={variant && variant !== "span" ? variant : undefined} component={variant} style={style}>{children}</Typography>
  );
};
export default Label;
