import { makeStyles } from "@material-ui/core/styles";
import LogoDark from "../../../../common/components/dropdeck-logo-preview-dark.png";
import LogoLight from "../../../../common/components/dropdeck-logo-preview.png";

export const previewSectionStyles = (readOnly, isPhoneSize) => makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: theme.palette.background.portfolio,
    [theme.breakpoints.down('md')]: {
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 100
    },
  },

  logo: {
    display: "block",
    backgroundImage: `url(${theme.palette.type === "dark" ? LogoDark : LogoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: 131,
    height: 17,
    width: 131,
    textDecoration: 'none',
    marginLeft: 8,
    opacity: theme.dark() ? 0.8 : 1,
    transform: "scale(1)",
    "&:hover": {
      opacity: 1,
      transform: "scale(1.05)",
      transition: "transform 100ms ease"
    },
  },
}));
