import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import TierLabel from "../commercial/TierLabel";
import Label from "../controls/Label";

const styles = () => makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    borderRadius: 6,
    padding: 10,
    margin: 10,
    border: "1px solid",
    borderColor: `${theme.palette.type === "dark" ? theme.palette.popover.border : theme.palette.label.light}`,
    background: `${theme.palette.type === "dark" ? "rgba(29,30,32,0.8)" : "rgba(255,255,255,1)"}`,
  },
  title: {
    display: "inline-block",
    marginTop: -4,
    marginLeft: 7,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    color: theme.palette.popover.label,
  }
}));

/**
 * Section within a {@link Popup}.
 *
 * @param children
 * @param title
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */
const Section = ({ children, title, style, override, pro, enterprise, tier }) => {
  const useStyle = useCallback(styles(), []);
  const classes = useStyle();
  return (
    <div className={classes.root} style={override}>
      { title !== undefined ? (
        <div>
          <Label className={classes.title}>
            {title}
          </Label>
          {pro || enterprise || tier ? <TierLabel pro={pro} enterprise={enterprise} tier={tier} style={{ top: -1, marginLeft: 6 }}/> : null}
        </div>
      ) : null }

      <div style={style}>
        {children}
      </div>
    </div>
  );
};
export default Section;
