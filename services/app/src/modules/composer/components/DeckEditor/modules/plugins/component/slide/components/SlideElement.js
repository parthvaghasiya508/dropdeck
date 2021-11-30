import { ClickAwayListener } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useDimensions from "react-cool-dimensions";
import { CgMergeHorizontal } from "react-icons/cg";
import { HiCog } from "react-icons/hi";
import { ImMagicWand } from "react-icons/im";
import { IoDuplicate } from "react-icons/io5";
import { Path, Transforms } from "slate";
import { ReactEditor, useEditor } from "slate-react";
import useMergedRef from "@react-hook/merged-ref";
import { encodeStructure } from "../../../../../../../../../common/api/plugins/template/transforms/encodeStructure";
import { slideStructure } from "../../../../../../../../../common/api/plugins/template/transforms/slideStructure";
import { DEFAULT_SCALING } from "../../../../../../../../presenter/components/Slide/scalingLimits";
import { TemplateMenu } from "../../../../../components/template/TemplateMenu/TemplateMenu";
import { useTemplateMenuControls } from "../../../../../hooks/useTemplateMenuControls";
import { EditorTransforms } from "../../../../../services/transforms/EditorTransforms";
import { SelectionTransforms } from "../../../../../services/transforms/SelectionTransforms";
import { SlideTransforms } from "../../../../../services/transforms/SlideTransforms";
import { splitSlide } from "../../../slide/splitSlide";
import NewSlideButton from "./NewSlideButton";
import { SlideControlButton, slideControlIconStyle } from "./SlideControlButton";
import { useDndBlock } from "../../../dnd/hooks";
import { slideElementStyles } from "./SlideElement.styles";
import { DropLine } from "../../../../draggable/DropLine";
import { SLIDE } from "../type";
import { getTransformationsForSlide } from "../../../../../components/template/queries/getTransformationsForSlide";
import { emptySlideState } from "../../../../../components/template/queries/emptySlideState";

export const SLIDE_ELEMENT_CLASS = "editorSlide";

const isActiveSlide = (editor, slideId) => {
  const current = EditorTransforms.currentSlide(editor);
  if (current !== undefined && current.length > 0 && current[0] !== undefined) {
    return slideId === current[0].id;
  }
  return false;
};

const scaling = (element) => {
  if (element && element.settings && element.settings.scaling) {
    return element.settings.scaling;
  }
  return DEFAULT_SCALING;
};

const ControlMode = {
  Compact: "compact",
  Full: "full"
};

