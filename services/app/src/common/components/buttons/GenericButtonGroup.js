import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";

const styles = () => makeStyles((theme) => ({
  root: {
    "& button": {
      marginRight: theme.spacing(1),
    },
    "& button:last-child": {
      marginRight: 0
    }
  },
}));
const GenericButtonGroup = ({ children }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <div className={classes.root}>{children}</div>
  );
};
export default GenericButtonGroup;
