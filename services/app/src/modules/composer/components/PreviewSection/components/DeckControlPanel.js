import Fab from "@material-ui/core/Fab";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrow from "@material-ui/icons/PlayArrow";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { setAspectRatio } from "../../../../../actions/presentation";
import Label from "../../../../../common/components/controls/Label";
import Popup from "../../../../../common/components/popup/Popup/Popup";
import Section from "../../../../../common/components/popup/Section";
import { ROUTE_PLAY_DOCS, ROUTE_PREVIEW_DECK } from "../../../../../Routes";
import ExportButton from "./export/ExportButton";
import Sharing from "./sharing/Sharing";

const controlPanelStyles = () => makeStyles((theme) => ({
  fabWrapper: {
    position: 'fixed',
    bottom: '3em',
    right: '5.45em',
    zIndex: '5',
    [theme.breakpoints.down('md')]: {
      right: '2.25em',
    },
  },

  fab: {
    position: 'relative',
    zIndex: '1',
    color: "#fff",
    textShadow: '0 1px 1px rgba(0,0,0,0.15)',
    fontWeight: '600',
    backgroundColor: '#f31138',
    background: 'linear-gradient(top,#db1b38, #b80e29)',
    boxShadow: '0px 1px 1px 0px rgba(0,0,0,.08), 0px 2px 3px 0px rgba(0,0,0,.08)',
    fontFamily: '"Inter var","Helvetica Neue",Helvetica,Arial,sans-serif',
    borderColor: 'transparent',
    textTransform: 'none',
    letterSpacing: '0',
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: '-1',
      display: 'block',
      backgroundColor: '#f31237',
      background: 'linear-gradient(top,#ff4261 0%,#f31237 5%)',
      boxShadow: 'inset 0px -1px 2px 0px rgba(0,0,0,.1), inset 0px -1px 1px 0px rgba(0,0,0,.1)',
      backgroundRepeat: 'repeat-x',
      borderRadius: '25px',
      top: '1px',
      bottom: '1px',
      left: '1px',
      right: '1px',
    },
    // hover
    '&:hover': {
      backgroundColor: '#f31138',
      background: 'linear-gradient(top,#db1b38, #b80e29)',
      boxShadow: '0px 1px 1px 0px rgba(0,0,0,.08), 0px 1px 2px 0px rgba(0,0,0,.08)',
      borderColor: 'transparent',
      '&:before': {
        background: 'linear-gradient(top,#ff3556 0%,#ff2549 10%)',
        boxShadow: 'inset 0px -1px 2px 0px rgba(0,0,0,.1), inset 0px -1px 1px 0px rgba(0,0,0,.1)',
      },
    },
    // active
    '&:active, &:active:hover, &:focus': {
      background: 'rgba(255,255,255,0.2)',
      boxShadow: 'none',
      color: "#ffffffdd",
      top: '1px',
      '&:before': {
        background: 'linear-gradient(-180deg,#db1b38 0%,#db1b38 100%)',
        boxShadow: 'inset 0px 1px 1px 0px rgb(199 28 54), inset 0px 0px 1px 1px rgb(183 24 47), inset 0px 2px 2px 0px rgb(195 21 46)',
      },
    },
  },

  settingsButton: {
    background: "rgba(30, 30, 30, 1) !important",
    color: "#fff",
    boxShadow: '0px 1px 1px 0px rgba(0,0,0,.08), 0px 2px 3px 0px rgba(0,0,0,.08)',
    position: 'relative',
    zIndex: '1',
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: '-1',
      display: 'block',
      backgroundColor: '#4d4d4f',
      background: 'linear-gradient(top,#4d4d4f 0%,#323234aa 25%)',
      boxShadow: 'inset 0px -1px 2px 0px rgba(0,0,0,.1), inset 0px -1px 1px 0px rgba(0,0,0,.1)',
      backgroundRepeat: 'repeat-x',
      borderRadius: '25px',
      top: '1px',
      bottom: '1px',
      left: '1px',
      right: '1px',
    },
    "&:not(.open)": {
      "& .closeButton": {
        opacity: 0,
        position: "absolute",
        transform: "rotate(0deg)",
      },
      "& .settingsButton": {
        transform: "rotate(-90deg)",
        transition: "transform 500ms ease",
        opacity: 1,
        position: "static",
      }
    },
    "&.open": {
      background: "rgba(30, 30, 30, 1) !important",
      "& .closeButton": {
        opacity: 1,
        position: "static",
        transform: "rotate(90deg)",
        transition: "transform 500ms ease"
      },
      "& .settingsButton": {
        opacity: 0,
        position: "absolute",
        transform: "rotate(0deg)",
      }
    },
    "&:hover": {
      background: "rgba(30, 30, 30, 1) !important",
      color: "#fff",
      '&:before': {
        background: 'linear-gradient(top,#505050 0%,#404040 25%)',
        boxShadow: 'inset 0px -1px 2px 0px rgba(0,0,0,.1), inset 0px -1px 1px 0px rgba(0,0,0,.1)',
      },
    },
  },
  label: {
    color: theme.palette.popover.label,
    fontSize: 13
  },
}), { meta: 'DeckControlPanel' });

