import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import debounce from "lodash.debounce";
import '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core';
import { ReactEditor, Slate } from "slate-react";
import { Node as SlateNode, Path, Transforms } from "slate";
import { EditablePlugins, } from '@udecode/slate-plugins';
import { connect } from "react-redux";
import { DeckEditorStyles } from './DeckEditorStyles';
import './DeckEditor.scss';
import { Suggestions } from './modules/plugins/suggestions/components/Suggestions';
import EditorToolbar from "../EditorToolbar";
import { isDevMode } from '../../../../App';
import { NodeTransforms } from "./services/transforms/NodeTransforms";
import { SuggestedMatch } from "./modules/plugins/suggestions/SuggestedMatch";
import { onKeyDownConfigure, updatePrompt } from "./modules/plugins/prompt/onKeyDownConfigure";
import { onKeyDownDebugging } from "./modules/plugins/onKeyDownDebugging";
import { onKeyDownSlideBreaks } from "./modules/plugins/slideBreaks/onKeyDownSlideBreaks";
import { onKeyDownSelectAll } from "./keyDownHandlers/onKeyDownSelectAll";
import { onKeyDownEmptyEditor } from "./keyDownHandlers/onKeyDownEmptyEditor";
import { renderLeafWithPrompt } from "./modules/plugins/prompt/renderLeafWithPrompt";
import { PromptSessionContext } from "./modules/prompt/hooks/usePromptSession";
import { capitalise } from "../../../../common/transforms/capitalise";
import { autoSuggestName } from "../../transforms/autoSuggestName";
import { resetPrompt } from "./modules/prompt/transforms/resetPrompt";
import { newPromptSessionGenerator } from "./modules/prompt/transforms/newPromptSessionGenerator";
import { configurePrompt } from "./modules/prompt/transforms/configurePrompt";
import { setDeckName } from "../../../../actions/presentation";
import { decorateConfigurationPrompt } from "./modules/plugins/prompt/decorateConfigurationPrompt";
import { triggerSuggestion } from "./modules/plugins/suggestions/transforms/triggerSuggestion";
import { ImageDropzone } from "./modules/plugins/component/media/image/components/ImageDropZone";
import { onKeyDownSuggestionsMenu } from "./modules/plugins/suggestions/onKeyDownSuggestionsMenu";
import { HighlightedPathContext } from "../../hooks/highlighted/useHighlightedPath";
import { onKeyDownTabs } from "./modules/plugins/component/code/onKeyDownTabIndent";
import Placeholder from "./components/Placeholder";
import { onKeyDownSoftBreak } from "./modules/plugins/breaks/onKeyDownSoftBreak";
import { onKeyDownExitBreak } from "./modules/plugins/breaks/onKeyDownExitBreak";
import { onPasteInEditor } from "./transforms/onPasteInEditor";
import { SelectionTransforms } from "./services/transforms/SelectionTransforms";
import { hasActivePrompt } from "./modules/prompt/transforms/hasActivePrompt";
import { EditorTransforms } from "./services/transforms/EditorTransforms";
import { PromptSession } from "./modules/prompt/PromptSession";
import EditorFactory from "./services/EditorFactory";
import { CODE } from "./modules/plugins/component/code/type";
import { MATH } from "./modules/plugins/component/math/type";
import { BLOCK_QUOTE } from "./modules/plugins/component/quote/type";
import { TableType } from "./modules/plugins/component/table/type";
import { SmartPaste } from "./components/SmartPaste/SmartPaste";
import { EditorOperationsContext } from "./hooks/useEditorOperations";
import { onKeyDownLinkMenu } from "./keyDownHandlers/onKeyDownLinkMenu";
import { LinkMenu } from "./components/LinkMenu/LinkMenu";
import { withPromptSession } from "./modules/plugins/prompt/withPromptSession";
import { TemplateMenuContext } from "./hooks/useTemplateMenuControls";
import { applyTransformation } from "./transforms/applyTransformation";
import { templateMenuStyles } from "./components/template/TemplateMenu/TemplateMenu.styles";
import { SlideTransforms } from "./services/transforms/SlideTransforms";
import { onKeyDownToggleTemplateDrawer } from "./components/template/TemplateMenu/onKeyDownToggleTemplateDrawer";
import { handleMultiClicks } from "./transforms/handleMultiClicks";
import { logger } from "../../../../common/util/logger";
import { updateSuggestions } from "./modules/plugins/suggestions/components/transforms/updateSuggestions";

