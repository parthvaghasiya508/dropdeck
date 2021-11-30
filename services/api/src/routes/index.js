import express from "express";
import config from "../config.js";
import authRoutes from './auth/index.js';
import { brandingRoutes } from './crud/brandingRoutes.js';
import { peopleRoutes } from "./crud/peopleRoutes.js";
import { companyRoutes } from "./crud/companyRoutes.js";
import { mediaRoutes } from "./services/mediaRoutes.js";
import { mathRoutes } from "./services/mathRoutes.js";
import { unsplashServiceRoutes } from "./services/unsplash/unsplashServiceRoutes.js";
import { giphyServiceRoutes } from "./services/giphyServiceRoutes.js";
import { deckFileRoutes } from "./crud/deck/deckFileRoutes.js";
import { exportRoutes } from "./exportRoutes.js";
import { datasourceRoutes } from "./crud/datasource/datasourceRoutes.js";
import { nlpRoutes } from "./services/nlpRoutes.js";
import { linksRoutes } from "./services/linksRoutes";
import { brandingServiceRoutes } from "./services/brandingServiceRoutes";
import { deckRoutes } from "./crud/deck/deckRoutes";
import { playRoutes } from "./crud/deck/playRoutes";
import { inspirationRoutes } from "./crud/deck/inspirationRoutes";
import { signalRoutes } from "./signals/signalRoutes";
import { metricsRoutes } from "./signals/metricsRoutes";

export default () => {
  const router = express.Router();

  // Core routes
  if (config.routes.auth) {
    authRoutes(router);
  }
  if (config.routes.deck) {
    deckRoutes(router);
    deckFileRoutes(router);
    playRoutes(router);
    inspirationRoutes(router);
  }
  if (config.routes.people) {
    peopleRoutes(router);
  }
  if (config.routes.company) {
    companyRoutes(router);
  }
  if (config.routes.branding) {
    brandingRoutes(router);
  }
  if (config.routes.datasources) {
    datasourceRoutes(router);
  }

  // Signals and metrics
  signalRoutes(router);
  metricsRoutes(router);

  // Services
  if (config.routes.services.media) {
    mediaRoutes(router);
  }
  if (config.routes.services.math) {
    mathRoutes(router);
  }
  if (config.routes.services.unsplash) {
    unsplashServiceRoutes(router);
  }
  if (config.routes.services.giphy) {
    giphyServiceRoutes(router);
  }
  if (config.routes.services.branding) {
    brandingServiceRoutes(router);
  }
  if (config.routes.services.export) {
    exportRoutes(router);
  }
  if (config.routes.services.nlp) {
    nlpRoutes(router);
  }
  if (config.routes.services.links) {
    linksRoutes(router);
  }

  return router;
};
