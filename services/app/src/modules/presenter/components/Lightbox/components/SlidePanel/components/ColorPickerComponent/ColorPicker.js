import React, { useCallback, useRef } from "react";
import useDimensions from "react-cool-dimensions";
import { makeStyles } from "@material-ui/styles";
import tinycolor from "tinycolor2";
import { EditableInput, Hue, Saturation } from "react-color/lib/components/common";
import { CustomPicker } from "react-color";
import IconButton from "@material-ui/core/IconButton";

const styles = () => makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
    "& label": {
      display: "none"
    }
  },
  hash: {
    background: "transparent",
    border: `1px solid ${theme.palette.popover.label}33`,
    height: '30px',
    width: '30px',
    borderRadius: '4px 0 0 4px',
    float: 'left',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    display: "inline-block",
    border: 0,
    "& input": {
      width: 80,
      background: "transparent",
      border: `1px solid ${theme.palette.popover.label}33`,
      fontFamily: '"Fira Code"',
      borderLeft: 0,
      textAlign: "center",
      fontSize: 14,
      color: '#666',
      outline: 'none',
      height: '28px',
      boxSizing: 'content-box',
      borderRadius: '0 4px 4px 0',
      "&:focus": {
        background: `${theme.palette.popover.label}11`,
        color: '#FFF',
      },
    },
  },
  picker: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.67), 0 2px 4px 0 rgba(0, 0, 0, 0.67)',
  },
  inputs: {
    [theme.breakpoints.down('sm')]: {
      display: "none",
    }
  },
  color: {
    border: "1px solid #141414",
    margin: 2,
    height: 20,
    width: 20,
    borderRadius: 20,
    transform: "scale(1)",
    transition: "transform 300ms ease",
    "&:hover ": {
      transform: "scale(1.1)",
      transition: "transform 300ms ease"
    }
  }
}));
const ColorPicker = ({ colors, rgb, hex, hsv, hsl, onChange }) => {

  const { ref, width } = useDimensions();
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  const SaturationPointer = () => <div className={classes.picker} style={{ background: "transparent", border: `6px solid ${hex}`, transform: 'translate(-15px, -15px)', }}> </div>;
  const HuePointer = () => <div className={classes.picker} style={{ background: "transparent", border: `6px solid #${tinycolor({ h: hsl.h, l: 0.5, s: 1, a: 1 }).toHex()}`, transform: 'translate(-10px, -15px)', }}> </div>;

  const handleChange = (data, e) => {
    if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: 'rgb',
      }, e);
    }
  };

  return (
    <div ref={ref} className={classes.root} style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", width: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <div style={{
          marginLeft: 18,
          height: 180,
          flexGrow: 1,
          position: "relative",
          borderRadius: 6
        }}>
          <Saturation
            {...{ radius: 5 }}
            pointer={SaturationPointer}
            onChange={onChange}
            hsl={hsl}
            hsv={hsv}
          />
        </div>
        {colors ? (
          <div style={{ marginLeft: 18, marginTop: 8, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            { colors.map((c) => (
              <IconButton
                key={`color-well-${c}`}
                onClick={() => onChange(c)}
                className={classes.color} style={{ backgroundColor: c }}/>
            ))}
          </div>
        ) : null}
      </div>
      <div style={{
        position: "relative",
        marginLeft: 18,
        marginTop: 12,
        height: 150,
        width: 10,
        borderRadius: 6
      }}>
        <Hue
          {...{ radius: 5 }}
          direction="vertical"
          pointer={HuePointer}
          onChange={onChange}
          hsl={hsl}
        />
      </div>

      {width > 280 ? (
        <div className={classes.inputs} style={{ marginLeft: 18, marginTop: 12 }}>
          <div style={{ marginBottom: 16, whiteSpace: "nowrap" }}>
            <div className={classes.hash}>#</div>
            <div className={classes.input}>
              <EditableInput
                onChange={onChange}
                label="hex"
                value={hex.replace("#", "")}
              />
            </div>
          </div>

          <div style={{ marginBottom: 4, whiteSpace: "nowrap" }}>
            <div className={classes.hash}>R</div>
            <div className={classes.input}>
              <EditableInput
                onChange={handleChange}
                label="r"
                value={rgb.r}
              />
            </div>
          </div>

          <div style={{ marginBottom: 4, whiteSpace: "nowrap" }}>
            <div className={classes.hash}>G</div>
            <div className={classes.input}>
              <EditableInput
                onChange={handleChange}
                label="g"
                value={rgb.g}
              />
            </div>
          </div>

          <div style={{ marginBottom: 4, whiteSpace: "nowrap" }}>
            <div className={classes.hash}>B</div>
            <div className={classes.input}>
              <EditableInput
                onChange={handleChange}
                label="b"
                value={rgb.b}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default CustomPicker(ColorPicker);
