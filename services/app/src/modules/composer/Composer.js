import { subject } from "@casl/ability";
import { useMediaQuery, useTheme } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/styles";
import arrayMove from "array-move";
import { LoadingState } from 'common/api/Constants';
import { Presentation } from 'common/model/Deck';
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DndProvider } from "react-dnd";
import { ObserveKeys } from "react-hotkeys";
import { connect } from 'react-redux';
import { setDeckName, setPresentation } from "../../actions/presentation";
import Dropdeck from "../../common/api/sdk/Dropdeck";
import { useUpdateDeck } from "../../common/api/sdk/hooks/DeckHooks";
import PreviewSection from "./components/PreviewSection/PreviewSection";
import { sendServerUpdates } from "./transforms/sendServerUpdates";
import { setPaletteForSlide } from "../../common/slide/transforms/palette/setPaletteForSlide";
import { setRemix, shiftRemix } from "./transforms/remix/shiftRemix";
import { getHoverPath } from "./transforms/getHoverPath";
import { resetRemix } from "./transforms/remix/resetRemix";
import { Slide } from "../../common/slide/Slide";
import { onContentChange } from "./transforms/onContentChange";
import Abilities from "../../common/authz/ability/Abilities";
import { useAbility } from "../../common/authz/ability/useAbility";
import AnonymousUser from "../../common/authz/AnonymousUser";
import { Can } from "../../common/authz/components/Can";
import { hasBeenUpdated } from "../../common/model/transforms/hasBeenUpdated";
import { generateSlides } from "../../common/slide/SlideFactory";
import { ThemeFactory } from "../../common/theme/ThemeFactory";
import Breakpoints from "../../common/util/Breakpoints";
import { logger } from "../../common/util/logger";
import useDebounce from "../../common/util/UseDebounce";
import KeyboardHandler from "../../KeyboardHandler";
import { ROUTE_EDIT_DECK } from "../../Routes";
import { LIGHTBOX_THEME_JSS_INDEX } from "../presenter/components/Lightbox/Lightbox";
import ReferenceDecks from "../reference/decks/ReferenceDecks";
import DeckEditor from "./components/DeckEditor/DeckEditor";
import { dragImageOnNewSlide } from "./components/DeckEditor/modules/plugins/component/media/image/transforms/dragImageOnNewSlide";
import { dragImageOnSlide } from "./components/DeckEditor/modules/plugins/component/media/image/transforms/dragImageOnSlide";
import EditorFactory from "./components/DeckEditor/services/EditorFactory";
import { NodeTransforms } from "./components/DeckEditor/services/transforms/NodeTransforms";
import { SlideTransforms } from "./components/DeckEditor/services/transforms/SlideTransforms";
import LoadingStateComponent from "./components/LoadingStateComponent";
import SignInCTA from "./components/SignInCTA";
import { composerStyles } from "./composerStyles";
import { useCleanUp } from "./hooks/DeckCleanUpHook";
import { isTouchEnabled } from "./queries/isTouchEnabled";
import { focusOnClick } from "./transforms/focusOnClick";
import { redirectOnError } from "./transforms/redirectOnError";
import { sendSlideUpdates } from "./transforms/sendSlideUpdates";

const dndBackend = isTouchEnabled() ?
  require("react-dnd-touch-backend").TouchBackend :
  require("react-dnd-html5-backend").HTML5Backend;

