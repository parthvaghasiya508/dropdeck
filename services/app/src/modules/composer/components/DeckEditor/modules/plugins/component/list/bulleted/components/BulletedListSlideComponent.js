import React from "react";
import { BULLETED_LIST } from "../type";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { ListMarkupGenerator } from "../../components/ListMarkupGenerator";

export class BulletedListSlideComponent extends SlideComponent {
  constructor({ node }) {
    super();
    this.setHtml(new ListMarkupGenerator(BULLETED_LIST, node.settings).listMarkup(node));
  }
}
