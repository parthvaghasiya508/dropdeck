const MAX_LABEL_LENGTH = 9;
const ELLIPSE = '...';
const OFFSET = 2;

/**
 * Trim labels in a data series.
 *
 * @param data
 * @returns {*}
 */
export const trimLabels = (data) => data.map((point) => ({
  ...point,
  label: trimLabel(point.label),
}));

export const trimLabel = (label) => (label && label.length > MAX_LABEL_LENGTH + OFFSET ? `${label.substring(0, MAX_LABEL_LENGTH)}${ELLIPSE}` : label);
