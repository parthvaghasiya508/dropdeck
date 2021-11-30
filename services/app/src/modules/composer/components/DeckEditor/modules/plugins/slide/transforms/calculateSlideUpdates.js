import { Path } from "slate";
import ObjectUtils from "../../../../../../../../common/util/ObjectUtils";
import { generateSlide } from "../../../../../../../../common/slide/SlideFactory";
import { Slide } from "../../../../../../../../common/slide/Slide";
import { logger } from "../../../../../../../../common/util/logger";
import { SLIDE } from "../../component/slide/type";

/**
 * Determine the set of slides, by ID, which have changed between subsequent content states.
 * @param content
 * @param id
 * @returns {undefined|{id}}
 */
export const calculateSlideUpdates = (previousContent, newContent, previousSlides, theme, deckId) => {
  const previousSlideContent = toMapById(previousContent);
  const newSlideContent = toMapById(newContent);
  let hasChanged = false;
  const newSlides = [];

  newContent.forEach((node, index) => {
    if (node.type === SLIDE) {
      const slideId = node.id;
      const prev = previousSlideContent[slideId];
      const path = [index];

      if (!prev) {

        // Adding a new slide.
        logger.trace(`Adding new slide ${slideId}`);
        newSlides.push(generateSlide(node, deckId, path, Slide.View.LIGHTBOX, theme));
        hasChanged = true;

      } else if (!ObjectUtils.shallowEquals(prev.node, node)) {

        // Slide has been modified.
        logger.trace(`Modifying slide ${slideId}`);
        newSlides.push(generateSlide(node, deckId, path, Slide.View.LIGHTBOX, theme));
        hasChanged = true;

      } else {

        const previousSlide = prev.index < previousSlides.length ? previousSlides[prev.index] : undefined;
        if (previousSlide && previousSlide.id === slideId) {

          // Check if the node that generated ther previous slide differs from the current node.
          // Slide has been modified.
          if (previousSlide.node && !ObjectUtils.shallowEquals(previousSlide.node, node)) {
            logger.trace(`Modifying slide ${slideId} - slide node differs`);
            newSlides.push(generateSlide(node, deckId, path, Slide.View.LIGHTBOX, theme));
            hasChanged = true;

          } else {

            // No change to content - retain the timestamp of the previous slide.
            const oldPath = previousSlide.path;
            if (!Path.equals(oldPath, path)) {
              hasChanged = true;
              logger.trace(`No change to  slide ${previousSlide.id} but now at a different path ${path}`);
            } else {
              logger.trace(`No change to  slide ${previousSlide.id}`);
            }

            const copyOfSlide = Slide.shallowClone(previousSlide);
            copyOfSlide.timeStamp = previousSlide.timeStamp; // retain the old timestamp but with a fresh object
            copyOfSlide.path = path; // the slide may be at a different path
            newSlides.push(copyOfSlide);

          }

        } else {

          // Slide has been modified - note that this shouldn't really happen
          logger.trace(`Missing slide ${slideId} - generating. Got back this slide at index ${prev.index}:`);
          newSlides.push(generateSlide(node, deckId, path, Slide.View.LIGHTBOX, theme));
          hasChanged = true;

        }
      }
    }
  });

  // Finally check if slides have been removed.
  for (let i = 0; i < previousSlides.length; i++) {
    const node = previousSlides[i];
    const slideId = node.id;
    const current = newSlideContent[slideId];
    if (!current) {
      hasChanged = true;
      break;
    }
  }

  return { hasChanged, slides: newSlides };
};

const toMapById = (content) => {
  const map = {};
  if (content && Array.isArray(content)) {
    let index = 0;
    for (let i = 0; i < content.length; i++) {
      const node = content[i];
      if (node.type === SLIDE) {
        if (node.id) {
          const { id } = node;
          const path = [i];
          map[id] = { node, id, index, path };
        }
        index++;
      }
    }
  }
  return map;
};
