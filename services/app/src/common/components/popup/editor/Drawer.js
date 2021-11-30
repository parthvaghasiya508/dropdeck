import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";

const styles = () => makeStyles((theme) => ({
  root: {

  },
}));
const Drawer = () => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <div className={classes.root}> </div>
  );
};
export default Drawer;
