/**
 * Returns a clause that restricts a query for Decks objects to decks that are owned by the given user.
 */
export const ownedBy = (user) => ({ owner: user ? user._id : { $exists: false } });
