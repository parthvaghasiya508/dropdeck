// Trigger the current selection.
import { SuggestedMatch } from "../SuggestedMatch";

export const triggerSuggestion = (editor, setMatch, newPromptSession, resetPromptSession) => (match, event) => {
  const { target, index } = match;
  const suggestions = match.suggestions();
  if (suggestions[index]) {
    if (event) {
      event.preventDefault();
    }
    const { link, component } = suggestions[index];
    if (link) {
      window.open(
        link,
        '_blank',
      );
      setMatch(new SuggestedMatch({}));
    } else {
      editor.insertComponent(component, target, newPromptSession, resetPromptSession);
      match.target = null;
      match.focus = null;
      match.anchor = null;
      setMatch(new SuggestedMatch(match));
    }
  }
};
