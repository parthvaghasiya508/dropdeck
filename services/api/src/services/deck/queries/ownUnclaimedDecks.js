import { getAnonymousDecks } from "./anonymousDecks.js";

export const ownUnclaimedDecks = (req, res) => {
  const decks = getAnonymousDecks(req, res);
  if (decks && decks.length > 0) {
    return { $or: decks.map((_id) => ({ _id, owner: null })) };
  }
  return undefined;
};
