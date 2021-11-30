/**
 * Get new direction if updated
 */
export const getNewDirection = (previousDir, dir) => {
  if (!dir && previousDir) {
    return '';
  }

  if (dir === 'top' && previousDir !== 'top') {
    return 'top';
  }

  if (dir === 'bottom' && previousDir !== 'bottom') {
    return 'bottom';
  }
};
