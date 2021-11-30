import express from "express";
import { ScrapeService } from "../../services/networking/ScrapeService";
import { NLPService } from "../../services/nlp/NLPService";
import { buildQuery } from "./unsplash/queries/buildQuery";
import { logger } from "../../util/logger";

const linksRouter = express.Router();

export const linksRoutes = (router) => {

  // Links REST API
  router.use('/services/scrape', linksRouter);

  /**
   * Get Open Graph metadata for a site.
   */
  linksRouter.get('/', (req, res) => {
    const { url } = req.query;
    if (url) {
      ScrapeService.getMetadata(url)
        .then((metadata) => {
          if (!metadata) {
            res.status(404);
            res.send();
            return;
          }
          const { title } = metadata;
          if (title) {
            const t0 = new Date().getTime();
            NLPService.analyze(title).then((analysis) => {
              const t1 = new Date().getTime();
              logger.debug(`Performing NLP analysis on page title took ${t1 - t0} ms`);
              const query = buildQuery(analysis) || title;
              res.json({
                ...metadata,
                query
              });
            });
          } else {
            res.json(metadata);
          }
        })
        .catch((e) => {
          res.json({});
        });
    } else {
      res.status(404);
      res.send();
    }
  });
};

linksRouter.get('/headers', (req, res) => {

  const { url } = req.query;

  if (url) {
    ScrapeService.getHeaders(url)
      .then((headers) => {
        if (!headers) {
          res.status(400);
          res.send();
        }
        res.json(headers);
      })
      .catch((err) => {
        res.send(500);
      });
  } else {
    res.status(400);
    res.send({ error: 'no url passed into the query parameter' });
  }
});
