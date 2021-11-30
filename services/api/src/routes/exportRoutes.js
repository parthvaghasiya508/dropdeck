import mkdirp from "mkdirp";
import express from "express";
import { ExportService } from "../services/export/ExportService.js";
import config from "../config";
import { logger } from "../util/logger";
import { PlayService } from "../services/deck/PlayService";
import { DiskStorageService } from "../services/storage/DiskStorageService";

const exportRouter = express();
const fs = require('fs');

const fileStorageService = new DiskStorageService();

export const exportRoutes = (router) => {

  // Deck export REST API
  router.use('/', exportRouter);

  /**
   * Export a deck to PDF and write back to the client.
   */
  exportRouter.get('/decks/:shortId\.pdf', async (req, res) => {
    const { shortId } = req.params;
    const cookies = cookiesAsArray(req.cookies);
    logger.trace(`Exporting deck ${shortId} with cookies:`);
    logger.trace(cookies);
    PlayService.get(shortId, req, res)
      .then(
        async (deck) => {
          if (deck) {
            const url = `${config.frontend.export.host}/${config.frontend.export.path}/${shortId}`;
            const fileName = `${deck.name || shortId}.pdf`;
            const { pdf, totalTime } = await ExportService.exportPdf(deck, fileName, url, cookies);
            // Add Server-Timing! See https://w3c.github.io/server-timing/.
            res.set('Server-Timing', `Prerender;dur=${totalTime};desc="Headless render time (ms)"`);
            // return res.status(200).send(html); // Serve prerendered page as response.
            res.set({
              'Content-Type': 'application/pdf',
              'Content-Length': pdf.length,
              'Content-Disposition': `attachment; filename="${fileName}"`
            });
            res.send(pdf);
          }
        }
      )
      .catch((e) => {
        logger.error(`Unauthorized access or missing deck when user ${req.user ? req.user.email : null} attempted to read deck ${shortId}`);
        logger.error(e);
        res.status(404);
        res.send();
      });
  });

  /**
   * Export the deck cover slide as a PNG.
   */
  exportRouter.get('/decks/:shortId\.jpeg', async (req, res) => {
    const { shortId } = req.params;
    const cookies = cookiesAsArray(req.cookies);
    logger.trace(`Generating thumbnail for deck ${shortId} with cookies:`);
    logger.trace(cookies);
    let width;
    try {
      if (req.query.w) {
        width = parseInt(req.query.w, 10);
      }
    // eslint-disable-next-line no-empty
    } catch (e) {}

    PlayService.get(shortId, req, res)
      .then(
        async (deck) => {
          if (deck) {
            const deckId = deck._id;
            const folder = fileStorageService.deckFolder(deckId, true);
            mkdirp.sync(folder);
            const fileName = width && width > 0 ? `${shortId}-${width}px.jpeg` : `${shortId}.jpeg`;
            const path = `${folder}/${fileName}`;
            await fs.exists(path, async (fileExists) => {
              let generateThumbnail = !fileExists;
              if (fileExists) {
                const stats = fs.statSync(path);
                const fileModified = stats.mtime;
                const deckModified = deck.updated;
                if (deckModified && deckModified.getTime() > fileModified.getTime()) {
                  generateThumbnail = true;
                }
              }

              let filePath = path;
              if (generateThumbnail) {
                logger.debug(`Thumbnail for deck ${deckId} is out of date - regenerating`);

                const url = `${config.frontend.export.host}/${config.frontend.export.path}/${shortId}/cover`;

                // Determine if the user has access to view the thumbnail.
                const { file } = await ExportService.screenshot(deck, url, path, cookies, width);
                if (!file) {
                  logger.debug(`Unable to generate a thumbnail for deck ${deckId}`);
                  res.status(404);
                  res.send();
                  return;
                }
                filePath = file;
              } else {
                logger.debug(`Already have thumbnail for deck ${deckId}`);
              }
              res.download(filePath); // Set disposition and send it.

            });

          } else {
            logger.error(`Unauthorized access or missing deck when user ${req.user ? req.user.email : null} attempted to read deck ${shortId}`);
            res.status(404);
            res.send();
          }
        }
      )
      .catch((e) => {
        logger.error(`Unauthorized access or missing deck when user ${req.user ? req.user.email : null} attempted to read deck ${shortId}`);
        logger.error(e);
        res.status(404);
        res.send();
      });
  });
};

const cookiesAsArray = (cookiesMap) => Object.keys(cookiesMap).map((key) => ({
  name: key,
  value: cookiesMap[key],
  url: config.frontend.host,
}));
