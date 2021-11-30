/**
 * Returns a clause that restricts a query for Decks objects to decks that can be deleted by the given user.
 */
import { writableBy } from "./writableBy.js";

export const deletableBy = writableBy; // same access for WRITE/DELETE for the time being