export const SlideElement = ({ children, element }) => {

  const editor = useEditor();
  const templateMenuControls = useTemplateMenuControls() || {};
  const {
    themeName,
    themeClasses,
    templateMenuClasses,
    applyTemplate,
    templateMenuSlideId,
    showTemplateGrid,
    setShowTemplateGrid,
    openTemplateMenu,
    closeTemplateMenu,
    user,
    companyBranding,
  } = templateMenuControls;

  const split = splitSlide(editor, openTemplateMenu);
  const readOnly = ReactEditor.isReadOnly(editor);
  const slideElementPath = ReactEditor.findPath(editor, element);
  const splitLocation = SelectionTransforms.lastLocation(editor, slideElementPath);
  const slideId = element.id;
  const lastSlide = SlideTransforms.isLastSlide(editor, slideId);
  const firstSlide = SlideTransforms.isFirstSlide(editor, slideId);
  const shouldShowTemplateMenu = templateMenuSlideId && templateMenuSlideId === slideId;
  const slideIsActive = isActiveSlide(editor, slideId);
  const currentScaling = scaling(element);

  const deleteSlide = () => SlideTransforms.deleteSlide(editor, slideId);

  const duplicateSlide = () => SlideTransforms.duplicateSlide(editor, slideId);

  const mergeSlide = () => {
    if (!lastSlide) {
      const nextSlidePath = Path.next(slideElementPath);
      if (nextSlidePath) {
        SlideTransforms.mergeSlide(editor, nextSlidePath);
      }
    }
  };

  const interSlideButtons = useRef();
  const interFirstSlideButton = useRef();

  const addSlide = (addAfter = true) => {
    if (addAfter) {
      interSlideButtons.current.classList.add("hide");
      setTimeout(() => {
        interSlideButtons.current.classList.remove("hide");
      }, 1000);
    }
    const index = SlideTransforms.getIndexOfSlide(editor, slideId);
    if (index >= 0) {
      const position = addAfter ? index + 1 : index;
      const newSlidePath = editor.insertSlide({ position });
      if (newSlidePath) {
        Transforms.select(editor, newSlidePath);
        ReactEditor.focus(editor);
        openTemplateMenu();
      }
    }
  };

  const [showMagicGrid, setShowMagicGrid] = useState(showTemplateGrid);
  const [controlMode, setControlMode] = useState(ControlMode.Compact);
  const [showCompactMenu, setShowCompactMenu] = useState(false);
  const { ref, height, width } = useDimensions();

  useEffect(() => {
    if (!showCompactMenu) {
      if (height < 94) {
        if (controlMode !== ControlMode.Compact) {
          setControlMode(ControlMode.Compact);
        }
      } else if (controlMode !== ControlMode.Full) {
        setControlMode(ControlMode.Full);
      }
    }
  }, [height]);

  const [hasMatches, setHasMatches] = useState(false);
  const slideEncoding = encodeStructure(slideStructure(element));

  const [anchorEl, setAnchorEl] = useState(null);
  const isTemplateMenuOpen = Boolean(anchorEl) || showMagicGrid;

  const toggleMagicDrawer = (show) => {
    setAnchorEl(anchorEl || !show ? null : ref.current);
    if (!anchorEl || show) {
      ref.current.classList.add("magic-drawer-open");
    } else {
      ref.current.classList.remove("magic-drawer-open");
    }
  };

  const toggleCompactModeMenu = () => {
    if (hasMatches) {
      toggleMagicDrawer(true);
    }
    setShowCompactMenu(!showCompactMenu);
  };

  useEffect(() => {
    const slideNodeNotEmpty = emptySlideState(editor, element) ? undefined : element;
    const matches = getTransformationsForSlide('', slideNodeNotEmpty);
    if (matches && matches.length > 0) {
      setHasMatches(true);
    } else {
      setHasMatches(false);
      toggleMagicDrawer(false);
    }
  }, [slideEncoding]);

  useEffect(() => {
    toggleMagicDrawer(shouldShowTemplateMenu);
  }, [shouldShowTemplateMenu]);

  const clickAwayHandler = () => {
    toggleMagicDrawer(false);
  };

  const useStyles = useCallback(slideElementStyles(), []);
  const classes = useStyles();

  // Drag-and-drop
  const blockRef = useRef(null);
  const { dropLine, dragRef, isDragging } = useDndBlock({
    path: slideElementPath,
    blockRef,
    type: SLIDE,
  });
  const combinedRef = useMergedRef(ref, blockRef);

  return (
    <div
      className={`${SLIDE_ELEMENT_CLASS} ${slideIsActive ? "selected" : ""}${anchorEl ? " magic-drawer-open" : ''}`}
      data-id={slideId}>

      {
        !readOnly && firstSlide &&
        (
          <div ref={interFirstSlideButton} className={`${classes.interSlideButtons} inter-slide-buttons first-slide-buttons ${isTemplateMenuOpen || (slideIsActive && currentScaling !== DEFAULT_SCALING) ? "hide" : ""}`}>
            <IconButton size="small" onClick={() => addSlide(false)} className={classes.button} style={{ marginLeft: 10 }}><AddIcon/></IconButton>
          </div>
        )
      }

      <ClickAwayListener onClickAway={clickAwayHandler}>
        <div ref={combinedRef} className={`slide-area control-mode-${controlMode}${lastSlide ? ' last' : ''}${anchorEl ? " show-controls" : ''}`}>
          <ClickAwayListener onClickAway={() => setShowCompactMenu(false)}>

            <div
              ref={dragRef}
              className={`slide-controls control-mode-${controlMode} ${showCompactMenu ? "compact-mode-open" : ""} ${slideIsActive ? "active" : "" }`} contentEditable={false}>
              <div className={`slide-number ${slideIsActive && "active"}`} contentEditable={false}/>
              <span className="options">
                <IconButton size="small" onClick={toggleCompactModeMenu}><HiCog style={slideControlIconStyle}/></IconButton>
                <div className={`notification ${hasMatches ? "has-matches" : ""}`}> </div>
              </span>
              <div className={`control-actions-outer control-mode-${controlMode}`} contentEditable={false}>
                <div className="control-actions-inner">
                  <SlideControlButton onClick={duplicateSlide} icon={<IoDuplicate style={slideControlIconStyle}/>} style={{ }}/>
                  <SlideControlButton onClick={deleteSlide} icon={<Delete style={slideControlIconStyle}/>}/>
                  <SlideControlButton style={{ overflow: "hidden" }} icon={<ImMagicWand style={{ overflow: "hidden", transform: "scaleX(-1) scale(1.4)", top: 3, left: -3, position: "relative" }}/>} size="small" className={`magic-wand ${hasMatches && "active"}${anchorEl ? " open" : ""}`} disabled={!hasMatches} onClick={hasMatches ? toggleMagicDrawer : undefined}/>
                </div>
              </div>
            </div>
          </ClickAwayListener>

          <div className="slide-edge">
            <DropLine path={slideElementPath} active={dropLine} />
          </div>

          <div className="slide-content">
            {children}
          </div>
        </div>
      </ClickAwayListener>

      {
        isTemplateMenuOpen && (
          <TemplateMenu
            showInitially={showTemplateGrid}
            setShowInitially={setShowTemplateGrid}
            popupAnchor={anchorEl}
            setPopupAnchor={setAnchorEl}
            popupWidth={width}
            toggleMagicDrawer={toggleMagicDrawer}
            closeMenu={closeTemplateMenu}
            templateMenuClasses={templateMenuClasses}
            themeClasses={themeClasses}
            applyTemplate={(template) => applyTemplate(template, slideElementPath)}
            node={element}
            themeName={themeName}
            user={user}
            companyBranding={companyBranding}
            path={slideElementPath}
            showMagicGrid={showMagicGrid}
            setShowMagicGrid={setShowMagicGrid}
          />
        )
      }

      {(splitLocation || lastSlide) && !readOnly ?
        <NewSlideButton splitSlide={split} scaling={currentScaling} splitLocation={splitLocation} lastSlide={lastSlide} /> : null}

      {
        !readOnly && !lastSlide &&
        (
          <div ref={interSlideButtons} className={`${classes.interSlideButtons} inter-slide-buttons ${isTemplateMenuOpen || (slideIsActive && currentScaling !== DEFAULT_SCALING) || lastSlide ? "hide" : ""}`}>
            <IconButton size="small" onClick={addSlide} className={classes.button} style={{ marginLeft: 10 }}><AddIcon/></IconButton>
            <IconButton size="small" onClick={mergeSlide} className={classes.button} style={{ marginLeft: 27 }}><CgMergeHorizontal/></IconButton>
          </div>
        )
      }

    </div>
  );
};
