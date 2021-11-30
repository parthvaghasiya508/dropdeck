export const config = {

  /**
   * Port the server listens on.
   */
  port: process.env.PORT || 3000,

  /**
   * Logging configuration.
   */
  log: {
    level: process.env.LOG_LEVEL || "info",
  },

  api: {
    host: process.env.API_HOST || '/api',
    export: {
      path: process.env.APP_EXPORT_PATH || 'export/play',
    },
  },

  app: {
    player: {
      host: process.env.APP_PLAYER_HOST,
      embed: {
        host: process.env.APP_PLAYER_EMBED_HOST || process.env.APP_PLAYER_HOST,
      }
    },
  }
};
