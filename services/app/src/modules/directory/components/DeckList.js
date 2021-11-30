/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useCallback, useState, useRef, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SimpleDeckCard from "./SimpleDeckCard";
import { ROUTE_EDIT_DECK, ROUTE_NEW_DECK, ROUTE_PLAY_DECK } from "../../../Routes";
import { deckListStyles } from "./deckListStyles";
import Label from "../../../common/components/controls/Label";
import '../../../utils/patchedFocus';

const HEADER_HEIGHT = 100;

const DeckList = ({ title, decks, allDecks, focused, touched, index, setFocusedListIndex, currentIndex, setCurrentIndex, toggleInfoPanel, onClick, createIcon, company = false, children, setPageNumber, pageNumber, hasMore, columnCount, grid = { xs: 12, sm: 6, md: 6, lg: 4 } }) => {
  const useStyles = useCallback(deckListStyles(), []);
  const classes = useStyles();
  const history = useHistory();
  const deckListRef = useRef();
  const activeCardRef = useRef();
  const { xs, sm, md, lg } = grid;

  useEffect(() => {
    if (deckListRef.current && focused) {
      deckListRef.current.focus({ preventScroll: true });
    }
  }, [focused, deckListRef, decks]);

  useEffect(() => {
    if (activeCardRef.current && focused && touched) {
      const { offsetTop } = activeCardRef.current;
      const rootElement = document.getElementsByTagName('body')[0];

      if (offsetTop < rootElement.scrollTop) {
        rootElement.scrollTo({ top: offsetTop - HEADER_HEIGHT });
      } else if (offsetTop - rootElement.scrollTop + activeCardRef.current.clientHeight > rootElement.clientHeight) {
        rootElement.scrollTo({ top: offsetTop - rootElement.clientHeight + activeCardRef.current.clientHeight });
      }
    }
  }, [activeCardRef.current, focused, touched]);

  const loadMoreDeck = (e) => {
    e.stopPropagation();
    setPageNumber(pageNumber + 1);
  };

  const getPrevDeckListIndex = (index) => {
    let prevIndex = index;

    for (let i = 0; i < allDecks.length; i++) {
      prevIndex--;

      if (prevIndex < 0) {
        prevIndex = allDecks.length - 1;
      }

      if (allDecks[prevIndex].length > 0) {
        return prevIndex;
      }
    }

    if (prevIndex !== index) {
      return prevIndex;
    }
    return -1;

  };
  const getNextDeckListIndex = (index) => {
    let nextIndex = index;

    for (let i = 0; i < allDecks.length; i++) {
      nextIndex++;

      if (nextIndex > allDecks.length - 1) {
        nextIndex = 0;
      }

      if (allDecks[nextIndex].length > 0) {
        return nextIndex;
      }
    }

    if (nextIndex !== index) {
      return nextIndex;
    }
    return -1;

  };

  const deckList = () => decks.map((deck, index) => (
    <Grid ref={index === currentIndex ? activeCardRef : null} item key={deck._id} xs={xs} sm={sm} md={md} lg={lg}>
      <SimpleDeckCard
        onClickMedia={() => {
          setCurrentIndex(index);
          handleClick();
        }}
        active={focused && index === currentIndex}
        key={`directory-deck-${deck._id}`}
        deck={deck}
        toggleInfoPanel={toggleInfoPanel}
        grid={grid}
      />
    </Grid>
  ));

  // New Deck Card
  const newDeckCard = () => {
    const newDeck = () => {
      history.push({ pathname: ROUTE_NEW_DECK, state: { permissions: { company, public: false } } });
    };
    return (
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <Card variant="outlined" className={classes.create} onClick={newDeck} style={{ height: decks.length > 0 ? "calc(100% - 15px)" : 140 }} >
          <CardActions>
            <IconButton color="primary"><AddIcon/></IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        const prevDeckListIndex = getPrevDeckListIndex(index);

        setFocusedListIndex(prevDeckListIndex);
        setCurrentIndex(allDecks[prevDeckListIndex].length - 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (currentIndex > columnCount - 1) {
        setCurrentIndex(currentIndex - columnCount);
      } else {
        const prevDeckListIndex = getPrevDeckListIndex(index);
        const rowPosition = currentIndex % columnCount;
        const listLength = allDecks[prevDeckListIndex].length;

        setFocusedListIndex(prevDeckListIndex);
        setCurrentIndex(Math.min(Math.floor((listLength - 1) / columnCount) * columnCount + rowPosition, listLength - 1));
      }
    } else if (e.key === 'ArrowRight') {
      if (currentIndex < decks.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        const nextDeckListIndex = getNextDeckListIndex(index);

        setFocusedListIndex(nextDeckListIndex);
        setCurrentIndex(0);
      }
    } else if (e.key === 'ArrowDown') {
      if (currentIndex < decks.length - columnCount) {
        setCurrentIndex(currentIndex + columnCount);
      } else if (Math.ceil(decks.length / columnCount) * columnCount - currentIndex - 1 < columnCount) {
        const nextDeckListIndex = getNextDeckListIndex(index);
        const rowPosition = currentIndex % columnCount;

        setFocusedListIndex(nextDeckListIndex);
        setCurrentIndex(Math.min(rowPosition, allDecks[nextDeckListIndex].length - 1));
      } else {
        setCurrentIndex(decks.length - 1);
      }
    } else if (e.key === 'Enter') {
      history.push({ pathname: `${ROUTE_EDIT_DECK}/${decks[currentIndex]._id}` });
    } else if (e.key === ' ') {
      toggleInfoPanel(true, decks[currentIndex]._id)();
    } else if (e.key === 'p') {
      history.push({ pathname: `${ROUTE_PLAY_DECK}/${decks[currentIndex].identifiers?.short}` });
    }
  };

  const handleClick = () => {
    deckListRef.current.focus({ preventScroll: true });
    onClick();
  };

  return (
    <div ref={deckListRef} className={classes.root} onKeyDown={handleKeyDown} tabIndex={-1}>
      <Label variant="h3" className={classes.title}>{title}</Label>
      <Grid container spacing={6}>
        {decks ? deckList() : null}
        {children}
        {createIcon ? newDeckCard() : null}
      </Grid>
      <Box display="flex" justifyContent="center" padding="2rem">
        {
          hasMore && (
            <Button
              className={classes.cta}
              onClick={loadMoreDeck}
              variant="contained"
              color="primary"
              size="medium"
            >
              <span className="full" style={{ marginLeft: 5 }}>Load More...</span>
            </Button>
          )
        }
      </Box>
    </div>
  );
};
export default DeckList;
