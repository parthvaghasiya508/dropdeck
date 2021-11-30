export const Objects = {

  /**
   * Returns a new object which is the union of a and b (key-wise), recursively.
   */
  union(a, b) {
    if (a) {
      if (b) {
        if (this.isObject(a) && this.isObject(b)) {
          const target = { ...a };
          Object.keys(b).forEach((bKey) => {
            target[bKey] = target[bKey] ? this.union(target[bKey], b[bKey]) : b[bKey];
          });
          return target;
        }
        return a; // when either or both are not objects?
      }
      return a;
    }
    return b || {};
  },

  isObject(val) {
    if (val === null) { return false; }
    return ((typeof val === 'function') || (typeof val === 'object'));
  },

  fastClone(a) {
    return a ? JSON.parse(JSON.stringify(a)) : a;
  }

};
