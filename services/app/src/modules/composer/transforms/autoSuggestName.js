// Suggest a new deck name based on the user's input.
export const autoSuggestName = (editor, setSuggestName, extractName, changeDeckName) => (name, suggestName) => {
  const nameSet = name !== undefined;
  if (!nameSet && suggestName) {
    setSuggestName(false);
    const suggestedName = extractName(editor);
    if (suggestedName && suggestedName.length > 0) {
      changeDeckName(suggestedName, false);
    }
  }
};
