import React from "react";
import { Text } from "slate";
import { InlineMath } from 'react-katex';
import ReactDOMServer from "react-dom/server";
import { linesToParagraphs } from "./linesToParagraphs";
import {
  BOLD,
  CODE_MARK,
  EMPHASIS,
  ITALIC,
  MATH_MARK,
  STRIKETHROUGH,
  UNDERLINE
} from "../../../modules/composer/components/DeckEditor/modules/plugins/component/marks/Marks";
import 'katex/dist/katex.min.css';
import { CODE } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/code/type";
import { HEADING_ONE } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { BLOCK_QUOTE } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";
import { LINK } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/link/type";
import { formatLinkUrl } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/link/queries/formatLinkUrl";

export const toHtml = (node) => {
  if (Text.isText(node)) {
    let text = linesToParagraphs(node.text);
    if (node[BOLD]) {
      text = <strong>{text}</strong>;
    }
    if (node[ITALIC]) {
      text = <em>{text}</em>;
    }
    if (node[UNDERLINE]) {
      text = <u>{text}</u>;
    }
    if (node[CODE_MARK]) {
      text = <span className="inlineCode">{text}</span>;
    }
    if (node[EMPHASIS]) {
      text = <span className="emphasis">{text}</span>;
    }
    if (node[STRIKETHROUGH]) {
      text = <span style={{ textDecoration: 'line-through' }}>{text}</span>;
    }
    if (node[MATH_MARK]) {
      text = <InlineMath>{ node.text }</InlineMath>;
    }
    return ReactDOMServer.renderToStaticMarkup(text);
  }

  const children = node.children ? node.children.map((n) => toHtml(n)).join('') : null;
  switch (node.type) {
    case BLOCK_QUOTE:
      return `<blockquote><p>${children}</p></blockquote>`;
    case PARAGRAPH:
      return `<p>${children}</p>`;
    case LINK:
      return `<a href="${formatLinkUrl(node.url)}" target="_blank">${children}</a>`;
    case HEADING_ONE:
      return `<h1>${children}</h1>`;
    case HEADING_TWO:
      return `<h2>${children}</h2>`;
    case CODE:
      return `<code>${children}</code>`;
    default:
      return children;
  }
};
