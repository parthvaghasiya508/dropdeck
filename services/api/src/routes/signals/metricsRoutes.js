import express from "express";
import { MetricsService } from "../../services/signals/MetricsService";

const metricsRouter = express();

export const metricsRoutes = (router) => {

  // Metrics REST API
  router.use('/metrics', metricsRouter);

  metricsRouter.get('/decks/:_id([a-zA-Z0-9]+)', (req, res) => {
    MetricsService.byDeck(req.params._id)
      .then((payload) => res.send(payload));
  });

};
