import { useTheme } from "@material-ui/styles";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ReactEditor, useEditor } from "slate-react";
import { DataProvider } from "../../../../../../../common/api/plugins/template/DataProvider";
import { DynamicDataProvider } from "../../../../../../../common/api/plugins/template/DynamicDataProvider";
import { isDynamicTemplate } from "../../../../../../../common/api/plugins/template/queries/isDynamicTemplate";
import { nodeToQuery } from "../../../../../../../common/api/plugins/template/queries/nodeToQuery";
import { suggestionsForSlide } from "../../../../../../../common/api/plugins/template/queries/suggestionsForSlide";
import { encodeStructure } from "../../../../../../../common/api/plugins/template/transforms/encodeStructure";
import { slideStructure } from "../../../../../../../common/api/plugins/template/transforms/slideStructure";
import Popup from "../../../../../../../common/components/popup/Popup/Popup";
import { ThemeFactory } from "../../../../../../../common/theme/ThemeFactory";
import { LIGHTBOX_REMIXES_JSS_INDEX } from "../../../../../../presenter/components/Lightbox/Lightbox";
import { onKeyDownTemplateContainer } from "../onKeyDownTemplateContainer";
import TemplateGrid from "../TemplateGrid/TemplateGrid";
import { slidesFromTemplates } from "../TemplateGrid/transforms/slidesFromTemplates";
import TemplateDrawerContainer from "./components/TemplateDrawer/TemplateDrawerContainer";
import { getTransformationsForSlide } from "../queries/getTransformationsForSlide";
import { emptySlideState } from "../queries/emptySlideState";
import { makeStylesForSlides } from "../../../../../../presenter/queries/makeStylesForSlides";
import TemplateService from "../../../../../../../common/api/plugins/template/TemplateService";
import { logger } from "../../../../../../../common/util/logger";
import { useDeckId } from "../../../../../hooks/useDeckId";

const TEMPLATES_TO_SHOW = 5;

