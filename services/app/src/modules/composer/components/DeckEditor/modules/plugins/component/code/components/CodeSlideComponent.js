import { Node } from "slate";
import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SlideComponent from "../../../../../../../../../common/slide/SlideComponent";
import "./CodeSlideComponent.css";

/**
 * React component to display code.
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const Code = ({ code }) => (
  <SyntaxHighlighter showLineNumbers={false}
    wrapLines
    showInlineLineNumbers={false}
    wrapLongLines language="auto" style={monokai}
    customStyle={{ tabSize: 2, padding: 0, background: "transparent" }} className="codeBlock">
    {code}
  </SyntaxHighlighter>
);

export class CodeSlideComponent extends SlideComponent {

  constructor({ node }) {
    super();
    // this.setHtml(<Code>{linesToParagraphs(Node.string(node))}</Code>);
    this.setHtml(<Code code={Node.string(node)}/>);
  }
}
