import React from 'react';
import * as PropTypes from 'prop-types';
import LoadingStatusIndicator from './LoadingStatusIndicator';
import { LoadingState } from '../../../../api/Constants';

/**
 * Indicates whether the application is communicating with the API for major state changes.
 *
 * @param status
 * @returns {null|*}
 * @constructor
 */
const LoadingStatusIndicatorContainer = ({ status = LoadingState.NONE }) => (
  <LoadingStatusIndicator status={status} />
);

export default LoadingStatusIndicatorContainer;

LoadingStatusIndicatorContainer.propTypes = {
  status: PropTypes.string,
};
LoadingStatusIndicatorContainer.defaultProps = {
  status: LoadingState.NONE,
};
