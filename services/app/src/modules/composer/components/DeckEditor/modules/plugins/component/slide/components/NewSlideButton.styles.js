import { makeStyles } from "@material-ui/styles";

/**
 * Local styles.
 *
 * @type {(props?: any) => ClassNameMap<"button"|"root"|"text">}
 */
export const newSlideButtonStyles = () => makeStyles((theme) => ({
  root: {
    padding: '6px 8px',
    margin: '0 0 0 -8px',
    display: "flex",
    alignItems: "center",
    fontSize: "0.725em",
    cursor: 'text',
    "&:hover": {
      "& button": {
        transform: "scale(0.6)",
        transition: "transform 300ms ease",
      },
      "& span.new-slide-helper-text": {
        fontWeight: '500',
        transform: "translateX(20%)",
        transition: "transform 300ms ease",
        "&.scaling": {
          transform: "translateX(50%)",
        }
      },
    },
    "& .new-slide-group": {
      paddingRight: '30px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: "center",
    },
  },
  button: {
    zIndex: 1,
    transform: "scale(0.6)",
  },
  text: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    transform: "translateX(-25%)",
  },
}), { meta: 'NewSlideButton' });