/**
 * Wrapper for the actual {@link SlateEditor}. Forwarding the `ref` from the wrapping component.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const DeckEditor = ({
  version = 0, // used to refresh the editor rendering
  deckId,
  editor,
  initialState,
  newDeck = false,
  deckName,
  user,
  setDeckName,
  themeName,
  onContentChange,
  activeSlide,
  readOnly,
  communicatingWithServer,
  serverCommunicationStatus,
  highlightedPath,
  pasteHandler,
  setPasteHandler,
  themeClasses,
  uploadProgress,
  companyBranding,
}) => {

  const materialTheme = useTheme();

  // We use this flag in order to programmatically trigger a re-rendering of
  // the prompt decorator, without modifying the editor directly.
  const [promptTrigger, setPromptTrigger] = useState(0);

  const [promptSession, setPromptSession] = useState(undefined);
  const [suggestName, setSuggestName] = useState(true);
  const [lineBreaks, setLineBreaks] = useState(0);
  const [match, setMatch] = useState(new SuggestedMatch({}));
  const devMode = isDevMode();
  const resetPromptSession = resetPrompt(setPromptSession);
  const newPromptSession = newPromptSessionGenerator(setPromptSession);
  const configurePromptSession = configurePrompt(promptSession, setPromptSession);
  const promptUpdate = updatePrompt(promptSession, editor, resetPromptSession);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [selectAllCount, setSelectAllCount] = useState(0);
  const beingConfigured = promptSession && promptSession.status === PromptSession.Status.BEING_CONFIGURED;
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [showTemplateGrid, setShowTemplateGrid] = useState(newDeck);

  const useTemplateMenuStyles = useCallback(templateMenuStyles(), []);
  const templateMenuClasses = useTemplateMenuStyles();

  const [templateMenuSlideId, setTemplateMenuSlideId] = useState(null);

  const toggleTemplateMenu = useCallback(() => {
    setShowTemplateMenu(!showTemplateMenu);
    setTemplateMenuSlideId(null);
  }, [showTemplateMenu]);

  const openTemplateMenu = useCallback(() => {
    setShowTemplateMenu(true);
    setTemplateMenuSlideId(null);
  }, [showTemplateMenu]);

  const templateMenuControls = useMemo(() => ({
    toggleTemplateMenu,
    openTemplateMenu,
    setShowTemplateMenu,
    showTemplateGrid,
    setShowTemplateGrid,
    themeName,
    user,
    companyBranding,
    templateMenuSlideId,
    themeClasses,
    templateMenuClasses,
    closeTemplateMenu: () => {
      setShowTemplateMenu(false);
      setTemplateMenuSlideId(null);
    },
    applyTemplate: (template, path) => {
      applyTransformation(editor, themeName, template, path);
      setShowTemplateMenu(false);
      setTemplateMenuSlideId(null);
    },
  }), [user, companyBranding, showTemplateGrid, templateMenuSlideId, showTemplateMenu, themeName, themeClasses]);

  const [linkMenu, setLinkMenu] = useState(false);
  const toggleLinkMenu = () => setLinkMenu(!linkMenu);

  const setPromptAndTriggerDecorator = (session) => {
    setPromptSession(session);
    setPromptTrigger(promptTrigger + 1);
  };

  // Click handler
  const onClick = (event) => {
    promptUpdate(event);

    // Clear counter for Mod+A
    setSelectAllCount(0);

    // Terminate event handling to avoid unwanted selection of void nodes (#163)
    event.preventDefault();
  };

  const onMouseDown = useCallback(handleMultiClicks(editor), [editor]);

  // On-blur handler
  const onBlur = (event) => {
    promptUpdate(event);

    // Terminate event handling to avoid unwanted selection of void nodes (#163)
    event.preventDefault();
  };

  // Suggest a new deck name
  const onKeyDownDeckName = useCallback(
    (event) => {

      // On line break, we consider whether to extract a new deck name.
      if (event.key === 'Enter' && !deckName && !suggestName) {
        setSuggestName(true); // We are ready to suggest a new
      }
    },
    // eslint-disable-next-line
    [suggestName],
  );

  const updateSuggestionsHandler = useMemo(() => updateSuggestions, []);

  // Handle Cmd+A selection in a slide or editor.
  const handleKeyDownSelectAll = useCallback(onKeyDownSelectAll(selectAllCount, setSelectAllCount), [selectAllCount]);

  // Change event handler.
  const onChange = (content) => {

    let isBeingConfigured = false;
    if (promptSession) {
      const [node, path] = EditorTransforms.componentElement(editor);
      isBeingConfigured = node !== undefined && hasActivePrompt(node, path, promptSession);
    }

    // Update auto-complete suggestions.
    updateSuggestionsHandler(editor, match, promptSession);

    // Suggest deck name, if needed.
    autoSuggestNameDebounced(deckName, suggestName);

    // Process further content changes.
    const options = {
      updateSlides: true,
      updateServer: !isBeingConfigured,
    };

    onContentChange(content, options);

  };

  // Toggle template menu on and off.
  useEffect(() => {
    if (showTemplateMenu) {

      // If the active slide has changed from the slide we are showing an open
      // template menu, we hide the template menu.
      if (activeSlide && templateMenuSlideId !== null && activeSlide !== templateMenuSlideId) {
        setShowTemplateMenu(false);
        setTemplateMenuSlideId(null);
        return;
      }

      const [currentSlide] = SlideTransforms.currentSlide(editor);
      if (currentSlide) {
        const { id } = currentSlide;
        if (id) {
          setTemplateMenuSlideId(id);
        } else {
          setShowTemplateMenu(false);
          setTemplateMenuSlideId(null);
        }
      } else {
        setShowTemplateMenu(false);
        setTemplateMenuSlideId(null);
      }
    }
  }, [showTemplateMenu, activeSlide]);

  /**
   * Suggest a name for a new slide deck based on what the user has typed in.
   */
  const MAX_NAME_LENGTH = 50;
  const extractName = (editor) => {
    let text = NodeTransforms.firstText(editor, promptSession ? promptSession.path : undefined);
    if (text && text.length > 0) {
      // Take the first MAX_NAME_LENGTH characters of the user's input and capitalise the first character.
      // TODO Some further clean-up is probably sound...
      if (text.length > MAX_NAME_LENGTH) {
        text = text.substr(0, MAX_NAME_LENGTH);
      }
      return capitalise(text);
    }
  };

  // Throttle content processing and updates by 300ms.
  const autoSuggestNameDebounced = useMemo(() => debounce(autoSuggestName(editor, setSuggestName, extractName, setDeckName), 300), []);

  const promptDecorator = decorateConfigurationPrompt(promptSession, editor, resetPromptSession, configurePromptSession, setPromptAndTriggerDecorator);
  const useDeckEditorStyles = useCallback(DeckEditorStyles(), []);
  const classes = useDeckEditorStyles();
  const onSelectionTrigger = triggerSuggestion(editor, setMatch, newPromptSession, resetPromptSession);
  const { plugins } = EditorFactory.instance(materialTheme);
  const exitBreakTypes = [CODE, MATH];
  const softBreakTypes = [CODE, MATH, TableType.CELL];
  const keyDownHandlers = [
    onKeyDownExitBreak({
      query: {
        allow: exitBreakTypes,
      },
    }),
    onKeyDownSoftBreak({
      rules: [
        {
          hotkey: 'shift+enter'
        },
        {
          hotkey: 'enter',
          query: {
            allow: softBreakTypes,
          },
        },
      ],
    }),
    onKeyDownSuggestionsMenu(match, setMatch, onSelectionTrigger),
    onKeyDownConfigure(promptSession, resetPromptSession, configurePromptSession, setPromptAndTriggerDecorator),
    onKeyDownDeckName,
    onKeyDownToggleTemplateDrawer(toggleTemplateMenu),
    onKeyDownSlideBreaks(lineBreaks, setLineBreaks, promptSession, softBreakTypes, openTemplateMenu),
    onKeyDownEmptyEditor,
    onKeyDownTabs,
    handleKeyDownSelectAll,
    onKeyDownLinkMenu(toggleLinkMenu)
  ];
  if (devMode) {
    keyDownHandlers.push(onKeyDownDebugging(devMode));
  }

  // When the editor first loads, focus at the end of the document.
  const editorComponent = useRef(null);
  const onPaste = useCallback(onPasteInEditor(editor, readOnly), [editor, readOnly]);

  useLayoutEffect(() => {
    if (editorComponent.current) {
      if (!editor.selection || editor.selection === null) {
        if (initialState && initialState.length > 0) {
          const [, startNodePath] = SlateNode.first({ children: initialState }, []);
          if (startNodePath && Path.isPath(startNodePath)) {
            const location = SelectionTransforms.lastLocation(editor, startNodePath);
            if (location) {
              try {
                Transforms.select(editor, location);
                ReactEditor.focus(editor);
              } catch (e) {
                logger.error('Unable to focus on the last position in the new deck');
              }
            }
          }
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  // This needs to be memoized to avoid too many unnecessary re-renderings.
  const operations = useMemo(() => ({
    setMatch,
    toggleLinkMenu,
  }), []);

  return (
    <PromptSessionContext.Provider value={promptSession}>
      <HighlightedPathContext.Provider value={highlightedPath}>
        <EditorOperationsContext.Provider value={operations}>
          <TemplateMenuContext.Provider value={templateMenuControls}>
            <div id="editor-outer">
              <div id="editor-wrapper" className={classes.root}>
                <div className={classes.paper} elevation={0}>
                  <div className="editor">
                    <Slate editor={editor} value={initialState} onChange={onChange}>
                      <ImageDropzone deckId={deckId} uploadStatus={uploadStatus} setUploadStatus={setUploadStatus}>
                        {
                          !readOnly && (
                            <EditorToolbar
                              deckId={deckId}
                              communicatingWithServer={communicatingWithServer}
                              serverCommunicationStatus={serverCommunicationStatus}
                              setUploadStatus={setUploadStatus}
                            />
                          )
                        }
                        <div className="topFade"> </div>
                        <div className="editorInner" ref={editorComponent}>
                          <EditablePlugins
                            plugins={plugins}
                            placeholder={<Placeholder editor={withPromptSession(editor, promptSession)} promptSession={promptSession} />}
                            className="editable"
                            renderLeaf={[renderLeafWithPrompt]}
                            renderLeafDeps={[promptSession, promptTrigger]}
                            spellCheck
                            readOnly={readOnly || beingConfigured}
                            autoFocus
                            decorate={[promptDecorator]}
                            decorateDeps={[promptSession, promptTrigger]}
                            onKeyDown={keyDownHandlers}
                            onKeyDownDeps={[lineBreaks, match, promptSession, resetPromptSession, configurePromptSession, onSelectionTrigger]}
                            renderElementDeps={[version]}
                            onClick={onClick}
                            onMouseDown={onMouseDown}
                            onBlur={onBlur}
                            onPaste={onPaste}
                          />
                        </div>
                        <div className="bottomFade"> </div>
                        {
                          linkMenu && <LinkMenu editor={editor} closeMenu={() => setLinkMenu(false)} />
                        }
                        <SmartPaste pasteHandler={pasteHandler} setPasteHandler={setPasteHandler} />
                        <Suggestions onSelectionTrigger={onSelectionTrigger} editor={editor} match={match} setMatch={setMatch} />
                      </ImageDropzone>
                    </Slate>
                  </div>
                </div>
              </div>
            </div>
          </TemplateMenuContext.Provider>
        </EditorOperationsContext.Provider>
      </HighlightedPathContext.Provider>
    </PromptSessionContext.Provider>
  );
};

const mapDispatchToProps = {
  setDeckName,
};

function mapStateToProps(state) {
  const props = {
    deckName: state.composer.presentation ? state.composer.presentation.name : undefined,
  };
  return props;
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditor);
