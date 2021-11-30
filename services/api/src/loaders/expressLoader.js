import cookieSession from "cookie-session";
import express from "express";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { logger } from "../util/logger.js";
import config from "../config.js";
import routes from '../routes/index.js';

const compression = require('compression');
const cookieParser = require('cookie-parser');

const cookieSecret = config.cookie.secret;

/**
 * Load configuration for the Express server.
 *
 * @param app Express app server.
 */
export const expressLoader = (app) => {

  // Configure cookie lifetime
  app.use(cookieSession({
    maxAge: config.cookie.maxAgeMinutes * (60 * 1000), // session expiry (minutes, in milliseconds)
    keys: ['dropdeck'],
    secret: cookieSecret,
  }));

  logger.debug(`Using session max-age of ${config.cookie.maxAgeMinutes} minutes`);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser(cookieSecret));

  // Initialising Passport
  app.use(passport.initialize({}));

  // Persisting sessions
  app.use(passport.session({}));

  // Update a value in the cookie so that the set-cookie will be sent.
  // Only changes every minute so that it's not sent with every request.
  app.use((req, res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
    next();
  });

  const origins = [config.frontend.host, config.backend.host, ...config.cors.allowedOrigins];
  const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || origin === "null" || origins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin: ${origin} is not allowed`));
      }
    },
  };
  app.use(cors(corsOptions));

  // Use compression.
  logger.info('Using Express with GZIP compression');
  app.use(compression());

  // Use Helmet middleware to prevent some attacks
  app.use(helmet());
  app.disable("x-powered-by");

  // Rate limiting
  const windowMins = config.helmet.rateLimit.windowMinutes;
  const requestLimit = config.helmet.rateLimit.limitMax;

  logger.info(`Using Helmet with a rate limit of ${requestLimit} requests every ${windowMins} minutes`);
  const limiter = rateLimit({
    windowMs: windowMins * 60 * 1000,
    max: requestLimit,
    skip: (req) => req.user !== undefined && req.user.allowed !== undefined && req.user.allowed
  });
  app.use(limiter);

  // Load API routes
  app.use(config.api.prefix, routes());

};
