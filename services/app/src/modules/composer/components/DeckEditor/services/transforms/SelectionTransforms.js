import { Editor, Node, Path, Range } from "slate";
import { ReactEditor } from "slate-react";
import { logger } from '../../../../../../common/util/logger';
import { GROUP } from "../../modules/plugins/component/groups/components/group/type";
import { COMPONENT_IN_SLIDE_DEPTH } from "./SlideTransforms";
import { COMPONENT_IN_GROUP_DEPTH } from "./GroupTransforms";
import { GROUP_COLLECTION } from "../../modules/plugins/component/groups/type";

export const SelectionTransforms = {

  /**
   * Given a path to a node on a slide, returns the path to its component element ancestor.
   *
   * @param editor Slate editor
   * @param path
   * @returns {*[]|undefined}
   */
  componentElementAncestorPath(editor, path) {
    if (!path || path.length < 2) {
      return undefined;
    }
    const ancestorPath = [path[0], path[1]];
    const [node] = Editor.node(editor, ancestorPath);
    if (node && node.type === GROUP_COLLECTION) {
      if (path.length >= COMPONENT_IN_GROUP_DEPTH) {
        return [path[0], path[1], path[2], path[3]];
      }
      return undefined;
    }
    return ancestorPath;
  },

  /**
   * Returns the path of the active component-plugin element on a slide or in a group container.
   *
   * @param editor
   * @returns {*[]|undefined}
   */
  componentElementPath(editor) {
    const { selection } = editor;
    if (selection && Range.isRange(selection)) {
      const { focus } = selection;
      const { path } = focus;
      if (Path.isPath(path) && path.length >= 2) {
        return this.componentElementAncestorPath(editor, path);
      }
    }
    return undefined;
  },

  /**
   * Given a path to a node on a slide, returns the path to its slide element ancestor.
   *
   * @param editor Slate editor
   * @param path
   * @returns {*[]|undefined}
   */
  slideElementAncestor(editor, path) {
    if (!path || path.length < 2) {
      return [undefined, undefined];
    }
    const ancestorPath = [path[0], path[1]];
    return Editor.node(editor, ancestorPath);
  },
  /**
   * Returns whether the path points to a top-level component node".
   *
   * @param path
   */
  isSlideElementPath(path) {
    return path && path.length === COMPONENT_IN_SLIDE_DEPTH;
  },

  /**
   * Returns whether the path points to a component-plugin element, either at the
   * top of the slide or in a cluster.
   *
   * @param path
   */
  isComponentElementPath(editor, path) {
    if (path) {
      // Elements contained in a slide
      if (path.length === COMPONENT_IN_SLIDE_DEPTH) {
        if (editor && editor !== null) {
          const [node] = Editor.node(editor, path);
          return (node && node.type !== GROUP_COLLECTION);
        }
        return true; // todo don't do this
      }

      // Check if the element is contained in a group.
      if (editor && editor !== null && path.length === COMPONENT_IN_GROUP_DEPTH) {
        const [parentNode] = Editor.node(editor, [path[0], path[1], path[2]]);
        return (parentNode && parentNode.type === GROUP);
      }
    }
    return false;
  },

  /**
   * Returns the active component-plugin element on a slide or in a group container.
   *
   * @param editor
   * @returns {*[]|undefined}
   */
  componentElement(editor) {
    const path = this.componentElementPath(editor);
    if (path) {
      try {
        return Editor.node(editor, path);
      } catch (e) {
        // error when looking up element?
      }
    }
    return [undefined, undefined];
  },

  /**
   * Returns the currently selected container node -- element -- (and its path) in the editor instance. When the current
   * selection state is invalid, the method returns "undefined'.
   *
   * @param editor Slate editor.
   * @deprecated
   */
  activeElement(editor) {
    const { selection } = editor;
    if (selection !== undefined && selection !== null) {
      let selectionPath;
      if (Path.isPath(selection)) {
        selectionPath = selection;
      } else if (Range.isRange(selection) && Range.start(selection).path) {
        selectionPath = Range.start(selection).path;
      }
      const node = Node.parent(editor, selectionPath);
      const path = Path.parent(selectionPath);
      return [node, path];
    }
    return [undefined, undefined];
  },

  /**
   * Returns the currently selected container node -- element -- in the editor instance. When the current selection state
   * is invalid, the method returns "undefined'.
   *
   * @param editor Slate editor.
   * @deprecated
   */
  activeElementNode(editor) {
    const { selection } = editor;
    return selection !== undefined && selection !== null && Range.isRange(selection) && Range.start(selection).path
      ? Node.parent(editor, Range.start(selection).path) : undefined;
  },

  /**
   * Returns the path of the currently selected container node -- element -- in the editor instance. When
   * the current selection state is invalid, the method returns "undefined'.
   *
   * @param editor Slate editor.
   * @deprecated
   */
  activeElementPath(editor) {
    const { selection } = editor;
    return selection !== undefined && selection !== null && Range.isRange(selection) && Range.start(selection).path
      ? Path.parent(Range.start(selection).path) : undefined;
  },

  /**
   * Returns the currently selected node in the editor instance. When the current selection state
   * is invalid, the method returns "undefined'.
   *
   * @param editor Slate editor.
   * @deprecated
   */
  activeNode(editor) {
    try {
      const [node,] = Editor.node(editor, editor.selection);
      return node;
    } catch (e) {
      return undefined;
    }
  },

  /**
   * Return the path to the currently selected node.
   *
   * @param editor
   * @returns {Path}
   */
  currentSelectionPath(editor) {
    const { selection } = editor;
    return selection !== undefined && selection !== null && Range.isRange(selection) ? Range.start(selection).path : [];
  },

  /**
   * Tells whether the active node is a nested element or not.
   *
   * @param editor
   * @deprecated
   * @returns {boolean}
   */
  isCurrentSelectionNested(editor) {
    const currentSelectionPath = SelectionTransforms.currentSelectionPath(editor);
    if (!currentSelectionPath) {
      return false;
    }
    if (currentSelectionPath.length <= 2) {
      return false;
    }
    let containerNesting = 0;
    const node = SelectionTransforms.slideElementAncestor(currentSelectionPath);
    if (node && node.type === GROUP_COLLECTION) {
      containerNesting = 2;
    }
    return SelectionTransforms.currentSelectionPath(editor).length > 3 + containerNesting;
  },

  isSelected(editor, nodeOrPath) {
    const path = Path.isPath(nodeOrPath) ? nodeOrPath : ReactEditor.findPath(editor, nodeOrPath);
    const { selection } = editor;
    if (Range.isRange(selection) && path !== undefined && path.length > 0) {
      return Range.includes(selection, path);
    }
    return false;
  },

  isClicked(editor, node) {
    const path = ReactEditor.findPath(editor, node);
    const { selection } = editor;
    if (Range.isRange(selection) && Path.equals(selection.anchor.path, selection.focus.path) && path !== undefined && path.length > 0) {
      const start = Range.start(selection);
      return start && start.path && Path.isDescendant(start.path, path);
    }
    return false;
  },

  atFirstPosition(editor) {
    const { selection } = editor;
    if (Range.isRange(selection)) {
      const [start,] = Range.edges(selection);
      // todo this logic is shoddy - it's just testing whether we're on a [0, 0, ...] path
      return start.offset === 0 && start.path.reduce((total, n) => total + n, 0) === 0;
    }
    return false;
  },

  /**
   * Given a node, identify the path and offset of the last leaf in that node's tree.
   */
  endOf(editor, node) {
    const lastPath = (path, node) => {
      if (!node) {
        return { path, offset: 0 };
      }
      if (node.children && node.children.length) {
        const idx = node.children.length - 1;
        return lastPath([...path, idx], node.children[idx]);
      }
      return { path, offset: editor.isVoid(node) ? 0 : Node.string(node).length };
    };
    return lastPath([], node);
  },

  /**
   * Get the Location at the end of the leaf node at a location.
   */
  lastLocation(editor, at) {
    try {
      const [node, path] = Editor.last(editor, at);
      if (node !== undefined && node.text !== undefined && path !== undefined) {
        return { path, offset: node.text.length };
      }
    } catch (e) {
      logger.error(e);
    }

    return undefined;
  },

};
