import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/styles";
import { showPreview } from "../../../../actions/status";
import ToggleButton from "../../ToggleButton";

const styles = () => makeStyles((theme) => ({
  root: {
    "& div": {
      color: theme.dark() ? theme.palette.text.secondary : "#7a7a7c",
    },
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.dark() ? theme.palette.icon.primary : theme.palette.background.border02,
    },
    "& .MuiSwitch-track": {
      backgroundColor: theme.dark() ? theme.palette.icon.primaryBg : theme.palette.background.border01,
    },
    '& span.MuiFormControlLabel-label': {
      fontSize: '0.75em !important',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '1px',
      },
    },
  },
}), { meta: 'PreviewToggle' });

/**
 * Control to toggle the preview lightbox in the Composer on and off.
 */
const PreviewToggle = ({ preview, showPreview, isPhoneSize }) => {
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  if (!isPhoneSize) return null;
  return (
    <div className={classes.root}>
      <ToggleButton label="Preview" value="preview" className={classes.root} checked={preview !== undefined ? preview : !isPhoneSize} onChange={(checked) => showPreview(checked)}/>
    </div>
  );
};

const mapDispatchToProps = {
  showPreview
};

function mapStateToProps(state) {
  return { preview: state.app.preview };
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewToggle);
