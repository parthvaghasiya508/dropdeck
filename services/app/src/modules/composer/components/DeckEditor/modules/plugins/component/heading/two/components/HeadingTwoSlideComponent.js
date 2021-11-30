import { Node } from "slate";
import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { linesToParagraphs } from "../../../../../../transforms/linesToParagraphs";

export class HeadingTwoSlideComponent extends SlideComponent {
  constructor({ node }) {
    super();
    this.setHtml(<h2>{linesToParagraphs(Node.string(node))}</h2>);
  }
}
