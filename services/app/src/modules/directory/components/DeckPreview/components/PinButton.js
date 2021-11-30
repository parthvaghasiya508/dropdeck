import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useUpdateDeck } from "../../../../../common/api/sdk/hooks/DeckHooks";

/**
 * Button component to pin a slide as cover slide.
 *
 * @returns {*}
 * @constructor
 */
export const PinButton = ({ deck, coverId, setCoverId, activeSlide }) => {

  const [setUpdate] = useUpdateDeck();
  const selected = activeSlide && coverId ? coverId === activeSlide.id : false;

  const toggle = () => {
    // Toggling selected from existing value because setState is asynchronous
    if (!selected) {
      let activeSlideContent = null;
      for (let i = 0; i < deck.content.length; i++) {
        // Only matching on ID, not index of slide so doesn't matter about slide breaks in the editorState
        if (activeSlide.id === deck.content[i].id) {
          activeSlideContent = deck.content[i];
          break;
        }
      }
      const newCoverId = activeSlide.id;
      setCoverId(newCoverId);
      setUpdate(deck._id, {
        coverId: newCoverId,
      });
    } else {
      const newCoverId = deck.content[0].id;
      setCoverId(newCoverId);
      setUpdate(deck._id, {
        coverId: newCoverId,
      });
    }
  };

  return (
    <IconButton onClick={activeSlide ? toggle : null} size="small" style={{
      right: 20,
      padding: 3,
    }}>
      {selected ? <FavoriteIcon color="primary"/> : <FavoriteBorderIcon color="primary"/>}
    </IconButton>
  );
};
