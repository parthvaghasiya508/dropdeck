/* eslint-disable jsx-a11y/no-static-element-interactions */
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/styles";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { useEditor } from "slate-react";
import { setTheme } from "../../../../../../../actions/presentation";
import { componentBuilder } from "../../../../../../../common/api/plugins/builder/ComponentBuilder";
import { DataProvider } from "../../../../../../../common/api/plugins/template/DataProvider";
import { DynamicDataProvider } from "../../../../../../../common/api/plugins/template/DynamicDataProvider";
import { isDynamicTemplate } from "../../../../../../../common/api/plugins/template/queries/isDynamicTemplate";
import { nodeToQuery } from "../../../../../../../common/api/plugins/template/queries/nodeToQuery";
import { suggestionsForSlide } from "../../../../../../../common/api/plugins/template/queries/suggestionsForSlide";
import TemplateService from "../../../../../../../common/api/plugins/template/TemplateService";
import GenericButton from "../../../../../../../common/components/buttons/GenericButton";
import Label from "../../../../../../../common/components/controls/Label";
import ToggleButton from "../../../../../../../common/components/ToggleButton";
import { ThemeFactory } from "../../../../../../../common/theme/ThemeFactory";
import Breakpoints from "../../../../../../../common/util/Breakpoints";
import { logger } from "../../../../../../../common/util/logger";
import LightboxSlide from "../../../../../../presenter/components/Lightbox/components/LightboxSlide";
import { LIGHTBOX_REMIXES_JSS_INDEX } from "../../../../../../presenter/components/Lightbox/Lightbox";
import { remixStyleClassNames } from "../../../../../../presenter/queries/buildCombinedSlideStyles";
import { makeStylesForSlides } from "../../../../../../presenter/queries/makeStylesForSlides";
import PaletteIcon from "../../../../PreviewSection/components/toolbar/components/theme-icon.png";
import { logoToUse } from "../../../modules/plugins/component/media/logo/configuration/logoConfigurationBuilder";
import { onKeyDownTemplateContainer } from "../onKeyDownTemplateContainer";
import { emptySlideState } from "../queries/emptySlideState";
import { getTransformationsForSlide } from "../queries/getTransformationsForSlide";
import { templateGridStyles } from "./TemplateGrid.styles";
import { slidesFromTemplates } from "./transforms/slidesFromTemplates";
import { SIMPLE_THEME_ID } from "../../../../../../../theme/themes/simple/Simple";
import { SIMPLE_BRANDED_THEME_ID } from "../../../../../../../theme/themes/simpleBranded/SimpleBranded";
import { useDeckId } from "../../../../../hooks/useDeckId";

const Portal = ({ children }) => ReactDOM.createPortal(children, document.body);

export const blankTemplate = componentBuilder().template({ name: 'Blank slide' });