/**
 * Fab to play and control panel icon.
 *
 * @param user
 * @param presentation
 * @param readOnly
 * @param isReference
 * @param activeSlide
 * @returns {JSX.Element}
 * @constructor
 */
const DeckControlPanel = ({ user, presentation, slides, readOnly, isReference, activeSlide }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    if (!anchorEl) {
      event.currentTarget.classList.add("open");
    } else {
      event.currentTarget.classList.remove("open");
    }
  };

  const [aspectValue, setAspectValue] = useState(presentation.aspect);
  const aspectRatioChange = (event) => {
    setAspectValue(event.target.value);
    setAspectRatio(event.target.value);
  };

  const preview = () => {
    let startFrom = 0;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].id === activeSlide) {
        startFrom = i;
        break;
      }
    }
    window.location.href = `${isReference ? ROUTE_PLAY_DOCS : ROUTE_PREVIEW_DECK}/${presentation.identifiers.short}#${startFrom || 0}`;
  };

  const useStyles = useCallback(controlPanelStyles(), []);
  const classes = useStyles();
  return (
    <div className={classes.fabWrapper}>

      {!readOnly ? (
        <>
          <IconButton
            variant="extended"
            aria-label="add"
            onClick={handleClick}
            className={classes.settingsButton}
          >
            <SettingsIcon className="settingsButton"/>
            <CloseIcon className="closeButton"/>
          </IconButton>

          <Popup width={274} anchor={anchorEl} setAnchor={setAnchorEl} open={open} onClose={() => anchorEl.classList.remove("open")}>
            <Section title="Aspect Ratio">
              <RadioGroup aria-label="aspect ratio" className={classes.label} name="aspectRatio" value={aspectValue} onChange={aspectRatioChange}>
                <FormControlLabel value="16x9" control={<Radio style={{ padding: 4, marginLeft: 8, marginRight: 7 }} />} className={classes.label} label={<Label className={classes.label}>16:9 Wide Screen </Label>} />
                <FormControlLabel value="16x10" control={<Radio style={{ padding: 4, marginLeft: 8, marginRight: 7 }} />} className={classes.label} label={<Label className={classes.label}>16:10 Typical Computer</Label>} />
                <FormControlLabel value="4x3" control={<Radio style={{ padding: 4, marginLeft: 8, marginRight: 7 }} />} className={classes.label} label={<Label variant="span" className={classes.label}>4:3 Typical Projector</Label>} />
              </RadioGroup>
            </Section>
            <Section title="Export" pro>
              <ExportButton presentation={presentation}/>
            </Section>
            <Section title="Sharing">
              <Sharing id={presentation.identifiers.short} presentation={presentation} user={user} permissions={presentation.permissions}/>
            </Section>
          </Popup>
        </>
      ) : null}

      <Fab
        className={classes.fab}
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
        onClick={preview}
        style={{ marginLeft: 10 }}
      >
        <PlayArrow />
        Preview
      </Fab>
    </div>
  );
};

const mapDispatchToProps = {
  setAspectRatio
};

export default connect(null, mapDispatchToProps)(DeckControlPanel);
