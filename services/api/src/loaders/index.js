import { mongooseLoader } from './mongooseLoader.js';
import { expressLoader } from './expressLoader.js';
import { googleAuthLoader } from './auth/googleAuthLoader.js';
import { localAuthLoader } from './auth/localAuthLoader.js';
import { office365AuthLoader } from './auth/office365AuthLoader.js';
import { storageLoader } from './storageLoader.js';
import { unsplashServiceLoader } from './services/unsplashServiceLoader.js';
import { brandingServiceLoader } from './services/brandingServiceLoader';
import { giphyServiceLoader } from './services/giphyServiceLoader.js';
import { eventBusLoader } from "./eventBusLoader";

import { logger } from "../util/logger.js";
import config from "../config.js";

const load = async (app) => {

  mongooseLoader();
  logger.info('Database loaded and connected  ✌️');

  googleAuthLoader(app);
  logger.info('Google authentication is ready  ✌️');

  eventBusLoader();
  logger.info('Event bus is ready  ✌️');

  if (config.auth.local.enabled) {
    localAuthLoader(app);
    logger.info('Local-simulation authentication is ENABLED ✌️');
    logger.warn('Note: This should never be used in production!️');
  } else {
    logger.info('Local-simulation authentication is DISABLED️');
  }

  office365AuthLoader(app);
  logger.info('Office365 authentication is ready  ✌️');

  expressLoader(app);
  logger.info('Express server is ready  ✌️');

  storageLoader(app);
  logger.info('Disk storage is ready  ✌️');

  unsplashServiceLoader(app);
  logger.info('Unsplash service is ready  ✌️');

  brandingServiceLoader(app);
  logger.info('Branding service is ready  ✌️');

  giphyServiceLoader(app);
  logger.info('Giphy service is ready  ✌️');
};

export default load;
