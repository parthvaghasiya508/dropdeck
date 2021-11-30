import { deserializeCode } from "@udecode/slate-plugins";
import { renderLeafCode } from "./renderLeafCode";

/**
 * Enables support for inline code formatting.
 */
export const InlineCodePlugin = () => ({
  renderLeaf: renderLeafCode(),
  deserialize: deserializeCode(),
});
