import React from 'react';
import { logger } from "../../../../../../common/util/logger";
import { SortableItem } from "./SortableItem";
import ObjectUtils from "../../../../../../common/util/ObjectUtils";

/**
 * Wrapper for a {@link SortableItem} for controlling re-rendering.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
class SortableItemContainer extends React.Component {

  /**
   * Re-render the SortableItem if, and only if, one or more of the following conditions are met:
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
    const thisActive = this.props.isActive;
    const nextActive = nextProps.isActive;
    const thisDropzoneIndex = this.props.dropZoneIndex;
    const nextDropzoneIndex = nextProps.dropZoneIndex;
    const thisSlideTransitionClass = this.props.slideTransitionClass;
    const nextSlideTransitionClass = nextProps.slideTransitionClass;
    const thisSlideWidth = this.props.slideWidth;
    const nextSlideWidth = nextProps.slideWidth;
    const thisLightboxWidth = this.props.lightboxWidth;
    const nextLightboxWidth = nextProps.lightboxWidth;

    if (thisActive !== nextActive) {
      logger.trace(`Updating SortableItem for slide ${this.props.slide.id} because of active slide change`);
      return true;
    }

    if (thisCols !== nextCols) {
      logger.trace(`Updating SortableItem for slide ${this.props.slide.id} because of zoom change`);
      return true;
    }

    if (thisAspect !== nextAspect) {
      logger.trace(`Updating SortableItem for slide ${this.props.slide.id} because of aspect ratio change`);
      return true;
    }

    if (nextTimestamp > thisTimestamp) {
      logger.trace(`Updating SortableItem for slide ${this.props.slide.id} because of newer timestamp`);
      return true;
    }

    if (thisSlideId !== nextSlideId) {
      logger.trace(`Updating SortableItem for slide ${thisSlideId} because ID ch (changing to ${nextSlideId}`);
      return true;
    }

    if (!equalPaths(thisSlidePath, nextSlidePath)) {
      logger.trace(`Updating SortableItem for slide ${thisSlideId} because it's position changed from index ${thisSlidePath} to index ${nextSlidePath}`);
      return true;
    }

    if (thisDropzoneIndex !== nextDropzoneIndex) {
      logger.trace(`Updating SortableItem for slide ${this.props.slide.id} because of dropzone index change`);
      return true;
    }

    if (thisSlideTransitionClass !== nextSlideTransitionClass) {
      logger.trace(`Updating SortableItem for slide ${this.props.slide.id} because of slide transition class change`);
      return true;
    }

    if (thisLightboxWidth !== nextLightboxWidth) {
      logger.trace(`Updating SortableItem for slide ${this.props.slide.id} because of lightbox width change`);
      return true;
    }

    if (thisSlideWidth !== nextSlideWidth) {
      logger.trace(`Updating SortableItem for slide ${this.props.slide.id} because of slide width change`);
      return true;
    }

    logger.trace(`Not updating SortableItem for slide ${this.props.slide.id} - no changes`);
    return false;
  }

  render() {
    return (<SortableItem {...this.props}/>);
  }
}

const equalPaths = (a, b) => a === b || (a.length === 1 && b.length === 1 && a[0] === b[0]);

export default SortableItemContainer;
