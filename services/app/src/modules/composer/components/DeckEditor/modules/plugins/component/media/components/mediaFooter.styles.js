import { makeStyles } from "@material-ui/styles";

export const mediaFooterStyles = () => makeStyles((theme) => ({
  attribution: {
    textAlign: 'center',
    padding: '0.75rem 1rem 0 1rem',
    boxSizing: 'border-box',
    width: '100%',
    fontSize: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.dark() ? theme.palette.background.main : `linear-gradient(90deg, ${theme.palette.background.elev02} -45%, #FFFFFF 50%)`,
    color: theme.palette.text.secondary,
    position: 'relative',
    zIndex: 1,
    '& .logo': {
      transition: "all 300ms ease",
      height: '12px',
      margin: '1px 0 0 7px',
      opacity: '0.8',
      '&:hover': {
        opacity: '1',
      },
    },
  },
}));
