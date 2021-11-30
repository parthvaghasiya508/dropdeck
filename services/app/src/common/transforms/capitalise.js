// Capitalise the first character of a word.
export const capitalise = (string) => (
  string !== undefined && string !== null && string.length > 0 ?
    string.replace(/^\w/, (c) => c.toUpperCase()) : string
);
