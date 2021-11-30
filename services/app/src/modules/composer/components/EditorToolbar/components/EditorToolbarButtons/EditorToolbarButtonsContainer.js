import React from 'react';
import { logger } from "../../../../../../common/util/logger";
import { EditorToolbarButtons } from "./EditorToolbarButtons";
import ObjectUtils from "../../../../../../common/util/ObjectUtils";

const arrayEquals = (a, b) => Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);

/**
 * Wrapper for a {@link LightboxSlide} for controlling re-rendering.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
class EditorToolbarButtonsContainer extends React.Component {

  /**
   * Re-render the toolbar buttons if, and only if, new Slide has a more recent time stamp than the old Slide.
   *
   * @param nextProps new properties.
   * @param nextState new state (ignored).
   * @param nextContext new context (ignored).
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const chosenBlockTypeChanged = nextProps.chosenBlockType !== this.props.chosenBlockType;
    const selectionTypeChanged = !ObjectUtils.shallowEquals(nextProps.selectionType, this.props.selectionType);

    const thisEditorHistory = this.props.historyHash;
    const nextEditorHistory = nextProps.historyHash;
    const historyChanged = thisEditorHistory !== nextEditorHistory;
    const thisInlineMarks = this.props.inlineMarks || [];
    const nextInlineMarks = nextProps.inlineMarks || [];
    const inlineMarksChanged = !arrayEquals(thisInlineMarks, nextInlineMarks);
    const shouldUpdate = chosenBlockTypeChanged || selectionTypeChanged || inlineMarksChanged || historyChanged;

    if (logger._level === 'trace') {
      if (historyChanged) {
        logger.trace(`Updating EditorToolbarButtons because history has changed`);
      } else if (chosenBlockTypeChanged) {
        logger.trace(`Updating EditorToolbarButtons because chosen block type changed (was ${this.props.chosenBlockType}, then ${nextProps.chosenBlockType})`);
      } else if (selectionTypeChanged) {
        logger.trace(`Updating EditorToolbarButtons because selection profile changed`);
      } else if (inlineMarksChanged) {
        logger.trace(`Updating EditorToolbarButtons because inline marks changed`);
      } else {
        logger.trace(`Not updating EditorToolbarButtons - no changes`);
      }
    }
    return shouldUpdate;
  }

  render() {
    return (<EditorToolbarButtons {...this.props}/>);
  }

}
export default EditorToolbarButtonsContainer;
