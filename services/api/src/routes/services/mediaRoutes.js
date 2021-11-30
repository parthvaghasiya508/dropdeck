import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";
import { MediaService } from "../../services/media/MediaService.js";

const mediaRouter = express();

export const mediaRoutes = (router) => {

  // Media REST API
  router.use('/services/media', mediaRouter);

  /**
   * Image proxy
   */
  mediaRouter.use('/proxy', createProxyMiddleware({
    target: "not-needed",
    router: (req) => req.query.url,
    changeOrigin: true,
  }));

  /**
   * Get a media asset by ID.
   */
  mediaRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    if (id !== undefined && id !== null && id.length > 0) {
      MediaService.read(id, res);
    } else {
      res.status(500);
      res.send("Parameter `id` not specified");
    }
  });

};
