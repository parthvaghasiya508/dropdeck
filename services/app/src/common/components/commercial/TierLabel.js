import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";

const styles = () => makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "inline-block",
    fontSize: 8,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: 3,
    color: "#fff",
    padding: "3px 4px",
    letterSpacing: 0.7,
    margin: 2,
    backgroundColor: "#b7622f",
    textShadow: '0 1px 1px #00000026',
    boxShadow: theme.dark() ? "inset 0 1px 0 #ffffff44" : "none",
    "&.pro": {
      backgroundColor: "#07b773",
      background: "linear-gradient(60deg, #07b773, #31d696)",
    },
    "&.enterprise": {
      backgroundColor: "#fe8e2e",
      background: "linear-gradient(60deg, #fe8e2e, #ffbd02)",
    },
    "&.freemium": {
      backgroundColor: "#2ed8fe",
      background: "linear-gradient(60deg, #0098ff, #2ed8fe)",
    }
  },
}));
const TierLabel = ({ pro, enterprise, tier, style }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  const label = () => {
    if (pro) {
      return "pro";
    }

    if (enterprise) {
      return "enterprise";
    }

    if (tier) {
      return tier;
    }

    return "";
  };

  if (!pro && !enterprise && !tier) {
    return null;
  }

  return (
    <div className={`${classes.root} ${label()}`} style={style}>
      {label()}
    </div>
  );
};
export default TierLabel;
