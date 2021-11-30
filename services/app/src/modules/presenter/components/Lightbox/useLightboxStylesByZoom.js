import { makeStyles } from "@material-ui/styles";

export const lightboxSpacing = {
  slide: {
    // spacing around individual slide
    padding: 1.15
  },

  // spacing around outside of the slide list 1 unit = 8px
  padding: {
    top: 1,
    right: 1,
    bottom: 14.8,
    left: 1,
  }
};

export const useLightboxStylesByZoom = (cols, readOnly, isPhoneSize) => makeStyles((theme) => (
  {
    lightbox: {
      padding: theme.spacing(lightboxSpacing.padding.top, lightboxSpacing.padding.right, lightboxSpacing.padding.bottom, lightboxSpacing.padding.left),
      boxSizing: 'border-box',
      [theme.breakpoints.down('sm')]: {
        backgroundSize: 'auto',
        backgroundPosition: 'center center',
      },
      "& .slide-card": {
        borderRadius: 4,
      },
      "& .slide-card .slide": {
        opacity: 1 // readOnly || !theme.dark() ? 1 : 0.6,
      },
      "& .slide-card.hovering .slide": {
        opacity: 1, // readOnly || !theme.dark() ? 1 : "0.9 !important",
        transition: 'opacity 0.2s ease-in-out',
      },
      "& .active-slide .slide": {
        opacity: 1, // readOnly || !theme.dark() ? 1 : "0.9 !important",
        transition: 'opacity 0.2s ease-in-out',
      },
      '& .active-slide': {
        '& .slide-card': {
          boxShadow: theme.dark() ? 'rgba(0,0,0,0.25) 1px 1px 2px 1px, rgba(0,0,0,0.15) -1px -1px 2px 1px, 0px 0px 0 8px #4f4f4f !important' : '0 6px 13px -5px rgba(50,50,93,.5), 0 4px 8px -4px rgba(0,0,0,0.45), 0 -3px 8px -3px rgba(0,0,0,.225) !important',
          transition: 'box-shadow 0.2s ease-in-out',
        },
      },
    },

    slide: {
      padding: theme.spacing(lightboxSpacing.slide.padding), // spacing around individual slide
      position: 'relative',
      height: 'fit-content',
      '& .hoverPanel': {
        opacity: 1,
        transition: 'opacity 0.25s ease-in-out 0.15s',
        transform: 'translate(0, 0)',
      },
    },

    card: {
      position: 'relative',
    },

    hoverPanel: {
      display: 'flex',
      opacity: '0',
      position: 'absolute',
      zIndex: '3',
      left: '9px',
      right: '9px',
      bottom: '10px',
      padding: '0.5em 0.75em',
      justifyContent: 'space-between',
      alignItems: 'center',
      transform: 'translate(0, 2px)',
      '& button': {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.dark() ? theme.palette.background.border01 : "#dee3ea !important",
        boxShadow: 'none',
        lineHeight: '1 !important',
        width: '42px',
        fontSize: '1.125em',
        '& svg': {
          color: theme.dark() ? theme.palette.text.secondary : "#718096",
          transform: 'translate(2px, 0px);',
        },
        '&:first-child svg': {
          transform: 'scaleX(-1) translate(-1px, 0px);',
        },
        '&:hover, :active, &.open': {
          transition: 'none',
          "& svg": {
            color: theme.dark() ? `${theme.palette.text.primary} !important` : "#292931",
          },
          boxShadow: 'none',
        },
      },
    },

    hpBg: {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      zIndex: '0',
      opacity: '1',
      backgroundImage: `linear-gradient(180deg, ${theme.dark() ? "rgba(0, 0, 0, 0.7)" : "rgba(243, 246, 250, 0.5)"} 3%, ${theme.dark() ? "rgba(0, 0, 0, 0.6)" : "rgba(243, 246, 250, 0.5)"} 100%)`,
      backdropFilter: 'saturate(130%) blur(6px) brightness(0.975)',
      borderTop: '1px solid rgba(240, 243, 247, 0.25)',
    },

    hpContent: {
      display: 'flex',
      zIndex: '1',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      backdropFilter: 'blur(0)',
    },

    label: {
      color: theme.dark() ? theme.palette.text.primary : "#aaa",
      fontSize: '13px',
      fontWeight: '600',
      marginRight: 'auto',
      paddingLeft: '1em',
    },

    number: {
      color: theme.dark() ? theme.palette.text.primary : "#aaa",
      fontSize: '13px',
      fontWeight: '600',
      paddingRight: '1.25em',
    },

  }
), { deterministic: true, meta: 'Lightbox' });
