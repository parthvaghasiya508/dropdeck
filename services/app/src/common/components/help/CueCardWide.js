import React, { useCallback } from "react";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

const styles = () => makeStyles((theme) => ({
  root: {
    height: "100%",
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: '330px',
    padding: '0',
    border: `1px solid ${theme.palette.type === "dark" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.8)"}`,
    backgroundColor: `${theme.palette.type === "dark" ? "#4a4a4a" : "rgb(227 232 237 / 30%)"}`,
    boxShadow: `inset 0 2px 4px 0 ${theme.palette.type === "dark" ? "#202020" : "#e3e8ed"}`,
    fontSize: '0.825em',
    fontWeight: '400',
    letterSpacing: '-0.02em',
    '& button.close': {
      opacity: '0.25',
      position: 'absolute',
      right: '0.25em',
      top: '0.25em',
      transform: 'scale(0.8)',
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        opacity: '1',
        transform: 'scale(0.9)',
      },
    },
    '& .react-swipeable-view-container': {
      height: '100%',
      alignItems: 'stretch',
    },
    '& img': {
      opacity: `${theme.palette.type === "dark" ? "0.625" : "1"}`,
    },
  }
}));

const CueCard = ({ content, children, dismissable = false }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card variant="outlined" className={classes.root}>
        {content}
        {children}
        {dismissable ? <IconButton className="close"><CloseIcon/></IconButton> : null}
      </Card>
    </Grid>
  );
};
export default CueCard;
