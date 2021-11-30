import { makeStyles } from "@material-ui/styles";
import Colors from "../../../../../../../../Colors";

export const imageComposerStyles = (selected, theme, backgroundColor) => {
  const composerImageStyles = {
    border: `1px solid ${theme.dark() ? Colors.dark.base.medium : "#DADADB"}`,
    background: backgroundColor || '#fff',
    color: Colors.dark.base.medium,
    padding: '2px',
    margin: '5px 0px -1px 0px', // styling for when in center of stack
    borderRadius: '3px',
    overflow: 'hidden',
    display: 'inline-block',
    lineHeight: '2.2',
    cursor: 'pointer',
    caretColor: 'transparent', // Note: We need an IE/Edge replacement for this property
    transition: 'all 0.2s ease-in-out',
  };

  if (selected) {
    composerImageStyles.boxShadow = `inset 0 0 0 1px ${theme.palette.primary.main}, inset 0 0 0 3px rgba(255,255,255,1)`;
    composerImageStyles.border = `1px solid ${theme.palette.primary.main}`;
    composerImageStyles.borderRadius = '3px';
  }

  return composerImageStyles;
};

export const imageWrapperStyles = (url, options = {}) => (
  {
    backgroundImage: `url("${url}")`,
    backgroundSize: options.backgroundSize || 'cover',
    transform: options.transform || 'scale(1)',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    width: '64px',
    height: '40px',
    display: 'inline-block',
    borderRadius: '1px',
    float: 'left',
    margin: '0',
    cursor: 'pointer',
  });

export const replaceButtonStyles = () => makeStyles((theme) => ({
  image: {
    margin: '0 !important',
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& .replace-container": {
      "& button": {
        display: "block",
        textTransform: "unset"
      },
      marginLeft: 4,
      opacity: 0,
      transform: "scale(0.75) translateX(-25%)",
      transition: "opacity 250ms ease-in, transform 250ms ease-in",
      "&:hover": {
        opacity: "unset",
        transform: "scale(0.85)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out",
      }
    },
    "&:hover .replace-container, &.active .replace-container": {
      opacity: 0.75,
      transform: "scale(0.8) translateX(0%)",
      transition: "opacity 150ms ease-out, transform 150ms ease-out"
    },
  },
}));
