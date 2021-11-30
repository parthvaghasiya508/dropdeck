import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { ListMarkupGenerator } from "../../components/ListMarkupGenerator";
import { NUMBERED_LIST } from "../type";

export class NumberedListSlideComponent extends SlideComponent {
  constructor({ node }) {
    super();
    this.setHtml(new ListMarkupGenerator(NUMBERED_LIST, node.settings).listMarkup(node));
  }
}
