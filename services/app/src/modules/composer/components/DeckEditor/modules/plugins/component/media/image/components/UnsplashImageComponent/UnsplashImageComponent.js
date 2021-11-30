/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import throttle from "lodash.throttle";
import React, { useLayoutEffect, useState } from "react";
import { imageScaling } from "../../queries/imageScaling";
import { logger } from "../../../../../../../../../../../common/util/logger";
import { ImageComponent } from "../../../components/ImageComponent/ImageComponent";
import { getFocalPoint } from "../../../components/ImageComponent/queries/getFocalPoint";
import { imagePlaceholderUrl } from "../../transforms/imagePlaceholderUrl";

const placeholderUrl = imagePlaceholderUrl();

const initialImageState = () => ({
  width: 0,
  height: 0,
  isLoading: true,
  url: `${placeholderUrl}?_=${new Date().getTime()}`,
});

/**
 * Image component used to handle dynamically sized images from Unsplash as well as other sources.
 */
export const UnsplashImageComponent = ({ dropTarget = false, urlGenerator, label, onReady, onMouseOver, onMouseOut, backgroundColor, settings }) => {

  const [state, setState] = useState(initialImageState());

  /**
   * Update and round up the width and height of a dynamic image resource.
   * @param width
   * @param height
   */
  const updateImageState = (width, height, objectFit) => {
    const [widthRounded, heightRounded, ratio] = imageScaling(width, height, state.ratio);
    if (widthRounded > state.width || (!ratio && heightRounded > state.height)) {
      if (state.width === 0 && state.height === 0) {
        logger.trace(`New image canvas, rounded up to: ${widthRounded}:${heightRounded}`);
      } else {
        logger.trace(`Larger image area requested: ${widthRounded}:${heightRounded} > ${state.width}:${state.height}`);
      }

      const newUrl = urlGenerator(widthRounded, heightRounded, getFocalPoint(settings), objectFit);
      setState({
        isLoading: false,
        width: widthRounded,
        height: heightRounded,
        url: newUrl,
        objectFit,
        ratio,
      });
    } else {
      logger.trace(`No change to image URL: Same size or smaller image area requested: ${widthRounded}:${heightRounded} vs ${state.width}:${state.height}`);
    }
  };

  // Whenever the view or URL changes, we update the image.
  useLayoutEffect(() => {
    if (!state.isLoading) {
      setState((prevState) => ({
        ...prevState,
        url: urlGenerator(state.width, state.height, getFocalPoint(settings), state.objectFit),
      }));
    }
  }, [urlGenerator]);

  const onResize = throttle(({ width, height }) => {
    // Only update the image after the initial loading.
    if (!state.isLoading) {
      updateImageState(width, height, state.objectFit);
    }
  }, 10);

  const imageUrl = state.url;
  const onLoad = state.isLoading ? (event, elt) => {
    if (event && event.persist) {
      event.persist();
      setTimeout(() => {
        const element = event.target;
        if (element) {
          const { width, height } = element;
          const { objectFit } = window.getComputedStyle(element);
          logger.trace(`Finished loading placeholder at ${imageUrl} with object-fit ${objectFit} and dimensions ${width}:${height}`);
          updateImageState(width, height, objectFit);
        }
      }, 10);
    } else if (elt) {
      const element = elt;
      if (element) {
        const { width, height } = element;
        const { objectFit } = window.getComputedStyle(element);
        logger.trace(`Finished loading placeholder at ${imageUrl} with object-fit ${objectFit} and dimensions ${width}:${height}`);
        updateImageState(width, height, objectFit);
      }
    }

  } : onReady;

  return (
    <ImageComponent
      onResize={onResize}
      label={label}
      backgroundColor={backgroundColor}
      url={state.url}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onReady={onLoad}
      dropTarget={dropTarget}
      settings={{ ...settings, transform: undefined }} // important: we take care of the transformation in our call to Unsplash
    />
  );
};
