/**
 * Data provider that reflects back on the default values provided.
 */
import { FROM_UPLOAD } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/transforms/insertImage";
import { Moods } from "../../../../theme/Palette";

const getFullName = (user) => {
  if (user.givenName) {
    if (user.familyName) {
      return `${user.givenName} ${user.familyName}`;
    }
    return user.givenName;
  }
  if (user.familyName) {
    return user.familyName;
  }
  return undefined;
};

export class DataProvider {

  constructor({ user, companyBranding, sentiment, theme } = {}) {
    this.user = user;
    this.profile = user !== undefined ? {
      familyName: user.familyName,
      givenName: user.givenName,
      email: user.email,
      fullName: getFullName(user),
      picture: user.picture ? {
        from: FROM_UPLOAD,
        url: user.picture,
      } : undefined,
      company: user.company ? {
        name: user.company.name,
        branding: companyBranding,
      } : {},
    } : {};
    this.sentiment = sentiment || Moods.Neutral;
    this.theme = theme;
  }

  process(template) {
    return new Promise((resolve) => resolve(template));
  }

  image(defaultValue) {
    return defaultValue;
  }
}
