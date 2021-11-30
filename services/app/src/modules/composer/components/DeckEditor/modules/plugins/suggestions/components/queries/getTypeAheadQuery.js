import { Editor, Node, Path, Range, Text } from "slate";
import { EditorTransforms } from "../../../../../services/transforms/EditorTransforms";
import { hasActivePrompt } from "../../../../prompt/transforms/hasActivePrompt";
import { showSuggestionsForNode } from "../../onKeyDownSuggestionsMenu";

export const getTypeAheadQuery = (editor, promptSession) => {
  const { selection } = editor;
  if (selection && Range.isRange(selection) && Range.isCollapsed(selection)) {
    const activeElement = EditorTransforms.activeElementNode(editor);
    const activeElementPath = EditorTransforms.activeElementPath(editor);
    if (activeElement && activeElementPath && !hasActivePrompt(activeElement, activeElementPath, promptSession)) {
      return typeAheadQuery(editor);
    }
    return {};
  }
  return undefined;
};

/**
 * Determine the search term to use to search for suggested keywords, to trigger components.
 * Returns a pair of { search, target } which includes the string to search with and the Slate
 * location (Range element) that highlights that search string.
 *
 * @param editor
 * @returns {{search: string | string, target: {anchor: {path: number[], offset: number}, focus: {path: number[], offset: number}}}}
 */
const typeAheadQuery = (editor) => {
  const { selection } = editor;
  const focus = selection && selection.focus ? selection.focus : {
    path: [0, 0],
    offset: 0
  };
  const anchor = {
    path: focus.path,
    offset: 0
  }; // note that this won't necessarily work for a right-to-left language
  const target = {
    anchor,
    focus
  };

  const currentNode = Node.get(editor, focus.path);
  const parentNode = Node.parent(editor, focus.path);
  const parentPath = Path.parent(focus.path);

  // We only show suggestions in text nodes at the beginning of a text block (that is, the text node
  // has to be the first child of a text block).
  const validNode = currentNode && Text.isText(currentNode) && focus.path[focus.path.length - 1] === 0;
  const validFocus = validNode && parentNode && parentNode.type && showSuggestionsForNode(editor, parentNode, parentPath);
  const search = validFocus ? Editor.string(editor, target) : '';
  return {
    search,
    target,
    currentNode: parentNode
  };
};
