import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from "react-redux";
import { deckNameStyles } from "./deckNameStyles";
import { setDeckName } from "../../../../../actions/presentation";

/**
 * Breadcrumb path to Deck.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const DeckName = ({ id, name: deckName, setDeckName, readOnly = false }) => {
  const useDeckNameStyles = useCallback(deckNameStyles(readOnly), [id, readOnly]);
  const classes = useDeckNameStyles();
  const fileNameChange = (ev) => {
    const newFileName = ev.target.value;
    if (id) {
      setDeckName(newFileName);
    }
  };

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {      
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.deckRename}>
        {id
          ? (
            <TextField
              id="filename"
              value={deckName || ''}
              placeholder="Untitled Deck"
              disabled={readOnly}
              onChange={fileNameChange}
              onKeyDown={onKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CreateIcon />
                  </InputAdornment>
                ),
              }}
            />
          ) : null}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setDeckName,
};

function mapStateToProps(state) {
  return { deckName: state.composer.presentation ? state.composer.presentation.name : undefined };
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckName);
