import express from "express";
import { getSlide } from "../../../services/deck/queries/getSlide.js";
import {
  getAnonymousDecks,
  removeClaimedDeckFromAnonymous,
  setAnonymousDecks
} from "../../../services/deck/queries/anonymousDecks.js";
import { logger } from "../../../util/logger.js";
import { DeckService } from "../../../services/deck/DeckService.js";
import { getLimitSkip } from '../../../util/pagination';

const deckRouter = express();

export const deckRoutes = (router) => {

  // Decks REST API
  router.use('/decks', deckRouter);

  /**
   * Get all decks that a user can access. These can be restricted further to passing in "owner" (Boolean)
   * to filter on decks owned by the user, or just shared with the user.
   */
  deckRouter.get('/', (req, res) => {
    const { page, columnCount } = req.query;
    const { limit } = getLimitSkip(page, columnCount);
    DeckService.find(req.query, req, res)
      .then(
        (decks) => {
          const hasMore = decks.length === limit + 1;

          res.type('application/json');
          res.send({
            decks: hasMore ? decks.slice(0, decks.length - 1) : decks,
            hasMore,
          });
        }
      )
      .catch((e) => logger.error(e));
  });

  /**
   * Fetch a single deck by ID.
   */
  deckRouter.get('/:_id([a-zA-Z0-9]+)', (req, res) => {
    DeckService.get(req.params._id, req, res)
      .then(
        (deck) => {
          if (deck) {
            if (deck.owner && deck.owner !== null) {
              removeClaimedDeckFromAnonymous(deck._id, req, res);
            }
            res.type('application/json');
            res.send(deck);
          } else if (!req.user) {
            logger.error(`Unauthenticated request not allowed to read deck ${req.params._id}`);
            res.status(401);
            res.send();
          } else {
            logger.error(`Unauthorized access or missing deck when user ${req.user ? req.user.email : null} attempted to read deck ${req.params._id}`);
            res.status(404);
            res.send();
          }
        }
      )
      .catch((_) => {
        logger.error(`Unauthorized access or missing deck when user ${req.user ? req.user.email : null} attempted to read deck ${req.params._id}`);
        res.status(404);
        res.send();
      });
  });

  /**
   * Create deck.
   */
  deckRouter.post('/:from?', (req, res) => {
    let create;
    if (req.params.from) {
      logger.trace(`Creating a new deck from existing: ${req.params.from}`);
      create = DeckService.clone(req.params.from, req.user, req, res);
    } else {
      create = DeckService.create(req.body, req.user);
    }
    create
      .then((slideDeck) => {
        if (!slideDeck) {
          res.status(404);
          res.send();
          return;
        }

        if (slideDeck._internal) {
          slideDeck._internal = undefined;
        }

        // If the user was anonymous, we add the new deck to the list of anonymous decks for that user,
        // returned in a cookie.
        if (!req.user) {
          const anonymousDecks = getAnonymousDecks(req, res) || [];
          anonymousDecks.push(slideDeck._id);
          setAnonymousDecks(res, anonymousDecks);
        }

        res.send(slideDeck);
      });
  });

  /**
   * Update deck.
   */
  const updateDeck = (req, res) => {
    DeckService.update(req.params._id, req.body, req, res,
      (error, deck) => {
        if (error) {
          logger.error(`Error when user ${req.user ? req.user.email : null} attempted to update deck ${req.params._id}:`);
          logger.error(error);
          res.status(500);
          res.send();
        } else if (deck) {
          if (deck._internal) {
            deck._internal = undefined;
          }
          res.send(deck);
        } else if (!req.user) {
          logger.error(`Unauthenticated request not allowed to read deck ${req.params._id}`);
          res.status(401);
          res.send();
        } else {
          logger.error(`Unauthorized access when user ${req.user ? req.user.email : null} attempted to update deck ${req.params._id}`);
          res.status(404);
          res.send();
        }
      });
  };
  deckRouter.put('/:_id', updateDeck);
  deckRouter.post('/:_id/exit', (req, res) => {
    logger.debug(`Received an exit beacon for deck ${req.params._id} - persisting unsaved content changes`);
    updateDeck(req, res);
  });

  /**
   * Delete a deck.
   */
  deckRouter.delete('/:_id', (req, res) => {
    DeckService.delete(req.params._id, req, res,
      (error, deck) => {
        if (error) {
          logger.error(`Error when user ${req.user ? req.user.email : null} attempted to delete deck ${req.params._id}:`);
          logger.error(error);
          res.status(500);
          res.send();
        } else if (deck) {
          if (deck._internal) {
            deck._internal = undefined;
          }
          res.send();
        } else {
          logger.error(`Unauthorized access when user ${req.user ? req.user.email : null} attempted to delete deck ${req.params._id}`);
          res.status(404);
          res.send();
        }
      });
  });

  /**
   * Retrieve a single slide within a deck.
   */
  deckRouter.get('/:_id?/slides/:_slideId?', (req, res) => {
    DeckService.get(req.params._id, req, res)
      .then(
        (deck) => {
          const slide = getSlide(deck, req.params._slideId);
          if (slide) {
            res.type('application/json');
            res.send(slide);
          } else if (!req.user) {
            logger.error(`Unauthenticated request not allowed to read deck ${req.params._id}`);
            res.status(401);
            res.send();
          } else {
            logger.error(`Unauthorized access when user ${req.user ? req.user.email : null} attempted to access deck ${req.params._id}`);
            res.status(404);
            res.send();
          }
        }
      )
      .catch((e) => logger.error(e));
  });
};
