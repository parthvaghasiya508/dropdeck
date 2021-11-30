import React from "react";
import HelpIcon from "@material-ui/icons/Help";
import Content from "./Content";

const HelpdeskContent = () => (
  <Content>
    <div className="contentWrapper">
      <div className="description">
        <h5>SUPPORT<HelpIcon/></h5>
        <h2>We're here to help</h2>
        <p>Get in touch with our support team at any time, or check out our knowledge base by hitting the <span className="fauxicon">?</span> help icon on any page.
        </p>
      </div>
      <div className="imgOuter helpdesk" />
    </div>
  </Content>
);
export default HelpdeskContent;
