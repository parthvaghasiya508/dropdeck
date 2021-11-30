import { Node } from "slate";
import React from "react";
import SlideComponent from "../../../../../../../../../common/slide/SlideComponent";
import { linesToParagraphs } from "../../../../../transforms/linesToParagraphs";

export class BlockQuoteSlideComponent extends SlideComponent {
  constructor({ node }) {
    super();
    this.setHtml(<blockquote><p>{linesToParagraphs(Node.string(node))}</p></blockquote>);
  }
}
