import React, { useCallback, useEffect } from "react";
import PaletteMaterialIcon from '@material-ui/icons/Palette';
import { makeStyles } from "@material-ui/styles";
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import { getPaletteForSlide } from "../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { createBrandingPalettes } from "../../transforms/extractPaletteSuggestions";
import Popup from "../../../../../../common/components/popup/Popup/Popup";
import Section from "../../../../../../common/components/popup/Section";
import { usePalettesInUse } from "../../context/usePalettesInUse";
import "./PaletteSuggestionComponent.scss";
import { getPalettesSuggestionsForSlide } from "./queries/getPalettesSuggestionsForSlide";
import PaletteInkwell
  from "../../../../../composer/components/DeckEditor/modules/plugins/component/palette/PaletteInkwell";

const popupStyles = () => makeStyles((theme) => ({
  sectionOuter: {
    width: "100%",
    boxSizing: 'border-box',
    display: 'flex',
    // border:'1px solid blue',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },

  section: {
    minWidth: '35%',
    border: "none",
    '& p': {
      textShadow: `${theme.palette.type === "dark" ? "0 1px 1px rgba(0,0,0,0.8)" : "none"}`,
      color: `${theme.palette.type === "dark" ? "#DEE3EA" : "#323234"}`,
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '100%',
    },
  },

}));

/**
 * Main contents for palette picker floating popup.
 */
export const PalettePopup = ({ theme, slide, pickPalette, originalPalette, currentPalette, width, suggestedPalettes }) => {

  const useStyles = useCallback(popupStyles(), []);
  const classes = useStyles();

  const pick = (p) => {
    pickPalette(slide, theme.id, p);
  };

  const brandingPaletteComponents = [];
  if (theme.branding && theme.branding.colors) {
    createBrandingPalettes(theme).forEach((palette, i) => brandingPaletteComponents.push(<PaletteInkwell key={`palette-slide-branding-${slide.id}-${i}`} palette={palette} pickPalette={pick} original={palette.id() === originalPalette.id()} selected={palette.id() === currentPalette?.id()}/>));
  }
  const paletteComponents = theme.paletteSuggestions().map((palette, i) => <PaletteInkwell key={`palette-slide-${slide.id}-${i}`} palette={palette} pickPalette={pick} original={palette.id() === originalPalette.id()} selected={palette.id() === currentPalette?.id()}/>);
  const imagePalette = suggestedPalettes.map((palette, i) => <PaletteInkwell key={`palette-slide-${slide.id}-${i}`} palette={palette} pickPalette={pick} original={palette.id() === originalPalette.id()} selected={palette.id() === currentPalette?.id()}/>);
  const palettesInUse = usePalettesInUse();
  const inUse = palettesInUse.map((palette, i) => <PaletteInkwell key={`palette-slide-${slide.id}-${i}`} palette={palette} pickPalette={pick} original={palette.id() === originalPalette.id()} selected={palette.id() === currentPalette?.id()}/>);

  return (
    <div style={{ marginLeft: width < 500 ? 0 : 15, marginRight: width < 500 ? 0 : 15 }}>
      <div className={classes.sectionOuter}>

        <div className={classes.section}>
          <Section title="Colors from Theme" style={{ marginTop: 5 }} override={{
            boxShadow: "none",
            border: "none",
            padding: "15px 0",
            background: "none",
          }}>
            {paletteComponents}
          </Section>

          {brandingPaletteComponents.length > 0 ? (
            <div className={classes.section}>
              <Section title="Company Colors" style={{ marginTop: 5 }} override={{
                boxShadow: "none",
                border: "none",
                padding: "15px 0",
                background: "none",
              }}>
                {brandingPaletteComponents}
              </Section>
            </div>
          ) : null }
        </div>
        {imagePalette.length > 0 ? (
          <div className={classes.section}>
            <Section title="Colors from Pictures" style={{ marginTop: 5 }} override={{
              boxShadow: "none",
              border: "none",
              padding: "15px 0",
              background: "none",
            }}>
              {imagePalette}
            </Section>
          </div>
        ) : null }
      </div>

      <div className={classes.section}>
        <Section title="Used elsewhere in this deck" style={{ marginTop: 5 }} override={{
          boxShadow: "none",
          border: "none",
          padding: 0,
          background: "none",
        }}>
          {inUse}
        </Section>
      </div>

    </div>
  );
};

/**
 * Palette suggestions component below each slide in the Lightbox.
 *
 */
const PaletteSuggestionComponent = ({ setKeepOpen, show, theme, deckId, slide, pickPalette }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setKeepOpen(!anchorEl);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!show) {
      setAnchorEl(null);
      setKeepOpen(false);
    }
  });

  return (
    <>
      <div style={{ display: "inline-block" }}>
        <Tooltip title="Choose a color palette" arrow>
          <Button size="medium" variant="contained" onClick={handleClick} className={open ? "open" : ""}>
            <PaletteMaterialIcon fontSize="inherit"/>
          </Button>
        </Tooltip>
        <Popup anchor={anchorEl} setAnchor={setAnchorEl} open={open}>
          <Section style={{ width: 250 }}>
            <PalettePopup deckId={deckId} theme={theme} slide={slide} pickPalette={pickPalette}/>
          </Section>
        </Popup>
      </div>
    </>
  );
};
export default PaletteSuggestionComponent;
