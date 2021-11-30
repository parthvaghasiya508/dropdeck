import { calculateSlideUpdates } from "../components/DeckEditor/modules/plugins/slide/transforms/calculateSlideUpdates";
import { logger } from "../../../common/util/logger";

// Update slides.
export const sendSlideUpdates = (theme, deckId) => (currentSlides, setSlides, prevContent, nextContent) => {

  // See which slides have changed.
  const t0 = new Date().getTime();
  let t1;
  const { hasChanged, slides } = calculateSlideUpdates(prevContent, nextContent, currentSlides, theme, deckId);
  if (hasChanged) {
    t1 = new Date().getTime();
    setSlides(slides); // ???
    const t2 = new Date().getTime();
    logger.debug(`Updating slides took ${t2 - t0} ms: ${t1 - t0} ms to generate the slides + ${t2 - t1} ms to re-render`);
  }
};
