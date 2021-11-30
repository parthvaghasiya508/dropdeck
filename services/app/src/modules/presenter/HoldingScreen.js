import React, { useRef, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { LinearProgress, useMediaQuery, useTheme } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import QRCode from "qrcode.react";
import useDimensions from "react-cool-dimensions";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CardMedia from "@material-ui/core/CardMedia";
import { slideById } from "../composer/components/DeckEditor/modules/plugins/slide/transforms/slideById";
import Cover from "./components/Cover/Cover";
import { getSharingLink } from "../composer/components/PreviewSection/components/sharing/Sharing";
import { setHeightFromAspect } from "./queries/setHeightFromAspect";
import { ThemeFactory } from "../../common/theme/ThemeFactory";
import Label from "../../common/components/controls/Label";

const HoldingScreen = ({ progress, deck, start, setStart, isPhoneSize }) => {

  const { ref: coverRef, width: coverWidth } = useDimensions();

  const { ref, width, height } = useDimensions();
  const [copied, setCopied] = useState();

  const { coverId, theme, branding, content, name, owner, identifiers } = deck;
  const cover = slideById(content, coverId);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div style={{
      display: start ? "none" : "flex",
      height: "100vh",
      position: "absolute",
      top: 0,
      width: "100%",
      zIndex: 2,
      WebkitBackdropFilter: "blur(50px) saturate(1.8)",
      backdropFilter: "blur(50px) saturate(1.8)",
      background: isPhoneSize ? "radial-gradient(ellipse at center, rgb(54 56 58 / 1) 20%, rgb(25 30 35 / 1) 40%, rgb(0 0 0 / 1) 90%)" : 'radial-gradient(ellipse at center, rgb(54 56 58 / 0.5) 0%, rgb(25 30 35 / 0.5) 60%, rgb(0 0 0 / 0.6) 90%)'
    }}>
      <Grid container>
        <Grid item xl={6} lg={7} md={8} sm={10} xs={11} style={{ margin: 'auto', }}>
          {/* <ClickAwayListener onClickAway={() => setStart(true)}> */}
          <div style={{
            boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
            borderRadius: 14,
            backgroundColor: `rgba(0, 0, 0, 0.8)`,
            backgroundImage: 'linear-gradient(90deg,hsla(0,0%,100%,0) 0,hsla(0,0%,100%,.4) 50%,hsla(0,0%,100%,0))',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 1px',
            margin: "auto",
            color: '#9ab'
          }}>
            <Grid container>
              <Grid item xs={12} style={{ padding: "5%" }}>
                <CardMedia ref={coverRef} style={{ height: setHeightFromAspect(coverWidth, deck.aspect) }}>
                  <Cover node={cover} themeName={theme || ThemeFactory.DEFAULT_THEME_NAME} branding={branding} aspect={deck.aspect}/>
                </CardMedia>
                <LinearProgress value={progress || 1} variant="determinate" style={{ height: 1 }}/>
              </Grid>

              {!isPhoneSize ? (
                <Grid item xs={3} style={{
                  paddingLeft: "5%",
                  paddingBottom: "5%",
                  opacity: 0.85
                }} ref={ref}>
                  <QRCode style={{ border: '1px solid rgba(255,255,255,0.1)', }} includeMargin
                    value={getSharingLink(identifiers.short)} bgColor="#000" fgColor="#fff"
                    size={width} imageSettings={{
                      src: "/android-chrome-192x192.png",
                      height: height / 8,
                      width: height / 8,
                      excavate: true
                    }}/>
                </Grid>
              ) : null}

              <Grid item xs={isPhoneSize ? 12 : 9}
                style={{
                  paddingLeft: isPhoneSize ? "6%" : "4%",
                  paddingBottom: "5%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}>
                <Label variant="h1" style={{
                  color: "#fff",
                  marginTop: "1%",
                  marginBottom: 0,
                  fontWeight: 600,
                }}>
                  {name}
                </Label>
                {owner ? (
                  <Label variant="h2" style={{
                    marginTop: "1%",
                    marginBottom: "auto",
                    fontWeight: 500,
                    fontSize: "1.35em" }}>
                    {owner.givenName} {owner.familyName} <span style={{ marginLeft: '0.25em', fontWeight: 400, color: "#678" }}>{owner.email}</span>
                  </Label>
                ) : <h2> </h2> }

                <div>
                  <div style={{
                    marginTop: 20,
                    marginBottom: 3
                  }}>
                    <Button
                      variant="contained"
                      // startIcon={<PlayCircleFilledIcon/>}
                      disabled={progress < 100}
                      aria-controls="simple-menu"
                      onClick={() => setStart(true)}
                      color="primary"
                      size="medium"
                      aria-label="theme"
                      aria-haspopup="true" style={{ color: "#fff", textTransform: 'none', fontFamily: '"Inter var", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"' }}>
                      {progress === 100 ? (<PlayCircleFilledIcon style={{ marginRight: 10 }}/>) : (
                        <CircularProgress variant="determinate" value={progress || 1} size={20} style={{ marginRight: 14, marginTop: 1, marginBottom: 1 }} color="inherit"/>)}
                      Start
                    </Button>
                    <CopyToClipboard text={getSharingLink(identifiers.short)} onCopy={copy}>
                      <span style={{ marginLeft: '0.5em' }}>
                        <IconButton variant="outlined" onClick={(e) => e.preventDefault()}
                          style={{ color: copied ? "#00e055" : "#9ab" }}>
                          {copied ? <CheckCircleIcon fontSize="small"/> : <ShareIcon fontSize="small"/>}
                        </IconButton>
                        <Label variant="span" style={{
                          fontSize: "0.8em",
                          marginTop: 2,
                          cursor: "pointer",
                          color: "#9ab"
                        }}>{copied ? "Link copied to clipboard" : ""}
                        </Label>
                      </span>
                    </CopyToClipboard>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          {/* </ClickAwayListener> */}
        </Grid>
      </Grid>
    </div>
  );
};
export default HoldingScreen;
