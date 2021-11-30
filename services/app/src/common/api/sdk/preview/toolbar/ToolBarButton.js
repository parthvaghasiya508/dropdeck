import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useRouteMatch, generatePath } from "react-router-dom";
import { ClickAwayListener, IconButton } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { Close } from "@material-ui/icons";
import Popup from "../../../../components/popup/Popup/Popup";

const styles = () => makeStyles((theme) => ({
  root: {
    "&.selected": {
      backgroundColor: theme.palette.background.elev03,
      paddingRight: 8,
      paddingLeft: 3,
      marginLeft: -3,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      "& button": {
        "&:hover": {
          background: 'transparent',
        },
      },
      "&:hover button": {
        transform: "scale(1)",
      },
    },
  },
  button: {
    padding: '7px',
    margin: '5px 0',
    opacity: 1,
    transition: "all 300ms ease",
    position: 'relative',
    color: theme.palette.icon.primary,
    "& svg": {
      transform: "scale(1)",
    },
    "&.image": {
      opacity: 0.7,
    },
    "&:hover": {
      opacity: 1,
      transform: "scale(1.1)",
      background: theme.palette.icon.secondaryHoverBg,
      "&.image": {
        background: theme.palette.icon.secondaryHoverBg,
      },
      "& svg": {
        transform: "scale(1)",
        fill: theme.palette.icon.primaryHover,
      },
    },
  },
  disabled: {
    opacity: 0.2
  },
  drawer: {
    width: 0
  },
  drawerPaper: {
    border: 0,
    backgroundColor: theme.palette.background.elev03,
  }
}), { meta: 'ToolbarButton' });

const ToolBarButton = ({
  icon,
  children,
  placement,
  image,
  disabled,
  drawer,
  view
}) => {

  const buttonRef = useRef();
  const history = useHistory();
  const route = useRouteMatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [transitionDuration, setTransitionDuration] = useState(undefined);

  const handleClick = (event) => {
    if (view) {
      setTransitionDuration(undefined);
      if (!anchorEl && route.params.view !== view) {
        const path = generatePath(route.path, {
          id: route.params.id,
          view
        });
        history.push(path);
      } else {
        const path = generatePath(route.path, {
          id: route.params.id,
          view: null
        });
        history.push(path);
      }
    }
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const close = () => {
    if (open && view) {
      const path = generatePath(route.path, {
        id: route.params.id,
        view: null
      });
      history.push(path);
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    // Open relevant drawer if view parameter is in the url path
    if (view && route.params.view === view && !anchorEl) {
      setTransitionDuration(0);
      setAnchorEl(buttonRef);
    } else if (view && route.params.view !== view) {
      setAnchorEl(null);
    }
  }, [view, route]);

  const buttonStyles = useCallback(styles(), []);
  const classes = buttonStyles();

  return (
    <>
      <ClickAwayListener onClickAway={close}>
        <div>
          <div className={`${classes.root} ${open && drawer ? "selected" : ""}`}>
            <IconButton ref={buttonRef} onClick={handleClick} className={`${classes.button}${image ? " image" : ""}`} classes={{ disabled: classes.disabled }} disabled={disabled}>
              {icon || <img src={image} alt="button" height={24}/>}
            </IconButton>
          </div>
          <div>
            {drawer ? (
              <Drawer
                className={classes.drawer}
                variant="persistent"
                open={open}
                style={{ width: open ? 500 : 0 }}
                transitionDuration={transitionDuration}
                classes={{
                  paper: classes.drawerPaper,
                }}
                anchor="right">

                <div style={{ width: 460 }}>
                  <IconButton onClick={close} style={{ position: "absolute", right: 16, top: 16 }}><Close/></IconButton>
                  <div style={{ padding: 5, }}>
                    {children}
                  </div>
                </div>

              </Drawer>
            ) : (
              <Popup anchor={anchorEl} setAnchor={setAnchorEl} open={open} defaultPlacement={placement === "left" ? "left" : "bottom"}>
                {children}
              </Popup>
            )}
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
};
export default ToolBarButton;
