// We downscale when the content has reached this limit as
// a percentage of the overall scroll height.
import { logger } from "../../../../../../../common/util/logger";

export const getOverflowScaling = (elements, scalingFunction) => {
  const t0 = new Date().getTime();
  let scalingFactor = 1;
  if (elements) {
    elements.forEach((element) => {
      const scalingForElement = getOverflowScalingForElement(element, scalingFunction);
      if (scalingForElement < scalingFactor) {
        logger.trace(`Found smaller scaling factor ${scalingForElement}`);
        scalingFactor = scalingForElement;
      }
    });
  }

  const t1 = new Date().getTime();
  logger.trace(`Calculating overflow took ${t1 - t0} ms`);
  return scalingFactor;
};

const getOverflowScalingForElement = (element, scalingFunction) => {
  let scalingFactor = 1;
  if (element && element !== null) {
    const { scrollHeight, clientHeight, scrollWidth, clientWidth, } = element;
    const heightOverflows = (scrollHeight > clientHeight && scrollHeight > 0);
    const widthOverflows = (scrollWidth > clientWidth && scrollWidth > 0);

    // logger.trace(`scrollHeight ${scrollHeight} vs clientHeight ${clientHeight}`);
    // logger.trace(`scrollWidth ${scrollWidth} vs clientWidth ${clientWidth}`);
    // logger.trace(element);

    if (heightOverflows || widthOverflows) {
      scalingFactor = scalingFunction({ scrollHeight, clientHeight, scrollWidth, clientWidth });
    }
    return scalingFactor;
  }
  return scalingFactor;
};
