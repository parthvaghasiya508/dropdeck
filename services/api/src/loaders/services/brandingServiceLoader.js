import mkdirp from "mkdirp";
import config from "../../config.js";

/**
 * Load configuration for the Branding service.
 *
 * @param app Express app server.
 */
export const brandingServiceLoader = (app) => {
  mkdirp.sync(config.services.brandfetch.tempDirectory);
};
