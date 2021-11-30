import { logger } from "../../../../../../../common/util/logger";

// Discrete scaling steps; 1 = no down-scaling.
const steps = [0.9, 0.8, 0.69, 0.58, 0.45, 0.2];

/**
 * Calculate a down-scaling factor between (0, 1] by going through a sequence of predefined steps:
 *
 * 1.0
 * 0.9
 * 0.8
 * 0.69
 * 0.58
 * 0.45
 * 0.2 = overflow
 *
 * @returns {number}
 */
export const discreteDownScaling = (currentScalingFactor) => () => {
  if (currentScalingFactor > 1 || currentScalingFactor <= 0) {
    logger.error(`Current scaling factor is ${currentScalingFactor} and is outside of the valid (0, 1] region`);
    return 1;
  }
  for (let i = 0; i < steps.length; i++) {
    if (currentScalingFactor > steps[i]) {
      return steps[i] / currentScalingFactor;
    }
  }
  return 1;
};
