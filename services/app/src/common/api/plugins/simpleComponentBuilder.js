/**
 * Default component builder that defines an empty block component with the given type.
 */
export const simpleComponentBuilder = (type) => (...entries) => {
  if (entries === undefined || entries === null || entries.length === 0) {
    entries = [''];
  } else if (!Array.isArray(entries)) {
    entries = [entries];
  }
  const children = entries.map((entry) => {
    if (entry.text) {
      return entry;
    }
    return typeof entry === 'string' ? { text: entry } : entry;
  });
  return {
    type,
    children,
  };
};
