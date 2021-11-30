import express from "express";
import axios from "axios";
import { logger } from "../../../util/logger.js";
import config from "../../../config.js";
import { DeckInspirationService } from "../../../services/deck/DeckInspirationService.js";

const inspirationRouter = express();

export const inspirationRoutes = (router) => {

  // Decks REST API
  router.use('/inspiration', inspirationRouter);

  /**
   * Get available inspiration tags.
   */
  inspirationRouter.get('/', async (req, res) => {
    const tags = await DeckInspirationService.tags();
    res.send(tags);
  });

  /**
   * Fetch an inspiration deck.
   */
  inspirationRouter.get('/:tag', async (req, res) => {
    const deckId = await DeckInspirationService.get(req.params.tag);
    if (deckId) {
      axios({
        method: 'GET',
        url: `${config.decks.inspiration.service}/${deckId}`,
      })
        .then((json) => {
          res.send(json.data);
        })
        .catch((e) => {
          logger.error(e);
          res.sendStatus(404);
          return res;
        });
    } else {
      res.sendStatus(404);
      return res;
    }
  });
};
