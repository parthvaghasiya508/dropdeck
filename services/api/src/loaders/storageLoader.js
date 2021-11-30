import mkdirp from "mkdirp";
import config from "../config.js";

/**
 * Load configuration for the data storage.
 *
 * @param app Express app server.
 */
export const storageLoader = (app) => {
  mkdirp.sync(config.storage.disk.decks.path);
  mkdirp.sync(config.storage.disk.branding.path);
};
