import { renderLeafMath } from "./renderLeafMath";

/**
 * Enables support for inline code formatting.
 */
export const InlineMathPlugin = () => ({
  renderLeaf: renderLeafMath(),
  // deserialize: deserializeCode(),
});
