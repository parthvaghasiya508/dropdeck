import React from "react";
import { logger } from "../../../../common/util/logger";
import Player from "./Player";

class PlayerContainer extends React.Component {

  /**
   * Re-render the Player if, and only if, the slides, theme or branding have changed.
   *
   * @param nextProps new properties.
   * @param nextState new state (ignored).
   * @param nextContext new context (ignored).
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const slidesChanged = haveSlidesChanged(nextProps.slides, this.props.slides); // ObjectUtils.shallowEquals(nextProps, this.props);
    const startSlideChanged = nextProps.startSlide !== this.props.startSlide;
    const hasChanged = slidesChanged || startSlideChanged;
    if (hasChanged) {
      logger.trace(`Updating Player because slides changed`);
    }
    return hasChanged;
  }

  render() {
    return (<Player {...this.props}/>);
  }
}
export default PlayerContainer;

const haveSlidesChanged = (newSlides, oldSlides) => {
  if ((!oldSlides && newSlides) || (oldSlides && !newSlides)) {
    return true;
  }
  if (!Array.isArray(oldSlides) || !Array.isArray(newSlides) || newSlides.length !== oldSlides.length) {
    return true;
  }
  return false;
};
