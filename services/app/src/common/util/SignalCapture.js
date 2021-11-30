import GA4React from "ga-4-react";
import AnonymousUser from "../authz/AnonymousUser";

export const signal = (eventName, params) => {
  const gaReact = GA4React.getGA4React();
  if (gaReact) {
    gaReact.gtag("event", eventName, params);
  }
};

export const Events = {
  SignUp: "sign_up",
  CreateDeck: "create_deck"
};

export const UserType = {
  Individual: "individual",
  Domain: "domain",
  Anonymous: "anonymous"
};

/**
 * User creates a deck.
 *
 * @param user
 * @param remix Created from another deck
 */
export const signalCreateDeck = (user, remix) => {
  const params = {};
  params.remix = remix;
  if (user instanceof AnonymousUser) {
    params.user_type = UserType.Anonymous;
  } else if (user.company && user.company.active) {
    params.user_type = UserType.Domain;
  } else {
    params.user_type = UserType.Individual;
  }
  signal(Events.CreateDeck, params);
};

export const signalSignUp = (userType) => {
  signal(Events.SignUp, {
    user_type: userType
  });
};
