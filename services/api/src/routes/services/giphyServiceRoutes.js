import express from "express";
import expressAsyncHandler from "express-async-handler";
import { GiphyService } from "../../services/media/GiphyService.js";
import { logger } from "../../util/logger.js";

const giphyRouter = express.Router();

export const giphyServiceRoutes = (router) => {

  // Unsplash REST API
  router.use('/services/giphy', giphyRouter);

  /**
   * Giphy image search
   */
  giphyRouter.get('/search', expressAsyncHandler(async (req, res, next) => {

    const { keyword, page, perPage } = req.query;
    logger.debug(`Searching for ${keyword}`);
    const t0 = new Date().getTime();
    if (keyword !== undefined && keyword !== null && keyword.length > 0) {
      GiphyService.search(keyword, page, perPage)
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .then((response) => {
          const t1 = new Date().getTime();
          logger.debug(`Searching Giphy took ${t1 - t0} ms`);
          // Only return the following fields in the payload to the client:
          //
          // - id
          // - urls
          // - bitly_gif_url
          // - bitly_url
          // - embed_url
          // - preview_url
          //
          res.json(response.data.map((gif) => ({
            id: gif.id,
            urls: {
              url: gif.url,
              bitly_gif_url: gif.bitly_gif_url,
              bitly_url: gif.bitly_url,
              embed_url: gif.embed_url,
              preview_url: gif.images?.preview_gif?.url,
            },
            images: gif.images,
            alt_description: gif.title,
            user: {
              username: gif.username,
            }
          })));
        })
        .catch((e) => {
          logger.error(e);
        });
    }
  }));
};
