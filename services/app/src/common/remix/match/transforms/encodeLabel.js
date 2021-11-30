/**
 * Hyphen case to camel case.
 */
export const encodeLabel = (label) => label.replace(/(-\w)/g, (m) => m[1].toUpperCase());

/**
 * Camel case to hyphen case.
 */
export const decodeLabel = (enc) => enc.replace(/[\w]([A-Z])/g, (m) => `${m[0]}-${m[1]}`).toLowerCase();