export const TemplateMenu = ({
  popupAnchor,
  setPopupAnchor,
  popupWidth,
  toggleMagicDrawer,
  showInitially,
  setShowInitially,
  showMagicGrid,
  setShowMagicGrid,
  templateMenuClasses,
  applyTemplate,
  path,
  node,
  themeName,
  themeClasses,
  closeMenu,
  user,
  companyBranding,
}) => {

  const themePackage = ThemeFactory.instance.get(themeName);
  const themeClass = themePackage.component;
  const SlideTheme = themeClass.wrapWithoutStyles;
  const slideEncoding = encodeStructure(slideStructure(node));
  const isOpen = Boolean(popupAnchor);
  const slidePosition = path && path.length > 0 ? path[0] : -1;
  const editor = useEditor();
  const deckId = useDeckId();

  const [state, setState] = useState({
    slides: [],
    slideTemplates: [],
    slideTemplateHash: undefined,
    dataProvider: new DataProvider({ user, companyBranding }),
    initialized: false,
    loading: false,
    hasMore: false,
    showSearchMenu: false,
    query: '',
  });

  const openModal = () => {
    setShowMagicGrid(true);
  };

  const onSelectGrid = (template) => {
    applyTemplate(template);
    setShowMagicGrid(false);
    toggleMagicDrawer(false);
    setShowInitially(false);
  };

  const onSelect = (template) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    applyTemplate(template);
    setState((prevState) => ({
      ...prevState,
      loading: false,
    }));
    setShowInitially(false);
    setShowMagicGrid(false);
    toggleMagicDrawer(false);
  };

  const onCancel = () => {
    setShowInitially(false);
    setShowMagicGrid(false);
    toggleMagicDrawer(false);
    ReactEditor.focus(editor);
  };

  const useSlideStyles = useMemo(() => makeStylesForSlides(state.slides, themeName, themePackage, {
    makeStyleOptions: { deterministic: false, meta: 'TemplateMenu', index: LIGHTBOX_REMIXES_JSS_INDEX + 1 },
  }), [state.slideTemplateHash]);

  const slideClasses = useSlideStyles();

  // Register key events
  const handleKeyDownContainer = useCallback(onKeyDownTemplateContainer(() => setPopupAnchor(false)), []);
  useEffect(() => {
    document.removeEventListener("keydown", handleKeyDownContainer);
    document.addEventListener("keydown", handleKeyDownContainer);
    return () => {
      document.removeEventListener("keydown", handleKeyDownContainer);
    };
  }, []);

  // Rebuild template slides
  useEffect(() => {
    if (state.dataProvider) {
      const slideNodeNotEmpty = emptySlideState(editor, node) ? undefined : node;
      const templateMatches = getTransformationsForSlide('', slideNodeNotEmpty, slidePosition);
      const hasMore = templateMatches.length > TEMPLATES_TO_SHOW;
      const initialTemplateMatches = hasMore ? templateMatches.slice(0, TEMPLATES_TO_SHOW) : templateMatches;
      const templateCollection = initialTemplateMatches.map(({ template }) => {
        if (isDynamicTemplate(template)) {
          return {
            dynamic: true,
            template: template(state.dataProvider),
          };
        }
        return {
          dynamic: false,
          template,
        };
      });
      const slides = slidesFromTemplates(templateCollection.map(({ template }) => template), path, node, themeName, deckId);
      const slideTemplates = slides.map((slide, i) => ({
        slide,
        template: templateCollection[i].template,
        dynamic: templateCollection[i].dynamic,
      }));
      setState((prevState) => ({
        ...prevState,
        slideTemplates,
        slides,
        slideTemplateHash: new Date().getTime(),
        initialized: true,
        hasMore,
      }));
    }
  }, [state.dataProvider]);

  // Fetch initial template placeholder data
  useEffect(() => {
    if (!isOpen) {
      setState((prevState) => ({
        ...prevState,
        dataProvider: undefined,
        loading: false,
      }));
      return;
    }
    if (user && state.query && state.query.length > 1) {
      const slideNodeNotEmpty = emptySlideState(editor, node) ? undefined : node;
      const templateService = TemplateService.instance();
      const hasTemplates = templateService.search('', slideNodeNotEmpty, slidePosition).length > 0;
      if (hasTemplates) {
        const evaluator = suggestionsForSlide(state.query);
        setState((prevState) => ({
          ...prevState,
          loading: true,
        }));
        evaluator().then((response) => {
          let dataProvider = new DataProvider({ user });
          if (response) {
            const { images, sentiment } = response;
            if (images) {
              dataProvider = new DynamicDataProvider(state.query, { images, user, companyBranding, sentiment, theme: themeClass });
            }
          }
          setState((prevState) => ({
            ...prevState,
            dataProvider,
            loading: false,
          }));
        });
      } else {
        logger.debug(`No templates matching the current slide content, so not fetching dynamic suggestions`);
      }
    }
  }, [user, companyBranding, isOpen, state.query, slideEncoding]);

  // Debounce content updates to fetch new templates.
  const updateQuery = (query) => {
    setState((prevState) => ({
      ...prevState,
      query,
    }));
  };
  const updateQueryDebounced = useMemo(() => debounce(updateQuery, 1000), []);

  const nodeQuery = nodeToQuery(node);
  useEffect(() => {
    updateQueryDebounced(nodeQuery);
  }, [nodeQuery]);

  const theme = useTheme();

  return (
    <div style={{ userSelect: "none", cursor: "default" }}>
      <Popup
        disablePortal
        persistent
        inset
        instant
        disableFlip
        color={theme.dark() ? "#282828" : "#e2e2e3"} // sets popup chevron
        style={{
          cursor: "default",
          background: theme.dark() ? "#2e2e2e" : "#f4f4f5",
          border: theme.dark() ? "1px solid rgba(29, 29, 31, 0.4)" : "1px solid rgba(0,0,0,0.075)",
          boxShadow: theme.dark() ? "inset 0px 1px 3px 0px rgb(0 0 0 / 25%), 0px 1px 0px 0px rgb(255 255 255 / 8%)" : "inset 0px 1px 2px rgb(0 0 0 / 6%), 0px 1px 0px rgb(255 255 255 / 100%), 0px -1px 0px rgb(255 255 255 / 100%)",
        }}
        arrowStyle={{ marginLeft: "-92%", marginTop: "-7px" }}
        anchor={popupAnchor}
        setAnchor={setPopupAnchor}
        open={isOpen}
        defaultPlacement="bottom"
        width={popupWidth}>

        <TemplateDrawerContainer
          slideHash={state.slideTemplateHash}
          theme={theme}
          hasMore={state.hasMore}
          slideTemplates={state.slideTemplates}
          loading={state.loading}
          themeClasses={themeClasses}
          themeClass={themeClass}
          templateMenuClasses={templateMenuClasses}
          slideClasses={slideClasses}
          SlideTheme={SlideTheme}
          onSelect={onSelect}
          openModal={openModal}
        />
      </Popup>
      {showMagicGrid && (
        <TemplateGrid
          newDeck={showInitially}
          slideNode={node}
          slidePosition={slidePosition}
          filter={slideEncoding}
          themeClasses={themeClasses}
          onSelect={onSelectGrid}
          onCancel={onCancel}
          path={path}
          themeName={themeName}
          user={user}
          companyBranding={companyBranding}
        />
      )}
    </div>
  );
};
