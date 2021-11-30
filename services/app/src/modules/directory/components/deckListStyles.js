import React from "react";
import { makeStyles } from "@material-ui/styles";

export const deckListStyles = () => makeStyles((theme) => ({
  root: {
    paddingTop: 35,
  },
  // New Deck + Card
  create: {
    border: `2px dashed`,
    borderColor: theme.palette.background.elev00,
    backgroundColor: "transparent",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '280px',
    transition: 'all 0.25s ease-in-out 0.1s',
    '& button': {
      transition: 'all 0.25s ease-in-out 0.1s',
      transform: 'scale(1.75)',
    },
    '&:hover': {
      transition: 'all 300ms ease-in-out 0',
      cursor: 'pointer',
      background: `${theme.dark() ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.3)'}`,
      '& button': {
        transition: 'all 300ms ease-in-out 0',
        transform: 'scale(2)',
        '&:hover': {
          color: theme.palette.icon.primaryHover,
          background: theme.palette.icon.primaryHoverBg,
        },
      },
    },
  },
  // Blank Slate Card
  blankState: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '320px',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      width: '80%',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      '& h2, & h3, & button': {
        margin: '0.5em 0',
      },
      '& p': {
        margin: '0 0 1em 0',
      },
    },
  },
  title: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(0),
    letterSpacing: '-0.075px',
    fontWeight: 400,
    lineHeight: '1.5',
  }
}));
