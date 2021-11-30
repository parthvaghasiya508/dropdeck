import React from "react";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

export const SuggestionsDropdownMenu = ({ classes, containerRef, suggestions, index, onClick, keyboardIndex, activeItemRef }) => (
  <div className={`${classes.root} suggestionsDropdown`} ref={containerRef}>
    {suggestions.map((suggestion, i) => {
      const lastHighlighted = (suggestion.highlight && i < suggestions.length - 1 && !suggestions[i + 1].highlight);
      return (
        <div key={suggestion.displayName}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
          <div
            onClick={onClick(i)}
            className={`suggestions ${i === index ? 'active' : ''} ${i === keyboardIndex ? 'keyboard' : ''}`}
            ref={i === index ? activeItemRef : null}
          >
            {suggestion.icon ? suggestion.icon : null}
            <div className="synonym">{suggestion.displayName}</div>
            {suggestion.synonym ? (
              <div className="label">
                {suggestion.synonym.prefix}{suggestion.synonym.suffix}
              </div>
            ) : null}
            {suggestion.description ? (
              <div className="description">{suggestion.description}</div>
            ) : null}
            <KeyboardReturnIcon/>
          </div>
          {lastHighlighted ? (
            <div className={classes.boundary}><div className="boundary-line"> </div></div>
          ) : null}
        </div>
      );
    })}
  </div>
);
