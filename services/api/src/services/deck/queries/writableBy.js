import { ownUnclaimedDecks } from "./ownUnclaimedDecks.js";

/**
 * Returns a clause that restricts a query for Decks objects to decks that are editable by the given user.
 */
export const writableBy = (req, res) => {
  const { user } = req;
  if (user) {
    return { owner: user._id };
  }

  // Anonymous user can edit unclaimed decks they have listed in their anonymous decks cookie.
  const anonymousDecksClause = ownUnclaimedDecks(req, res);
  if (anonymousDecksClause) {
    return anonymousDecksClause;
  }

  // Not authenticated and no anonymous decks in cookie => can't edit anything, so we return a clause
  // that evaluates to false for all decks.
  return { _id: { $exists: false } }; // always false because we always have an _id for a deck.
};
