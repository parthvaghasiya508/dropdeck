import {
  deserializeHTMLToBreak,
  deserializeHTMLToElement,
  deserializeHTMLToFragment,
  deserializeHTMLToMarks,
  deserializeHTMLToText,
} from '@udecode/slate-plugins';
import { unpack } from "./transforms/unpack";
import { ensureChildNode } from "../transforms/ensureChildNode";
import { PARAGRAPH } from "../../component/paragraph/type";
import { removeHTMLTags } from "./transforms/removeHTMLTags";

// deserializeHTMLToDocumentFragment
export const htmlDeserialize = (plugins) => {
  const unpackElement = unpack(plugins);
  return (node) => {
    // text node
    const textNode = deserializeHTMLToText(node);
    if (textNode) return removeHTMLTags(textNode);

    // if not an element node
    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    // break line
    const breakLine = deserializeHTMLToBreak(node);
    if (breakLine) return { type: PARAGRAPH, children: [{ text: '' }] }; // empty text node

    const { nodeName } = node;
    let parent = node;

    // blockquote
    if (nodeName === 'PRE' && node.childNodes[0]?.nodeName === 'CODE') {
      [parent] = node.childNodes;
    }

    const children = Array.from(parent.childNodes)
      .map(htmlDeserialize(plugins))
      .flat();

    const el = node;

    // body
    const fragment = deserializeHTMLToFragment({ el, children });
    if (fragment) return fragment;

    // element
    const element = deserializeHTMLToElement({ plugins, el, children });
    const unpackedElement = ensureChildNode(unpackElement(element));
    if (unpackedElement) return unpackedElement;

    // mark
    const texts = deserializeHTMLToMarks({
      plugins,
      el,
      children,
    });
    if (texts) return texts;

    return children;
  };
};
