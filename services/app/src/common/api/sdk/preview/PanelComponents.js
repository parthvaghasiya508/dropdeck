import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Done, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../../../Colors";
import Label from "../../../components/controls/Label";

/**
 * Blank panel.
 *
 * @returns {(props?: any) => ClassNameMap<"root">}
 */
const panelStyles = () => makeStyles((theme) => ({
  root: {
    padding: 8,
  },
}));
export const Panel = ({ children }) => {

  const useStyles = useCallback(panelStyles(), []);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

/**
 * Title for a panel. Eg. Design & Style, Live Data.
 *
 * @returns {(props?: any) => ClassNameMap<"root">}
 */
const panelTitleStyles = () => makeStyles((theme) => ({
  text: {
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    "&.section": {
      fontSize: 11,
      fontWeight: 500,
    }
  },
}));
export const PanelTitle = ({ text, section, button }) => {

  const useStyles = useCallback(panelTitleStyles(), []);
  const classes = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Label className={`${classes.text}${section ? " section" : ""}`}>{text}</Label>
      <span>{button}</span>
    </div>
  );
};

/**
 * Container inside a panel. Eg. Theme browser
 *
 * @returns {(props?: any) => ClassNameMap<"root">}
 */
const panelContainerStyles = () => makeStyles((theme) => ({
  root: {
    marginBottom: 8,
    padding: 20,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: '0',
    boxSizing: 'border-box',
  },
}));
export const PanelContainer = ({ children, style }) => {

  const useStyles = useCallback(panelContainerStyles(), []);
  const classes = useStyles();

  return (
    <Paper className={classes.root} style={{ ...style }}>
      {children}
    </Paper>
  );
};

/**
 * Button for a side panel. eg. Create Data Source
 *
 * @returns {(props?: any) => ClassNameMap<"root">}
 */
const panelButtonStyles = () => makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  },
}));
export const PanelButton = ({ children, complete, ...other }) => {

  const useStyles = useCallback(panelButtonStyles(), []);
  const classes = useStyles();

  return (
    <Button variant="outlined" className={classes.root} {...other}>
      {children}
    </Button>
  );
};

/**
 * Progress/state bubble with a number and support for showing completion.
 *
 * @returns {(props?: any) => ClassNameMap<"root">}
 */
const bubbleStyles = () => makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: 5,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    width: 20,
    fontSize: 12,
    textAlign: "center",
    borderRadius: 20,
    backgroundColor: theme.palette.secondary.main,
    color: theme.dark() ? "#222" : "#fff",
  },
}));
export const Bubble = ({ children, complete, disabled, ...other }) => {

  const getStep = (number) => <span>{number}</span>;

  const [timer, setTimer] = useState(undefined);
  const [bubbleContent, setBubbleContent] = useState(getStep(children));

  useEffect(() => {
    if (complete) {
      setBubbleContent(<Done style={{ height: 14 }}/>);
      setTimer(setTimeout(() => {
        setBubbleContent(getStep(children));
      }, 2000));
    } else {
      clearTimeout(timer);
      setBubbleContent(getStep(children));
    }
  }, [complete]);

  const useStyles = useCallback(bubbleStyles(), []);
  const classes = useStyles();

  const backgroundColor = () => {
    if (complete) {
      return Colors.green();
    }
    if (disabled) {
      return "#222";
    }
    return null;
  };

  const color = () => {
    if (disabled) {
      return "#666";
    }
    return null;
  };

  return (
    <div className={classes.root} {...other} style={{ backgroundColor: backgroundColor(), color: color() }}>
      {bubbleContent}
    </div>
  );
};

/**
 * Stepwise container.
 *
 * @returns {(props?: any) => ClassNameMap<"root">}
 */
const panelStepStyles = () => makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.dark() ? "rgb(34, 34, 34)" : "rgb(210,214,219)",
    boxShadow: 'none',
    backgroundColor: theme.dark() ? "rgba(255,255,255,0.05)" : "rgb(255,255,255,0.35)",
    margin: '0px 8px',
    '&.Mui-expanded': {
      boxShadow: theme.dark() ? "inset 0 1px 0 rgba(255,255,255,.05)" : "inset 0 -1px 0 rgba(0,0,0,0.075)",
      borderRadius: '6px',
      margin: '16px 8px',
    },
    '&.Mui-disabled': {
      backgroundColor: theme.dark() ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.03)",
      borderRadius: '6px',
      marginBottom: '3px',
      '&:before': {
        backgroundColor: 'transparent',
      },
    },
  },
}));
export const PanelStep = ({ title, className, children, step, defaultExpanded, complete, expandSettingsPanel, setExpandSettingsPanel, dataSource, setDataSource, disabled, connected, ...other }) => {

  const useStyles = useCallback(panelStepStyles(), []);
  const classes = useStyles();

  return (
    <Accordion className={className || classes.root} defaultExpanded={defaultExpanded} disabled={disabled} {...other}>
      <AccordionSummary
        expandIcon={<ExpandMore/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Bubble complete={complete} disabled={disabled}>{step}</Bubble>
        <Typography style={{ marginTop: 4 }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{
        display: "flex",
        flexDirection: "column"
      }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

/**
 * Big button with icon.
 *
 * @returns {(props?: any) => ClassNameMap<"root"|"icon"|"label">}
 */
const bigPanelButtonStyles = () => makeStyles((theme) => ({
  root: {
    "&.selected": {
      color: theme.palette.secondary.main
    }
  },
  label: {
    display: "flex",
    flexDirection: "column"
  },
  icon: {
    width: "100%"
  }
}));
export const BigPanelButton = ({ children, selected, icon, ...other }) => {

  const useStyles = useCallback(bigPanelButtonStyles(), []);
  const classes = useStyles();

  return (
    <Button className={`${classes.root} ${selected ? "selected" : ""}`} classes={{ label: classes.label }} {...other}>
      <div className={classes.icon}>{icon}</div>
      <div>{children}</div>
    </Button>
  );
};
