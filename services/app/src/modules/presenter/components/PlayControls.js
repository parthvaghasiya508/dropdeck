import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ShareIcon from "@material-ui/icons/Share";
import React from 'react';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, MoreVert } from "@material-ui/icons";
import { ClickAwayListener, Divider } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Label from "../../../common/components/controls/Label";
import { getSharingLink } from "../../composer/components/PreviewSection/components/sharing/Sharing";

const styles = (theme) => ({

  root: {
    display: "flex",
    textAlign: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 'fit-content',
    bottom: -100,
    transition: "bottom 500ms ease",
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    opacity: "0.8",
    borderRadius: 40,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(0,0,0,0.65)",
    boxShadow: '0px 2px 4px rgba(0,0,0,0.35)',
    "&:hover": {
      background: "rgba(0,0,0,0.7)"
    }
  },
  button: {
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: "#000",
    color: "rgba(255, 255, 255, 0.5)",
    margin: 10,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.35)',
    "&:hover": {
      color: "rgba(255, 255, 255, 0.9)",
      backgroundColor: "#000",
      opacity: 0.95,
      boxShadow: '0px 3px 5px rgba(0,0,0,0.7)',
    }
  },
  text: {
    color: "rgba(255, 255, 255, 0.5)",
    "& em": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: 8,
      padding: "2px 8px 2px 8px",
      color: "#000",
      fontWeight: "bold",
      fontStyle: "normal",
      marginRight: 2
    }
  }

});

/**
 * Controls for the {@link Play}. Has to be a HOC so I can manipulate the state externally!
 *
 */
export class PlayControls extends React.Component {

  constructor(props) {
    super(props);
    this.exit = props.exit;
    this.playerControls = props.playerControls;
    this.state = { fullscreen: false };
    this.controls = React.createRef();
    this.hider = null;
  }

  hide = () => {
    if (this.controls && this.controls.current) {
      this.controls.current.style.bottom = "-100px";
    }
  };

  show = (temporary) => {
    clearTimeout(this.hider);
    if (!this.fullscreenElement()) {
      this.setState({ fullscreen: false });
    } else {
      this.setState({ fullscreen: true });
    }
    if (temporary) {
      this.hider = setTimeout(() => {
        this.hide();
      }, 1500);
    }
    setTimeout(() => {
      if (this.controls && this.controls.current) {
        this.controls.current.style.bottom = "3%";
      }
    }, 500);

  };

  fullscreenElement = () => document.fullscreenElement
      || document.webkitFullscreenElement
      || document.mozFullScreenElement;

  toggleFullscreen = () => {
    if (this.fullscreenElement()) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      this.setState({ fullscreen: false });
    } else {
      if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
      } else if (document.body.mozRequestFullScreen) { /* Firefox */
        document.body.mozRequestFullScreen();
      } else if (document.body.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        document.body.webkitRequestFullscreen();
      } else if (document.body.msRequestFullscreen) { /* IE/Edge */
        document.body.msRequestFullscreen();
      }
      this.setState({ fullscreen: true });
    }
  };

  mouseEnter = (ev) => {
    this.show(false);
  };

  mouseLeave = (ev) => {
    this.hide();
  };

  onCopy = () => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  };

  render() {
    const { classes } = this.props;
    const icon = this.state.fullscreen ? <FullscreenExitIcon fontSize="large"/> : <FullscreenIcon fontSize="large"/>;
    return (
      <ClickAwayListener onClickAway={this.hide}>
        <div
          ref={this.controls}
          className={classes.root}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
        >
          <Button disabled={this.props.isBeginning} variant="contained" size="medium" onClick={this.playerControls.first} style={{
            borderRadius: 30,
            padding: 12
          }} className={classes.button}>
            <FirstPage fontSize="large"/>
            {!this.props.isPhoneSize ? (
              <span style={{
                marginLeft: 10,
                marginRight: 12,
                fontSize: "1.1em"
              }}>
                Beginning
              </span>
            ) : null}
          </Button>
          <IconButton size="medium" disabled={this.props.isBeginning} className={classes.button} onClick={this.playerControls.previous}>
            <KeyboardArrowLeft fontSize="large"/>
          </IconButton>
          <div>
            <Label className={classes.text}>
              <em>{this.props.current ? this.props.current + 1 : 1}</em>
              {!this.props.isPhoneSize ? (<span> of {this.props.total}</span>) : null}
            </Label>
          </div>
          <IconButton size="medium" disabled={this.props.isEnd} className={classes.button} onClick={this.playerControls.next}>
            <KeyboardArrowRight fontSize="large"/>
          </IconButton>

          <Divider orientation="vertical" style={{ background: "rgba(255,255,255,0.1)" }} flexItem />

          {!this.props.isPhoneSize ? (
            <IconButton size="medium" onClick={this.toggleFullscreen} className={classes.button}>
              {icon}
            </IconButton>
          ) : null}

          <Divider orientation="vertical" style={{ background: "rgba(255,255,255,0.1)" }} flexItem />

          <CopyToClipboard text={!this.props.preview ? getSharingLink(this.props.id) : `${window.location.protocol}//${window.location.host}${window.location.pathname}#${this.props.current}`} onCopy={this.onCopy}>
            <Button variant="contained" size="medium" onClick={(e) => e.preventDefault()} style={{
              borderRadius: 30,
              padding: 12
            }} className={classes.button}>
              {this.state.copied ? <CheckCircleIcon fontSize="large" style={{ color: "#57FF00" }}/> : <ShareIcon fontSize="large"/>}
              {this.state.copied ? (
                <span style={{
                  marginLeft: 10,
                  marginRight: 12,
                  fontSize: "0.75em",
                }}>
                  Copied to clipboard
                </span>
              ) : null}
            </Button>
          </CopyToClipboard>

          {this.exit ? (
            <>
              <Divider orientation="vertical" style={{ background: "rgba(255,255,255,0.1)" }} flexItem/>
              <Button variant="contained" size="medium" onClick={this.exit} style={{
                borderRadius: 30,
                padding: 12
              }} className={classes.button}>
                <CloseIcon fontSize="large"/>
                {!this.props.isPhoneSize ? (
                  <span style={{
                    marginLeft: 10,
                    marginRight: 12,
                    fontSize: "1.1em"
                  }}>Exit
                  </span>
                ) : null }
              </Button>
            </>
          ) : null}
        </div>
      </ClickAwayListener>
    );
  }
}
export default withStyles(styles)(PlayControls);
