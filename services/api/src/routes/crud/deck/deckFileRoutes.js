import express from "express";
import expressAsyncHandler from "express-async-handler";
import { createProxyMiddleware } from 'http-proxy-middleware';
import multer from "multer";
import config from '../../../config.js';
import { logger } from '../../../util/logger.js';
import { DeckFiles } from "../../../services/deck/DeckFiles.js";
import { DeckService } from "../../../services/deck/DeckService";

const deckFileRouter = express.Router();

/**
 * Reverse proxy of requests to /assets/{ filepath } to either a disk path or Google Cloud bucket.
 *
 * @param router
 */
const reverseProxy = (router) => {

  // Proxy file uploads...
  if (config.storage.cloud.google.enabled) {

    const target = config.storage.cloud.google.decks.proxyUrl;
    const targetLength = target.length;

    const cloudProxy = createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path) => {
        const t0 = new Date().getTime();
        const pathPattern = new RegExp(/^\/assets\/(.+)/gi);
        const match = pathPattern.exec(path);
        if (match) {
          const [, fileName] = match;
          return DeckFiles.service.generateSignedUrl(fileName)
            .then((signedUrl) => {
              if (signedUrl.length > targetLength) {
                const rewritePath = signedUrl.substring(targetLength);
                const t1 = new Date().getTime();
                logger.debug(`Generating a signed URL rewrite path for ${fileName}: ${rewritePath} took ${t1 - t0} ms`);
                return rewritePath;
              }
            });
        }
        logger.debug(`No match for regex ${pathPattern} on input path ${path}`);
        return new Promise((resolve) => resolve());
      },

    });

    // ... to Google Cloud Storage:
    router.use('/assets', cloudProxy);
    logger.info(`Serving up deck files from Google Cloud Storage: Proxying /assets/* => ${config.storage.cloud.google.decks.proxyUrl}/*`);

  } else {

    // ... or to a persistent disk volume:
    router.use('/assets', express.static(config.storage.disk.decks.path));
    logger.info(`Serving up deck files from local disk: Proxying /assets/* => ${config.storage.disk.decks.path}/*`);
  }
};

export const deckFileRoutes = (router) => {

  // Deck files REST API
  router.use('/decks', deckFileRouter);

  const upload = multer({ storage: DeckFiles.service.diskStorage() });

  /**
   * Upload one or more files for a given deck.
   */
  deckFileRouter.post('/:deckId/files', upload.array("files", 12), expressAsyncHandler(async (req, res, next) => {
    const { deckId } = req.params;
    DeckFiles.store(deckId, req.user, req.files, req, res)
      .then((results) => {
        if (results) {
          res.json(results);
        } else {
          logger.error(`Unauthorized access when user ${req.user ? req.user.email : null} attempted to add files to deck ${deckId}`);
          res.status(404);
          res.send();
        }
      })
      .catch((e) => {
        logger.error(`Error when user ${req.user ? req.user.email : null} attempted to add files to deck ${deckId}`);
        logger.error(e);
        res.status(500);
        res.send();
      });
  }));

  /**
   * Routes to serve up static deck file assets.
   */

  // First check if the user has permission to view that file.
  // IMPORTANT: This middleware has to occur before the proxy, below.
  router.get('/assets/:deckId([a-zA-Z0-9]+)/:fileName', (req, res, next) => {
    DeckService.get(req.params.deckId, req, res)
      .then((deck) => {
        if (deck) {
          next();
        } else {
          logger.error(`Unauthorized access when user ${req.user ? req.user.email : null} attempted to access file ${req.params.fileName} from deck ${req.params.deckId}`);
          res.status(401);
          res.send();
        }
      })
      .catch((_) => {
        logger.error(`Unauthorized access when user ${req.user ? req.user.email : null} attempted to access file ${req.params.fileName} from deck ${req.params.deckId}`);
        res.status(404);
        res.send();
      });
  });

  // Proxy file downloads
  reverseProxy(router);
};
