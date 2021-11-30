import { Editor, Node, Path, Text } from "slate";
import { LINK } from "../type";
import { logger } from "../../../../../../../../../common/util/logger";

/**
 * We only allows links where the selection contains either a single existing
 * link element or consecutive text elements, with the same parent element.
 * @param editor
 */
export const isValidLinkSelection = (editor) => {
  const currentSelection = editor.selection;
  if (!currentSelection || currentSelection === null) {
    return false;
  }
  const iterator = Editor.nodes(editor, {
    at: currentSelection,
    match: (node) => Text.isText(node) && Node.string(node).length > 0 || node.type === LINK,
  });
  if (iterator) {
    let parentPath;
    let linkElements = 0;
    for (const [node, path] of iterator) {
      if (!parentPath) {
        if (Text.isText(node) && path && path.length > 0) {
          parentPath = Path.parent(path);
        }
      }
      if (Text.isText(node)) {
        if (!path || path.length === 0 || !Path.equals(Path.parent(path), parentPath)) {
          logger.debug(`Goes across different elements`);
          return false;
        }
      } else if (node.type === LINK) {
        linkElements++;
      }
    }
    if (linkElements > 1) {
      return false;
    }
  }
  return true;
};
