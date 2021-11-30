/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import CloseIcon from "@material-ui/icons/Close";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { IconButton } from "@material-ui/core";
import { CenterFocusStrongRounded, ControlCamera, DoneRounded } from "@material-ui/icons";
import "./ImageEditor.scss";
import { imageEditorStyles } from "./ImageEditor.styles";
import { CLASS_HAS_TRANSFORM, ImageComponent } from "../ImageComponent/ImageComponent";
import Popup from "../../../../../../../../../../common/components/popup/Popup/Popup";
import ObjectUtils from "../../../../../../../../../../common/util/ObjectUtils";
import { convertFocalPointToCoordinates } from "./queries/convertFocalPointToCoordinates";
import { convertCoordinatesToFocalPoint } from "./queries/convertCoordinatesToFocalPoint";
import { measureImageContainer } from "./transforms/measureImageContainer";
import { logger } from "../../../../../../../../../../common/util/logger";

const transformKey = 'transform';

export const ImageEditor = ({
  url,
  label,
  onReady,
  settingsEditor,
  editable = false,
  settings = {}
}) => {

  const defaultFocalPoint = {
    x: 0.5,
    y: 0.5,
  };
  const transform = settings[transformKey];
  const { focalPoint } = (transform || {});
  const hasImageTransform = focalPoint !== undefined;

  const [state, setState] = useState({
    editMode: false,
    position: {
      x: 0,
      y: 0,
    },
    focalPoint: focalPoint || defaultFocalPoint,
    containerSize: undefined,
    scaledImageSize: undefined,
    canBeEdited: false,
    orientation: '',
    previousUrl: null
  });

  const allowEditing = editable && !!settingsEditor;

  const [anchorEl, setAnchorEl] = useState();
  const useStyles = useCallback(imageEditorStyles(), []);
  const classes = useStyles();

  const setPopupAnchor = (elem) => {
    if (elem) {
      setAnchorEl(elem);
    }
  };

  useEffect(() => {
    if (state.previousUrl !== url && state.previousUrl !== null) {
      const focalPoint = defaultFocalPoint;
      setState((prevState) => ({
        ...prevState,
        focalPoint,
        position: {
          x: 0,
          y: 0,
        }
      }));
    }
  }, [url]);

  const savePosition = () => {
    if (settingsEditor && state.containerSize && state.scaledImageSize) {
      const focalPoint = convertCoordinatesToFocalPoint(state.position, state.containerSize, state.scaledImageSize);
      if (!ObjectUtils.shallowEquals(focalPoint, state.focalPoint)) {

        // Update the x/y position in case the user dragged the image
        // outside of the container bounds.
        const position = convertFocalPointToCoordinates(focalPoint, state.containerSize, state.scaledImageSize);
        const previousUrl = url;

        logger.debug(`Focal point has changed - updating editor`);

        setState((prevState) => ({
          ...prevState,
          focalPoint,
          position,
          previousUrl
        }));
        settingsEditor.set(transformKey, { focalPoint });
      }
    }
  };

  const toggleEdit = (event) => {
    event.stopPropagation();
    if (state.editMode) {
      savePosition();
    } else {
      setPopupAnchor(event.currentTarget.closest('.image-container'));
    }
    setState((prevState) => ({
      ...prevState,
      editMode: !prevState.editMode
    }));
  };

  const recordTransform = ({ positionX, positionY }) => {
    // Need to check for this to avoid an infinite loop of state updates.
    const hasChanged = positionX !== state.position.x || positionY !== state.position.y;
    if (hasChanged) {
      setState((prevState) => ({
        ...prevState,
        position: {
          x: positionX,
          y: positionY,
        }
      }));
    }
  };

  // const zoomIn = () => {
  //   const maxZoom = 8;
  //   if (state.editMode && state.scale < maxZoom) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       scale: prevState.scale + 0.1,
  //     }));
  //   }
  // };
  //
  // const zoomOut = () => {
  //   const minZoom = 1;
  //   if (state.editMode && state.scale > minZoom) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       scale: prevState.scale - 0.1,
  //     }));
  //   }
  // };

  const reset = () => {
    recordTransform({ positionY: 0, positionX: 0 });
  };

  const cancel = () => {
    if (state.editMode) {
      let position = { x: 0, y: 0 };
      if (state.focalPoint && state.containerSize && state.scaledImageSize) {
        position = convertFocalPointToCoordinates(state.focalPoint, state.containerSize, state.scaledImageSize);
      }
      setState((prevState) => ({
        ...prevState,
        position,
        editMode: false,
      }));
    }
  };

  const closeOnClickAway = useCallback((event) => {
    if (state.editMode) {
      logger.debug(`Auto-saving the user's current image changes`);
      toggleEdit(event);
    }
  }, [state]);

  const settingsOverride = useMemo(() => ({
    ...settings,
    transform: {
      focalPoint: state.focalPoint,
    },
  }), [state.focalPoint]);

  // Store information about the image and the image container in the local state.
  const measureImageContainerOnLoad = measureImageContainer(state, setState, onReady);

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={closeOnClickAway}>
      <div className={`image-container ${state.editMode ? classes.editor : ''} ${classes.wrapper} ${state.orientation}`}>
        {
          allowEditing && (
            <div className={`${classes.editActions} edit-actions`}>
              {!state.editMode && (<IconButton className={`${classes.editAction} ${classes.editActionLarge}`} disabled={!state.canBeEdited} onClick={toggleEdit}><ControlCamera /></IconButton>)}
              <Popup instant anchor={anchorEl} setAnchor={setPopupAnchor} open={state.editMode} width={153}>
                { /* <IconButton className={`${classes.editAction}`} onClick={zoomIn}><ZoomIn /></IconButton> */ }
                { /* <IconButton className={`${classes.editAction}`} onClick={zoomOut}><ZoomOut /></IconButton> */ }
                <IconButton size="medium" className={`${classes.popupButton}`} onClick={reset} disabled={state.position.x === 0 && state.position.y === 0}><CenterFocusStrongRounded/></IconButton>
                <IconButton size="medium" className={`${classes.popupButton}`} onClick={toggleEdit}><DoneRounded /></IconButton>
                <IconButton size="medium" className={`${classes.popupButton}`} onClick={cancel}><CloseIcon /></IconButton>
              </Popup>
            </div>
          )
        }
        {
          state.editMode ? (
            <TransformWrapper
              defaultScale={state.scale}
              defaultPositionX={state.position.x}
              defaultPositionY={state.position.y}
              positionX={state.position.x}
              positionY={state.position.y}
              enablePanPadding={false}
              enablePadding={false}
              pinch={{ disabled: true }}
              zoomIn={{ disabled: true }}
              zoomOut={{ disabled: true }}
              wheel={{ disabled: true }}
              doubleClick={{ disabled: true }}
              options={{
                disabled: !state.editMode,
                limitToBounds: false,
                minScale: 1,
                maxScale: 1,
                limitToWrapper: false,
              }}
              pan={{
                disableOnTarget: ['button'],
                lockAxisX: state.orientation === 'portrait',
                lockAxisY: state.orientation === 'landscape',
                paddingSize: 0,
                padding: true,
              }}
              onZoomChange={() => {}}
              onPanningStop={recordTransform}
            >
              <TransformComponent>
                <ImageComponent
                  url={url}
                  label={label}
                  onReady={onReady}
                  settings={settings}
                  additionalClasses={hasImageTransform || state.editMode ? CLASS_HAS_TRANSFORM : ""}
                  includeTransformWrappers={false}

                />
              </TransformComponent>
            </TransformWrapper>
          ) : (
            <ImageComponent dropTarget={editable} url={url} label={label} onReady={measureImageContainerOnLoad} settings={settingsOverride} />
          )
        }
      </div>
    </ClickAwayListener>
  );
};
