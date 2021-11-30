import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { useTheme } from "@material-ui/styles";

import ColorPicker from "../../../modules/presenter/components/Lightbox/components/SlidePanel/components/ColorPickerComponent/ColorPicker";
import GenericButton from "../buttons/GenericButton";
import GenericButtonGroup from "../buttons/GenericButtonGroup";

const ColorPickerComponent = ({ colors, colorType, setCurColor, onChangeComplete, onClickDone, close, setChangedFinished }) => {
  const [color, setColor] = useState(colors[colorType]);
  const theme = useTheme();

  useEffect(() => (() => {
    setChangedFinished(true);
  }), []);

  const onChange = (c) => {
    setColor(c);
  };

  const handleChangeComplete = (c) => {
    setCurColor(c.hex);
  };

  const revert = () => {
    setColor(colors[colorType]);
    setCurColor(colors[colorType]);
  };

  const revertAndCancel = () => {
    revert();
    close();
  };

  const isChanged = () => color !== colors[colorType];

  const onChangeCompleteDebounced = debounce(handleChangeComplete, 500);

  return (
    <div style={{ padding: "20px" }}>
      <ColorPicker color={color} onChange={onChange} onChangeComplete={onChangeCompleteDebounced}/>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px 0px 20px" }}>
        <div>
          <GenericButton onClick={revert} disabled={!isChanged()} style={{ marginLeft: theme.spacing(1) }}>
            Revert
          </GenericButton>
        </div>
        <GenericButtonGroup>
          <GenericButton onClick={revertAndCancel} >
            Cancel
          </GenericButton>
          <GenericButton primary onClick={onClickDone} >
            Done
          </GenericButton>
        </GenericButtonGroup>
      </div>
    </div>
  );
};

export default ColorPickerComponent;
