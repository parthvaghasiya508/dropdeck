export default {

  /**
   * REST API configuration.
   */
  api: {
    prefix: '', // global REST API prefix
  },

  /**
   * Toggle API routes on/off.
   */
  routes: {
    auth: true,
    people: true,
    deck: true,
    company: true,
    branding: true,
    datasources: true,
    services: {
      export: process.env.ROUTES_EXPORT_ENABLED === 'true',
      math: true,
      unsplash: true,
      media: false, // disabled
      giphy: true,
      branding: true,
      nlp: true,
      links: true,
    }
  },

  /**
   * Logging configuration.
   */
  log: {
    level: process.env.LOG_LEVEL || "info",
  },

  /**
   * Port the server listens on.
   */
  port: process.env.PORT || 9000,

  /**
   * Backend routes.
   */
  backend: {
    host: process.env.API_HOST,
  },

  /**
   * Cookie secret for encrypting.
   */
  cookie: {
    secret: process.env.COOKIE_SECRET || 'VLkPC7VjpuAk/GzvYqDgT5VJ8',
    maxAgeMinutes: process.env.COOKIE_MAX_AGE_MINUTES || 30, // cookie expires after this many minutes of inactivity
  },

  /**
   * CORS settings.
   */
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : [],
  },

  /**
   * Frontend routes.
   */
  frontend: {
    host: process.env.FRONTEND_HOST,
    authPrefix: process.env.FRONTEND_AUTH_PREFIX,
    signupModule: process.env.FRONTEND_SIGN_UP_MODULE,
    player: {
      host: process.env.FRONTEND_PLAYER_HOST,
    },
    export: {
      host: process.env.FRONTEND_EXPORT_HOST,
      path: process.env.FRONTEND_EXPORT_PATH || 'export/play',
    }
  },

  /**
   * Storing and processing of files.
   */
  storage: {
    cloud: {
      google: {
        enabled: process.env.GCLOUD_STORAGE_ENABLED === 'true',
        decks: {
          bucketName: process.env.GCLOUD_BUCKET_DECKS,
          proxyUrl: `https://storage.googleapis.com/${process.env.GCLOUD_BUCKET_DECKS}`,
        },
        branding: {
          bucketName: process.env.GCLOUD_BUCKET_BRANDING,
          proxyUrl: `https://storage.googleapis.com/${process.env.GCLOUD_BUCKET_BRANDING}`,
        }
      }
    },
    disk: {
      decks: {
        path: `${process.env.CONTENT_STORE}/decks`,
      },
      branding: {
        path: `${process.env.CONTENT_STORE}/branding`,
      },
    }
  },

  /**
   * Helmet configuration.
   */
  helmet: {
    rateLimit: {
      windowMinutes: process.env.HELMET_RATE_LIMIT_WINDOW_MINS || 5,
      limitMax: process.env.HELMET_RATE_LIMIT_MAX || 100,
    }
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

  /**
   * Unsplash image service.
   */
  services: {
    browserless: {
      userDataDir: process.env.BROWSERLESS_DATA_DIR,
      enabled: process.env.BROWSERLESS_ENABLED === 'true',
      url: process.env.BROWSERLESS_URL,
      token: process.env.BROWSERLESS_API_TOKEN,
    },
    unsplash: {
      accessKey: process.env.UNSPLASH_ACCESS_KEY,
      serviceUrlBase: 'https://api.unsplash.com',
      tempDirectory: `${process.env.CONTENT_STORE}/unsplash/`
    },
    giphy: {
      accessKey: process.env.GIPHY_ACCESS_KEY,
      serviceUrlBase: 'https://api.giphy.com',
      tempDirectory: `${process.env.CONTENT_STORE}/giphy`
    },
    brandfetch: {
      accessKey: process.env.BRANDFETCH_ACCESS_KEY,
      serviceUrlBase: 'https://api.brandfetch.io/v1',
      tempDirectory: `${process.env.CONTENT_STORE}/brandfetch`,
      suggestions: {
        endpoint: 'https://autocomplete.clearbit.com/v1/companies/suggest',
        queryParameter: 'query',
      }
    },
    slack: {
      enabled: process.env.SLACK_TOKEN !== undefined && process.env.SLACK_CHANNEL !== undefined,
      token: process.env.SLACK_TOKEN,
      channel: process.env.SLACK_CHANNEL || "#support",
      label: process.env.SLACK_LABEL || '',
    }
  },

  /**
   * Authentication settings.
   */
  auth: {
    google: {
      route: process.env.GOOGLE_AUTH,
      callbackPage: process.env.GOOGLE_AUTH_CALLBACK_PAGE,
      failedPage: process.env.GOOGLE_AUTH_FAILED_PAGE,
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
      callbackUrl: `${process.env.FRONTEND_API_HOST}${process.env.FRONTEND_AUTH_PREFIX}${process.env.GOOGLE_AUTH_CALLBACK_PAGE}`,
    },
    office365: {
      route: process.env.OFFICE365_AUTH,
      failedPage: process.env.OFFICE365_AUTH_FAILED_PAGE,
      callbackPage: process.env.OFFICE365_AUTH_CALLBACK_PAGE,
      clientId: process.env.OFFICE365_AUTH_CLIENT_ID,
      clientSecret: process.env.OFFICE365_AUTH_SECRET,
      redirectUrl: `${process.env.FRONTEND_API_HOST}${process.env.FRONTEND_AUTH_PREFIX}${process.env.OFFICE365_AUTH_CALLBACK_PAGE}`,
    },
    local: {
      enabled: process.env.LOCAL_AUTH === 'enabled',
      failedPage: process.env.GOOGLE_AUTH_FAILED_PAGE,
    }
  },

  decks: {
    inspiration: {
      service: "https://app.dropdeck.com/api/decks",
      tags: {
        sample: "5f8e95792b4a07003be64fcd"
      }
    }
  }
};
