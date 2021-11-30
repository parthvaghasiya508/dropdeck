import { logger } from "../../../common/util/logger";

/**
 * Verify that the presentation has a valid cover ID.
 *
 * @param presentation presentation state.
 * @param content new content state.
 * @returns presentation with updated cover ID.
 */
export const verifyDeckCover = (presentation, content) => {
  if (!presentation.coverId) {
    if (content.length > 0) {
      presentation.coverId = content[0].id;
    }
  } else {
    // Check that the cover slide still exists:
    let coverSlideExists = false;
    for (let i = 0; i < content.length; i++) {
      const slideNode = content[i];
      if (slideNode.id === presentation.coverId) {
        coverSlideExists = true;
        break;
      }
    }

    if (!coverSlideExists) {
      if (content.length > 0) {
        logger.debug(`Cover slide ${presentation.coverId} no longer exists - resetting`);
        presentation.coverId = content[0].id;
      }
    }
  }
  return presentation;
};
