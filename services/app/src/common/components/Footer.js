import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary" align="center" style={{ textTransform: "uppercase", fontSize: '0.7em', opacity: '0.5', }}>
      {'Copyright © '}
      <Link color="inherit" href="https://dropdeck.com/">
        Dropdeck
      </Link>
      {' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const Footer = () => (
  <div style={{ padding: 20, textAlign: "center", width: "80%", position: "absolute", bottom: 10, }}>
    <Copyright/>
  </div>
);
export default Footer;
