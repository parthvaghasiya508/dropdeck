import { Editor, Path, Range, Transforms } from "slate";
import { SelectionTransforms } from "./SelectionTransforms";
import { GROUP } from "../../modules/plugins/component/groups/components/group/type";
import { GROUP_COLLECTION } from "../../modules/plugins/component/groups/type";
import { getComponentElements } from "../../modules/plugins/component/toggleType/getComponentElements";

/* The depth of the path to a component contained in a group */
export const COMPONENT_IN_GROUP_DEPTH = 4;

/* The depth of the path to a group in a collection */
export const GROUP_IN_COLLECTION_DEPTH = 3;

export const GroupTransforms = {

  /**
   * Returns the [node, path] of the current group container element, if any.
   */
  currentGroup(editor) {
    const [node, path] = SelectionTransforms.componentElement(editor);
    if (node && path) {
      return this.getGroup(editor, path);
    }
    return [undefined, undefined];
  },

  /**
   * Returns the [node, path] of the group container element which contains the given path.
   */
  getGroup(editor, path) {
    if (path) {
      const [parentNode, parentPath] = Editor.node(editor, Path.parent(path));
      if (parentNode && parentNode.type === GROUP) {
        return [parentNode, parentPath];
      }
    }
    return [undefined, undefined];
  },

  /**
   * Returns the [node, path] of the current group container element, if any.
   */
  getGroupCollection(editor, at) {
    let path = at;
    if (!path) {
      [, path] = SelectionTransforms.componentElement(editor);
    }
    if (path) {
      const [groupCollectionNode, groupCollectionPath] = SelectionTransforms.slideElementAncestor(editor, path);
      if (groupCollectionNode && groupCollectionNode.type === GROUP_COLLECTION) {
        return [groupCollectionNode, groupCollectionPath];
      }
    }
    return [undefined, undefined];
  },

  groupCount(editor, at) {
    const [groupCollectionNode] = GroupTransforms.getGroupCollection(editor, at);
    if (groupCollectionNode && groupCollectionNode.children) {
      return groupCollectionNode.children.length;
    }
    return -1;
  },

  /**
   * Move all slide-level components in the current selection to a new group in a new collection.
   * If the current selection contains collections or groups, we do nothing.
   *
   * @param editor
   */
  moveToCollection(editor) {
    if (!editor.selection || editor.selection === null) {
      return;
    }
    const elements = getComponentElements(editor);
    if (elements) {
      elements.forEach(([node, path]) => {
        // check that this is OK
      });
      Editor.withoutNormalizing(editor, () => {
        Transforms.wrapNodes(editor, { type: GROUP }, { select: true });
        const { selection } = editor;
        const { path } = Range.start(selection);
        const [, groupPath] = SelectionTransforms.slideElementAncestor(editor, path);
        Transforms.wrapNodes(editor, { type: GROUP_COLLECTION }, { select: true, at: groupPath });
      });
    }
  },
};
