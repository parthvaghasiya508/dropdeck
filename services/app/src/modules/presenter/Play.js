import { useMediaQuery, useTheme } from "@material-ui/core";
import 'highlight.js/styles/default.css';
import LoadingStateComponent from 'modules/composer/components/LoadingStateComponent';
import React, { useEffect, useState } from 'react';
import { usePageVisibility } from 'react-page-visibility';
import { useHistory } from "react-router-dom";
import { apiHost } from "../../App";
import { Slide } from "../../common/slide/Slide";
import { generateSlides } from "../../common/slide/SlideFactory";
import { ThemeFactory } from "../../common/theme/ThemeFactory";
import { ProgressTracker } from "../../common/util/ProgressTracker";
import { SignalSensor } from "../../common/util/SignalSensor";
import KeyboardHandler from "../../KeyboardHandler";
import { goBackOrReload } from "./queries/goBackOrReload";
import PlayModule from "./PlayModule";
import { ROUTE_ERROR, ROUTE_PLAY_DECK, ROUTE_PREVIEW_DECK } from "../../Routes";
import { isUnsplashUrl } from "../composer/components/DeckEditor/modules/plugins/component/media/image/queries/isUnsplashUrl";
import { useBeforeUnload } from "../composer/hooks/DeckCleanUpHook";
import { redirectOnError } from "../composer/transforms/redirectOnError";
import PlayControls from './components/PlayControls';
import Player from "./components/Player";
import './Play.css';
import { getFirstImage } from "./queries/getFirstImage";
import { DeckIdContext } from "../composer/hooks/useDeckId";
import { LoadingComponent } from "./components/LoadingComponent";
import HoldingScreen from "./HoldingScreen";

let lastClientX;
let lastClientY;

/**
 * Full screen, independent player for Decks.
 *
 * @param match
 * @returns {*}
 * @constructor
 */
const Play = ({ match, embed = false, preview = false, isReference = false }) => {
  const [controls, setControls] = useState(null);
  const [deck, setDeck] = useState(undefined);
  const [slides, setSlides] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [firstReady, setFirstReady] = useState(false);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(preview || embed || isReference);
  const [mainImage, setMainImage] = useState(null);

  const materialTheme = useTheme();
  const isPhoneSize = useMediaQuery(materialTheme.breakpoints.down('xs'));

  const monitor = new ProgressTracker(() => {
    setReady(true);
  }, (p) => setProgress(p));

  const signals = SignalSensor.instance((ev) => {
    const payload = {
      type: SignalSensor.Types.MeasureSlideUserTime,
      deck: ev.deck,
      slide: ev.id,
      payload: {
        time: ev.time
      }
    };
    const headers = { type: "application/json" };
    const blob = new Blob([JSON.stringify(payload)], headers);
    navigator.sendBeacon(`${apiHost()}/signals`, blob);
  });

  useBeforeUnload(() => signals.close());

  const history = useHistory();
  const reloadPlayer = () => setStart(false);

  const exit = goBackOrReload(reloadPlayer, history, signals);
  const shortDeckId = match.params.id;

  useEffect(() => {
    PlayModule.load(shortDeckId, isReference)
      .then((loadedDeck) => {
        if (loadedDeck) {
          if (isReference) {
            setDeck(loadedDeck);
          } else {
            setDeck(loadedDeck);
            const image = getFirstImage(loadedDeck.content);
            if (image) {
              let { url, height, width } = image;
              if (isUnsplashUrl(url)) {
                url = `${image.url}&w=800&h=400&fit=crop`;
                height = 400;
                width = 800;
              }
              setMainImage({ ...image, url, height, width });
            }
          }
        } else {
          // eslint-disable-next-line
          document.location = `${ROUTE_ERROR}/${match.params.id}`;
        }
      })
      .catch((e) => {
        if (preview) {
          redirectOnError(e.response?.status, `${ROUTE_PREVIEW_DECK}/${match.params.id}`);
        } else if (embed || isReference) {
          redirectOnError(e.response?.status);
        } else {
          redirectOnError(e.response?.status, `${ROUTE_PLAY_DECK}/${match.params.id}`);
        }
      });

    document.querySelector("html").style.overflow = "hidden";
  }, [match.params.id]);

  useEffect(() => {
    if (deck) {
      setSlides(generateSlides(deck.content, deck.id, Slide.View.FULL, deck.theme, monitor, setFirstReady));
    }
  }, [deck]);

  const [playerControls, setPlayerControls] = useState({
    previous: () => {},
    next: () => {},
    first: () => {}
  });

  const [isBeginning, setIsBeginning] = useState();
  const [isEnd, setIsEnd] = useState();
  const [current, setCurrent] = useState();

  const isVisible = usePageVisibility();

  useEffect(() => {
    if (isVisible && slides && deck) {
      if (current || start) {
        signals.auto(slides[current || 0].id, isVisible, { deck: deck.id });
      }
    }
  }, [isVisible, current, start]);

  if (slides) {
    const { theme, branding } = deck;

    // Set deck name
    document.title = `${deck && deck.name ? deck.name : "Untitled"} 📽️ Dropdeck`;

    // Default theme
    let themeName = ThemeFactory.DEFAULT_THEME_NAME;

    // Override the theme if we get a new state from Redux, this causes change in Editor state
    if (theme) {
      themeName = theme || themeName;
    }

    const mouseMove = (ev) => {
      if (lastClientX === ev.clientX && lastClientY === ev.clientY) {
        return;
      }

      const init = !lastClientX || !lastClientY;
      lastClientX = ev.clientX;
      lastClientY = ev.clientY;

      if (init) return;

      if (controls && controls !== null) {
        controls.show(true);
      }
    };

    const keyMap = {
      // GO_HOME: ["meta+shift+h", "ctrl+shift+h"],
      // CREATE_DECK: ["meta+shift+n", "ctrl+shift+h"],
      // SHOW_KEYBOARD_SHORTCUTS: ["meta+shift+?", "ctrl+shift+h"],
      ESCAPE: "esc"
    };

    return (
      <DeckIdContext.Provider value={deck?.id}>
        <KeyboardHandler keyMap={keyMap} signals={signals} reload={reloadPlayer} global>
          <div style={{ height: "100vh", backgroundColor: "#000" }}>
            { start ? <LoadingComponent firstReady={firstReady} ready={ready} deck={deck} progress={progress}/> : <HoldingScreen isPhoneSize={isPhoneSize} firstReady={firstReady} progress={progress} deck={deck} start={start} setStart={setStart}/> }
            <div id="player" onMouseMove={mouseMove} style={{ position: "relative", marginTop: "auto", height: firstReady ? "100%" : 0, backgroundColor: "#000" }}>
              <Player playerControls={playerControls} current={current} setCurrent={setCurrent} setIsBeginning={setIsBeginning} setIsEnd={setIsEnd} aspect={deck.aspect} slides={slides} themeName={themeName} branding={branding} monitor={monitor} go={start}/>
            </div>
            { start ? <PlayControls preview={preview} isPhoneSize={isPhoneSize} id={deck.identifiers.short} current={current} total={slides.length} isBeginning={isBeginning} isEnd={isEnd} playerControls={playerControls} ref={setControls} exit={!embed ? exit : null} /> : null }
          </div>
        </KeyboardHandler>
      </DeckIdContext.Provider>
    );
  }

  return (<div style={{ backgroundColor: "#000" }}><LoadingStateComponent progress={1} player /></div>);
};
export default Play;
