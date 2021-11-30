import express from "express";
import { logger } from "../../util/logger.js";
import config from "../../config.js";
import { googleAuthRoutes } from './googleAuthRoutes.js';
import { office365AuthRoutes } from './office365AuthRoutes.js';
import { localAuthRoutes } from './localAuthRoutes.js';

const logoutRoute = express.Router();

export default (router) => {
  router.use(config.frontend.authPrefix, logoutRoute);

  // Logout route
  logoutRoute.get('/logout', (req, res) => {
    logger.debug("Log out");
    req.logout();
    res.redirect(`${config.frontend.host}/start`);
  });

  // Google auth routes
  googleAuthRoutes(router);

  // Office365 auth routes
  office365AuthRoutes(router);

  // Local username and password auth routes
  if (config.auth.local.enabled) {
    localAuthRoutes(router);
  }
};
