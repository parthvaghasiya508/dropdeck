import { renderLeafEmphasis } from "./renderLeafEmphasis";

/**
 * Enables support for inline text emphasis.
 */
export const EmphasisPlugin = () => ({
  renderLeaf: renderLeafEmphasis(),
});
