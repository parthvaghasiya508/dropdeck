import { Editor, Node, Path, Range, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { COMPONENT_IN_SLIDE_DEPTH } from "../services/transforms/SlideTransforms";
import { COMPONENT_IN_GROUP_DEPTH } from "../services/transforms/GroupTransforms";

/**
 * Workaround for the issue of triple-clicking an element selecting the subsequent component.
 * See further here: https://github.com/ianstormtaylor/slate/issues/3871
 */
export const handleMultiClicks = (editor) => (event) => {

  // Double click: If clicking at the end of a text block, we
  // stop the editor from selecting into the next component.
  if (event.detail === 2) {
    const { selection } = editor;
    if (selection && selection !== null) {
      if (Range.isCollapsed(selection)) {
        const end = Range.end(selection);
        if (end) {
          const { offset, path } = end;
          const leaf = Node.leaf(editor, path);
          if (offset && leaf && offset >= Node.string(leaf).length) {
            event.preventDefault();
            event.stopPropagation();
          }
        }
      }
    }
  }

  // Triple click should select the current component, if not void.
  if (event.detail && event.detail === 3) {

    const { selection } = editor;
    if (selection && selection !== null) {
      const [node, path] = Editor.node(editor, selection);
      if (node && path) {
        if (!editor.isVoid(node)) {
          const parentPath = Path.parent(path);
          if (parentPath && (parentPath.length === COMPONENT_IN_SLIDE_DEPTH || parentPath.length === COMPONENT_IN_GROUP_DEPTH)) {
            Transforms.select(editor, parentPath);
            ReactEditor.focus(editor);
          }
        }
      }
    }
    event.preventDefault();
    event.stopPropagation();
  }
};
