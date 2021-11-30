import { ownUnclaimedDecks } from "./ownUnclaimedDecks.js";

/**
 * Returns a clause that restricts a query for Decks objects to decks that are accessible by the given user.
 */
export const readableBy = (req, res) => {

  const { user } = req;
  if (user) {
    return {
      $or: [
        { owner: user._id },
        { "permissions.company": true, company: user.company ? user.company._id : { $exists: false } },
        { "permissions.public": true }
      ]
    };

  }

  // Anonymous users an only access public decks or anonymous (and unclaimed) decks they have created themselves:
  const anonymousDecksClause = ownUnclaimedDecks(req, res);
  return anonymousDecksClause ? {
    $or: [
      { "permissions.public": true },
      anonymousDecksClause,
    ]
  } : { "permissions.public": true };
};
