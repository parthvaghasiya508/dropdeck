import React from 'react';
import { SortableList } from './SortableList';
import { logger } from "../../../../../../common/util/logger";
import { haveSlidesChanged } from "../../queries/haveSlidesChanged";

/**
 * {@link SortableList} for showing slides when composing a presentation.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
class SortableListContainer extends React.Component {

  /**
   * Re-render the SortableList if, and only if, one or more of the following conditions are met:
   *
   * - There have been changes to the list of slides (determined by inspecting the time stamp on each Slide entry);
   * - The zoom level has been changed;
   * - The active slide has been changed.
   *
   * @param nextProps new properties.
   * @param nextState new state (ignored).
   * @param nextContext new context (ignored).
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const slidesChanged = haveSlidesChanged(nextProps.slides, this.props.slides);
    const zoomChanged = nextProps.cols !== this.props.cols;
    const widthChanged = nextProps.lightboxWidth !== this.props.lightboxWidth || nextProps.slideWidth !== this.props.slideWidth;
    const activeSlideChanged = nextProps.activeSlide !== this.props.activeSlide;
    const aspectChanged = nextProps.aspect !== this.props.aspect;
    const uploadProgress = nextProps.uploadProgress !== this.props.uploadProgress;
    const isDragActive = nextProps.dropZonePropertiesisDragActive !== this.props.dropZoneProperties.isDragActive;
    const droppedInside = nextProps.droppedInside !== this.props.droppedInside;
    const hasChanged = slidesChanged || zoomChanged || activeSlideChanged || aspectChanged || uploadProgress || widthChanged || isDragActive || droppedInside;
    if (hasChanged) {
      logger.trace(`Updating SortableList because ${slidesChanged ? 'slides' : activeSlideChanged ? 'active slide' : aspectChanged ? 'aspect' : 'zoom'} changed`);
    }

    return hasChanged;
  }

  render() {
    if (this.props.slides) {
      return (<SortableList {...this.props}/>);
    }
    return null;
  }
}
export default SortableListContainer;
