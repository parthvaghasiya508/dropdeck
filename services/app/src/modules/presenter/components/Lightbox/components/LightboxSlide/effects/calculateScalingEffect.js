import { slideIdentifierClassName } from "../../../../Slide/queries/slideIdentifierClassName";
import { logger } from "../../../../../../../common/util/logger";

export const calculateScalingEffect = ({
  calculateFontScaling,
  slide,
  remix,
  calculateScalingRefs,
  playerContext,
}) => () => {
  if (calculateFontScaling) {
    const slideIdClassName = slideIdentifierClassName(slide);
    let slideSelector = `.${slideIdClassName}`;
    if (playerContext) {
      slideSelector = `#${playerContext} ${slideSelector}`;
      logger.trace(`Restricting scaling selector to player context ${playerContext}: ${slideSelector}`);
    }

    // Default scaling selector.
    let cssSelector = slideSelector;
    if (remix && remix.scalingSelector && remix.scalingSelector.length > 0) {
      const containerSelectors = remix.scalingSelector.split(',');
      cssSelector = containerSelectors.map((selector) => `${slideSelector} > ${selector}`).join(', ');
    }
    logger.trace(`Scaling selector for slide ${slide.id}: ${cssSelector}`);
    const textContainers = document.querySelectorAll(cssSelector);
    if (textContainers) {
      calculateScalingRefs(textContainers);
    }
  }
};
