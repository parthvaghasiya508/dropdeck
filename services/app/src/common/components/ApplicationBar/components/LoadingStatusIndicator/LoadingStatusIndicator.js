import React, { useCallback } from 'react';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudOffIcon from '@material-ui/icons/CloudOff';

import CloudDoneIcon from '@material-ui/icons/CloudDone';
import { makeStyles } from '@material-ui/styles';
import * as PropTypes from 'prop-types';
import { LoadingState } from '../../../../api/Constants';

const styles = () => makeStyles((theme) => ({
  root: {
    transition: 'all 0.2s ease',
    color: theme.dark() ? theme.palette.text.secondary : '#b9c0cb',
    opacity: '1',
  },
}), { meta: 'LoadingStatusIndicator' });

const getIndicator = (status) => {
  switch (status) {
    case LoadingState.LOADING:
      return <CloudDownloadIcon color="action" fontSize="small" />;
    case LoadingState.UPDATING:
      return <CloudUploadIcon color="action" fontSize="small" />;
    case LoadingState.ERROR:
      return <CloudOffIcon color="secondary" fontSize="small" />;
    case LoadingState.DONE:
      return <CloudDoneIcon color="inherit" fontSize="small" />;
    case LoadingState.NONE:
      return null;
    default:
      return null;
  }
};

/**
 * Presentational component for indicating whether we are loading/updating server etc.
 *
 * @param status
 * @returns {*}
 * @constructor
 */
const LoadingStatusIndicator = ({ status = LoadingState.NONE }) => {
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  return (
    <div id="status-status-indicator" className={classes.root}>{getIndicator(status)}</div>
  );
};

export default LoadingStatusIndicator;

LoadingStatusIndicator.propTypes = {
  status: PropTypes.string,
};
LoadingStatusIndicator.defaultProps = {
  status: LoadingState.NONE,
};
