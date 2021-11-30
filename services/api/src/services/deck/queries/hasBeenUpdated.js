/**
 * Returns a clause that restricts a query for Deck objects to decks that have been updated (not trivial).
 */
export const hasBeenUpdated = () => ({ $where: 'this.updated > this.created' });
