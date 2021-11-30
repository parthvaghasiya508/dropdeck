import IconButton from "@material-ui/core/IconButton";
import { PictureAsPdf } from "@material-ui/icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useState } from "react";
import { apiHost } from "../../../../../../App";
import Label from "../../../../../../common/components/controls/Label";
import { config } from "../../../../../../config";

const downloadUrl = (shortId) => `${apiHost()}${config.api.export.prefix}/decks/${shortId}.pdf`;

const styles = () => makeStyles((theme) => ({
  root: {

  },
  download: {
    color: "#eee",
    fontSize: "0.75rem",
    cursor: "pointer",
    textDecoration: "none",
    '&:active': {
      color: "#57FF00",
    },
    '&:hover': {
      color: "#57FF00",
    },
    '&:visited': {
      color: "#ccc",
    },
  },
  label: {
    color: theme.palette.popover.label,
    fontSize: 13
  },
}), { meta: 'ExportButton' });

const ExportButton = ({ presentation }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  const shortId = presentation.identifiers.short;
  const [downloading, setDownloading] = useState(false);

  const startDownload = () => {
    if (!downloading) {
      setDownloading(true);
      window.location.href = downloadUrl(shortId);
    }
  };
  useEffect(() => {
    if (downloading) {
      setTimeout(() => {
        setDownloading(false);
      }, 5000);
    }
  });
  return (
    <div className={classes.root}>
      <span>
        <IconButton variant="outlined" onClick={(e) => startDownload()} style={{ padding: 8, marginRight: 4, color: !downloading ? null : "#57FF00" }}>
          {!downloading ? <PictureAsPdf fontSize="small"/> : <CheckCircleIcon fontSize="small"/>}
        </IconButton>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
        <div style={{ display: "inline-block", cursor: "pointer" }} onClick={(e) => startDownload()}>
          <Label variant="span" onClick={(e) => startDownload()} className={classes.label} style={{ color: !downloading ? null : "#57FF00" }}>{!downloading ? "Download as PDF" : "Started download..."}</Label>
        </div>
      </span>
    </div>
  );
};
export default ExportButton;
