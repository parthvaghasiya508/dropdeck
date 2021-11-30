import { makeStyles } from "@material-ui/styles";

export const imageEditorStyles = () => makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    height: '100%',
    width: '100%',
    '&:hover .edit-actions': {
      opacity: 1,
      pointerEvents: 'all',
    },
  },
  editActions: {
    opacity: 0,
    transition: 'opacity 0.1s linear',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 5,
    top: 3,
    left: 3
  },
  editAction: {
    borderRadius: '50%',
    height: '1.5rem',
    width: '1.5rem',
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.dark() ? theme.palette.background.border01 : "#dee3ea !important",
    background: theme.dark() ? theme.palette.background.main : theme.palette.background.default,
    color: theme.palette.text.secondary,
    marginRight: 5,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.dark() ? theme.palette.background.main : theme.palette.background.default,
    },
    '&.Mui-disabled': {
      display: 'none',
    },
  },
  editActionLarge: {
    height: 35,
    width: 35
  },
  popupButton: {
    margin: 5,
    padding: 8,
    "& svg": {
      height: 25,
      width: 25
    }
  },
  editIcon: {
    transform: 'rotateZ(45deg)',
    fill: 'currentColor',
  },
  editActionActive: {
    fill: 'currentColor',
  },
  editor: {
    background: theme.palette.background.chessboard.background,
    backgroundImage: `linear-gradient(45deg, ${theme.palette.background.chessboard.square} 25%, transparent 25%), linear-gradient(-45deg, ${theme.palette.background.chessboard.square} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${theme.palette.background.chessboard.square} 75%), linear-gradient(-45deg, transparent 75%, ${theme.palette.background.chessboard.square} 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    backgroundColor: 'none',
  },
}));
