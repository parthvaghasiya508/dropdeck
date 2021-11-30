import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE_NEW_DECK } from "../../../Routes";
import { deckListStyles } from "./deckListStyles";
import Label from "../../../common/components/controls/Label";

export const BlankSlateCard = () => {
  const history = useHistory();
  const useStyles = useCallback(deckListStyles(), []);
  const classes = useStyles();
  const newDeck = () => {
    history.push({ pathname: ROUTE_NEW_DECK, state: { permissions: { company: false, public: false } } });
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card variant="outlined" className={classes.blankState} style={{ height: 140 }} >
            <div className={classes.blankStateInner}>
              <Label variant="h2">Your decks will appear here</Label>
              <Label variant="p">Click to create your first one:</Label>
              <Button color="primary" variant="outlined" onClick={newDeck}><AddIcon/>&nbsp;New Deck</Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
