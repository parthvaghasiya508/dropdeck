export const Sets = {

  /**
   * Computes the union of sets a and b.
   */
  union(a, b) {
    if (a) {
      if (b) {
        return new Set([...a, ...b]);
      }
      return a;
    }
    return b || new Set();
  },

  /**
   * Computes the intersection of sets a and b.
   */
  intersection(a, b) {
    if (a) {
      if (b) {
        return new Set([...a].filter((x) => b.has(x)));
      }
      return a;
    }
    return b || new Set();
  }

};
