import { Node, Path, Range } from "slate";
import { SLIDE } from "../../modules/plugins/component/slide/type";
import { GROUP } from "../../modules/plugins/component/groups/components/group/type";

export const PathTransforms = {

  /**
   * Returns the predecessor sibling of the given node. If the node doesn't have any predecessor
   * siblings, this method returns "undefined".
   *
   * @param editor Slate editor.
   */
  previousSibling(editor, at) {
    const { selection } = editor;
    if (at === undefined) {
      at = selection;
    }
    if (at !== undefined && at !== null && Range.isRange(at) && Range.start(at).path) {
      const parentPath = Path.parent(Range.start(at).path);
      if (Path.isPath(parentPath) && parentPath.length > 0 && parentPath[parentPath.length - 1] > 0) {
        return Node.get(editor, Path.previous(parentPath));
      }
    }
    return undefined;
  },

  /**
   * Returns the parent of the currently selected node in the editor instance. When the current selection state is
   * invalid, or it doesn't have a parent, the method returns "undefined'.
   *
   * @param editor Slate editor.
   */
  parentOfCurrentElement(editor) {
    const { selection } = editor;
    return selection !== undefined && selection !== null && Range.isRange(selection) && Range.start(selection).path
    && Path.parent(Range.start(selection).path)
      ? Node.parent(editor, Path.parent(Range.start(selection).path)) : undefined;
  },

  /**
   * Determines whether the current element is nested (i.e. not a top-level container in a slide).
   *
   * @param editor
   * @returns {boolean}
   */
  isCurrentElementNested(editor) {
    const parentElement = this.parentOfCurrentElement(editor);
    return parentElement !== undefined && parentElement.type !== undefined && parentElement.type !== SLIDE && parentElement.type !== GROUP;
  }

};
