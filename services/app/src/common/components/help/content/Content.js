import { makeStyles } from "@material-ui/styles";
import React, { useCallback } from "react";

const styles = () => makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textShadow: `0 1px 0 ${theme.palette.type === "dark" ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.8)"}`,
    height: '100%',
    // Wraps Text and Image: alignment based on screen width
    '& .contentWrapper': {
      padding: '0',
      display: 'flex',
      flexDirection: 'row',
      boxSizing: 'border-box',
      height: '100%',
      backgroundImage: `radial-gradient${theme.palette.type === "dark" ? "( circle at bottom right, #222222, #4a4a4a 60% )" : "( circle at bottom left, #dceaf5, #eff0f3 66% )"}`,
      [theme.breakpoints.down('lg')]: { flexDirection: 'column', },
      [theme.breakpoints.down('md')]: { flexDirection: 'row', },
      [theme.breakpoints.down('xs')]: { flexDirection: 'column', minHeight: '360px', },
    },
    // Wraps Text
    '& .description': {
      padding: '5em 2.5em 2.5em 2.5em',
      width: '60%',
      boxSizing: 'border-box',
      height: '100%',
      [theme.breakpoints.down('lg')]: { padding: '2.5em 1.25em 0 2.5em', width: '100%', height: 'auto' },
      [theme.breakpoints.down('md')]: { width: '55%' },
      [theme.breakpoints.down('xs')]: { padding: '1.5em 1.5em 0 1.5em', width: '100%', height: 'auto' },
    },
    '& h5': {
      margin: '0 0 1em 0',
      fontWeight: '600',
      color: theme.palette.secondary.main,
      '& svg': {
        fontSize: '1.05em',
        margin: '0 0 -2px 3px',
      },
    },
    '& h2': {
      color: theme.palette.text.primary,
      margin: '0.25em 0 0.75em 0',
      fontWeight: '600',
      fontSize: '1.35em',
    },
    '& h3': {
      color: theme.palette.background.primary,
    },
    '& p': {
      margin: '0 0 0.6em 0',
      color: theme.palette.text.primary,
      lineHeight: '1.45',
      '& strong': {
        fontWeight: 600,
        color: theme.palette.text.primary,
      },
      '&:last-of-type': {
        margin: '0',
      },
      '& svg, & .fauxicon': {
        fontSize: '0.75em',
        border: '1px solid #292a3156',
        borderRadius: '2px',
        padding: '2px',
        margin: '0 1px -3px 1px',
        '&:nth-child(2)': {
          transform: 'scaleX(-1)',
        },
      },
      '& .fauxicon': {
        borderRadius: '50%',
        padding: '1px 4px',
        margin: '-1px 1px -3px 1px',
      },
    },
    '& dl': {
      margin: '0.6em 0 0 0',
      '& dd, & dt': {
        width: '50%',
        display: 'inline-block',
        margin: '0 0 2px 0',
        verticalAlign: 'top',
      },
      '& dt': {
        width: '50%',
        color: theme.palette.text.primary,
      },
      '& span': {
        color: theme.palette.text.primary,
      },
    },
    '& button': {
      opacity: '0.25',
      position: 'absolute',
      right: '0.25em',
      top: '0.25em',
      transform: 'scale(0.8)',
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        opacity: '1',
        transform: 'scale(0.9)',
      },
    },
    // Image BG
    '& .imgOuter': {
      display: 'flex',
      width: '40%',
      boxSizing: 'border-box',
      opacity: `${theme.palette.type === "dark" ? "0.55" : "1"}`,
      [theme.breakpoints.down('lg')]: { width: '100%', height: '100%' },
      [theme.breakpoints.down('md')]: { width: '45%' },
      [theme.breakpoints.down('xs')]: { width: '100%', height: '100%' },
    },
    '& .imgOuter.slash': {
      background: 'url(/reference/tutorial/img/tip-slash.png) top left no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '-2px 0',
      [theme.breakpoints.down('lg')]: { backgroundSize: '55%', backgroundPosition: 'top right' },
      [theme.breakpoints.down('md')]: { backgroundSize: 'cover', backgroundPosition: '-2px 0' },
      [theme.breakpoints.down('xs')]: { backgroundSize: '55%', backgroundPosition: 'top right' },
    },
    '& .imgOuter.commands': {
      background: 'url(/reference/tutorial/img/tip-shortcuts.png) top left no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '-2px 0',
      [theme.breakpoints.down('lg')]: { backgroundSize: '55%', backgroundPosition: 'top right' },
      [theme.breakpoints.down('md')]: { backgroundSize: 'cover', backgroundPosition: '-2px 0' },
      [theme.breakpoints.down('xs')]: { backgroundSize: '55%', backgroundPosition: 'top right' },
    },
    '& .imgOuter.picture': {
      background: 'url(/reference/tutorial/img/tip-image.png) top left no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '-19px 0',
      [theme.breakpoints.down('lg')]: { backgroundSize: '60%', backgroundPosition: 'top right' },
      [theme.breakpoints.down('md')]: { backgroundSize: 'cover', backgroundPosition: '-19px 0' },
      [theme.breakpoints.down('xs')]: { backgroundSize: '60%', backgroundPosition: 'top right' },
    },
    '& .imgOuter.remix': {
      background: 'url(/reference/tutorial/img/tip-remix.png) top left no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '0 0',
      [theme.breakpoints.down('lg')]: { backgroundSize: '46.5%', backgroundPosition: '100% 70%' },
      [theme.breakpoints.down('md')]: { backgroundSize: 'cover', backgroundPosition: '0 0' },
      [theme.breakpoints.down('xs')]: { backgroundSize: '46.5%', backgroundPosition: '100% 70%' },
    },
    '& .imgOuter.palette': {
      background: 'url(/reference/tutorial/img/tip-palette.png) top left no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '-35px 0',
      [theme.breakpoints.down('lg')]: { backgroundSize: '55%', backgroundPosition: '100% 70%' },
      [theme.breakpoints.down('md')]: { backgroundSize: 'cover', backgroundPosition: '-35px 0' },
      [theme.breakpoints.down('xs')]: { backgroundSize: '55%', backgroundPosition: '100% 70%' },
    },
    '& .imgOuter.theme': {
      background: 'url(/reference/tutorial/img/tip-theme.png) top left no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '-60px 0',
      [theme.breakpoints.down('lg')]: { backgroundSize: '90%', backgroundPosition: 'top right' },
      [theme.breakpoints.down('md')]: { backgroundSize: 'cover', backgroundPosition: '-60px 0' },
      [theme.breakpoints.down('xs')]: { backgroundSize: '90%', backgroundPosition: 'top right' },
    },
    '& .imgOuter.helpdesk': {
      background: 'url(/reference/tutorial/img/tip-helpdesk.png) top left no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '-40px 0',
      [theme.breakpoints.down('lg')]: { backgroundSize: '66%', backgroundPosition: '100% 25%' },
      [theme.breakpoints.down('md')]: { backgroundSize: 'cover', backgroundPosition: '-40px 0' },
      [theme.breakpoints.down('xs')]: { backgroundSize: '60%', backgroundPosition: '100% 15%' },
    },
  }
}));

const Content = ({ children }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (<div className={classes.root}>{children}</div>);
};
export default Content;
