import React, { useCallback, useRef } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import { useDropzone } from 'react-dropzone';
import PublishIcon from '@material-ui/icons/Publish';
import ColorPicker from "./ColorPicker";
import Label from "../controls/Label";

const styles = (transparent, backgroundColor) => makeStyles((theme) => ({

  "@keyframes colorchange": {
    // Colour 01
    '0%': {
      background: "#0079c1",
      color: "#FFFFFF11",
    },
    '32%': {
      background: "#0079c1",
      color: "#FFFFFF11",
    },
    // White
    '33%': {
      background: "#ffffff",
      color: "#00000011",
    },
    '65%': {
      background: "#ffffff",
      color: "#00000011",
    },
    // Colour 02
    '66%': {
      background: "#00457c",
      color: "#FFFFFF22",
    },
    '98%': {
      background: "#00457c",
      color: "#FFFFFF22",
    },
    //
    '99%': {
      background: "#00457c",
      color: "#FFFFFF22",
    },
    '100%': {
      background: "#0079c1",
      color: "#FFFFFF11",
    },
  },

  "@keyframes textcolorchange": {
    // Colour 01
    '0%': {
      color: "#FFFFFF77",
    },
    '32%': {
      color: "#FFFFFF77",
    },
    // White
    '33%': {
      color: "#00000066",
    },
    '65%': {
      color: "#00000066",
    },
    // Colour 02
    '66%': {
      color: "#FFFFFF55",
    },
    '98%': {
      color: "#FFFFFF55",
    },
    //
    '100%': {
      color: "#FFFFFF77",
    },
  },

  root: {
    marginLeft: '1rem',
    marginRight: '1rem',
    textAlign: "center"
  },

  // Outer Container for both Logos and Icons
  outer: {
    borderRadius: 7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    cursor: 'pointer',
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    background: theme.dark() ? "radial-gradient(ellipse at center, #36383f 0%, #36383f 60%, #121213 90%)" : "radial-gradient(ellipse at center, #eee 0%, #eee 60%, #ddd 90%)", // linear-gradient(45deg, rgb(251 104 96) 25%, rgb(254 202 57) 70%, rgb(255 143 71) 110%)
    backgroundSize: "unset",
    '& .slideInnerFrame': {
      borderRight: theme.dark() ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(0,0,0,0.05)",
      background: "#fff",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px",
      borderRadius: 0,
      display: "flex",
      '& .logoHelper': {
        position: 'absolute',
        bottom: '4.3rem',
        left: '4.3rem',
        zIndex: '99',
        textAlign: 'left',
        '& svg': {
          fontSize: '0.9rem',
          margin: '0 3px -2px 0',
        },
        '& p': {
          fontSize: '0.8rem',
          animation: '$textcolorchange 14s linear 0s infinite',
        },
      },
    },
  },
  // Inner Container for both Logos and Icons
  transContainer: {
    backgroundColor: "transparent",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
    border: backgroundColor ? '2px solid transparent' : '2px dashed rgba(0,0,0,0.1)',
    borderRadius: "4px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative",
    textAlign: "center",
    height: '100%',
  },

  // 01 Logo specific
  containerLogo: {
    padding: "1.25rem 0 0 1.25rem",
    minHeight: "236px",
    boxShadow: "inset 0px -12px 12px -12px rgb(80 0 0 / 25%)",
    '& .slideInnerFrame': {
      minHeight: "236px",
      borderTopLeftRadius: transparent ? 7 : 0,
      borderBottomRightRadius: !transparent ? 7 : 0,
      animation: '$colorchange 14s linear 0s infinite',
      '&:after': {
        content: '"My Presentation"',
        position: 'absolute',
        fontSize: '4rem',
        fontWeight: '700',
        width: '800px',
        top: '12.75rem',
        left: '-5.45rem',
        letterSpacing: '-0.1rem',
      },
    },
  },
  transContainerLogo: {
    margin: "3.75rem auto 0 3.125rem",
  },

  // 02 Icon specific
  containerIcon: {
    boxShadow: "inset 0px -12px 12px -12px rgb(80 0 0 / 10%)",
    padding: "0 0 1.25rem 1.25rem",
    '& .slideInnerFrame': {
      minHeight: "136px",
      borderTop: theme.dark() ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(0,0,0,0.05)",
      borderBottomLeftRadius: "7px",
      borderTopRightRadius: "5px",
      '& .logoHelper': {
        display: 'none',
      },
    },
  },
  transContainerIcon: {
    margin: "1.3rem auto 2.1rem 3.125rem",
  },

  // Logo
  brandingLogo: {
    padding: "0.85rem",
    borderRadius: "4px",
    maxHeight: '45px',
    "& .emoji": {
      opacity: 0,
      textAlign: "center",
      "&:before": {
        color: "#000",
        fontSize: 40,
        content: "'🤷🏽'",
        display: "block"
      }
    },
  },

  // Logo Control Panel
  LogoControls: {
    border: "1px solid",
    borderTopWidth: '0',
    borderColor: theme.dark() ? theme.palette.background.elev01 : theme.palette.background.elev02,
    background: theme.dark() ? theme.palette.label.light : theme.palette.background.elev04,
    margin: '0 0 2rem 0',
    padding: '0.25rem 1.1rem',
    borderRadius: '7px',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '2.5rem',
  },

  // Replace Logo Button
  addLogo: {
    transition: "all 150ms ease-in",
    border: '1px solid',
    borderColor: theme.dark() ? 'rgba(243, 17, 56, 0.5)' : '#E2E5EA',
    background: theme.dark() ? 'transparent' : 'linear-gradient(0deg, #F7FAFC 3%, #FFFFFF 100%)',
    color: theme.dark() ? '#f31138' : '#9CA3AF',
    fontWeight: '600',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    padding: '5px 6px 4px 5px',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& svg': {
      fontSize: '0.9rem',
      margin: '-1px 2px 0 0',
    },
    '&:hover': {
      color: theme.dark() ? '#f31138' : '#323234',
      borderColor: theme.dark() ? 'rgba(243, 17, 56, 1)' : '#E2E5EA',
      background: theme.dark() ? 'rgba(243, 17, 56, 0.08)' : 'linear-gradient(0deg, #F7FAFC 3%, #FFFFFF 100%)',
    },
  },

  ColorLabel: {
    color: '#9CA3AF',
  },

  emoji: {},
  label: {
    padding: 12,
    fontSize: "0.8em"
  },
}));
const LogoEditor = ({ logo, height, width, error, notFound = false, transparent = false, backgroundColor, setLogoBackgroundColor, colors, onChangeLogo, isWhiteOnTransparent }) => {

  const useStyles = useCallback(styles(transparent, backgroundColor), [transparent, backgroundColor]);
  const classes = useStyles();
  const fileRef = useRef();

  const handleClickLogo = () => {
    fileRef.current.click();
  };

  const readFile = (file) => {
    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = () => onChangeLogo(transparent ? 'transparent' : 'solid', fr.result, file, file.type);
      fr.readAsDataURL(file);
    }
  };

  const handleChangeLogo = (e) => {
    readFile(e.target.files[0]);
  };

  const onDrop = (acceptedFiles) => {
    readFile(acceptedFiles[0]);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop, accept: 'image/jpeg, image/png, image/gif, image/svg+xml' });

  return (
    <div className={classes.root} {...getRootProps()}>

      {/* containerLogo / containerIcon */}
      <div className={transparent ? `${classes.outer} ${classes.containerLogo}` : `${classes.outer} ${classes.containerIcon}`} onClick={handleClickLogo} role="button" tabIndex={0}>
        <div className="slideInnerFrame">
          <div className="logoHelper">
            <Label><PublishIcon />Click or drag-and-drop to {logo ? "replace logo" : "upload logo"}</Label>
          </div>
          <div className={transparent ? `${classes.transContainer} ${classes.transContainerLogo}` : `${classes.transContainer} ${classes.transContainerIcon}`}>
            <div className={classes.brandingLogo} style={{ backgroundColor: backgroundColor || "transparent" }}>
              {logo && (
                <img src={logo} alt="" style={{ maxWidth: "100%", height: 45 }}/>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Logo Options: Replace Btn | Colour Hex | Colour Picker  */}
      <div className={classes.LogoControls}>
        <div className={classes.addLogo} onClick={handleClickLogo} role="button" tabIndex={0}><PublishIcon /> {logo ? "Replace" : "Upload"}</div>
        <div className={classes.ColorLabel}>{!logo && <div className={classes.label}><span>No logo detected for this placement</span></div>}{logo && <div className={classes.label}>{(backgroundColor || <span>No Background</span>)}</div>}</div>
        {logo && <ColorPicker mini colors={colors} logoBackgroundColor={backgroundColor} setLogoBackgroundColor={setLogoBackgroundColor} enableToEdit={false} /> }
      </div>

      {error && (
        <Box textAlign="left">
          <Label style={{ color: '#f00' }}>Error while uploading image. Please try again later.</Label>
        </Box>
      )}

      <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={handleChangeLogo}/>

      {logo && (height && height < 150 || width && width < 150) && (
        <Label color="primary" className={classes.label} style={{ marginTop: -12, paddingTop: 0, marginBottom: 10 }}><span>This logo is quite small (<b>{height} pixels &#10005; {width} pixels</b>) so may not scale up well, if you can you should upload a higher quality version.</span></Label>
      )}

      {isWhiteOnTransparent && backgroundColor && (
        <Label className={classes.label} style={{ marginTop: -12, paddingTop: 0 }}><span>By default we chose a background color for your logo because it looked like it was <u>white on transparent</u> which does not work well on slides with a white background.</span></Label>
      )}

      {isWhiteOnTransparent && !backgroundColor && (
        <Label className={classes.label} style={{ marginTop: -12, paddingTop: 0 }}><span>You have chosen to keep the background transparent!</span></Label>
      )}
    </div>
  );
};
export default LogoEditor;
