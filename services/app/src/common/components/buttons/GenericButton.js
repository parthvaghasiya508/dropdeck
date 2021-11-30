import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback } from "react";

/**
 * Generic button for e.g. all primary operations at the bottom of modals etc.
 * Defaults to `size="small"`.
 *
 * @param onClick
 * @param children
 * @param conditional   If evaluates to false the button is not shown. Default is true.
 * @param primary       Styled as `contained`.
 * @param secondary     Styled as `outlined`.
 * @param submit        If true submits form.
 * @param popup         Button is in a popup environment.
 * @param other
 * @returns {JSX.Element}
 * @constructor
 */
const styles = (popup) => makeStyles((theme) => ({

  // Solid 'Raised' Buttons - LM working on
  contained: {
    opacity: 1,    
    borderRadius: 7,
    transition: "all 200ms ease-in",
    color: theme.palette.popover.label,
    textShadow: `0px 1px 1px ${theme.dark() ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,1)"}`,
    background: `${theme.dark() ? "linear-gradient( 0deg, #3d3d3f 3%, #363637 100%)" : "linear-gradient( 0deg, #F7FAFC 3%, #FFFFFF 100%)"}`,
    border: `1px solid ${theme.dark() ? "rgba(0,0,0,0.9)" : "rgba(182,188,197,0)"} !important`,
    boxShadow: `${theme.dark() ? "0px 1px 1px 0px rgb(0 0 0 / 8%), 0px 2px 3px 0px rgb(0 0 0 / 8%), inset 0px 1px 0px rgb(255 255 255 / 10%)" : "rgb(50 50 93 / 25%) 0px 1px 2px 0px, rgb(0 0 0 / 25%) 0px 1px 3px -1px"}`,
    "&:hover": {
      transition: "all 200ms ease-in",
      textShadow: `0px 1px 1px ${theme.dark() ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,1)"}`,
      background: `${theme.dark() ? "linear-gradient( 0deg, #4d4d4f 3%, #464647 100%)" : "linear-gradient( 0deg, #F7FAFC 3%, #FFFFFF 100%)"}`,
      border: `1px solid ${theme.dark() ? "rgba(0,0,0,1)" : "rgba(182,188,197,0)"} !important`,
      boxShadow: `${theme.dark() ? "0px 1px 1px 0px rgb(0 0 0 / 8%), 0px 2px 3px 0px rgb(0 0 0 / 8%), inset 0px 1px 0px rgb(255 255 255 / 10%)" : "rgb(50 50 93 / 20%) 0px 3px 4px 1px, rgb(0 0 0 / 20%) 0px 1px 3px 0px"}`,
    },
    "&:active": {
      transition: "all 200ms ease-in",
      textShadow: `0px 1px 1px ${theme.dark() ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,1)"}`,
      background: `${theme.dark() ? "linear-gradient( 0deg, #4d4d4f55 3%, #46464755 100%)" : "linear-gradient( 0deg, #F7FAFC 3%, #FFFFFF 100%)"}`,
      border: `1px solid ${theme.dark() ? "rgba(0,0,0,0.5)" : "rgba(182,188,197,0)"} !important`,
      boxShadow: `${theme.dark() ? "0inset 0px 1px 3px 0px rgb(0 0 0 / 25%), 0px 1px 0px 0px rgb(255 255 255 / 8%)" : "rgb(50 50 93 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 30%) 0px 1px 2px -1px"}`,
    },
  },

  // Bordered 'Inset' Buttons
  outlined: {
    opacity: 1,    
    borderRadius: 7,
    transition: "all 200ms ease-in",
    color: theme.palette.popover.label,
    textShadow: `0px 1px 1px ${theme.dark() ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)"}`,
    background: `${theme.dark() ? "rgba(0,0,0,0.07)" : "rgba(182,188,197,0.1)"}`,
    border: `1px solid ${theme.dark() ? "rgba(0,0,0,1)" : "rgba(182,188,197,0.5)"} !important`,
    boxShadow: `${theme.dark() ? "inset 0px 1px 0px rgba(255,255,255,15%), 0px 1px 0px rgba(255,255,255,15%)" : "inset 0px 1px 2px rgb(0 0 0 / 6%), 0px 1px 0px rgb(255 255 255 / 75%), 0px -1px 0px rgb(255 255 255 / 75%)"}`,
    "&:hover": {
      transition: "all 200ms ease-in",
      color: `${theme.dark() ? "#ffffff" : "ffffff"}`,
      background: `${theme.dark() ? "rgba(0,0,0,0.3)" : "rgba(182,188,197,0.175)"}`,
      border: `1px solid ${theme.dark() ? "rgba(0,0,0,1)" : "rgba(182,188,197,0.5)"} !important`,
      boxShadow: `${theme.dark() ? "inset 0px 1px 0px rgba(255,255,255,15%), 0px 1px 0px rgba(255,255,255,15%)" : "inset 0px 1px 2px rgb(0 0 0 / 6%), 0px 1px 0px rgb(255 255 255 / 85%), 0px -1px 0px rgb(255 255 255 / 85%)"}`,
    },
    "&:active": {
      transition: "all 200ms ease-in",
      color: theme.palette.popover.label,
      background: `${theme.dark() ? "rgba(0,0,0,0.45)" : "rgba(182,188,197,0.3)"}`,
      border: `1px solid ${theme.dark() ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.15)"} !important`,
      boxShadow: `${theme.dark() ? "inset 0px 1px 3px 0px rgb(0 0 0 / 25%), 0px 1px 0px 0px rgb(255 255 255 / 8%)" : "inset 0px 1px 2px 0px rgb(0 0 0 / 20%), 0px 1px 0px 0px rgb(255 255 255 / 8%), 0px 1px 0px rgb(255 255 255 / 100%), 0px -1px 0px rgb(255 255 255 / 100%)"}`,      
    },
  },

}));
const GenericButton = ({ conditional = true, onClick, children, primary, secondary, submit, popup = true, ...other }) => {

  const useStyle = useCallback(styles(popup), [popup]);
  const classes = useStyle();

  const type = () => {
    if (primary) {
      return "contained";
    }
    if (secondary) {
      return "outlined";
    }
    return "text";
  };

  if (!conditional) return null;

  return (
    <Button classes={{ contained: classes.contained , outlined: classes.outlined }} variant={type()} size="medium" onClick={onClick} type={submit ? "submit" : undefined} {...other}>{children}</Button>
  );
};
export default GenericButton;
