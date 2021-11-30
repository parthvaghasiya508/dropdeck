import { makeStyles } from "@material-ui/styles";

export const deckNameStyles = (readOnly) => makeStyles((theme) => ({
  root: {
    marginLeft: 'auto',

  },
  deckRename: {
    paddingLeft: '10px',
    paddingRight: '10px',
    transition: 'all 0.2s ease',
    borderRadius: '4px',
    border: '1px solid transparent',
    '& input': {
      transition: 'all 0.2s ease',
      opacity: '1',
      fontWeight: '600',
      fontSize: '0.85em',
      textShadow: theme.dark() ? theme.palette.background.main : '0 1px 0px rgba(255,255,255,1)',
      paddingTop: '8px',
      textAlign: 'left',
      background: theme.palette.input.primaryBg,
      borderColor: theme.palette.background.elev00,
      width: '100%',
    },
    '& svg': {
      transition: 'all 0.2s ease',
      color: theme.palette.text.secondary,
      opacity: '0',
      transform: 'scale(0.3)',
    },
    '& :before': {
      borderColor: 'transparent',
    },
    '& :after': {
      borderColor: theme.palette.input.primaryBg,
      borderWidth: '1px',
      left: '-10px',
      right: '-10px',
    },
    '&:hover': !readOnly ? {
      background: theme.dark() ? theme.palette.background.main : '#fefefe',
      border: `1px solid ${theme.palette.background.border01}`,
      boxShadow: `0 0 0 3px ${theme.palette.background.border02}`,
      '& input': {
        color: theme.palette.input.secondary,
        textShadow: 'none',
        background: theme.dark() ? theme.palette.background.main : '#fff !important',
      },
      '& :before': {
        display: 'none!important',
      },
      '& svg': {
        opacity: '1',
        transform: 'scale(0.8)',
      },
      '& :after': {
      },
    } : {},
  },
  filename: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9em',
    },
  },

}), { meta: 'DeckName' });
