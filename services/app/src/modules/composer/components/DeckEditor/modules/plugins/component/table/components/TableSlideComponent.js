import React from "react";
import ReactHtmlParser from "react-html-parser";
import SlideComponent from "../../../../../../../../../common/slide/SlideComponent";
import { toHtml } from "../../../../../../../../../common/slide/transforms/toHtml";
import { TableType } from "../type";

const tableMarkup = (node) => {
  const rows = node.children;
  return (
    <table>
      {
        rows.length > 0 && (<thead>{rowMarkup(rows[0], 0)}</thead>)
      }
      {
        rows.length > 1 && (
          <tbody>{rows.slice(1).map((n, i) => rowMarkup(n, i + 1))}</tbody>
        )
      }
    </table>
  );
};

const rowMarkup = (node, row) => <tr key={`row-${row}`}>{node.children.map((n, c) => cellMarkup(n, row, c))}</tr>;

const cellMarkup = (node, row, col) => {
  if (node.type === TableType.HEAD || row === 0) {
    return <th key={`header-(${row}, ${col})`}>{ ReactHtmlParser(node.children.map((n) => toHtml(n)).join('')) }&nbsp;</th>;

  }
  return <td key={`cell-(${row}, ${col})`}>{ ReactHtmlParser(node.children.map((n) => toHtml(n)).join('')) }&nbsp;</td>;
};

export class TableSlideComponent extends SlideComponent {
  constructor({ node }) {
    super();
    this.setHtml(tableMarkup(node));
  }
}
