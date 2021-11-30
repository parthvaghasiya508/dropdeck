import React from 'react';
import { SlidePanel } from "./SlidePanel";
import { logger } from "../../../../../../common/util/logger";

/**
 * Wrapper for a {@link Slide} for controlling re-rendering.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
class SlidePanelContainer extends React.Component {

  /**
   * Re-render the SlideComponent if, and only if, one or more of the following conditions are met:
   *
   * - If new Slide has a more recent time stamp than the old Slide;
   * - If new Slide has a different ID from the old Slide (should not happen, just a safeguard);
   * - If new Slide is being rendered at a different location than the old Slide (e.g. if a new slide was inserted before).
   *
   * @param nextProps new properties.
   * @param nextState new state (ignored).
   * @param nextContext new context (ignored).
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisTimestamp = this.props.slide.timeStamp ? this.props.slide.timeStamp : -1;
    const nextTimestamp = nextProps.slide.timeStamp ? nextProps.slide.timeStamp : -1;
    const thisSlideId = this.props.slide.id ? this.props.slide.id : -1;
    const nextSlideId = nextProps.slide.id ? nextProps.slide.id : -1;
    const thisSlidePath = this.props.slide.path ? this.props.slide.path : [];
    const nextSlidePath = nextProps.slide.path ? nextProps.slide.path : [];
    const thisAspect = this.props.aspect;
    const nextAspect = nextProps.aspect;
    const thisCols = this.props.cols;
    const nextCols = nextProps.cols;
    const thisLightboxWidth = this.props.lightboxWidth;
    const nextLightboxWidth = nextProps.lightboxWidth;
    const thisSlideWidth = this.props.width;
    const nextSlideWidth = nextProps.width;

    if (thisCols !== nextCols) {
      logger.trace(`Updating SlideComponent for slide ${this.props.slide.id} because of zoom change`);
      return true;
    }

    if (thisAspect !== nextAspect) {
      logger.trace(`Updating SlideComponent for slide ${this.props.slide.id} because of aspect ratio change`);
      return true;
    }

    if (nextTimestamp > thisTimestamp) {
      logger.trace(`Updating SlideComponent for slide ${this.props.slide.id} because of newer timestamp`);
      return true;
    }

    if (thisSlideId !== nextSlideId) {
      logger.trace(`Updating SlideComponent for slide ${thisSlideId} because ID ch (changing to ${nextSlideId}`);
      return true;
    }

    if (!equalPaths(thisSlidePath, nextSlidePath)) {
      logger.trace(`Updating SlideComponent for slide ${thisSlideId} because it's position changed from index ${thisSlidePath} to index ${nextSlidePath}`);
      return true;
    }

    if (thisLightboxWidth !== nextLightboxWidth) {
      logger.trace(`Updating SlideComponent for slide ${thisSlideId} because of lightbox width (changing to ${nextLightboxWidth}`);
      return true;
    }

    if (thisSlideWidth !== nextSlideWidth) {
      logger.trace(`Updating SlideComponent for slide ${thisSlideId} because of slide width (changing to ${nextSlideWidth}`);
      return true;
    }

    logger.trace(`Not updating SlideComponent for slide ${this.props.slide.id} - no changes`);
    return false;
  }

  render() {
    return (<SlidePanel {...this.props}/>);
  }
}

const equalPaths = (a, b) => a === b || (a.length === 1 && b.length === 1 && a[0] === b[0]);

export default SlidePanelContainer;
