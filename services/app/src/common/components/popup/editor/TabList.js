import { TabList } from "@material-ui/lab";
import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";

const styles = () => makeStyles((theme) => ({
  root: {
    marginBottom: 6,
    color: "#fff"
  },
}));
const EditorTabList = ({ children, ...props }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <TabList variant="fullWidth" indicatorColor="primary" className={classes.root} {...props}>{children}</TabList>
  );
};
export default EditorTabList;
