import { Deck } from '@dropdeck/schema';
import { readableBy } from "./queries/readableBy.js";

export const PlayService = {

  /**
   * Fetch a deck by short ID.
   *
   * @param query optional deck query.
   * @param req HTTP request.
   * @param res HTTP response.
   * @returns a Promise for the deck response.
   */
  get: (shortId, req, res) => (
    Deck.findOne({ $and: [{ "identifiers.short": shortId.toUpperCase() }, readableBy(req, res)] })
      .populate("owner")
      .select("-_internal") // don't return _internal metadata to the client
      .exec(null)),
};
