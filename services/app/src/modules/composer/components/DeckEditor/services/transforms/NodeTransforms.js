import { Editor, Node, Path, Text, Transforms } from "slate";
import { SlideTransforms } from "./SlideTransforms";
import { logger } from "../../../../../../common/util/logger";
import { SelectionTransforms } from "./SelectionTransforms";
import { SLIDE } from "../../modules/plugins/component/slide/type";
import { HEADING_ONE } from "../../modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../modules/plugins/component/paragraph/type";
import { ContainerTransforms } from "./ContainerTransforms";

export const NodeTransforms = {

  /**
   * Find the first non-empty text node in the editor.
   *
   * @param node
   */
  firstText(editor, excludedPath) {
    // eslint-disable-next-line no-unused-vars
    for (const [node, path] of Node.texts(editor)) {
      if (!excludedPath || !Path.isDescendant(path, excludedPath)) {
        if (Node.string(node).length > 0) {
          return Node.string(node);
        }
      }
    }
    return undefined;
  },

  isEmpty(editor, emptyNodeMatch) {
    if (editor.children.length === 0) return true;
    if (editor.children.length === 1) {
      if (editor.children[0].type === SLIDE) {
        const slide = editor.children[0];
        return SlideTransforms.isSlideEmpty(editor, slide, emptyNodeMatch);
      }
      logger.warn(`The root of the editor tree is not a slide (type ${editor.children[0].type} - this should never happen.`);
      return editor.children.length === 1 && this.isNodeEmpty(editor, editor.children[0]);
    }
    return false;
  },

  isNodeEmpty(editor, node) {
    return Node.string(node).length === 0; // || editor.isVoid(node)
  },

  isTextNode(node) {
    return node && node.type && (node.type === PARAGRAPH || node.type === HEADING_ONE || node.type === HEADING_TWO);
  },

  /**
   * We define the *size* of a tree as the number of leaves it contains.
   *
   * @param node node to traverse.
   */
  size(node) {
    if (node === undefined) {
      return 0;
    }
    if (Text.isText(node)) {
      return 1;
    }
    if (node.children !== undefined && node.children.length > 0) {
      let count = 0;
      node.children.forEach((child) => {
        count += this.size(child);
      });
      return count;
    }
    return 0;
  },

  /**
   * Swap the two elements given by the two paths. The assumption is that both elements point to top-level
   * "container" elements.
   *
   * @todo support swapping elements from within clusters
   *
   * @param editor editor instance.
   * @param path1 path to the first node.
   * @param path2 path to the second node.
   */
  swap(editor, path1, path2) {
    if (path1 && SelectionTransforms.isComponentElementPath(editor, path1) && path2 && SelectionTransforms.isComponentElementPath(editor, path2)) {
      if (Path.equals(path1, path2)) {
        return;
      }

      const [, containerPath1] = ContainerTransforms.getContainer(editor, path1);
      const [, containerPath2] = ContainerTransforms.getContainer(editor, path2);

      if (!containerPath1 || !containerPath2) {
        return;
      }

      const withinSameContainer = Path.equals(containerPath1, containerPath2);
      if (withinSameContainer) {

        // Moving within the same container, so we start by sorting the two paths, to ensure we always move "down":
        // const sorted = path1[1] < path2[1];
        const sorted = Path.isBefore(path1, path2);
        const p1 = sorted ? path1 : path2;
        const p2 = sorted ? path2 : path1;

        // After moving p1 to p2 DOWN* (we guarantee that, above), the node at p2 will be shifted one element UP,
        // which we need to account for.
        const newP2 = [...p2];
        newP2[newP2.length - 1]--; // compat: p2[p2.length - 1] > 0
        Editor.withoutNormalizing(editor, () => {
          Transforms.moveNodes(editor, { at: p1, to: p2, mode: "all", voids: true });
          Transforms.moveNodes(editor, { at: newP2, to: p1, mode: "all", voids: true });
        });

      } else {

        // If we are moving elements between containers, we don't have to worry about relative
        // positioning and direction of the swap. The element that was originally at path2
        // will be shifted down one position, as we've added a new element to the container.
        const newPath2 = [...path2];
        newPath2[newPath2.length - 1]++; // down by one element

        Editor.withoutNormalizing(editor, () => {
          Transforms.moveNodes(editor, { at: path1, to: path2, mode: "all", voids: true });
          Transforms.moveNodes(editor, { at: newPath2, to: path1, mode: "all", voids: true });
        });
      }
    }
  }
};
