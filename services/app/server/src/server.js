import express from 'express';
import passport from "passport";
import path from "path";
import fs from "fs";
import { config } from "./config";
import { logger } from "./utils/logger";
import transform from "./transform";

const compression = require('compression');

const debugMode = () => (process.env.LOG_LEVEL === 'debug');

export const startServer = async () => {
  const app = express();

  // Static routes
  // app.use(express.static(path.join(__dirname, "../..", "build")));
  // app.use(express.static(path.join(__dirname, "../..", "public")));

  // Encoding and GZIP
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Initialising Passport
  app.use(passport.initialize({}));

  // Persisting sessions
  app.use(passport.session({}));

  // Use compression.
  logger.info('Using Express with GZIP compression');
  app.use(compression());

  // Serve up the index page for requests to the frontend
  app.use((req, res, next) => {

    logger.trace(`Requesting ${req.path}`);

    const indexFile = path.resolve('../build/index.html');
    fs.readFile(indexFile, 'utf8', async (err, data) => {
      if (err) {
        logger.error(`Error occurred whilst reading the index page`);
        logger.error(err);
        return res.status(500);
      }
      data = await transform(data, req);
      return res.send(data);
    });
  });

  // Start the server
  app.listen(config.port, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
      return;
    }

    logger.info(`\n\n🚀 Dropdeck app server listening on port ${config.port} 🪐\n\n`);

    if (debugMode()) {
      logger.info(`Dropdeck running in DEBUG mode`);
    } else {
      logger.info(`Dropdeck running in PRODUCTION mode`);
    }
  });
};
