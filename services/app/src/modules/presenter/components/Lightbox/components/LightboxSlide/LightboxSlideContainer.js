import React from 'react';
import LightboxSlide from "./LightboxSlide";
import { logger } from "../../../../../../common/util/logger";

/**
 * Wrapper for a {@link LightboxSlide} for controlling re-rendering.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
class LightboxSlideContainer extends React.Component {

  /**
   * Re-render the Slide if, and only if, new Slide has a more recent time stamp than the old Slide.
   *
   * @param nextProps new properties.
   * @param nextState new state (ignored).
   * @param nextContext new context (ignored).
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisTimestamp = this.props.slide.timeStamp ? this.props.slide.timeStamp : -1;
    const nextTimestamp = nextProps.slide.timeStamp ? nextProps.slide.timeStamp : -1;
    const timestampChanged = nextTimestamp > thisTimestamp;
    const aspectChanged = nextProps.aspect !== this.props.aspect;
    const widthChanged = nextProps.width !== this.props.width;
    const shouldUpdate = timestampChanged || aspectChanged || widthChanged;

    if (logger._level === 'trace') {
      if (shouldUpdate) {
        logger.trace(`Updating LightboxSlide ${this.props.slide.id} because newer timestamp`);
      } else {
        logger.trace(`Not updating LightboxSlide ${this.props.slide.id} - no changes`);
      }
    }

    return shouldUpdate;
  }

  render() {
    return (<LightboxSlide {...this.props}/>);
  }

}
export default LightboxSlideContainer;
