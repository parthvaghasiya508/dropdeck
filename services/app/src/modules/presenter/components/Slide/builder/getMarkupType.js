export const getMarkupType = (markup) => (
  Array.isArray(markup.type) && markup.type.length > 0 ? markup.type[0] : markup.type
);
