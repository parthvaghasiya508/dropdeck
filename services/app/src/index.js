import { GA4React } from "ga-4-react";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { config } from "./config";
import * as serviceWorker from './serviceWorker';
import { logger } from "./common/util/logger";

const ga4react = new GA4React(config.analytics.google.trackingId, {
  debug_mode: config.app.isDevMode
});

(async () => {
  try {
    await ga4react.initialize();
  } catch (e) {
    logger.error('GA4React init failed', e);
  }
  ReactDOM.render(<App />, document.getElementById('root'));
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
