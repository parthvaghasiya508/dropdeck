import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import EditIcon from '@material-ui/icons/Edit';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useState } from "react";

const styles = () => makeStyles((theme) => ({
  root: {
  },
  button: {
    width: "100%"
  },
  menu: {
    width: "100%"
  },
  item: {
    borderRadius: 4,
    width: "100%",
    "&:hover, &.Mui-disabled": {
      background: theme.palette.background.elev03,
      opacity: 1,
      borderRadius: 0,
    },
    "& div": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    "& span:last-of-type": {
      marginLeft: '8px !important',
    },
  },
}), { meta: 'WorkflowPanel' });

const WorkflowStep = ({ step, select = () => undefined, style, mini, disabled }) => {
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <MenuItem disabled={disabled} className={classes.item} onClick={() => select(step)} style={{ padding: mini ? 0 : "", ...style }}>
      <div>
        <span style={{ color: step.color, display: "inline-block", margin: mini ? "0px 1px 0px 0px" : "2px 4px 2px 0px" }}>{step.icon}</span>
        <span className={`${classes.textLabel} textLabel`} style={{ color: step.color, display: "inline-block", paddingBottom: 3 }}>{step.label}</span>
      </div>
    </MenuItem>
  );
};

export const WORKFLOW_STEPS = {
  NOT_SPECIFIED: "default-not-specified",
  DRAFT: "default-draft",
  REVIEW: "default-review",
  PUBLISHED: "default-published",
  DISCONTINUED: "default-discontinued"
};
const WorkflowPanel = ({ settings, setWorkflowStep, style, mini }) => {

  const steps = [
    { id: WORKFLOW_STEPS.NOT_SPECIFIED, icon: <LinearScaleIcon/>, label: "Not specified", color: "#a9a9a9" },
    { id: WORKFLOW_STEPS.DRAFT, icon: <EditIcon/>, label: "Draft", color: "#e96d28" },
    { id: WORKFLOW_STEPS.REVIEW, icon: <VisibilityIcon style={{ marginTop: 2 }}/>, label: "In Review", color: "#4274ea" },
    { id: WORKFLOW_STEPS.PUBLISHED, icon: <DoneAllIcon/>, label: "Published", color: "#80d229" },
    { id: WORKFLOW_STEPS.DISCONTINUED, icon: <NotInterestedIcon/>, label: "Discontinued", color: "#dd3333" },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStep, setSelectedStep] = useState(steps[0]);

  useEffect(() => {
    if (settings && settings.workflow) {
      if (settings.workflow.step) {
        setSelectedStep(steps.find((step) => step.id === settings.workflow.step));
      } else {
        setSelectedStep(steps[0]);
      }
    }
  }, [settings]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const select = (step) => {
    setAnchorEl(null);
    setSelectedStep(step);
    setWorkflowStep(step.id);
  };

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  if (mini && !selectedStep || mini && selectedStep.id === WORKFLOW_STEPS.NOT_SPECIFIED) {
    return (
      <div className={classes.root} style={{ display: "none" }} />
    );
  }

  return (
    <div className={classes.root} style={{ margin: '5px 0 0 4px', transform: mini ? "scale(0.8)" : "scale(1)", opacity: mini ? 0.8 : 1, marginLeft: mini ? -10 : 0, ...style }}>
      <Button
        className={classes.button}
        aria-controls="simple-menu"
        aria-label="theme"
        aria-haspopup="true"
        variant="text"
        style={{ textTransform: "none", height: mini ? 0 : "inherit" }}
        disabled={!setWorkflowStep}
        onClick={handleClick}>
        <WorkflowStep mini={mini} step={selectedStep} style={{ backgroundColor: !mini ? `${selectedStep.color}${!setWorkflowStep ? "05" : 20}` : "transparent" }}/>
      </Button>
      <Menu
        style={{ zIndex: 10001 }}
        id="simple-menu"
        anchorEl={anchorEl}
        className={classes.menu}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        { steps.map((step) => <WorkflowStep key={step.id} mini={mini} step={step} select={select} disabled={selectedStep.id === step.id}/>) }
      </Menu>
    </div>
  );
};
export default WorkflowPanel;
