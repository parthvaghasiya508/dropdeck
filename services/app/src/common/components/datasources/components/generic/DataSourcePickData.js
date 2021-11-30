import { Refresh } from "@material-ui/icons";
import React from "react";
import { PanelButton, PanelStep } from "../../../../api/sdk/preview/PanelComponents";
import ConfirmationButton from "../../../ConfirmationButton";
import JSONView from "./components/JSONView";

const DataSourcePickData = ({ data, fetch, selectedData, setSelectedData, expanded, setExpanded, disabled, cancel, save }) => (
  <PanelStep title="Choose Data to Use" step={3} expanded={expanded} disabled={disabled} onChange={() => setExpanded(!expanded)} defaultExpanded={false}>

    <JSONView json={data} selectedData={selectedData} setSelectedData={setSelectedData}/>

    <PanelButton onClick={fetch} style={{ margin: 10 }}>
      <Refresh style={{ marginRight: 10 }}/>
      Refresh
    </PanelButton>

    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <ConfirmationButton style={{ marginRight: 5 }} onConfirm={cancel} size="medium"/>
      <PanelButton color="secondary" onClick={save}>
        Save
      </PanelButton>
    </div>
  </PanelStep>
);
export default DataSourcePickData;
