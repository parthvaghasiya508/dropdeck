import { ResizeObserver, ResizeObserverEntry } from "@juggle/resize-observer";
import { withStyles } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import React, { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { UserPreferences } from "./common/api/sdk/hooks/PreferenceHooks";
import SuspenseProgress from "./common/components/SuspenseProgress";
import { feature } from "./common/config/feature";
import RemixFactory from "./common/remix/RemixFactory";
import { ThemeFactory } from "./common/theme/ThemeFactory";
import { logger } from "./common/util/logger";
import { config } from "./config";
import KeyboardHandler from "./KeyboardHandler";
import Configure from "./modules/configure/Configure";
import Error from "./modules/presenter/Error";
import UserProvider from "./providers/UserProvider";

import {
  ROUTE_AUTH_EXPIRED,
  ROUTE_AUTH_FAILED,
  ROUTE_EDIT_DECK,
  ROUTE_EDIT_DOCS,
  ROUTE_ERROR,
  ROUTE_NEW_DECK,
  ROUTE_NOT_FOUND,
  ROUTE_PLAY_DECK,
  ROUTE_PLAY_DECK_EXPORT,
  ROUTE_PLAY_DOCS,
  ROUTE_PREVIEW_DECK,
  ROUTE_ROOT,
  ROUTE_START
} from "./Routes";
import { configureStore } from "./store/configureStore";
import ThemeWrapper from "./ThemeWrapper";
import createGenerateDeterministicClassName from "./utils/createGenerateDeterministicClassName";
import { DeckIdContext } from "./modules/composer/hooks/useDeckId";

export const isDevMode = () => config.app.isDevMode;
export const apiHost = () => config.api.host;

// Lazy loading components for code splitting
const FrontPage = React.lazy(() => import('./modules/frontpage/Frontpage'));
const Directory = React.lazy(() => import('./modules/directory/Directory'));
const ErrorPage = React.lazy(() => import('./modules/error/ErrorPage'));
const NotFound = React.lazy(() => import('./modules/error/NotFound'));
const Branding = React.lazy(() => import('./modules/onboard/Branding'));
const CreateDeck = React.lazy(() => import('./modules/composer/components/CreateDeck'));
const Portfolio = React.lazy(() => import('./modules/portfolio/Portfolio'));
const Onboard = React.lazy(() => import('./modules/onboard/Onboard'));
const Play = React.lazy(() => import('./modules/presenter/Play'));
const Composer = React.lazy(() => import('./modules/composer/Composer'));
const AccountPending = React.lazy(() => import('./modules/onboard/AccountPending'));
const ExportPlayer = React.lazy(() => import('./modules/presenter/components/ExportPlayer/ExportPlayer'));

/**
 * The main app component.
 *
 * @returns {*}
 * @constructor
 */
function App() {

  // Add a ResizeObserver polyfill if needed.
  if (!("ResizeObserver" in window)) {
    logger.debug(`Adding ResizeObserver polyfill`);
    window.ResizeObserver = ResizeObserver;
    // Only use it when you have this trouble: https://github.com/wellyshen/react-cool-dimensions/issues/45
    window.ResizeObserverEntry = ResizeObserverEntry;
  }

  // Try and prevent scrolling or resizing
  document.addEventListener('touchmove', (event) => {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  }, { passive: false });

  const store = configureStore({
    // preview: true
  });

  const { instance } = ThemeFactory;
  instance.init();

  // Initialising RemixEngine with remixes
  RemixFactory();

  // Global MUI overrides.
  const GlobalCss = withStyles((theme) => ({
    // @global is handled by jss-plugin-global.
    '@global': {
      html: {
        backgroundColor: theme.dark() ? "#1D1D1F !important" : "#fff !important"
      },
      // Popover menus
      '.MuiList-padding': {
        paddingTop: 0,
        paddingBottom: 0,
      },
      '.MuiMenuItem-root': {
        fontSize: '0.85rem',
        fontWeight: '500',
        fontFamily: '"Inter var", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"',
        color: theme.palette.text.secondary,
        '&:hover': {
          background: 'transparent',
          color: theme.palette.text.primary,
        },
        '&.Mui-selected, &.Mui-selected:hover': {
          background: theme.palette.icon.primaryInset,
          color: theme.palette.text.primary,
        },
      },
      '.MuiDivider-root': {
        background: theme.palette.background.border01,
      },
    },
  }))(() => null);

  const generateDeterministicClassName = createGenerateDeterministicClassName();

  useEffect(() => {
    logger.debug(`Sending pageview: ${window.location.pathname + window.location.search}`);

    logger.info("Dropdeck started!");
  }, []);

  useEffect(() => {
    logger.info("Dropdeck started!");
  }, []);

  // Profile of the currently authenticated user.
  const [user, setUser] = useState(null);
  return (
    <StylesProvider generateClassName={generateDeterministicClassName}>
      <Router>

        <Provider store={store}>
          <UserPreferences>
            <ThemeWrapper>
              <GlobalCss/>

              <Suspense fallback={<SuspenseProgress/>}>

                {/* Unauthenticated routes */}
                <Route path={ROUTE_START} exact render={(props) => <FrontPage {...props} />}/>
                <Route path={ROUTE_AUTH_FAILED} exact render={(props) => <FrontPage message={config.messages.auth.failed} {...props} />}/>
                <Route path={ROUTE_AUTH_EXPIRED} exact render={(props) => <FrontPage message={config.messages.auth.expired} {...props} />}/>
                <Route path={ROUTE_ERROR} exact render={(props) => <ErrorPage {...props} />}/>
                <Route path={ROUTE_NOT_FOUND} exact render={(props) => <NotFound {...props} />}/>
                <Route path={config.app.paths.signup} exact render={(props) => <Onboard {...props} />}/>
                <Route path={`${config.app.paths.signup}/branding`} exact render={(props) => <Branding {...props} />}/>
                <Route path={`${config.app.paths.signup}/pending`} exact render={(props) => <AccountPending {...props} />}/>

                {/* Authenticated routes */}

                <Route path={ROUTE_ROOT} exact render={() => (
                  <Redirect to={config.app.paths.home}/>
                )}/>

                <Route
                  path={[config.app.paths.home, `${config.app.paths.home}/me`, `${config.app.paths.home}/company`, `${config.app.paths.home}/docs`]}
                  exact render={(props) => (
                    <UserProvider setUser={setUser}>
                      <KeyboardHandler global>
                        <Directory user={user} {...props} />
                      </KeyboardHandler>
                    </UserProvider>
                  )}/>

                <Route path="/configure" exact render={() => (
                  <Redirect to="/configure/profile"/>
                )}/>

                <Route
                  path={['/configure/profile', '/configure/company', '/configure/account']}
                  exact render={(props) => (
                    <UserProvider setUser={setUser}>
                      <Configure user={user} {...props} />
                    </UserProvider>
                  )}/>

                { /* <Route path={ROUTE_MEDIA} exact render={(props) => ( */}
                { /*  <UserProvider setUser={setUser}> */}
                { /*    <KeyboardHandler> */}
                { /*      <Media {...props} /> */}
                { /*    </KeyboardHandler> */}
                { /*  </UserProvider> */}
                { /* )}/> */}

                <Route path={ROUTE_NEW_DECK} exact render={(props) => (
                  <UserProvider setUser={setUser} allowAnonymous>
                    <CreateDeck {...props} />
                  </UserProvider>
                )}/>

                <Route path={`${ROUTE_NEW_DECK}/from/:from`} exact render={(props) => (
                  <UserProvider setUser={setUser} allowAnonymous>
                    <CreateDeck {...props} />
                  </UserProvider>
                )}/>

                <Route path={`${ROUTE_EDIT_DECK}/:id/:view?/:subview?/:plugin?`} exact render={(props) => (
                  <UserProvider setUser={setUser} allowAnonymous>
                    <DeckIdContext.Provider value={props.match.params.id}>
                      <Composer {...props} />
                    </DeckIdContext.Provider>
                  </UserProvider>
                )}/>

                <Route path={`${ROUTE_PREVIEW_DECK}/:id`} exact render={(props) => (
                  <UserProvider setUser={setUser} allowAnonymous>
                    <Play {...props} preview/>
                  </UserProvider>
                )}/>

                { feature.modules.exportPlayer ? (
                  <Route path={`${ROUTE_PLAY_DECK_EXPORT}/:id`} exact render={(props) => (
                    <UserProvider setUser={setUser} allowAnonymous disableTracking>
                      <ExportPlayer {...props}/>
                    </UserProvider>
                  )}/>
                ) : null }

                { feature.modules.exportPlayer ? (
                  <Route path={`${ROUTE_PLAY_DECK_EXPORT}/:id/cover`} exact render={(props) => (
                    <UserProvider setUser={setUser} allowAnonymous>
                      <ExportPlayer {...props} cover/>
                    </UserProvider>
                  )}/>
                ) : null }

                <Route path={`${ROUTE_PLAY_DECK}/:id`} exact render={(props) => (
                  <UserProvider setUser={setUser} allowAnonymous>
                    <Play {...props} />
                  </UserProvider>
                )}/>

                <Route path={`${ROUTE_PLAY_DECK}/:id/embed`} exact render={(props) => (
                  <UserProvider setUser={setUser} allowAnonymous>
                    <Play embed {...props} />
                  </UserProvider>
                )}/>

                <Route path="/error/:id" exact render={(props) => (
                  <Error {...props} />
                )}/>

                {/* Documentation and reference decks */}

                <Route path={`${ROUTE_PLAY_DOCS}/:id`} exact render={(props) => (
                  <DeckIdContext.Provider value={props.match.params.id}>
                    <Play isReference {...props} />
                  </DeckIdContext.Provider>
                )}/>

                {/* Portfolio */}

                <Route path="/portfolio" exact render={(props) => (
                  <UserProvider setUser={setUser}>
                    <Portfolio reference {...props} />
                  </UserProvider>
                )}/>
                <Route path="/portfolio/:templateId" exact render={(props) => (
                  <UserProvider setUser={setUser}>
                    <Portfolio reference {...props} />
                  </UserProvider>
                )}/>
              </Suspense>
            </ThemeWrapper>
          </UserPreferences>
        </Provider>

      </Router>
    </StylesProvider>
  );
}

export default App;
