import { withStyles } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

export const ZoomSlider = withStyles({
  root: {
    marginTop: 5,
    height: 3,
    padding: '13px 0',
    // width: 125,
    color: "#bbb"
  },
  thumb: {
    fontSize: "0.7em",
    fontWeight: 700,
    color: "#888888",
    height: 20,
    width: 20,
    backgroundColor: '#f8f8f8',
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    // border: '1px solid #bbb',
    marginTop: -10,
    marginLeft: -10,
    '&:focus, &:hover, &$active': {
      boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    }
  },
  mark: {
    backgroundColor: '#888888',
    height: 6,
    width: 6,
    marginTop: -2,
    borderRadius: 4,
    opacity: 0.38
  },
  markActive: {
    opacity: 1,
  },
  active: {

  }
})(Slider);
