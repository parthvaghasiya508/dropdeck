import React from "react";
import { BigPanelButton } from "../../../../../api/sdk/preview/PanelComponents";

/**
 * Show a data source type in a panel.
 *
 * @param plugin
 * @param selectedPlugin
 * @param handleClick
 * @returns {JSX.Element}
 * @constructor
 */
const DataSourceTypeButton = ({ plugin, selectedPlugin, handleClick }) => (
  <BigPanelButton variant="outlined" onClick={() => handleClick(plugin)} icon={plugin.icon} selected={selectedPlugin === plugin} style={{
    borderStyle: "dashed",
    width: 187,
    margin: 5,
    height: 98,
    paddingTop: 6,
    paddingBottom: 6
  }}>
    {plugin.name}
  </BigPanelButton>
);
export default DataSourceTypeButton;
