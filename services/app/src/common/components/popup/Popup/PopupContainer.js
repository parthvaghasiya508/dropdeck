import React from 'react';
import { logger } from "../../../util/logger";
import Popup from "./Popup";

/**
 * Wrapper for a {@link Popup} for controlling re-rendering.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
class PopupContainer extends React.Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {

    const thisAnchor = this.props.anchor;
    const nextAnchor = nextProps.anchor;
    const thisWidth = this.props.width;
    const nextWidth = nextProps.width;

    if (thisAnchor !== nextAnchor) {
      logger.trace(`Updating Popup because of anchor element change`);
      return true;
    }

    if (thisWidth !== nextWidth) {
      logger.trace(`Updating Popup because of width change`);
      return true;
    }
    return false;
  }

  render() {
    return (<Popup {...this.props}/>);
  }
}

export default PopupContainer;
