import Chip from "@material-ui/core/Chip";
import { FiberManualRecord, Language } from "@material-ui/icons";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import React, { useState } from "react";
import Colors from "../../../../../../Colors";
import { BigPanelButton } from "../../../../../api/sdk/preview/PanelComponents";
import ConfirmationButton from "../../../../ConfirmationButton";
import Popup from "../../../../popup/Popup/Popup";
import LiveDataManager from "../../../LiveDataManager";
import DatabaseIcon from "./DatabaseIcon";

const StatusIcon = ({ active }) => <FiberManualRecord style={{ position: "absolute", top: 4, right: 0, height: 16, color: active ? Colors.secondary() : "transparent" }}/>;

const DataSourcePickerComponent = ({ dataSource, pathClickHandler, index, cols = 2 }) => {

  const [inUse, setInUse] = useState(LiveDataManager.instance.isInUse(dataSource._id));

  const getIcon = () => {
    if (dataSource.name === "Jokes") return <EmojiEmotionsIcon/>;

    switch (dataSource.type) {
      case "web-service-plugin":
        return <Language/>;
      default:
        return <DatabaseIcon/>;
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const getAlignment = () => {
    if (index === 0 || index % cols === 0) {
      return "bottom-start";
    }
    if (index % cols === cols - 1) {
      return "bottom-end";
    }
    return "bottom";
  };

  const clickPath = (path) => {
    setInUse(true);
    pathClickHandler(dataSource, path);
  };

  return (
    <div key={`type-select-${dataSource._id}`} style={{ display: "inline-block", position: "relative" }}>
      <BigPanelButton onClick={handleClick} key={`type-select-button-${dataSource._id}`} style={{
        width: 187,
        margin: 5,
        height: 98,
        paddingTop: 6,
        paddingBottom: 6
      }} variant="outlined" icon={getIcon()}>
        {inUse ? (<StatusIcon active/>) : null}
        {dataSource.name}
      </BigPanelButton>
      <Popup key={`type-select-popup-${dataSource._id}`} anchor={anchorEl} setAnchor={setAnchorEl} open={open} defaultPlacement={getAlignment()} color="rgb(45, 45, 45)" width={355} style={{ padding: 14, borderRadius: 4, minHeight: 70, minWidth: 356 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "100%" }}>
            {dataSource && dataSource.paths ? Object.entries(dataSource.paths).map((path) => <Chip key={`data-source-path-${dataSource._id}-${path[0]}`} onClick={() => clickPath(path)} color="secondary" variant="outlined" style={{ margin: 5 }} label={path[1].name}/>) : null}
          </div>

          <ConfirmationButton onConfirm={() => {
            LiveDataManager.instance.delete(dataSource._id);
            setInUse(false);
          }} size="small"/>
        </div>
      </Popup>
    </div>
  );
};
export default DataSourcePickerComponent;
