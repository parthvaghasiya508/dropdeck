import { Node } from "slate";
import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { linesToParagraphs } from "../../../../../../transforms/linesToParagraphs";

export class HeadingOneSlideComponent extends SlideComponent {
  constructor({ node }) {
    super();
    this.setHtml(<h1>{linesToParagraphs(Node.string(node))}</h1>);
  }
}
