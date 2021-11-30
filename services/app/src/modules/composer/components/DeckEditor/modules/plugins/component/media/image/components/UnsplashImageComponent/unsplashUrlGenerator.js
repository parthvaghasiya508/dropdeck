import { Slide } from "../../../../../../../../../../../common/slide";
import { logger } from "../../../../../../../../../../../common/util/logger";
import { config } from "../../../../../../../../../../../config";

const EDITOR_THUMBNAIL_WIDTH = 150;
const DEFAULT_WIDTH_LIGHTBOX = 800;
const DEFAULT_WIDTH_DIRECTORY = 600;
const DEFAULT_WIDTH_PDF = 800;
export const DEFAULT_WIDTH = 800;

const additionalOptions = config.services.unsplash.debug ? '&fp-debug=true' : '';

export const unsplashUrlGenerator = (view, url) => {

  if (view === Slide.View.PDF) {
    return `${url}&w=${DEFAULT_WIDTH_PDF}`;
  }

  // Fixed dimensions when previewing slides in the editor.
  if (view === Slide.View.EDITOR) {
    return `${url}&w=${EDITOR_THUMBNAIL_WIDTH}${additionalOptions}`;
  }

  // Fixed dimensions when previewing slides in the Directory.
  if (view === Slide.View.DIRECTORY) {
    return `${url}&w=${DEFAULT_WIDTH_DIRECTORY}&fit=crop${additionalOptions}`;
  }

  // Fixed dimensions when working with slides in the Lightbox.
  if (view === Slide.View.LIGHTBOX) {
    // This corresponds to the "regular" image size in Unsplash (see https://unsplash.com/documentation)
    // return `${url}&w=1080&fit=crop&q=80&fit=max`;
    return `${url}&w=${DEFAULT_WIDTH_LIGHTBOX}&fit=crop${additionalOptions}`;
  }

  return (width = 0, height = 0, focalPoint, objectFit) => {

    if (focalPoint) {
      logger.debug(`Requesting image in view ${view} at width:height ${width}:${height} at focal point ${focalPoint.x}:${focalPoint.y}`);
    } else {
      logger.trace(`Requesting image in view ${view} at width:height ${width}:${height}`);
    }

    // If we apply cropping we end up requesting potentially two different copies of an image;
    // one with only one dimension constrained and then a subsequent cropped version. This is due
    // to the way that the useDimensions resize hook operated with our flex layouts. Needs to be investigated,
    // but disabled for now to avoid these duplicate image requests.
    // TODO Investigate a solution to this issue.

    // If we both have width and height then we crop the image (fit=crop).
    if (width > 0 && height > 0) {
      if (focalPoint) {
        const { x, y } = focalPoint;
        if (x !== undefined && y !== undefined) {
          return `${url}&w=${width}&h=${height}&fit=crop&fp-x=${x}&fp-y=${y}${additionalOptions}`;
        }
      }

      // Aspect ratio preserved: constrain by the larger dimension.
      if (objectFit === 'contain') {
        if (width > height) {
          return `${url}&w=${width}${additionalOptions}`;
        }
        return `${url}&h=${height}${additionalOptions}`;
      }
      return `${url}&w=${width}&h=${height}&fit=crop${additionalOptions}`;
    }

    // If we only have height then that is the constraining dimension.
    if (height > width) {
      return `${url}&h=${height}${additionalOptions}`;
    }

    // Otherwise we constrain by width.
    return `${url}&w=${width > 0 ? width : DEFAULT_WIDTH}${additionalOptions}`;
  };
};
