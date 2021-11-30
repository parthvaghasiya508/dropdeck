import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { subject } from "@casl/ability";
import { MoreHoriz, MoreVert, Pageview, SupervisedUserCircle } from "@material-ui/icons";
import { useTheme } from "@material-ui/core";
import Section from "../../../../../../common/components/popup/Section";
import PaletteIcon from "./components/theme-icon.png";
import DataIcon from "./components/data-icon.png";
import ThemeMenu from "../../../../../../common/components/ThemeMenu";
import { setAspectRatio, setWorkflowStep } from "../../../../../../actions/presentation";
import { ZoomSlider } from "./components/ZoomSlider";
import Abilities from "../../../../../../common/authz/ability/Abilities";
import { useAbility } from "../../../../../../common/authz/ability/useAbility";
import DataSourcePanel from "../../../../../../common/components/datasources/components/DataSourcePanel";
import WorkflowPanel from "./components/WorkflowPanel";
import ToolBarButton from "../../../../../../common/api/sdk/preview/toolbar/ToolBarButton";
import { feature } from "../../../../../../common/config/feature";

const styleGenerator = () => makeStyles((theme) => ({
  root: {
    padding: 9,
    paddingTop: theme.spacing(2),
    boxSizing: 'border-box',
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: '100vh',
    background: theme.dark() ? theme.palette.background.elev02 : theme.palette.gradient.stop00,
    borderLeft: `1px solid ${theme.palette.background.border04}`,
    borderBottom: 0,
    boxShadow: `inset 1px 0 0 ${theme.palette.background.border03}`,
    [theme.breakpoints.down('md')]: {
      height: 'unset',
      paddingTop: 12,
      paddingLeft: theme.spacing(2),
      width: '100%',
      marginTop: '-4px',
      border: 0,
      backgroundColor: theme.palette.background.default,
      boxShadow: 'none',
      borderBottom: `1px solid ${theme.palette.background.border04}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: '2px 6px 0px 6px',
      paddingLeft: theme.spacing(2),
      marginTop: 0
    },
  },
  label: {
    color: theme.dark() ? theme.palette.text.primary : "#fff",
    fontSize: "0.9em",
  },
  sublabel: {
    color: theme.palette.text.secondary,
    fontSize: "0.9em",
    marginLeft: 6
  }
}), { meta: 'PreviewSectionToolbar' });

const PreviewSectionToolbar = ({ transientPreferences, width, user, presentation, settings, readOnly, placement, branding, themeName, zoom, setZoom, maxCols, setWorkflowStep }) => {

  const ability = useAbility();

  // TODO Temporarily disabling by presentation owner to block anonymous users!
  const canWorkflow = ability.can(Abilities.Actions.EDIT, subject(Abilities.Subjects.PRESENTATION, presentation)) && presentation.owner !== null;

  const [marks, setMarks] = useState();
  const zoomChange = (e, value) => {
    transientPreferences.set("zoom", value);
    transientPreferences.set("width", width);
    setZoom(value);
  };

  const ThumbComponent = (props) => <span {...props}>{zoom}</span>;

  const range = [{ value: 1 }, { value: 2 }, { value: 3 }];
  useEffect(() => {
    setMarks(range.splice(0, maxCols));
  }, [maxCols]);

  const useStyles = useCallback(styleGenerator(), []);
  const classes = useStyles();
  const appTheme = useTheme();

  return (
    <div className={classes.root} style={{ flexDirection: placement === "top" ? "row" : "column" }}>
      <ToolBarButton image={PaletteIcon} placement={placement} disabled={readOnly} view="themes" drawer>
        <ThemeMenu user={user} branding={branding} themeName={themeName}/>
      </ToolBarButton>
      <ToolBarButton icon={<Pageview/>} placement={placement}>
        <Section title="Zoom">
          <ZoomSlider style={{
            width: "82%",
            marginLeft: "8%"
          }} value={zoom} onChange={zoomChange} color="secondary" step={null} min={1} max={3} marks={marks} ThumbComponent={ThumbComponent}/>
        </Section>
      </ToolBarButton>
      <ToolBarButton icon={<SupervisedUserCircle/>} placement={placement} disabled={!canWorkflow}>
        <Section title="Workflow" enterprise>
          <WorkflowPanel settings={settings} setWorkflowStep={setWorkflowStep}/>
        </Section>
      </ToolBarButton>

      { feature.dataSources ? (
        <>
          {placement === "top" ? (
            <MoreVert style={{ marginTop: 8, color: appTheme.dark() ? "#3e3e3e" : "#ccc" }}/>
          ) : (
            <MoreHoriz style={{ marginLeft: 8, color: appTheme.dark() ? "#3e3e3e" : "#ccc" }}/>
          )}
          <ToolBarButton image={DataIcon} placement={placement} disabled={!canWorkflow} view="datasources" drawer>
            <DataSourcePanel/>
          </ToolBarButton>
        </>
      ) : null }
    </div>
  );
};
const mapDispatchToProps = {
  setAspectRatio, setWorkflowStep
};

export default connect(null, mapDispatchToProps)(PreviewSectionToolbar);
