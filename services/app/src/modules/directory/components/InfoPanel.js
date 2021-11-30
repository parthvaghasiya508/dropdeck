import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Close } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { Deck } from 'common/model/Deck';
import { subject } from "@casl/ability";
import { IconButton, useMediaQuery, useTheme } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Colors from "../../../Colors";
import RadialChart from "../../../common/components/viz/RadialChart";
import { generateSlides } from "../../../common/slide/SlideFactory";
import ConfirmationButton from "../../../common/components/ConfirmationButton";
import Dropdeck from "../../../common/api/sdk/Dropdeck";
import { Slide } from "../../../common/slide/Slide";
import Abilities from "../../../common/authz/ability/Abilities";
import { Can } from "../../../common/authz/components/Can";
import { ThemeFactory } from "../../../common/theme/ThemeFactory";
import { logger } from "../../../common/util/logger";
import Lightbox from "../../presenter/components/Lightbox";
import WorkflowPanel from "../../composer/components/PreviewSection/components/toolbar/components/WorkflowPanel";
import Label from "../../../common/components/controls/Label";
import { LIGHTBOX_THEME_JSS_INDEX } from "../../presenter/components/Lightbox/Lightbox";
import { DeckIdContext } from "../../composer/hooks/useDeckId";

const styles = () => makeStyles((theme) => ({
  root: {
    width: "40vw",
    height: '100%',
    padding: theme.spacing(3, 5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3,1),
      width: "60vw",
    },
    background: theme.dark() ? "#222" : "#fff",
    '& .panelHead': {
      marginBottom: 28,
      [theme.breakpoints.down('xs')]: {
        marginBottom: 22,
        "& h2": {
          fontSize: "0.85em"
        }
      }
    },
    '& .panelBody': {
      maxHeight: '83vh',
      overflow: 'hidden',
      overflowY: 'scroll',
      boxSizing: 'border-box',
      margin: '-8px -8px 0 -8px',
      position: 'relative',
      flexGrow: 1,
      paddingBottom: '60px',
      '& #lightbox, & #lightbox > div': {
        height: '100%',
        padding: '0 !important',
        margin: '0 !important',
        alignItems: "start"
      },
    },
    '& .panelFoot': {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: 'absolute',
      background: theme.dark() ? "#1a1a1a" : "#eee",
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px 0',
      [theme.breakpoints.down('xs')]: {
        padding: '10px 0',
      },
      textAlign: 'center',
      minHeight: '48px',
      zIndex: 2,
    },
  }
}));

