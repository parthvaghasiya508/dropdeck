import express from 'express';
import { debugMode } from './util/debugMode.js';
import { logger } from './util/logger.js';
import config from './config.js';
import load from './loaders/index.js';

export const startServer = async () => {
  const app = express();

  // Load dependencies and modules:
  await load(app);

  // Start the server
  app.listen(config.port, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
      return;
    }

    logger.info(`\n\nš Dropdeck API listening on port ${config.port} šŖ\n\n`);

    if (debugMode()) {
      logger.info(`Dropdeck running in DEBUG mode`);
    } else {
      logger.info(`Dropdeck running in PRODUCTION mode`);
    }
  });
};
