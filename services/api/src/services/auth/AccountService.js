import { Settings } from '@dropdeck/schema';
import { logger } from "../../util/logger.js";

const ALLOWED_ORGANIZATIONS = 'allowedOrganizations';
const ALLOWED_USERS = 'allowedUsers';

const AccountService = {

  screenOrganization: async (organization) => {
    if (organization === null || organization === undefined) {
      logger.error(`Missing organization - not allowed`);
      return false;
    }

    const setting = await Settings.findOne({ key: ALLOWED_ORGANIZATIONS }).exec()
      .catch((e) => {
        logger.error(`Error when fetching system settings for ${ALLOWED_ORGANIZATIONS}:`);
        logger.error(e);
      });

    const organizationPatterns = setting ? setting.values : [];
    logger.debug(`Organization patterns: ${organizationPatterns}`);
    let organizationIsAllowed = false;
    organizationPatterns.forEach((setting) => {
      const organizationPattern = setting.values;
      if (organization.match(organizationPattern)) {
        organizationIsAllowed = true;
      }
    });
    return organizationIsAllowed;
  },

  screenUser: async (user) => {
    if (user === null || user === undefined) {
      logger.error(`Missing user - not allowed`);
      return false;
    }
    let userIsAllowed = false;
    const setting = await Settings.findOne({ key: ALLOWED_USERS }).exec()
      .catch((e) => {
        logger.error(`Error when fetching system settings for ${ALLOWED_USERS}:`);
        logger.error(e);
      });
    const userPatterns = setting ? setting.values : [];

    logger.debug(`User patterns: ${userPatterns}`);
    userPatterns.forEach((userPattern) => {
      if (user.match(userPattern)) {
        userIsAllowed = true;
      }
    });

    return userIsAllowed;
  }

};
export default AccountService;
