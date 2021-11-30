import React from "react";
import ReactHtmlParser from "react-html-parser";
import { BULLETED_LIST } from "../bulleted/type";
import { toHtml } from "../../../../../../../../../common/slide/transforms/toHtml";

export class ListMarkupGenerator {
  constructor(type, settings = {}) {
    this.type = type;
    this.settings = settings;
  }

  listMarkup = (node) => {
    const listItems = node.children;
    const className = this.settings?.display ? `display-${this.settings?.display}` : '';
    if (this.type === BULLETED_LIST) {
      return listItems.length > 0 ? (
        <ul data-length={listItems.length} className={className}>
          {
            listItems.map((item, i) => this.listItemMarkup(item, i))
          }
        </ul>
      ) : null;
    }
    return listItems.length > 0 ? (
      <ol data-length={listItems.length} className={className}>
        {
          listItems.map((item, i) => this.listItemMarkup(item, i))
        }
      </ol>
    ) : null;
  };

  listItemMarkup = (node, index) => (<li key={`item-${index}`}>{node.children.map((n) => this.itemMarkup(n))}</li>);

  itemMarkup = (node) => {
    if (node.type === this.type) {
      return this.listMarkup(node);
    }
    return ReactHtmlParser(toHtml(node));
  };

}