const InfoPanel = ({ deckId, toggleInfoPanel, infoPanel, deleteDeck, setShowInfoPanel }) => {

  const [state, setState] = useState({
    branding: undefined,
    deck: undefined,
    slides: undefined,
    themePackage: undefined,
    isReady: false,
  });

  const materialTheme = useTheme();
  const isPhoneSize = useMediaQuery(materialTheme.breakpoints.down('sm'));
  const [metrics, setMetrics] = useState();

  const close = (e) => {
    e.preventDefault();
    toggleInfoPanel(false)(e);
  };

  useEffect(() => {
    Dropdeck.api.get(`metrics/decks/${deckId}`)
      .then((metricsPayload) => {
        setMetrics(metricsPayload.data);
        Dropdeck.Decks.byId(deckId)
          .then((payload) => {
            const d = Deck.fromDataObject(payload.data);
            setState((prevState) => ({
              ...prevState,
              deck: d,
              branding: d.branding,
              slides: generateSlides(d.content, deckId, Slide.View.LIGHTBOX, d.theme),
              themePackage: ThemeFactory.instance.get(d.theme, d.branding),
              isReady: true,
            }));
          })
          .catch((e) => logger.error(e));

      });
  }, [deckId]);

  const useThemeStyles = useCallback(
    makeStyles(state.themePackage ? state.themePackage.component.css() : {}, { deterministic: false, meta: 'InfoPanelTheme', index: LIGHTBOX_THEME_JSS_INDEX }),
    [state.themePackage]
  );
  const themeClasses = useThemeStyles();

  const MetricNumber = ({ number, percentile, label }) => (
    <div style={{ boxShadow: materialTheme.dark() ? "inset 1px 1px rgba(0,0,0,.7), inset -1px -1px rgba(0,0,0,.5)" : "inset 1px 1px rgba(0,0,0,.10), inset -1px -1px rgba(0,0,0,.05)", fontSize: "0.95em", textShadow: '0 1px 1px rgba(0,0,0,0.15)', backgroundColor: `${materialTheme.palette.background.elev04}70`, display: "inline-block", padding: "2px 6px 2px 2px", borderRadius: 4, margin: 2 }}>
      <span style={{ fontWeight: "bold", backgroundColor: materialTheme.dark() ? `${materialTheme.palette.background.elev04}99` : "#dddddd70", display: "inline-block", padding: "2px 6px 2px 6px", borderRadius: 4 }}><span>{number}</span><span style={{ margin: 3, opacity: 0.75 }}>·</span><span style={{ opacity: 0.75 }}>{percentile}%</span></span>
      <span style={{ marginLeft: 6, fontColor: "#ccc" }}>{label}</span>
    </div>
  );

  const Metrics = ({ slide }) => {

    const value = (field, defaultValue = 0) => (metrics ? metrics[field] : defaultValue);
    const measure = (field, defaultValue = 0) => (metrics && metrics.measures[slide.id] ? metrics.measures[slide.id][field] : defaultValue);
    const countPercentage = value("maxCount") > 0 ? Math.round(100 * measure("count") / value("maxCount")) : 0;
    const averageDurationRatio = value("maxAverageDuration", 1) > 0 ? measure("average") / value("maxAverageDuration", 1) : 0;

    const comparedToAverage = measure("average") / value("averageDuration", 1) - 1;

    return (
      <div style={{ fontSize: "0.7em", paddingTop: 4, display: "flex", flexDirection: "row" }}>
        <div>
          <RadialChart progress={Math.round(100 * countPercentage * averageDurationRatio)}/>
        </div>
        <div style={{ padding: 2 }}>
          <MetricNumber number={measure("count")} percentile={countPercentage} label="Views"/>
          { measure("count") > 0 ? (
            <MetricNumber number={`${measure("average")} sec`} percentile={<span><span style={{ marginRight: 2, color: comparedToAverage >= 0 ? Colors.green() : Colors.primary() }}>{comparedToAverage > 0 ? "▲" : (comparedToAverage === 0 ? "⤳" : "▼")}</span>{Math.abs(Math.round(100 * comparedToAverage))}</span>} label="Average time"/>
          ) : null}
        </div>
      </div>
    );
  };

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  return state.isReady ? (
    <SwipeableDrawer
      anchor="right"
      open={infoPanel}
      onOpen={toggleInfoPanel(true)}
      onClose={toggleInfoPanel(false)}>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <IconButton onClick={close} style={{ position: "absolute", right: 36, top: 16 }}><Close/></IconButton>
            <div className="panelHead">
              <Label variant="h2">{state.deck.name || 'Untitled'}</Label>
            </div>
            <div className="panelBody">
              <DeckIdContext.Provider value={deckId}>
                <Lightbox
                  aspect={state.deck.aspect}
                  id={state.deck.id}
                  branding={state.branding}
                  slides={state.slides}
                  readOnly
                  isPhoneSize={isPhoneSize}
                  themeName={state.deck.theme}
                  themeClasses={themeClasses}
                  cols={isPhoneSize ? 1 : 2}
                  append={(slide) => <Metrics metric={metrics} slide={slide}/>}
                />
              </DeckIdContext.Provider>
              <div className="bottomFade" />
            </div>
            <div className="panelFoot">
              {!isPhoneSize && (<WorkflowPanel settings={state.deck.settings}/>)}
              <Can I={Abilities.Actions.DELETE} this={subject(Abilities.Subjects.DECK, state.deck)}>
                <ConfirmationButton onConfirm={() => {
                  deleteDeck(state.deck);
                  setShowInfoPanel(false);
                }} size={isPhoneSize ? "small" : "medium"}/>
              </Can>
            </div>
          </Grid>
        </Grid>
      </div>
    </SwipeableDrawer>
  ) : (
    <div style={{ margin: '1rem' }}>
      <CircularProgress className="icon" color="primary" size={30}/>
    </div>
  );
};
export default InfoPanel;
