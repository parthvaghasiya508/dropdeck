import { logger } from "../../../../../../../common/util/logger";

const DOWNSCALING_MIN = 0.9;
const DOWNSCALING_MAX = 0.8;

/**
 * Calculate a down-scaling factor between (0, 1] based on the amount of overflow either in the horizontal
 * or vertical direction of an element. At each round of downscaling, we decrease the scaling factor
 * by a factor between 0.8 - 0.9, which means that after n rounds of downscaling we have a scaling factor
 * between
 *
 *   [0.8^n, 0.9^n]
 *
 * @param scrollHeight
 * @param clientHeight
 * @param scrollWidth
 * @param clientWidth
 * @returns {number}
 */
export const linearDownScaling = ({ scrollHeight, clientHeight, scrollWidth, clientWidth }) => {
  const heightScaling = scrollHeight > 0 ? clientHeight / scrollHeight : 1;
  logger.trace(`Scaling height by a factor of ${heightScaling}`);
  const widthScaling = scrollWidth > 0 ? clientWidth / scrollWidth : 1;
  logger.trace(`Scaling width by a factor of ${widthScaling}`);

  // We want scaling between DOWNSCALING_MAX and DOWNSCALING_MIN:
  return DOWNSCALING_MIN; // Math.max(Math.min(widthScaling, heightScaling, DOWNSCALING_MIN), DOWNSCALING_MAX);

};
