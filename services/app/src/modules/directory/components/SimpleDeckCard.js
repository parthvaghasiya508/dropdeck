import { Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InfoIcon from '@material-ui/icons/Info';
import React, { useCallback } from "react";
import useDimensions from "react-cool-dimensions";
import { TiArrowShuffle } from "react-icons/ti";
import { useHistory } from "react-router-dom";
import SlideDeckPlayControl from "../../../common/components/ApplicationBar/components/SlideDeckPlayControl";
import { ROUTE_EDIT_DECK, ROUTE_NEW_DECK, ROUTE_PLAY_DECK, ROUTE_PLAY_DOCS } from "../../../Routes";
import { setHeightFromAspect } from "../../presenter/queries/setHeightFromAspect";
import DeckPreview from "./DeckPreview/DeckPreview";
import { DeckIdContext } from "../../composer/hooks/useDeckId";
import { simpleDeckCardStyles } from "./SimpleDeckCard.styles";

/**
 * Open a deck in edit/composer.
 */
const onClickToCompose = (deck) => () => {
  if (deck.isReference) {
    window.location = `${ROUTE_PLAY_DOCS}/${deck.id}`;
  } else {
    window.location = `${ROUTE_EDIT_DECK}/${deck._id}`;
  }
};

const SimpleDeckCard = ({ active, deck, toggleInfoPanel, onClickMedia }) => {
  const { ref, width } = useDimensions();
  const history = useHistory();

  const cloneDeck = () => {
    history.push({ pathname: ROUTE_NEW_DECK, state: { from: deck._id, permissions: { company: false, public: false } } });
  };

  const useStyles = useCallback(simpleDeckCardStyles(), []);
  const classes = useStyles();

  return (
    <DeckIdContext.Provider value={deck._id}>
      <Card
        className={[classes.deckCard, active && classes.active]}
        elevation={0}
        tabIndex={0}
      >
        <CardMedia className={classes.deckPreview} ref={ref} style={{ height: setHeightFromAspect(width), overflow: "hidden", }} onClick={onClickMedia}>
          <DeckPreview deck={deck} />
          {toggleInfoPanel && (
            <IconButton onClick={toggleInfoPanel(true, deck._id)} size="medium" className={classes.infoBtn} style={{ position: "absolute", zIndex: 999, bottom: 10, left: 18 }}>
              <InfoIcon/>
            </IconButton>
          )}
        </CardMedia>

        <CardActionArea className={classes.allContent} classes={{ focusHighlight: classes.focusHighlight }}>
          <div className={classes.allTitles} role="navigation">
            <div className={classes.cardContent}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <SlideDeckPlayControl id={deck.isReference ? deck.id : deck.identifiers?.short} muted style={{ height: "100%" }} playRoute={deck.isReference ? ROUTE_PLAY_DOCS : ROUTE_PLAY_DECK} />
                </div>
                <div style={{ flexGrow: 1, marginLeft: 8, overflow: 'auto' }} onClick={onClickToCompose(deck)} role="navigation" aria-hidden="true">
                  <Typography variant="h4" className={classes.title} style={{ width: '95%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: '1', fontSize: '1.1rem', letterSpacing: '-0.0125em', padding: '0 5px', marginTop: 4 }}>
                    {deck.name || 'Untitled'}
                  </Typography>
                  {deck.owner && (
                    <Typography variant="subtitle1" color="textSecondary" style={{ width: '95%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.975rem', padding: '0 5px', fontFamily: '"Inter var", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"' }}>
                      {`${deck.owner.givenName} ${deck.owner.familyName}`}
                    </Typography>
                  )}
                </div>
                {
                  !deck.isReference && (
                    <Tooltip classes={{ tooltipPlacementTop: classes.remixTooltip }} title={<div style={{ padding: 2, textAlign: "center" }}><div><b>Remix!</b></div><div style={{ marginTop: 2 }}>Create a new deck from this one!</div></div>} placement="top-end" arrow>
                      <div style={{ marginTop: 10 }}>
                        <IconButton onClick={cloneDeck} size="medium" className={classes.infoBtn}><TiArrowShuffle/></IconButton>
                      </div>
                    </Tooltip>
                  )
                }
              </div>
            </div>
          </div>
          {/* <WorkflowPanel settings={deck.settings} mini style={{ position: "absolute", zIndex: 999, bottom: -16, left: 105 }}/> */}
        </CardActionArea>
      </Card>
    </DeckIdContext.Provider>
  );
};
export default SimpleDeckCard;
