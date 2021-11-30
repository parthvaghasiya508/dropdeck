import { makeStyles } from "@material-ui/styles";

export const composerStyles = () => makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.dark() && theme.palette.background.main
  },

  composerPane: {
    boxShadow: theme.dark() ? '0 0 12px rgb(0 0 0 / 25%), 3px 0px 5px -5px rgb(0 0 0 / 60%)' : '0 0 12px rgba(0,0,30,0.15)',
    zIndex: 9,
    [theme.breakpoints.down('xs')]: {
      boxShadow: "none",
      height: '100%',
      paddingBottom: '60px',
    },
    '&.preview-hide': {
      '& header': {
        alignItems: 'center',
        '& > div': {
          width: '565px',
          justifyContent: 'flex-start',
        },
        '& img': {
          margin: '0 0 -3px 0.725em',
        },
      },
    },
  },

  main: {
    // Fix anything but phone size because iPhone softkeyboard is a moron
    [theme.breakpoints.up('sm')]: {
      height: '100vh',
      position: 'fixed',
    },
    marginTop: 0,
  },
}), { meta: 'Composer' });
