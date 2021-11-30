import { Node } from "slate";
import { SLIDE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/slide/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";

const emptyParagraph = (node) => (
  (node.type === PARAGRAPH || node.type === HEADING_ONE || node.type === HEADING_TWO) && Node.string(node).length === 0
);

/**
 * Compute a string representation of the structure of a slide (a list of components).
 *
 * @param slideNode a slide Slate node
 */
export const slideStructure = (slideNode, includeEmpty = false) => {
  if (!slideNode || slideNode.type !== SLIDE) {
    return '';
  }
  const nodes = includeEmpty ? slideNode.children : slideNode.children.filter((node) => !emptyParagraph(node));
  return nodes.map((node) => node.type);
};
