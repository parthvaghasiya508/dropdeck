import { makeStyles } from "@material-ui/styles";
import React from "react";
import { BigPanelButton, PanelStep } from "../../../../api/sdk/preview/PanelComponents";
import DataSourceTypeButton from "./components/DataSourceTypeButton";

const DataSourceTypeSelect = ({ plugins, expanded, setExpanded, plugin, setPlugin }) => {

  const handleClick = (selected) => {
    if (plugin === selected) {
      setPlugin(undefined);
    } else {
      setPlugin(selected);
    }
  };

  return (
    <PanelStep title="Select Type" step={1} complete={plugin !== undefined} expanded={expanded} onChange={() => setExpanded(!expanded)} defaultExpanded>
      <div>
        {plugins ? plugins.map((p) => (
          <DataSourceTypeButton key={`type-select-${p.id}`} plugin={p} selectedPlugin={plugin} handleClick={handleClick}/>
        )) : null}
      </div>
    </PanelStep>
  );
};
export default DataSourceTypeSelect;
