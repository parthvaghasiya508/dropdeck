import React from "react";
import ImageIcon from "@material-ui/icons/Image";
import Content from "./Content";

const ImageCommandsContent = () => (
  <Content>
    <div className="contentWrapper">
      <div className="description">
        <h5>IMAGES<ImageIcon/></h5>
        <h2>Add Pictures</h2>
        <p>Start typing <code style={{ display: "inline", fontWeight: "bold" }}>"picture"</code> to search over a million, free-to-use images. Use the <strong>cursor keys</strong> to choose and <strong>Enter</strong> to add to the current slide.</p>
        <p>You can also drag and drop!</p>
      </div>
      <div className="imgOuter picture" />
    </div>
  </Content>
);
export default ImageCommandsContent;
