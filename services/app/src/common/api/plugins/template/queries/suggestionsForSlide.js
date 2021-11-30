import Suggestions from "../../../sdk/services/Suggestions";
import { logger } from "../../../../util/logger";
import { processUnsplashResults } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/transforms/processUnsplashResults";

export const suggestionsForSlide = (slideText) => () => {
  if (slideText && slideText.length > 0) {
    const t0 = new Date().getTime();
    return Suggestions.forSlide(slideText, 3)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        return undefined;
      })
      .then(({ images, sentiment, query }) => {
        const t1 = new Date().getTime();
        logger.debug(`Getting suggestions from backend took ${t1 - t0} ms`);
        if (images) {
          return processUnsplashResults(images, query || slideText)
            .then((imageNodes) => ({
              images: imageNodes,
              sentiment,
            }));
        }
      });
  }
  return new Promise((resolve) => resolve());
};
