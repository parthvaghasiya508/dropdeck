import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import React from "react";
import Content from "./Content";

const EditorCommandsContent = () => (
  <Content>
    <div className="contentWrapper">
      <div className="description">
        <h5>WORKFLOW<EmojiObjectsIcon/></h5>
        <h2>Instant Components</h2>
        <p>Already know what you need? On a new line, try typing commands like:</p>
        <dl>
          <dd><code>new</code></dd>
          <dt>Create a new slide</dt>
          <dd><code>title</code></dd>
          <dt>Add a heading</dt>
          <dd><code>bullets</code></dd>
          <dt>Add a bullet list</dt>
          {/* <dd><code>chart</code></dd>
          <dt>Add e.g. a pie chart</dt> */}
          <dd><code>logos</code></dd>
          <dt>Add a logo gallery</dt>
        </dl>
      </div>
      <div className="imgOuter commands" />
    </div>
  </Content>
);
export default EditorCommandsContent;
