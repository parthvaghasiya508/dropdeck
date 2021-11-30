import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoadingState } from "../../../common/api/Constants";
import { useCreateDeck } from "../../../common/api/sdk/hooks/DeckHooks";
import AnonymousUser from "../../../common/authz/AnonymousUser";
import { ThemeFactory } from "../../../common/theme/ThemeFactory";
import { signalCreateDeck } from "../../../common/util/SignalCapture";
import { ROUTE_EDIT_DECK, ROUTE_HOME } from "../../../Routes";
import { redirectOnError } from "../transforms/redirectOnError";
import { newDeckState } from "./DeckEditor/transforms/newDeckState";
import LoadingStateComponent from "./LoadingStateComponent";

/**
 * Interstitial to create a deck.
 *
 * @returns {*}
 * @constructor
 */
const CreateDeck = ({ location, match, user }) => {

  const history = useHistory();

  const [status, setStatus] = useState(LoadingState.NONE);

  const [createDeck, { deck, error }] = useCreateDeck();

  if (error && status !== LoadingState.ERROR) {

    const statusCode = error.response?.status;

    // Missing authentication (user's session has expired):
    if (statusCode && statusCode === 404) {
      document.location = ROUTE_HOME;
    } else {
      // setStatus(LoadingState.ERROR);
      redirectOnError(500, `${location.pathname}${location.search}`);
    }
  }
  if (deck && status !== LoadingState.DONE) {
    // setStatus(LoadingState.DONE);
    history.replace(`${ROUTE_EDIT_DECK}/${deck._id}`);
  }

  useEffect(() => {
    if (status === LoadingState.NONE) {
      // setStatus(LoadingState.UPDATING);
      const from = match?.params?.from || location?.state?.from;
      if (from) {
        // Cloning an existing deck
        createDeck(from);
        signalCreateDeck(user, true);
      } else {
        // Creating a new deck using client held default state
        const newDeck = {
          theme: ThemeFactory.DEFAULT_THEME_NAME,
          content: newDeckState(),
        };
        createDeck(newDeck);
        signalCreateDeck(user, false);
      }
    }
  }, []);

  if (status === LoadingState.ERROR) {
    return (<LoadingStateComponent status={status}/>);
  }

  return null;
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(CreateDeck);
