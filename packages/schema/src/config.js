export default {

  /**
   * REST API configuration.
   */
  api: {
    prefix: '', // global REST API prefix
  },

  /**
   * Logging configuration.
   */
  log: {
    level: process.env.LOG_LEVEL || "info",
  },

  /**
   * Database settings.
   */
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    initDatabase: process.env.DATABASE_INITDB,
    directConnection: process.env.DATABASE_DIRECT_CONNECTION === 'true',
  },
};
