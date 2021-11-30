// Key-down event handler
import { isHotkey } from "is-hotkey";
import { Path, Range } from "slate";
import { EditorTransforms } from "../../services/transforms/EditorTransforms";
import { logger } from "../../../../../../common/util/logger";

export const onKeyDownDebugging = (devMode) => (event, editor) => {

  // Dump out the current editor state when in dev mode and user presses ctrl+x
  if (devMode && isHotkey('ctrl+x', event)) {
    const { selection } = editor;
    if (Range.isRange(selection)) {
      const { anchor, focus } = selection;
      if (Path.compare(anchor.path, focus.path) === 0 && anchor.offset === focus.offset) {
        logger.debug(`# Current cursor location:`);
        logger.debug(focus);
      } else {
        logger.debug(`# Current cursor location (selecting characters ${anchor.offset} to ${focus.offset}`);
        logger.debug(selection);
      }
    } else {
      logger.debug(`# No selection`);
    }
    const size = EditorTransforms.size(editor);
    logger.debug(`# Editor state (${size} ${size === 1 ? 'leaf node' : 'leaf nodes'}):`);
    logger.debug(editor.children);
  }
};