/**
 * The {@link Composer} is made up of the editing capability including
 * the Rich Text {@link Editor}.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function Composer({
  isReference,
  presentation,
  setPresentation,
  match, preview,
  user,
  ...props
}) {

  // Default permissions for a deck, should be shared with API/schema
  const DEFAULT_PERMISSIONS = { public: false, company: false };
  const [activeSlide, setActiveSlide] = useState(null);
  const [contentState, setContentState] = useState(null);
  const [newDeck, setNewDeck] = useState(false);
  const [slides, setSlides] = useState([]);
  const [serverCommunicationStatus, communicatingWithServer] = useState(LoadingState.NONE);
  const [, setStatus] = useState(LoadingState.NONE);
  const [theme, setTheme] = useState(null);
  const [aspect, setAspect] = useState(null);
  const [highlightedPath, setHighlightedPath] = useState(null);
  const [readyForUpdates, setReadyForUpdates] = useState(false);
  const [dirtyState, setDirtyState] = useState(false);
  const [pasteHandler, setPasteHandler] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const deckId = match.params.id;
  const materialTheme = useTheme();

  // Used to force-refresh the editor state in case of LB changes:
  const [editorVersion, setEditorVersion] = useState(0);
  const refreshEditor = () => setEditorVersion(editorVersion + 1);

  // Only re-generate the theme CSS if the theme changes.
  const themePackage = theme ? ThemeFactory.instance.get(theme, presentation.branding) : undefined;
  const useThemeStyles = useCallback(
    makeStyles(themePackage ? themePackage.component.css() : {}, { deterministic: false, meta: 'LightboxTheme', index: LIGHTBOX_THEME_JSS_INDEX }),
    [theme]
  );
  const themeClasses = useThemeStyles();

  // Show icon when we have active updates.
  const [setUpdate, { deck, error: setUpdateError }] = useUpdateDeck();
  useEffect(() => {
    if (deck) {
      communicatingWithServer(LoadingState.DONE);
      // Delay dispatching an action to remove componentReadyCallback state.
      setTimeout(() => {
        communicatingWithServer(LoadingState.NONE);
      }, 1000);
    }

    if (setUpdateError) {
      const statusCode = setUpdateError.response?.status;
      if (statusCode) {
        redirectOnError(statusCode, `${ROUTE_EDIT_DECK}/${match.params.id}`);
      } else {
        communicatingWithServer(LoadingState.ERROR);
      }
    }
  }, [deck, setUpdateError]);

  const setDocumentTitle = (presentation) => {
    //  Set deck name
    document.title = `${presentation && presentation.name ? presentation.name : "Untitled"} ✏️ Dropdeck`;
  };

  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => EditorFactory.instance(materialTheme).createEditor(match.params.id, undefined, { setPasteHandler }), []);

  // --------------------------------------
  // DATA HOOKS
  // --------------------------------------

  const setDeck = (payload) => {
    const { data } = payload;
    const loadedPresentationObject = Presentation.fromDataObject(data);
    const { content } = data;
    setNewDeck(!hasBeenUpdated(data));
    setPresentation(loadedPresentationObject);
    setTheme(loadedPresentationObject.theme);
    setAspect(loadedPresentationObject.aspect);
    setContentState(content);
    setSlides(generateSlides(content, deckId, Slide.View.LIGHTBOX, loadedPresentationObject.theme));
    communicatingWithServer(LoadingState.DONE);
    setDocumentTitle(loadedPresentationObject);
  };
  const loadDeck = (id) => {
    setStatus(LoadingState.LOADING);
    Dropdeck.Decks.byId(id)
      .then((payload) => {
        setDeck(payload);

        // Delay dispatching an action to remove done state.
        setTimeout(() => {
          communicatingWithServer(LoadingState.NONE);
        }, 2000);
      })
      .catch((e) => {
        logger.error(e);
        if (e.response) {
          const { status } = e.response;
          redirectOnError(status, `${ROUTE_EDIT_DECK}/${match.params.id}`);
        }
      });
  };

  // Initial load of a deck from the server.
  useEffect(() => {
    if (!presentation) {
      if (isReference) {
        setStatus(LoadingState.DONE);
        const deck = ReferenceDecks.instance().get(match.params.id) || {};
        const { content } = deck;
        setPresentation(Presentation.fromDataObject(deck));
        setTheme(deck.theme);
        setAspect(deck.aspect);
        setContentState(content);
        setSlides(generateSlides(content, deckId, Slide.View.LIGHTBOX, deck.theme));
        setDocumentTitle(presentation);

      } else {
        loadDeck(match.params.id);
      }
    }
  }, [match.params.id]);

  const ability = useAbility();
  const readOnly = ability.cannot(Abilities.Actions.EDIT, subject(Abilities.Subjects.PRESENTATION, presentation));

  // 300 ms delay in sending server updates
  const debouncedPresentationDTO = useDebounce(presentation, 300);
  useEffect(
    () => {
      if (debouncedPresentationDTO) {
        if (readyForUpdates && !readOnly) {
          const dto = { ...debouncedPresentationDTO.toDataObject() };
          setUpdate(dto._id, { ...dto });
        } else {
          setReadyForUpdates(true); // avoids redundant PUT requests on first load
        }

      }
    },
    [debouncedPresentationDTO], // Only call effect if debounced presentation changes
  );

  // Post dirty state on window unloading.
  useCleanUp(presentation, contentState, dirtyState);

  // Re-render slides if either the theme or the aspect ratio change.
  useEffect(
    () => {
      if (presentation && contentState) {
        if (theme !== presentation.theme) {

          // Re-generate slides if the theme changes.
          setSlides(generateSlides(contentState, deckId, Slide.View.LIGHTBOX, presentation.theme));
          setTheme(presentation.theme);
        }
        if (aspect && aspect !== presentation.aspect) {
          setAspect(presentation.aspect);
        }
      }
      setDocumentTitle(presentation);
    },
    [presentation], // Only call effect if presentation changes
  );

  // Fetch company branding
  const [companyBranding, setCompanyBranding] = useState();
  useEffect(() => {
    if (user.company && user.company.branding) {
      Dropdeck.Branding.byId(user.company.branding)
        .then((payload) => {
          setCompanyBranding(payload.data);
        })
        .catch((e) => logger.error(e));
    }
  }, [user]);

  // --------------------------------------
  // RENDERING
  // --------------------------------------

  const isPhoneSize = useMediaQuery(materialTheme.breakpoints.down('xs'));

  // If preview is not explicitly set in the state, fall back on defaulting to editor if app is phone sized.
  // You can see the corresponding setting in the PreviewToggle, where same logic is assumed.
  if (preview === undefined) {
    preview = !isPhoneSize || isReference;
  }

  // Default theme
  const themeName = (presentation ? presentation.theme : ThemeFactory.DEFAULT_THEME_NAME) || ThemeFactory.DEFAULT_THEME_NAME;

  // Debounce server updates by 1s.
  const sendServerUpdatesDebounced = useMemo(() => debounce(
    sendServerUpdates(presentation, (data) => setUpdate(presentation.id, data), () => setDirtyState(false)), 1000
  ), [presentation]);

  // Debounce slide updates by 400ms or 20ms per slide (whichever is greater).
  const sendSlideUpdatesDebounced = useMemo(() => debounce(
    sendSlideUpdates(themeName, deckId), Math.max(400, slides.length * 20)
  ), [themeName]);

  const moveSlide = (slides, oldIndex, newIndex) => {
    SlideTransforms.moveSlide(editor, slides[oldIndex].id, newIndex);
    setSlides(arrayMove(slides, oldIndex, newIndex));
    refreshEditor();
  };

  const onChange = onContentChange({
    editor,
    currentContent: contentState,
    setContentState,
    setActiveSlide,
    activeSlide,
    slides,
    setSlides,
    sendServerUpdates: sendServerUpdatesDebounced,
    sendSlideUpdates: sendSlideUpdatesDebounced,
    setHighlightedPath,
    setDirtyState,
  });

  const focusOnClickMemo = useMemo(() => focusOnClick(editor, setHighlightedPath), [editor, setHighlightedPath]);

  const useStyles = useCallback(composerStyles(), []);
  const classes = useStyles();

  const deckEditor = () => (
    <DeckEditor
      version={editorVersion}
      user={user}
      route={match}
      deckId={deckId}
      newDeck={newDeck}
      editor={editor}
      readOnly={readOnly}
      activeSlide={activeSlide}
      setDeckName={setDeckName}
      isPhoneSize={isPhoneSize}
      initialState={contentState}
      onContentChange={onChange}
      communicatingWithServer={communicatingWithServer}
      serverCommunicationStatus={serverCommunicationStatus}
      nameSetExplicitly={presentation && presentation.name !== null}
      highlightedPath={highlightedPath}
      pasteHandler={pasteHandler}
      setPasteHandler={setPasteHandler}
      themeName={themeName}
      themeClasses={themeClasses}
      uploadProgress={uploadProgress}
      companyBranding={companyBranding}
    />
  );

  const showEditor = () => (
    <Grid item {...Breakpoints.editor(preview)}
      className={`${classes.composerPane} ${preview ? 'preview-show' : 'preview-hide'}`}>
      {deckEditor()}
      {(user instanceof AnonymousUser) ? <SignInCTA/> : null}
    </Grid>
  );

  const hideEditor = () => (
    <div style={{ display: 'none' }}>
      {deckEditor()}
    </div>
  );

  const uploadProgressHandler = (value) => {
    setUploadProgress(value);
  };

  const operations = {
    swapElements: (path1, path2) => NodeTransforms.swap(editor, path1, path2),
    onImageDrop: dragImageOnSlide(editor, deckId, uploadProgressHandler),
    getHoverPath,
    resetRemix: resetRemix(editor),
    shiftRemix: shiftRemix(editor),
    setRemix: setRemix(editor),
    pickPalette: setPaletteForSlide(editor),
    focusOnClick: focusOnClickMemo,
    moveSlide,
    editor: readOnly ? undefined : editor,
    onWidgetDrop: dragImageOnNewSlide(editor, deckId, uploadProgressHandler),
  };

  const mainSection = () => {
    if (presentation && contentState) {
      return (
        <div>
          <DndProvider backend={dndBackend}>
            <Grid container spacing={0} className={classes.main}>
              {/* Editor */}
              <Can I={Abilities.Actions.EDIT} this={subject(Abilities.Subjects.PRESENTATION, presentation)}>
                {(!isPhoneSize || (isPhoneSize && !preview)) ? showEditor() : hideEditor()}
              </Can>

              {/* Preview */}
              {preview ? (
                <PreviewSection
                  slides={slides}
                  user={user}
                  themeName={themeName}
                  readOnly={readOnly}
                  isReference={isReference}
                  presentation={presentation}
                  isPhoneSize={isPhoneSize}
                  activeSlide={activeSlide}
                  themeClasses={themeClasses}
                  operations={operations}
                  uploadProgress={uploadProgress}
                  companyBranding={companyBranding}
                />
              ) : null}
            </Grid>
          </DndProvider>
        </div>
      );
    }
    return (
      <LoadingStateComponent status={serverCommunicationStatus}/>
    );
  };

  return (
    <div className={classes.root}>
      <KeyboardHandler>
        <ObserveKeys>
          {mainSection()}
        </ObserveKeys>
      </KeyboardHandler>
    </div>
  );
}

const mapDispatchToProps = {
  setPresentation,
  setDeckName,
};

function mapStateToProps(state) {
  return {
    preview: state.app.preview,
    user: state.user,
    presentation: Presentation.fromDataObject(state.composer.presentation)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Composer);
