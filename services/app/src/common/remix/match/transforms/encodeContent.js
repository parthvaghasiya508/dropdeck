import { TYPE_CLUSTER, TYPE_NODE, TYPE_SEQUENCE } from "../../../slide/transforms/clustering/Types";
import { IMAGE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { BULLETED_LIST } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { BLOCK_QUOTE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { LIST_ITEM } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/type";
import { PARAGRAPH } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

const mapping = {
  [HEADING_ONE]: 'h1',
  [HEADING_TWO]: 'h2',
  [PARAGRAPH]: 'p',
  [BULLETED_LIST]: 'ul',
  [NUMBERED_LIST]: 'ol',
  [BLOCK_QUOTE]: 'quote',
  [LIST_ITEM]: 'li',
  [IMAGE]: 'img',
};

export const componentCode = (c) => {
  let type = c.type ? c.type : c;
  if (Array.isArray(type) && type.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    type = type[0];
  }
  return mapping[type] || type;
};

export const encodeComponent = (c, index) => `[${componentCode(c)}#${index}]`;

/**
 * Encode a clustered slide structure as a string.
 */
export const encodeContent = (nodes, depth = 0) => nodes.map((node, i) => {
  switch (node.kind) {
    case TYPE_CLUSTER:
      return `{${encodeContent(node.children, depth + 1)}#${node.index}}`;
    case TYPE_SEQUENCE:
      return encodeContent(node.children);
    case TYPE_NODE:
      return encodeComponent(node, node.index);
    default:
      return '';
  }
}).join('');

const decodingExpression = new RegExp(/#[0-9]+/g);
/**
 * Reverses the encoding scheme and returns a list of indices found in the encoded string,
 * with the index referencing the original index of the encoding.
 */
export const extractIndices = (str) => str.match(decodingExpression).map((enc) => enc.substring(1));
