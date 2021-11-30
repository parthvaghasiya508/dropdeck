import { Deck } from '@dropdeck/schema';
import { Types } from "mongoose";
import { readableBy } from "./queries/readableBy.js";
import { eventBus } from "../../util/event/EventBus";
import { ownedBy } from "./queries/ownedBy.js";
import { sharedWith } from "./queries/sharedWith.js";
import { hasBeenUpdated } from "./queries/hasBeenUpdated.js";
import { defaultPermissions } from "./queries/defaultPermissions.js";
import { writableBy } from "./queries/writableBy.js";
import { deletableBy } from "./queries/deletableBy.js";
import { debugMode } from "../../util/debugMode";
import { logger } from "../../util/logger";
import { getLimitSkip } from "../../util/pagination";
import { DeckFiles } from "./DeckFiles";

export const DeckService = {

  /**
   * Get all decks that a user can access. These can be restricted further to passing in "owner" (Boolean)
   * to filter on decks owned by the user, or just shared with the user.
   *
   * @param query optional deck query.
   * @param req HTTP request.
   * @param res HTTP response.
   * @returns a Promise for the deck response.
   */
  find: (query, req, res) => {
    let clause = readableBy(req, res);
    const { f, page, columnCount } = req.query;
    if (f !== undefined) {
      if (f === 'owner') {
        clause = ownedBy(req.user);
      } else if (f === 'shared') {
        clause = sharedWith(req.user);
      }
    }

    const { limit, skip } = getLimitSkip(page, columnCount);

    // Only return documents that have been updated:
    const combinedClause = { $and: [clause, hasBeenUpdated()] };

    return Deck.find(combinedClause)
      .sort("-updated")
      .limit(limit + 1)
      .skip(skip)
      .populate("owner")
      .select("-_internal") // don't return _internal metadata to the client
      .exec(null);
  },

  /**
   * Fetch a single deck by ID.
   *
   * @param req HTTP request.
   * @param res HTTP response.
   * @returns a Promise for the deck response.
   */
  get: (id, req, res) => (
    Deck.findOne({
      $and: [{ _id: id }, readableBy(req, res)]
    })
      .populate("owner")
      .select("-_internal") // don't return _internal metadata to the client
      .exec(null)),

  /**
   * Create a new deck.
   *
   * @param deckObject new deck object.
   * @param user current user
   * @returns a Promise for the deck response.
   */
  create: (deckObject, user) => {
    const newDeck = {
      ...deckObject,
      owner: user ? user._id : null,
      company: user && user.company !== undefined ? user.company : null
    };
    if (!newDeck.permissions) {
      newDeck.permissions = defaultPermissions(user);
    }
    if (user) {
      eventBus().notify(`🍿 New deck for: ${user.givenName} ${user.familyName}, ${user.email})`);
    } else {
      eventBus().notify(`🤞 New anonymous deck created`);
    }
    return Deck.create(newDeck);
  },

  /**
   * Clone an existing deck, which includes copying all associated files.
   *
   * @param id the deck to clone
   * @param user current user
   * @param req
   * @param res
   * @returns a Promise for the deck response.
   */
  clone: (id, user, req, res) => (
    Deck.findOne({
      $and: [{ _id: id }, readableBy(req, res)]
    })
      .select("-_internal") // don't return _internal metadata to the client
      .exec(null)
      .then((deck) => {
        if (deck) {
          const newDeckId = Types.ObjectId();
          return DeckFiles.copyFiles(id, newDeckId, req.user)
            .then(() => {
              const newDeck = {
                ...deck.toObject(),
                _id: newDeckId,
                source: deck._id,
                isNew: true,
                updated: null,
                identifiers: {},
                _internal: {},
                owner: user ? user._id : null,
                company: user && user.company !== undefined ? user.company : null
              };
              if (!newDeck.permissions) {
                newDeck.permissions = defaultPermissions(user);
              }
              return Deck.create(newDeck);
            });
        }
        return new Promise((resolve, reject) => {
          logger.error(`Unauthorized access or missing deck when user ${req.user ? req.user.email : null} attempted to clone deck ${id}`);
          reject();
        });

      })
  ),

  /**
   * Update a deck.
   *
   * @param id deck ID.
   * @param deckObject new deck data.
   * @param req HTTP request.
   * @param res HTTP response.
   */
  update: (id, deckObject, req, res, callback) => {
    if (debugMode()) {
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      logger.debug(`The API is using ~${Math.round(used * 100) / 100} MB`);
    }
    Deck.findOneAndUpdate({ $and: [{ _id: id }, writableBy(req, res)] },
      { $set: { ...deckObject } }, {
        new: true,
        projection: { counter: 0 }, // don't return _internal metadata to the client
      }, callback);
  },

  /**
   * Delete a particular deck.
   *
   * @param id deck ID.
   * @param req HTTP request.
   * @param res HTTP response.
   */
  delete: (id, req, res, callback) => {
    Deck.findOneAndDelete({ $and: [{ _id: id }, deletableBy(req, res)] }, callback);
  }

};
