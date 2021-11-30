import { SLIDE } from "../../composer/components/DeckEditor/modules/plugins/component/slide/type";
import { IMAGE } from "../../composer/components/DeckEditor/modules/plugins/component/media/image/type";

/**
 * Get first image in a deck!
 *
 * @param content
 * @returns {null|*}
 */
export const getFirstImage = (content) => {
  for (let i = 0; i < content.length; i++) {
    if (content[i].type === SLIDE) {
      for (let el = 0; el < content[i].children.length; el++) {
        const node = content[i].children[el];
        if (node.type === IMAGE) {
          return node.settings;
        }
      }
    }
  }
  return null;
};
