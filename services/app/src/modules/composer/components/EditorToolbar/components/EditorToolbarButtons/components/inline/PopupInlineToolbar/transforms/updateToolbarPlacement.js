import { ReactEditor } from "slate-react";
import { Editor, Node, Path, Range } from "slate";
import { EditorTransforms } from "../../../../../../../DeckEditor/services/transforms/EditorTransforms";
import SelectionReference from "../../../../../../../DeckEditor/utils/SelectionReference";

export const updateToolbarPlacement = (editor, setPlacement, setAnchorEl) => {
  const { anchor, focus } = editor.selection;
  const [node, path] = Editor.node(editor, focus);
  if (!node || path.length < 2) {
    return;
  }

  // If the focus is on a void node we don't show the formatting menu.
  // const componentPath = EditorTransforms.isContainerElement(path) ? path : path.slice(0, 2);
  // const [componentNode] = Editor.node(editor, componentPath);
  // if (!componentNode || Editor.isVoid(editor, componentNode)) {
  //   return;
  // }
  const spansMultipleNodes = Path.compare(focus.path, anchor.path) !== 0;
  const backwardRange = Range.isBackward(editor.selection);
  const focusNodeSelection = spansMultipleNodes ? {
    anchor: {
      path: focus.path,
      offset: backwardRange ? Node.string(node).length : 0,
    },
    focus,
  } : editor.selection;

  // Place menu at the bottom when spanning multiple nodes
  // and not a backwards range (i.e. focus is on an element further
  // down in the direction of the document):
  if (!backwardRange && spansMultipleNodes) {
    setPlacement("bottom");
  } else {
    setPlacement("top");
  }
  const domRange = ReactEditor.toDOMRange(editor, focusNodeSelection);
  if (!domRange) {
    return;
  }
  setAnchorEl(new SelectionReference(domRange));
};
