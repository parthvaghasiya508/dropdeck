/**
 * Check error message for 401 and redirect.
 *
 * @param error
 * @returns {{networkError}|*}
 */
export const redirectOnError = (error) => {
  if (error && error.response && error.response.status && (error.response.status === 401 || error.response.status === 403)) {
    window.location = `/start`;
  } else if (error && !error.response) {
    // window.location = `/error`;
  } else {
    return error;
  }
};
