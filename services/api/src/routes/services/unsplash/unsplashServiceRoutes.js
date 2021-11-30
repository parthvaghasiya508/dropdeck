import express from "express";
import expressAsyncHandler from "express-async-handler";
import { searchUnsplash } from "./queries/searchUnsplash";
import { UnsplashService } from "../../../services/media/UnsplashService";
import { logger } from "../../../util/logger";
import config from "../../../config";

const { serviceUrlBase } = config.services.unsplash;

const unsplashRouter = express.Router();

export const unsplashServiceRoutes = (router) => {

  // Unsplash REST API
  router.use('/services/unsplash', unsplashRouter);

  /**
   * Unsplash image search
   */
  unsplashRouter.get('/search', expressAsyncHandler(async (req, res, next) => {
    const { keyword, page, perPage } = req.query;
    searchUnsplash(keyword, page, perPage)
      .then((response) => res.json(response));
  }));

  /**
   * Track download events for a list of images.
   */
  unsplashRouter.post('/track', expressAsyncHandler(async (req, res, next) => {
    const { body } = req;
    if (body && body.urls) {
      const { urls } = body;
      if (urls && Array.isArray(urls) && urls.length > 0) {
        UnsplashService.trackDownload(urls.filter((url) => url.startsWith(serviceUrlBase)))
          .then(async () => {
            res.sendStatus(200);
            return res;
          })
          .catch((e) => {
            logger.error(e);
            res.sendStatus(404);
            return res;
          });
      }
    }
  }));

};
