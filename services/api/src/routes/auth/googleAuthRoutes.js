import express from "express";
import passport from "passport";
import config from "../../config.js";
import { AuthService } from "../../services/auth/AuthService";

const authRoutes = express.Router();

/**
 * Google authentication routes.
 *
 * @param router Express Router.
 */
export const googleAuthRoutes = (router) => {

  router.use(config.frontend.authPrefix, authRoutes);

  // passport.authenticate middleware is used here to authenticate the request
  authRoutes.get(config.auth.google.route,
    AuthService.storeRedirectUri,
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }));

  // The middleware receives the data from Google and runs the function on Strategy config
  authRoutes.get(config.auth.google.callbackPage,
    AuthService.authenticate('google', config.auth.google.failedPage),
    AuthService.authCallback);

};
