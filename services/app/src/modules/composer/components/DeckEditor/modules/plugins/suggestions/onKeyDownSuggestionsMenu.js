/**
 * Handle key-down events.
 */
import { SelectionTransforms as EditorTransforms } from "../../../services/transforms/SelectionTransforms";
import { SuggestedMatch } from "./SuggestedMatch";
import { CODE } from "../component/code/type";
import { HEADING_ONE, TITLE } from "../component/heading/one/type";
import { HEADING_TWO } from "../component/heading/two/type";
import { MATH } from "../component/math/type";
import { BLOCK_QUOTE } from "../component/quote/type";
import { PARAGRAPH } from "../component/paragraph/type";

export const showSuggestionsForNode = (editor, node, path) => EditorTransforms.isComponentElementPath(editor, path) && (
  node.type === PARAGRAPH ||
  node.type === TITLE ||
  node.type === BLOCK_QUOTE ||
  node.type === MATH ||
  node.type === CODE ||
  node.type === HEADING_ONE ||
  node.type === HEADING_TWO
);

export const onKeyDownSuggestionsMenu = (match, setMatch, onSuggestionTrigger) => (event, editor) => {
  const { index } = match;
  const suggestions = match.suggestions();
  if (match.isActive()) {
    const selectedNode = EditorTransforms.activeElementNode(editor);
    const selectedNodePath = EditorTransforms.activeElementPath(editor);

    // Only trigger suggestions in simple text nodes: paragraph or a heading.
    if (selectedNode && showSuggestionsForNode(editor, selectedNode, selectedNodePath)) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          const prevIndex = (index + 1) % suggestions.length; // wrap around the list of suggestions
          match.index = prevIndex;
          setMatch(new SuggestedMatch(match));
          break;
        case 'ArrowUp':
          event.preventDefault();
          const nextIndex = (index - 1 + suggestions.length) % suggestions.length; // wrap around the list of suggestions
          match.index = nextIndex;
          setMatch(new SuggestedMatch(match));
          break;
        case 'Tab':
          event.stopPropagation();
          event.preventDefault();
          onSuggestionTrigger(match, event);
          break;
        case 'Enter':
          event.stopPropagation();
          event.preventDefault();
          onSuggestionTrigger(match, event);
          break;
        case 'Escape':
          match.reset();
          setMatch(new SuggestedMatch(match));
          break;
        default:
          break;
      }
    }
  }
};
