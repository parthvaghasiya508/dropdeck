import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core";

const styles = () => makeStyles((theme) => ({
  "@keyframes spinner": {
    to: {
      transform: "rotate(360deg)",
    }
  },
  root: {
    '& .logo-list': {
      '& .logo': {
        position: 'relative',
        '& span': {
          '&:before': {
            width: '10px',
            height: '10px',
            padding: '3px',
            lineHeight: '1.4',
            textAlign: 'center',
            left: '-1.38em',
            position: 'absolute',
            opacity: '1',
          },
        },
        '& .found': {
          '&:before': {
            content: '""',
          },
        },

        // Anim
        '& .processing': {
          color: theme.palette.text.primary,
          '&:before': {
            content: '""',
            color: theme.palette.text.primary,
            display: 'block',
            background: `${theme.dark() ? '#353537' : '#fff'}`,
            lineHeight: '0.5',
            top: '6px',
            left: '-1.42em',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            border: '1px solid',
            borderColor: `${theme.dark() ? '#5a5a5c' : '#e2e2e4'}`,
            borderTopColor: '#dd1c37',
            animation: '$spinner .6s linear infinite',
          },
        },

        // X Red not found
        '& .not-found': {
          color: '#9ca3af',
          textDecoration: 'line-through',
          '&:before': {
            content: '"+"',
            color: '#dd1c37',
            display: 'block',
            transformOrigin: 'center center',
            transition: 'transform 0.5s',
            msTransitionDelay: '0s',
            transform: 'rotate(-45deg) translateX(0px)',
            background: `${theme.dark() ? '#5a3136' : '#ffe0e3'}`,
            lineHeight: '0.5',
            borderRadius: '50%',
            top: '4px',
            left: '-1.42em',
          },
        },

        // + New
        '& .missing': {
          '&:before': {
            content: '"+"',
            background: `${theme.dark() ? '#353537' : '#fff'}`,
            color: theme.dark() ? theme.palette.text.primary : theme.palette.text.secondary,
            borderRadius: '50%',
            lineHeight: '0.5',
            top: '4px',
            left: '-1.42em',
          },
        },

      },
    },
  },
}), { meta: 'LogoListElement' });

export const LogoListElement = ({ element, children, attributes }) => {
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ul {...attributes} className="logo-list">
        {children}
      </ul>
    </div>
  );
};
