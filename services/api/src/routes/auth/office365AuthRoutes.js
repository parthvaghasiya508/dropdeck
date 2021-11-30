import express from "express";
import passport from "passport";
import config from "../../config.js";
import { AuthService } from "../../services/auth/AuthService";

const authRoutes = express.Router();

/**
 * Office365 authentication routes.
 *
 * @param router Express Router.
 */
export const office365AuthRoutes = (router) => {

  router.use(config.frontend.authPrefix, authRoutes);

  authRoutes.get(config.auth.office365.route,
    AuthService.storeRedirectUri,
    (req, res, next) => {
      passport.authenticate('azuread-openidconnect',
        {
          response: res,
          failureRedirect: `${config.frontend.host}${config.auth.office365.failedPage}`
        })(req, res, next);
    });

  // The middleware receives the data from Azure and runs the function on Strategy config
  authRoutes.post(config.auth.office365.callbackPage,
    AuthService.authenticate('azuread-openidconnect', config.auth.office365.failedPage),
    AuthService.authCallback);
};
