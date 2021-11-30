import pino from "pino";
import config from '../config.js';

export const logger = pino({
  level: config.log.level,
  prettyPrint: { colorize: true },
  minLength: 1024, // Buffer before writing
  sync: false // Asynchronous logging
});
