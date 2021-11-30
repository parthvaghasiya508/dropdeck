import React from "react";
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  root: {
    marginTop: 2,
    color: theme.palette.primary.contrastText,
    "&.active": {
      color: "#f31138"
    }
  },
});

const AppNavigationLink = ({ classes, to, label }) => <Button size="small" className={classes.root} activeClassName="active" component={NavLink} to={to}>{label}</Button>;
export default withStyles(styles)(AppNavigationLink);