const TemplateGrid = ({
  onSelect,
  query,
  preview,
  onCancel,
  path,
  slideNode,
  slidePosition,
  themeName,
  themeClasses,
  newDeck = false,
  user,
  companyBranding,
  setTheme,
}) => {
  const [state, setState] = useState({
    query,
    elements: [],
    slides: [],
    dataProvider: undefined,
    initialized: false,
    focusedIndex: -1,
    showErrorMessage: false,
    fetchingImages: true,
    applyingTemplate: false,
  });
  const deckId = useDeckId();
  const editor = useEditor();
  const gridRef = useRef();
  const inputRef = useRef();
  const scrollEndRef = useRef();
  const focusedElementRef = useRef();
  const scrollRef = useRef();
  const themePackage = ThemeFactory.instance.get(themeName);
  const themeClass = themePackage.component;
  const SlideTheme = themeClass.wrapWithoutStyles;

  const useSlideStyles = useMemo(() => makeStylesForSlides(state.slides, themeName, themePackage, {
    makeStyleOptions: { deterministic: false, meta: 'ThemeGrid', index: LIGHTBOX_REMIXES_JSS_INDEX + 1 },
  }), [state.initialized, themeName]);
  const slideClasses = useSlideStyles();

  // Rebuild template slides
  useEffect(() => {
    if (state.dataProvider) {
      const { query = '' } = state;
      const slideNodeNotEmpty = emptySlideState(editor, slideNode) ? undefined : slideNode;
      let templates = getTransformationsForSlide(query, slideNodeNotEmpty, slidePosition, 10).map(({ template }) => (isDynamicTemplate(template) ? template(state.dataProvider) : template));
      if (newDeck && query === '') {
        templates = [blankTemplate, ...templates];
      }
      const slides = slidesFromTemplates(templates, path, slideNode, themeName, deckId);
      const elements = slides.map((slide, i) => ({ slide, template: templates[i] }));
      setState((prevState) => ({
        ...prevState,
        elements,
        slides,
        initialized: true,
      }));
    }
  }, [state.query, state.dataProvider]);

  // Fetch initial template placeholder data.
  useEffect(() => {
    const slideNodeNotEmpty = emptySlideState(editor, slideNode) ? undefined : slideNode;
    const templateService = TemplateService.instance();
    const hasTemplates = templateService.search('', slideNodeNotEmpty, slidePosition).length > 0;
    if (hasTemplates) {
      const nodeQuery = nodeToQuery(slideNode);
      const evaluator = suggestionsForSlide(nodeQuery);
      evaluator().then((response) => {
        let dataProvider = new DataProvider({ user, companyBranding });
        if (response) {
          const { images, sentiment } = response;
          if (images) {
            dataProvider = new DynamicDataProvider(nodeQuery, { images, user, companyBranding, sentiment, theme: themeClass });
          }
        }
        setState((prevState) => ({
          ...prevState,
          dataProvider,
          fetchingImages: false,
        }));
      });
    } else {
      logger.debug(`No templates matching the current slide content, so not fetching dynamic suggestions`);
      setState((prevState) => ({
        ...prevState,
        dataProvider: new DataProvider({ user, companyBranding }),
        fetchingImages: false,
      }));
    }
  }, []);

  const updateQuery = useMemo(() => debounce((query) => {
    setState((prevState) => ({
      ...prevState,
      query,
    }));
    // inputRef.current.focus();
  }, 300), []);

  const handleChangeQuery = (e) => {
    const query = e.target.value;
    updateQuery(query);
  };

  // Register key events
  const handleKeyDownContainer = useCallback(onKeyDownTemplateContainer(onCancel), []);
  useEffect(() => {
    document.removeEventListener("keydown", handleKeyDownContainer);
    document.addEventListener("keydown", handleKeyDownContainer);
    return () => {
      document.removeEventListener("keydown", handleKeyDownContainer);
    };
  }, []);

  const useStyles = useCallback(templateGridStyles(), []);
  const classes = useStyles();
  const theme = useTheme();

  const [branding, setBranding] = useState();

  const toggleTheme = () => {
    if (branding) {
      setTheme(SIMPLE_THEME_ID, companyBranding);
    } else {
      setTheme(SIMPLE_BRANDED_THEME_ID, companyBranding);
    }
    setBranding(!branding);
  };

  const logo = logoToUse(companyBranding);

  return (
    <Portal>
      <Grid container>
        <Grid item {...Breakpoints.editor(preview)} className={classes.root}>
          <div className={classes.outer}>

            {/* Intro */}
            {newDeck && (
              <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", width: "100%", padding: companyBranding ? "0 1rem" : "0.5rem 1rem", }}>
                <div style={{ paddingLeft: '0.75rem', display: "flex", flexGrow: 1, flexDirection: "column", alignItems: companyBranding ? "left" : "center", justifyContent: companyBranding ? "left" : "center", textAlign: companyBranding ? "left" : "center", }}>
                  <Label variant="h2" style={{ margin: "0.75rem 0 0.5rem 0", width: '100%', lineHeight: 1.1, fontWeight: '500', fontSize: '1.7rem', letterSpacing: '-0.025rem', fontFamily: '"Inter var","Helvetica Neue",Helvetica,Arial,sans-serif', }}>Pick a starting point<br/>for your first slide</Label>
                  <Label variant="p" style={{ textAlign: companyBranding ? "left" : "center", width: '100%', opacity: '0.75', }}>or start with a blank slide!</Label>
                </div>
                {companyBranding ? (
                  <div style={{ margin: '0.2rem 0 1rem 0', }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 75, width: 158, overflow: "none", backgroundColor: logo.bgColor || "#fff", border: '1px solid', borderColor: theme.palette.background.panel02, borderBottom: '0', borderTopLeftRadius: '3px', borderTopRightRadius: '3px', }}>
                      <img alt="branding-logo" src={logo.url} style={{ width: '55%', height: '55%', objectFit: 'contain' }}/>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", padding: 4, background: theme.palette.background.panel01, borderBottomLeftRadius: 3, borderBottomRightRadius: 3, border: '1px solid', borderColor: theme.palette.background.panel02, borderTop: '0', }}>
                      <img src={PaletteIcon} alt="button" height={18} style={{ padding: '2px 5px' }}/>
                      <ToggleButton label={<div style={{ color: theme.palette.text.secondary }}>Use Branding</div>} checked={branding} onChange={toggleTheme} color={companyBranding.colors.accent} />
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* Search */}
            <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "baseline", padding: '0 0.55rem 0.5rem 0.5rem', zIndex: 1 }}>
              <span className={classes.inputLabel}>Search layouts: </span>
              <input
                ref={inputRef}
                className={classes.input}
                placeholder=" "
                onChange={handleChangeQuery}
              />
              <GenericButton secondary style={{ marginLeft: 16, padding: '3px 25px' }} onClick={onCancel}>
                Cancel
              </GenericButton>
            </div>

            {/* Results */}
            <div style={{ width: '100%', overflow: 'hidden', overflowY: 'auto', }}>
              <SlideTheme classes={themeClasses}>
                <div className={`${remixStyleClassNames(slideClasses)} ${classes.templateGridInner}`} ref={scrollRef}>
                  {
                    state.elements.length > 0 && (
                      <Box flex={1} width="100%">
                        <Grid
                          ref={gridRef}
                          container
                          spacing={1}
                          className={`${classes.templateGridItems}`}
                          tabIndex={-1}
                        >
                          {state.elements.map((element, index) => {
                            const { slide, template } = element;
                            return (
                              <Grid
                                key={template.name}
                                item
                                xs={6}
                                sm={4}
                                md={4}
                                lg={4}
                                className={classes.templateGridItemContainer}
                                ref={state.focusedIndex === index ? focusedElementRef : null}>
                                <div onClick={() => onSelect(template)} className={classes.templateGridItem}>
                                  <LightboxSlide
                                    readOnly
                                    theme={themeClass}
                                    // branding={themeClass.branded && branding}
                                    className={slideClasses.slideRoot}
                                    style={{ pointerEvents: 'none', cursor: 'pointer', userSelect: 'none', borderRadius: 4 }}
                                    paletteOverrideClasses={slideClasses}
                                    slide={slide}
                                  />
                                </div>
                                <div onClick={() => onSelect(template)}>
                                  <Label className={classes.templateName}>{template.name}</Label>
                                </div>
                              </Grid>
                            );
                          })}
                        </Grid>
                        {
                          state.fetchingImages && (
                            <CircularProgress className={classes.loadMoreSpinner} color="primary" size={20}/>
                          )
                        }
                        <div ref={scrollEndRef}/>
                      </Box>
                    )
                  }
                  {
                    (state && state.elements && state.elements.length === 0 && state.showErrorMessage) && (
                      <p className={classes.noResults}>No templates found for &ldquo;{state.query}&rdquo;</p>
                    )
                  }
                </div>
              </SlideTheme>
              {
                ((state.applyingTemplate || state.fetchingImages) && !(state.showErrorMessage)) && (
                  <div className={classes.insertSpinner}>
                    <CircularProgress color="primary" size={40}/>
                  </div>
                )
              }
            </div>

            {/* Hint */}
            <Label style={{ fontSize: "0.7em", marginTop: 18, marginBottom: 6 }}><b style={{ color: theme.palette.primary.main }}>Tip:</b> Hit the <b style={{ fontSize: "0.8em", border: `1px solid ${theme.palette.text.primary}`, borderRadius: 3, marginLeft: 2, marginRight: 2, padding: 1 }}>&nbsp;⎋ ESC&nbsp;</b> key to start without a template!</Label>

          </div>
        </Grid>
      </Grid>
    </Portal>
  );
};

const mapDispatchToProps = {
  setTheme,
};

function mapStateToProps(state) {
  return {
    preview: state.app.preview,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TemplateGrid);
