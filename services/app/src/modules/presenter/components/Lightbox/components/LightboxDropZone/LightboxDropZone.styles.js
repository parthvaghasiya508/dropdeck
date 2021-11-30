import { makeStyles } from "@material-ui/styles";

export const lightboxDropZoneStyles = () => makeStyles((theme) => ({

  // Outer
  selectWidget: {
    height: 'fit-content',
    // height: '334px !important', // This value should be should set dynamically to current height of slides (unless the zoom level is 1x)
    boxSizing: "border-box",
    position: "relative",
    width: 160,
    padding: ' 0',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: (props) => {
      if (props.selectWidgetPosition === 'left') {
        return "0 -160px 0 0";
      } if (props.selectWidgetPosition === 'right') {
        return "0 0 0 -160px";
      }
      if (props.selectWidgetPosition === 'last') {
        return "0 0";
      }
      return "0 -80px";
    },
    marginTop: 'auto !important',
    marginBottom: 'auto !important',
    zIndex: 99,
    animation: "$fadeUp 0.75s 0s 1",
    '&:hover': {
      color: "yellow"
    },
    "& +div": {
      transition: "all 0.25s ease-in-out",
    }
  },

  // - or -
  seperator: {
    fontSize: "10px",
    opacity: "0.75",
    color: '#fff',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: '30px', //
    "& p": {
      fontSize: "12px",
      lineHeight: "2.5",
      textAlign: 'center',
      margin: '0 !important',
      color: "#7a7a7c"
    }
  },

  progress: {
    margin: "0 auto",
    boxSizing: "border-box",
    overflow: "hidden !important",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    minHeight: 90,
    width: "45%",
    maxWidth: 250
  },

  progressRoot: {
    backgroundColor: "transparent",
    border: `2px solid ${theme.palette.icon.primary}`,
    height: 10,
    borderRadius: 5,
  },

  icon: {
    animation: "$fadeUp 0.5s 0s 1",
    color: theme.palette.icon.primary,
    fontSize: "2em",
    marginBottom: 6
  },

  bar: {
    borderRadius: 5,
    backgroundColor: theme.palette.icon.primary
  },

  // Dropzone for 2+ images
  widgetSlide: {
    background: `${theme.dark() ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.02)"}`,
    boxShadow: `${theme.dark() ? "inset 0px 1px 0px rgba(255,255,255,10%), 0px 1px 0px rgba(255,255,255,10%)" : "inset 0px 1px 3px rgb(0 0 0 / 8%), 0px 1px 0px rgb(255 255 255 / 70%), 0px -1px 0px rgb(255 255 255 / 70%)"}`,
    border: `1px solid ${theme.dark() ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.075)"}`,
    borderRadius: 7,
    margin: '0 10px',
    padding: '9px 0 7px 0',
    boxSizing: "border-box",
    overflow: "hidden !important",
    display: "flex",
    flexWrap: "no-wrap",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease-in-out",
    position: 'relative',
    height: 'calc(50% - 40px)',
    "&:before": {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: 5,
    },
    "& img": {
      transition: "all 0.25s ease-in-out",
      borderRadius: '4px',
      margin: "5px 0",
      transform: 'scale(0.825)',
      width: '90px !important',
      height: '57px !important',
      opacity: `${theme.dark() ? "0.35" : "0.75"}`,
      filter: `${theme.dark() ? "grayscale(0%)" : "grayscale(100%)"}`,
    },

  },

  // Dropzone for 1 Image
  widgetSlideOne: {
    background: `${theme.dark() ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.02)"}`,
    boxShadow: `${theme.dark() ? "inset 0px 1px 0px rgba(255,255,255,10%), 0px 1px 0px rgba(255,255,255,10%)" : "inset 0px 1px 3px rgb(0 0 0 / 8%), 0px 1px 0px rgb(255 255 255 / 70%), 0px -1px 0px rgb(255 255 255 / 70%)"}`,
    border: `1px solid ${theme.dark() ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.075)"}`,
    borderRadius: 7,
    margin: '20px 10px',
    padding: '9px 0',
    boxSizing: "border-box",
    overflow: "hidden !important",
    display: "flex",
    flexWrap: "no-wrap",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease-in-out",
    position: 'relative',
    height: 'calc(100% - 40px)', // when we have slide height set on wrapper
    "&:before": {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: 5,
    },
    "& img": {
      transition: "all 0.25s ease-in-out",
      borderRadius: '4px',
      margin: "3px 0 5px 0",
      transform: 'scale(0.9)',
      width: '90px !important', // 50
      height: '57px !important', // 27
      opacity: `${theme.dark() ? "0.25" : "0.55"}`,
      filter: `${theme.dark() ? "grayscale(0%)" : "grayscale(100%)"}`,
    },
  },

  // Dropzone:Hover
  widgetSlideHover: {
    opacity: "1 !important",
    cursor: "grabbing",
    background: `${theme.dark() ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.65)"}`,
    boxShadow: `${theme.dark() ? "inset 0px 1px 2px 0px rgba(0,0,0,30%), 0px 1px 0px 0px rgba(255,255,255,8%)" : "inset 0px 1px 0px rgba(255,255,255,5%), 0px 1px 0px rgba(255,255,255,5%)"}`,
    border: `1px solid ${theme.dark() ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0)"}`,
    "&:before": {
      border: `2px dashed ${theme.palette.events.drop}`,
    },
    "& img": {
      transform: 'scale(0.95)',
      opacity: `${theme.dark() ? "0.9" : "1"}`,
      filter: `${theme.dark() ? "grayscale(0%)" : "grayscale(0%)"}`,
    },
  },

  // Dropzone text
  label: {
    lineHeight: 1.3,
    textAlign: "center",
    margin: "0",
    fontSize: "12px !important",
    color: `${theme.dark() ? "#fff" : "#323234"}`,
    '& .slideCount': {
      fontWeight: 600,
      fontSize: "12px !important",
      textTransform: 'uppercase',
      borderRadius: '4px',
      margin: '2px 0',
    },
    '& .imgCount': {
      fontWeight: 500,
      opacity: "0.5 !important",
      fontSize: "11px !important",
    },
  },

  "@keyframes fadeUp": {
    "0%": {
      filter: "alpha(opacity=0)",
      opacity: 0,
      transform: "translateY(5%)"
    },
    "15%": {
      filter: "alpha(opacity=0)",
      opacity: 0,
      transform: "translateY(5%)"
    },
    "100%": {
      filter: "alpha(opacity=100)",
      opacity: 1,
      transform: "translateY(0)"
    }
  },

  beforeWidget: {
    transition: "all 0.25s ease-in-out" ,
    transform: "translate(-80px, 0)"
  },
  selectWidgetLeft: {
    marginLeft: "1px !important",
    "& .selectWidgetInner": {
      marginLeft: "-20px !important"
    },
    "& +div": {
      transition: "all 0.25s ease-in-out",
      marginLeft: "-81px !important"
    }
  },

  // One row
  selectWidgetColOne: {
    height: "240px !important",
    position: "relative",
    width: 160,
    zIndex: 99,
    animation: "$fadeUp 0.75s 0s 1",
    [theme.breakpoints.up('md')]: {
      '& > div': {
        boxSizing: 'border-box',
        '& > div': {
          boxSizing: 'border-box',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '1rem 0',
          '& div:first-of-type, & div:last-of-type': {
            width: '42%',
            height: '100%',
            margin: '0 auto',
          },
        },
      },
    },
    [theme.breakpoints.up('lg')]: {
      '& > div > div': {
        '& div:first-of-type, & div:last-of-type': {
          '& img': {
            margin: "3px 0 8px 0",
          },
          '& .slideCount': {
            fontSize: "16px !important",
          },
          '& .imgCount': {
            fontSize: "15px !important",
          },
        },
      },
    },
    [theme.breakpoints.up('xl')]: {
      '& > div > div': {
        '& div:first-of-type, & div:last-of-type': {
          width: '44.5%',
        },
      },
    },
  },
  selectWidgetInner: {
    height: '100%',
  },
  lastPosition: {
    width: (props) => `${((props.cols - ((props.slideLength - 1) % props.cols)) / props.cols) * 100 }%`,
    minHeight: "180px",
    height: "180px",
    boxSizing: 'border-box',
    zIndex: 999,
    "& > div > div": {
      boxSizing: 'border-box',
      flexDirection: "row",
      alignItems: "center",
      padding: "1rem 0",
    },
    "& .manySlide,& .oneSlide ": {
      width: "40%",
      height: "100%",
      margin: "0 auto",
    }
  }
}));
