import React from 'react';
import { logger } from "../../../../../../../../../common/util/logger";
import { TemplateDrawer } from "./TemplateDrawer";

/**
 * Wrapper for a {@link TemplateDrawer} for controlling re-rendering.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
class TemplateDrawerContainer extends React.Component {

  /**
   * Re-render the drawer if, and only if, new templates are being rendered.
   *
   * @param nextProps new properties.
   * @param nextState new state (ignored).
   * @param nextContext new context (ignored).
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {

    const slidesChanges = nextProps.slideHash !== this.props.slideHash;
    const loadingChanged = nextProps.loading !== this.props.loading;
    const shouldUpdate = slidesChanges || loadingChanged;

    if (logger._level === 'trace') {
      if (shouldUpdate) {
        logger.trace(`Updating TemplateDrawer`);
      } else {
        logger.trace(`Not updating TemplateDrawer - no changes`);
      }
    }

    return shouldUpdate;
  }

  render() {
    return (<TemplateDrawer {...this.props}/>);
  }

}
export default TemplateDrawerContainer;
