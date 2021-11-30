import { calculateScaledImageSize } from "../queries/calculateScaledImageSize";
import ObjectUtils from "../../../../../../../../../../../common/util/ObjectUtils";
import { logger } from "../../../../../../../../../../../common/util/logger";
import { convertFocalPointToCoordinates } from "../queries/convertFocalPointToCoordinates";

/**
 * Compute information about various sizing aspects of the image container and the image element.
 * @param state
 * @param setState
 * @param onReady
 * @returns {function(...[*]=)}
 */
export const measureImageContainer = (state, setState, onReady) => (event, element) => {
  if (!element && event) {
    element = event.target;
  }
  if (element) {
    const { objectFit } = window.getComputedStyle(element);
    if (objectFit && objectFit === 'cover') {
      const { naturalHeight, naturalWidth } = element;
      const parent = element.parentElement;
      if (parent) {
        const { clientWidth, clientHeight } = parent;
        if (clientWidth > 0 && clientHeight > 0 && naturalWidth > 0 && naturalHeight > 0) {
          const intrinsicSize = { w: naturalWidth, h: naturalHeight };
          const containerSize = { w: clientWidth, h: clientHeight };
          const scaledImageSize = calculateScaledImageSize(intrinsicSize, containerSize);

          // We only allow editing of images that have object-fit: cover AND where
          // the image does not fit perfectly in the container.
          const orientation = (scaledImageSize.w > containerSize.w) ? 'landscape' : 'portrait';
          const isCropped = scaledImageSize.w > containerSize.w || scaledImageSize.h > containerSize.h;
          const canBeEdited = isCropped;

          if (!ObjectUtils.shallowEquals(scaledImageSize, state.scaledImageSize) || !ObjectUtils.shallowEquals(containerSize, state.containerSize)) {
            logger.trace(`Image loaded - storing image and container dimensions`);
            logger.trace(`Intrinsic size of image: (${intrinsicSize.w}, ${intrinsicSize.h})`);
            logger.trace(`Container size: (${containerSize.w}, ${containerSize.h})`);
            logger.trace(`Size of scaled image: (${scaledImageSize.w}, ${scaledImageSize.h})`);
            let position = { x: 0, y: 0 };
            if (state.focalPoint) {
              logger.trace(`Stored focal point: (${state.focalPoint.x}, ${state.focalPoint.y})`);
              position = convertFocalPointToCoordinates(state.focalPoint, containerSize, scaledImageSize);
            }
            logger.trace(`Offset position: (${position.x}, ${position.y})`);
            setState((prevState) => ({
              ...prevState,
              scaledImageSize,
              containerSize,
              position,
              canBeEdited,
              orientation,
            }));
          }
        }
      }
    } else {
      logger.trace(`Image has object-fit: ${objectFit} so we can't tweak its size`);
      if (state.canBeEdited) {
        setState((prevState) => ({
          ...prevState,
          canBeEdited: false,
        }));
      }
    }
    if (event) {
      onReady(event);
    }
  }
};
