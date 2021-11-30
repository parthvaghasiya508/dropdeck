import { Node, Path, Range } from "slate";
import { SelectionTransforms } from "./SelectionTransforms";
import { COMPONENT_IN_SLIDE_DEPTH, SlideTransforms } from "./SlideTransforms";
import { COMPONENT_IN_GROUP_DEPTH, GroupTransforms } from "./GroupTransforms";

/**
 * Queries to identify relative elements within a node container, which is either a slide or a group container.
 */
export const ContainerTransforms = {

  /**
   * Returns the [node, path] of the container element (either a group or a slide) which encompasses
   * the component element identified by the path.
   */
  getContainer(editor, path) {
    if (path.length === COMPONENT_IN_SLIDE_DEPTH) {
      return SlideTransforms.getSlide(editor, path);
    }
    if (path.length === COMPONENT_IN_GROUP_DEPTH) {
      return GroupTransforms.getGroup(editor, path);
    }
  },

  /**
   * Returns the [node, path] of the current container element (either a group or a slide).
   */
  currentContainer(editor) {
    const [node, path] = SelectionTransforms.componentElement(editor);
    if (path && node) {
      return this.getContainer(editor, path);
    }
    return [undefined, undefined];
  },

  /**
   * Returns the the root ancestor of the currently selected node, within the same container: slide or group.
   * When offset is specified, we jump to a successor ancestor (offset > 0) or predecessor ancestor (offset < 0).
   *
   * @param editor Slate editor.
   */
  containerAncestor(editor, offset = 0) {
    const { selection } = editor;
    if (selection !== undefined && selection !== null && Range.isRange(selection)) {
      const { path } = Range.start(selection);
      const currentAncestorPath = SelectionTransforms.componentElementAncestorPath(editor, path);
      if (currentAncestorPath !== undefined && currentAncestorPath.length > 1 && (currentAncestorPath[currentAncestorPath.length - 1] + offset) >= 0) {
        const ancestorPath = [...currentAncestorPath];
        const indexOffset = ancestorPath[ancestorPath.length - 1] + offset;
        ancestorPath[ancestorPath.length - 1] = indexOffset;
        const container = Node.get(editor, Path.parent(currentAncestorPath));
        if (container && container.children.length > indexOffset) {
          return [Node.get(editor, ancestorPath), ancestorPath];
        }
      }
    }
    return [undefined, undefined];
  },

  /**
   * Returns the predecessor sibling of the root ancestor of the currently selected node, within the same slide.
   *
   * @param editor Slate editor.
   */
  previousContainerAncestor(editor) {
    return this.containerAncestor(editor, -1);
  },

  /**
   * Returns the successor sibling of the root ancestor of the currently selected node, within the same slide.
   *
   * @param editor Slate editor.
   */
  nextContainerAncestor(editor) {
    return this.containerAncestor(editor, 1);
  },

};
