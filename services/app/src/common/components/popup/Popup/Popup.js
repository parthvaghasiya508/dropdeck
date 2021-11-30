import useMutationObserver from "@rooks/use-mutation-observer";
import React, { useCallback, useRef, useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/styles";
import { animated, config, useSpring } from 'react-spring';
import { useAttributeMutationObserver } from "../../../util/UseAttributeMutationObserver";

const getSurroundStyling = (theme, inset) => {
  if (theme.dark()) {
    if (inset) {
      return ({
        boxShadow: 'inset 0px 0px 1px 1px rgba(29,30,32,0.85), inset 0px 2px 1px 0px rgba(29,30,32,0.75)'
      });
    }

    return ({
      boxShadow: 'rgba(29,30,32,0.8) 0px 2px 5px 0px, inset rgb(50,50,52) 1px 1px 0px 0px, inset rgb(50,50,52) -1px -1px 0px 0px'
    });
  }

  // Light Mode inset
  if (inset) {
    return ({
      boxShadow: 'inset 0px 0px 1px 1px rgba(29,30,32,0.1), inset 0px 2px 2px 0px rgba(29,30,32,0.1)',
    });
  }

  // Light Mode
  return ({
    boxShadow: 'rgb(0 10 20 / 15%) 0px 0px 15px, rgb(0 10 20 / 10%) 0px 0px 1px 1px',
  });
};

const useStylesByColor = (color, inset, arrowLeft) => makeStyles((theme) => ({
  popper: {
    zIndex: 10000,
    marginTop: 10,
    marginBottom: 10,
    bottom: "100% !important",
    '&[x-placement*="top"]': {
      transform: "translateY(-280px)",
      width: "100%",
    },
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: inset ? -4 : '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color || theme.palette.popover.chevron} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: arrowLeft,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color || theme.palette.popover.chevron} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color || theme.palette.popover.chevron} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color || theme.palette.popover.chevron}`,
      },
    },
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  animatedDiv: {
    // use 'color' if there is one, otherwise use values stated
    // background: theme.dark() ? color || 'rgba(38,39,40,0.9)' : color || 'rgba(38,39,40,0.9)',
    background: theme.dark() ? color || 'rgba(38,39,40,0.9)' : 'rgba(255,255,255,0.965)',
    backdropFilter: 'blur(10px)',
    ...getSurroundStyling(theme, inset)
  },
}), { meta: 'Popup' });

const Popup = ({
  arrowStyle,
  persistent = false,
  inset,
  disableFlip = false,
  disablePortal = false,
  defaultPlacement = "top",
  style,
  children,
  anchor,
  setAnchor,
  open,
  onClose,
  width = 274,
  instant = true,
  color,
  arrowLeft = "0"
}) => {

  const getTransformOrigin = (placement) => {
    switch (placement) {
      case "left":
        return "right";
      case "right":
        return "left";
      case "bottom":
        return "top";
      case "bottom-start":
        return "top";
      case "bottom-end":
        return "top";
      case "top":
        return "top";
      default:
        return "bottom";
    }
  };

  const [placement, setPlacement] = useState();
  const [arrow, setArrow] = useState(null);
  const useStyles = useCallback(useStylesByColor(color, inset, arrowLeft), [color, inset, arrowLeft]);
  const classes = useStyles();
  const springProps = useSpring({
    transform: open ? 'scale(1, 1)' : `scale(${placement === "left" || placement === "right" ? "0.4,0.8" : "0.8,0.4"})`,
    transformOrigin: getTransformOrigin(placement),
    config: config.stiff
  });

  const contentProps = !instant ? springProps : {};

  const close = () => {
    if (!persistent) {
      if (onClose) {
        onClose();
      }
      setAnchor(null);
    }
  };

  const ref = useRef();
  useAttributeMutationObserver(ref, (target, mutation) => {
    setAnchor(null);
  }, "style", "display", "none");

  return (
    <Popper disablePortal={disablePortal} open={open} anchorEl={anchor} transition={!instant} placement={defaultPlacement} popperOptions={{
      onCreate: (state) => {
        setPlacement(state.placement);
        contentProps.transformOrigin = getTransformOrigin(placement);
      }
    }} className={classes.popper} modifiers={{
      flip: {
        enabled: !disableFlip,
      },
      preventOverflow: {
        enabled: !disablePortal && !disableFlip,
        boundariesElement: 'scrollParent',
      },
      hide: {
        enabled: false
      },
      arrow: {
        enabled: true,
        element: arrow,
      }
    }}>

      <ClickAwayListener onClickAway={close}>
        <animated.div ref={ref} className={`${classes.animatedDiv} remix`} style={{
          width,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          padding: 1,
          borderRadius: 6,
          ...contentProps,
          ...style
        }}>

          {children}

          <span ref={setArrow} className={classes.arrow} style={arrowStyle}/>
        </animated.div>
      </ClickAwayListener>
    </Popper>
  );
};
export default Popup;
