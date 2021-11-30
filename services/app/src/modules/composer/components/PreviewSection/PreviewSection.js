import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withWidth } from "@material-ui/core";
import { subject } from "@casl/ability";
import { useTheme } from "@material-ui/styles";
import Lightbox from "../../../presenter/components/Lightbox";
import Breakpoints from "../../../../common/util/Breakpoints";
import { previewSectionStyles } from "./previewSectionStyles";
import Abilities from "../../../../common/authz/ability/Abilities";
import { useAbility } from "../../../../common/authz/ability/useAbility";
import DeckControlPanel from "./components/DeckControlPanel";
import PreviewToggle from "../../../../common/components/ApplicationBar/components/PreviewToggle";
import { config } from "../../../../config";
import PreviewSectionToolbar from "./components/toolbar/PreviewSectionToolbar";
import { TransientPreferences } from "../../../../common/util/TransientPreferences";

const PreviewSection = ({
  slides,
  user,
  themeName,
  presentation,
  width,
  activeSlide,
  readOnly,
  isPhoneSize,
  isReference,
  operations,
  themeClasses,
  uploadProgress,
  companyBranding,
}) => {

  const transientPreferencesForUser = new TransientPreferences("user_deck_preferences", presentation.id, { width });
  const useStyles = useCallback(previewSectionStyles(readOnly, isPhoneSize), [readOnly, isPhoneSize]);
  const classes = useStyles();

  const calculateDefaultZoom = () => transientPreferencesForUser.get("zoom", Math.min(Breakpoints.maxCols(width), 2), { width });
  const isToolbarTop = () => isPhoneSize || Breakpoints.maxCols(width) === 1;
  const [defaultZoom, setDefaultZoom] = useState(calculateDefaultZoom());

  const [zoom, setZoom] = useState(defaultZoom);

  useEffect(() => {
    setDefaultZoom(calculateDefaultZoom());
    setZoom(calculateDefaultZoom());
    // If width is different from when prefs were created then delete it.
    if (transientPreferencesForUser.get("width") !== width) {
      transientPreferencesForUser.del("zoom");
      transientPreferencesForUser.set("width", width);
    }
  }, [width]);

  const ability = useAbility();
  const breakPoints = ability.can(Abilities.Actions.EDIT, subject(Abilities.Subjects.PRESENTATION, presentation)) ?
    Breakpoints.preview() : Breakpoints.fullWidth();

  const theme = useTheme();

  return (
    <Grid item {...breakPoints} className={classes.root}>
      {isPhoneSize && !readOnly ? (
        <Grid item xs={12} style={{ paddingTop: 48 }}>
          <div style={{
            top: 0,
            position: "fixed",
            width: "100%",
            zIndex: 2,
            marginBottom: 12,
            backgroundColor: theme.palette.background.default,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            padding: '15px 25px 15px 13px',
          }}>
            <a href={config.app.paths.home} className={classes.logo} style={{ marginTop: '1px' }}> </a>
            <div style={{
              margin: '-1px 0 0 -1px',
              fontFamily: '"Inter var","Helvetica Neue",Helvetica,Arial,sans-serif',
              fontSize: '0.95em',
            }}>
              <PreviewToggle isPhoneSize={isPhoneSize}/>
            </div>
          </div>
        </Grid>
      ) : null}

      {readOnly ? (
        <Grid item xs={12} style={{ paddingTop: 48 }}>
          <div style={{
            top: 0,
            position: "fixed",
            width: "100%",
            backgroundColor: theme.palette.background.default,
            boxShadow: 'rgba(12, 16, 20, 0.185) 0px 1px 2px 1px',
            zIndex: 2,
            padding: 16,
            paddingBottom: 0,
            marginBottom: 10,
          }}>
            <a href={config.app.paths.home} className={classes.logo}> </a>
          </div>
        </Grid>
      ) : null}

      <div style={{ display: "flex", alignItems: "flex-start", flexDirection: isToolbarTop() ? "column" : "row-reverse" }}>
        {/* toolbar */}
        <PreviewSectionToolbar width={width} transientPreferences={transientPreferencesForUser} user={user} presentation={presentation} settings={presentation.settings} aspect={presentation.aspect} readOnly={readOnly} placement={isToolbarTop() ? "top" : "left"} branding={companyBranding} themeName={themeName} zoom={zoom} setZoom={setZoom} maxCols={Breakpoints.maxCols(width)}/>
        {/* Preview Lightbox */}
        <div style={{ flexGrow: 1, width: '100%', minWidth: "100px" }}>
          <Lightbox
            aspect={presentation.aspect}
            activeSlide={activeSlide}
            id={presentation.id}
            branding={presentation.branding}
            slides={slides}
            readOnly={readOnly}
            isPhoneSize={isPhoneSize}
            themeName={themeName}
            cols={zoom}
            themeClasses={themeClasses}
            operations={operations}
            uploadProgress={uploadProgress}
          />
        </div>
      </div>

      {/* FAB */}
      <DeckControlPanel user={user} slides={slides} isReference={isReference} readOnly={readOnly} presentation={presentation} activeSlide={activeSlide}/>
    </Grid>
  );
};

export default withWidth({ withTheme: true })(PreviewSection);
