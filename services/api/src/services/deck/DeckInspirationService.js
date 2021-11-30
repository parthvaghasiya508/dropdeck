import { Settings } from '@dropdeck/schema';
import { logger } from "../../util/logger.js";

const INSPIRATION = 'inspiration';

export const DeckInspirationService = {

  /**
   * Get a list of tags for inspiration decks.
   *
   * @returns a list of tags for inspiration decks.
   */
  tags: async () => {
    const setting = await Settings.findOne({ key: INSPIRATION }).exec()
      .catch((e) => {
        logger.error(`Error when fetching system settings for ${INSPIRATION}:`);
        logger.error(e);
      });
    if (setting !== undefined && setting !== null && setting.values && setting.values.length > 0) {
      const inspiration = setting.values[0];
      return Object.keys(inspiration);
    }
    return [];
  },

  get: async (tag) => {
    const setting = await Settings.findOne({ key: INSPIRATION }).exec()
      .catch((e) => {
        logger.error(`Error when fetching system settings for ${INSPIRATION}:`);
        logger.error(e);
      });
    if (setting !== undefined && setting.values && setting.values.length > 0) {
      return setting.values[0][tag];
    }
    return [];
  }

};
