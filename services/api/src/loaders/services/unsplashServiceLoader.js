import mkdirp from "mkdirp";
import config from "../../config.js";

/**
 * Load configuration for the Unsplash service.
 *
 * @param app Express app server.
 */
export const unsplashServiceLoader = (app) => {
  mkdirp.sync(config.services.unsplash.tempDirectory);
};
