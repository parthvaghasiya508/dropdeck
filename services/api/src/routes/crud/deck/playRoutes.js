import express from "express";
import { logger } from "../../../util/logger.js";
import { PlayService } from "../../../services/deck/PlayService.js";
import config from '../../../config.js';

const playRouter = express();

export const playRoutes = (router) => {

  // Decks REST API
  router.use('/play', playRouter);

  playRouter.get('/:short_id?', (req, res) => {

    logger.trace(`Playing deck ${req.params.short_id} with cookies:`);
    logger.trace(req.cookies);

    PlayService.get(req.params.short_id, req, res)
      .then(
        (deck) => {
          if (deck) {
            res.type('application/json');
            res.send(deck);
          } else {
            res.status(404).send();
          }
        }
      )
      .catch((e) => logger.error(e));
  });

  playRouter.get('/:short_id/oembed', (req, res) => {
    PlayService.get(req.params.short_id, req, res)
      .then(
        (deck) => {
          if (deck) {
            const embedRepresentation = {
              version: "1.0",
              type: "rich",
              title: deck.name,
              author_name: deck.owner ? `${deck.owner.givenName} ${deck.owner.familyName}` : 'Anonymous',
              provider_name: "Dropdeck",
              provider_url: "https://dropdeck.com/",
              html: `<iframe src="${config.frontend.player.host}/${req.params.short_id}/embed" width="${req.query.width || 800}" height="${req.query.height || 500}" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen sandbox="allow-scripts allow-same-origin"> </iframe>`,
              width: 800,
              height: 500,
              thumbnail: `${config.backend.host}/export/decks/${req.params.short_id}.jpeg`,
              thumbnail_url: `${config.backend.host}/export/decks/${req.params.short_id}.jpeg`,
              thumbnail_width: req.query.width || 800,
              thumbnail_height: req.query.height || 500,
              slideshow_id: req.params.short_id
            };

            res.type('application/json');
            res.send(embedRepresentation);

          } else {
            res.status(404).send();
          }
        }
      )
      .catch((e) => logger.error(e));
  });

};
