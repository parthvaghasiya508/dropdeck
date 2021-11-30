/**
 * Create a link to Google fonts.
 *
 * @param family
 * @param weights
 * @returns {string}
 * @constructor
 */
export const Font = (family, ...weights) => `https://fonts.googleapis.com/css2?family=${family.replace(" ", "+")}:wght@${weights.join(";")}&display=auto`;
