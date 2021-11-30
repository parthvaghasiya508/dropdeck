import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import React from "react";
import Content from "./Content";
import Colors from "../../../../Colors";

const EditorCommandsContent = () => (
  <Content>
    <div className="contentWrapper">
      <div className="description">
        <h5>WORKFLOW<EmojiObjectsIcon/></h5>
        <h2>Try starting with a <span style={{ color: Colors.primary(), fontWeight: "bolder", display: "inline-block", padding: "3px 8px 3px 8px", borderRadius: 3, backgroundColor: Colors.light.base.low, marginLeft: 2 }}>/</span></h2>
        <p style={{ fontWeight: 700 }}>Your guide to what&apos;s possible!</p>
        <p>In the editor, starting with a <code style={{ color: Colors.primary(), display: "inline", fontWeight: "bold" }}>&ldquo;/&rdquo;</code> (forward slash) gives you all sorts of components you can use in your slides. Use the <strong>cursor keys</strong> to select the one you want, hit <strong>Enter</strong> and you&apos;re on your way.</p>
      </div>
      <div className="imgOuter slash" />
    </div>
  </Content>
);
export default EditorCommandsContent;
