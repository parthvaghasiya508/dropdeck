import { logger } from "../../../../../../../common/util/logger";

const INITIAL_SCALING = 0.9;

/**
 * Calculate a down-scaling factor between (0, 1] by starting with small increments
 * and aggressively increasing the steps (as a power of the existing scaling factor).
 * This means we will reach a fixed point lower bound in fewer steps than e.g.
 * linear down-scaling.  At each round of downscaling, we decrease the scaling factor
 * by squaring the previous scaling factor, or 0.9 at the first round.
 * This means that after n rounds of downscaling we have a scaling factor of
 *
 *   0.9^{2^n}
 *
 *
 * @param scrollHeight
 * @param clientHeight
 * @param scrollWidth
 * @param clientWidth
 * @returns {number}
 */
export const greedyDownScaling = (currentScalingFactor) => () => {
  if (currentScalingFactor > 1 || currentScalingFactor <= 0) {
    logger.error(`Current scaling factor is ${currentScalingFactor} and is outside of the valid (0, 1] region`);
    return 1;
  }
  if (currentScalingFactor === 1) {
    return INITIAL_SCALING;
  }
  return currentScalingFactor ** 2;
};
