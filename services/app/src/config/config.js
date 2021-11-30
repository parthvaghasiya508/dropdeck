const env = (staticVariable, dynamicVariable, fallback) => {
  if (window._dropdeck_env && window._dropdeck_env[dynamicVariable]) {
    return window._dropdeck_env[dynamicVariable];
  }
  return process.env[staticVariable] ? process.env[staticVariable] : fallback;
};

export const config = {

  /**
   * Port the server listens on.
   */
  port: process.env.PORT || 3000,

  /**
   * Logging configuration.
   */
  log: {
    level: process.env.REACT_APP_LOG_LEVEL || "info",
  },

  api: {
    host: env('REACT_APP_API_HOST', 'apiHost', '/api'),
    export: {
      prefix: process.env.REACT_APP_API_EXPORT_PREFIX,
    },
  },

  app: {
    isDevMode: process.env.NODE_ENV === 'development',
    helpDesk: `https://dropdeck.freshdesk.com/`,
    production: {
      host: process.env.REACT_APP_PRODUCTION_HOST || 'https://app.dropdeck.com',
    },
    paths: {
      home: process.env.REACT_APP_HOME,
      signup: process.env.REACT_APP_SIGN_UP_MODULE,
      auth: process.env.REACT_APP_AUTH_PREFIX,
    }
  },

  elements: {
    map: {
      google: {
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      }
    }
  },

  services: {
    unsplash: {
      debug: process.env.REACT_APP_UNSPLASH_DEBUG === 'true',
    }
  },

  analytics: {
    google: {
      enabled: env('REACT_APP_GOOGLE_ANALYTICS', 'googleAnalytics') === 'enabled',
      trackingId: env('REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID', 'googleAnalyticsTrackingId'),
    },
  },

  messages: {
    auth: {
      failed: {
        severity: "error",
        value: "Authentication failed. Please try again.",
      },
      expired: {
        severity: "info",
        value: "It looks like your session has expired. Please log in again.",
      }
    }
  }
};
