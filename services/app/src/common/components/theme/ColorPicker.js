import React, { useState, useCallback, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckIcon from "@material-ui/icons/Check";
import Popup from "../popup/Popup";
import ColorPickerComponent from "./ColorPickerComponent";

const styles = (mini, setLogoBackgroundColor) => makeStyles((theme) => ({
  root: {
    marginLeft: mini ? 0 : 20,
    marginRight: mini ? 0 : 20,
    position: "relative",
  },
  container: {
    padding: mini ? 0 : 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  colorWell: {
    display: "inline-block",
    margin: mini ? 5 : 10,
    borderRadius: 40,
    height: mini ? 10 : 40,
    width: mini ? 10 : 40,
  },
  color: {
    minWidth: mini ? 10 : 40,
    margin: '0px 0px 0px 10px',
    "& .label": {
      padding: 12,
      color: theme.palette.text.primary,
      fontSize: "0.8em"
    }
  },
  button: {
    cursor: setLogoBackgroundColor ? "pointer" : "default",
    height: mini ? 10 : 40,
    width: mini ? 10 : 40,
    border: `1px solid rgba(0,0,0,0.075)`,
    transform: "scale(1,1)",
    transition: "transform 200ms ease",
    "&:hover": {
      transform: setLogoBackgroundColor ? "scale(1.2,1.2)" : "none",
      transition: "transform 200ms ease"
    }
  }
}), { meta: 'ColorPicker' });

const ColorPicker = ({
  colors, logoBackgroundColor, setLogoBackgroundColor, mini = false, onChangeBrandingColors, enableToEdit = true,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [brandColors, setBrandColors] = useState({ accent: "#fff", dark: "#000", light: "#fff" });
  const [curColor, setCurColor] = useState("");
  const [colorType, setColorType] = useState(0);
  const [width, setWidth] = useState();
  const [arrowOffset, setArrowOffset] = useState();
  const [changedFinished, setChangedFinished] = useState(false);
  const o = Boolean(anchorEl);

  const colorPickerRef = useRef();
  const iconRefFirst = useRef();
  const iconRefSecond = useRef();
  const iconRefThird = useRef();

  const useStyles = useCallback(styles(mini, setLogoBackgroundColor), [mini, setLogoBackgroundColor]);
  const classes = useStyles();

  const onClick = (color, colorType, iconRef) => {
    setColorType(colorType);
    setAnchorEl(true);

    if (iconRef.current) setArrowOffset(iconRef.current.offsetLeft + 10);

    if (setLogoBackgroundColor) {
      if (color === logoBackgroundColor) {
        setLogoBackgroundColor(undefined, colorType);
      } else {
        setLogoBackgroundColor(color, colorType);
      }
    }
  };

  useEffect(() => {
    if (colors) {
      setBrandColors(colors);
    }
  }, [colors]);

  useEffect(() => {
    if (curColor) {
      setBrandColors({ ...brandColors, [colorType]: curColor });
    }
  }, [curColor]);

  useEffect(() => {
    if (changedFinished) {
      setChangedFinished(false);
      if (onChangeBrandingColors &&
        (brandColors.accent !== colors?.accent || brandColors.dark !== colors?.dark || brandColors.light !== colors?.light)) {
        onChangeBrandingColors(brandColors);
      }
    }
  }, [brandColors, changedFinished]);

  const handleClickDone = () => {
    setAnchorEl(null);
  };

  const Icon = mini ? CheckIcon : CheckCircleIcon;

  const getColorComponent = (color, colorType, iconRef) => (
    <div className={classes.color}>
      <IconButton ref={iconRef} className={classes.button} style={{ backgroundColor: brandColors[colorType] }} onClick={() => onClick(color, colorType, iconRef)}>
        <Icon style={{ color: color === logoBackgroundColor ? color === "#ffffff" ? "#000" : "#fff" : brandColors[colorType], height: mini ? "0.5em" : "1em" }}/>
      </IconButton>
      { !mini && <div className="label">{color}</div> }
    </div>
  );

  return (
    <div className={classes.root} ref={colorPickerRef}>
      {
        enableToEdit && (
          <Popup disableFlip disablePortal instant anchor={anchorEl} setAnchor={setAnchorEl} defaultPlacement="top" open={o}
            style={{ width }} arrowLeft={`${arrowOffset}px`}>
            <ColorPickerComponent
              colors={brandColors}
              colorType={colorType}
              setCurColor={setCurColor}
              close={() => setAnchorEl(null)}
              setChangedFinished={setChangedFinished}
              onClickDone={handleClickDone}
            />
          </Popup>
        )
      }
      <div className={classes.container}>
        {getColorComponent(colors ? colors.accent : "#000", "accent", iconRefFirst)}
        {getColorComponent(colors ? colors.dark : "#000", "dark", iconRefSecond)}
        {getColorComponent(colors ? colors.light : "#FFF", "light", iconRefThird)}
      </div>
    </div>
  );
};
export default ColorPicker;
