import { DEFAULT_SCALING } from "../../../../Slide/scalingLimits";
import { logger } from "../../../../../../../common/util/logger";
import { fontSizeFromWidth } from "../queries/fontSizeFromWidth";

/**
 * Reset the font scaling when the slide changes (content or width, or both).
 *
 * @param slide
 * @param width
 * @param calculateFontScaling
 * @param scalingLastModified
 * @param setNeedsCalculating
 * @param setScalingFactor
 * @param setScalingLastModified
 * @param setFontSize
 * @param remix
 * @returns {function(...[*]=)}
 */
export const resetFontScalingEffect = ({
  scalingFactor,
  slide,
  width,
  setNeedsCalculating,
  setScalingFactor,
  setFontSize,
  remix,
}) => () => {
  if (slide && width > 0) {
    if (!scalingFactor) {
      logger.trace(`Slide ${slide.id} has no scaling - resetting slide scaling`);
    } else {
      logger.trace(`Slide ${slide.id} has been modified - resetting slide scaling`);
    }
    setNeedsCalculating(true);
    const slideScaling = DEFAULT_SCALING;
    setScalingFactor(slideScaling); // reset the font scaling when the width changes
    setFontSize(fontSizeFromWidth(width, slideScaling, remix));
    // setScalingLastModified(timeStamp);
  }
};
