export const getHoverPath = (evt, path, sequence) => {
  if (path && Array.isArray(path) && path.length > 1) {
    // Ensure that the path we end up using reflects the accurate slide index.
    const focusPath = [...path];
  
    // If we hover on an element in a sequence, we need to identify which of the sequence children is being hovered,
    // since we can't put a hover listeners on each one directly.
    if (sequence !== undefined) { // path should be > 1 because it should be an element
      const sequenceElements = sequence.children || [];
      const { currentTarget, target } = evt;
      if (target && currentTarget && currentTarget.children) {
        const { children } = currentTarget;
        if (children.length > 0) {
          for (let i = 0; i < children.length; i++) {
            if (children[i].contains(target)) {
              if (sequenceElements.length > i && sequenceElements[i].path) {
                return sequenceElements[i].path;
              }
            }
          }
        }
      }
      return; // works when we don't find the element being hovered
    }

    return focusPath;
  }
};
