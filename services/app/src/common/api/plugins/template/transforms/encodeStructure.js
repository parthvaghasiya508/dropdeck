/**
 * Compute a string encoding of an array of component types.
 */
export const encodeStructure = (types) => `^${types.join('#')}`;
