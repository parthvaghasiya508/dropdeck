import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import FlashOnIcon from "@material-ui/icons/FlashOn";

const styles = () => makeStyles((theme) => ({
  root: {
    zIndex: 2,
    position: "relative",
    overflow: "hidden",
    display: "inline-block",
    width: 13,
    height: 13,
    backgroundImage: `linear-gradient(0deg, ${theme.palette.gradient.stop01} 3%, ${theme.palette.gradient.stop02} 100%)`,
    boxShadow: '0px 1px 1px 0px rgba(0,0,0,.08), 0px 2px 3px 0px rgba(0,0,0,.08)',
    padding: 3,
    borderRadius: 10,
    border: "1px solid",
    borderColor: theme.palette.gradient.stop01,
    transform: "scale(1.0)",
    transition: "transform 300ms ease",
    "&.active": {
      transform: "scale(1.25)",
      transition: "transform 300ms ease",
    },
    "&:hover": {
      backgroundImage: `linear-gradient(0deg, ${theme.palette.gradient.stop00} 3%, ${theme.palette.gradient.stop01} 100%)`,
    }
  },
  bolt: {
    overflow: "hidden",
    right: -3,
    top: -22,
    color: theme.palette.icon.primaryHoverBg,
    transform: "rotate(15deg)",
    fontSize: 23,
    position: "absolute",
    zIndex: 2,
    transition: "right 300ms ease-in, top 300ms ease-in",
    opacity: 0.6,
    "&.active": {
      opacity: 0.8,
      color: theme.palette.primary.main,
      top: -2,
      transition: "right 100ms ease-in, top 100ms ease-in"
    },
    "&.static": {
      zIndex: 1,
      // right: -4,
      top: -2,
      color: theme.palette.icon.primaryInset,
    },
  }
}), { meta: 'LightningBolt' });
const LightningBolt = ({ active, setActive, style }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <div className={`${classes.root}${active ? " active" : ""}`} style={style}>
      <FlashOnIcon className={`${classes.bolt} static`} />
      <FlashOnIcon className={`${classes.bolt}${active ? " active" : ""}`} />
    </div>
  );
};
export default LightningBolt;
