/**
 * Data provider with an initial set of images to suggest.
 */
import { DataProvider } from "./DataProvider";

export class DynamicDataProvider extends DataProvider {

  constructor(query, { images, user, companyBranding, sentiment, theme }) {
    super({ user, companyBranding, sentiment, theme });
    this.query = query;
    this.images = images;
  }

  process(template) {
    return new Promise((resolve, reject) => {
      resolve(template);
    });
  }

  image(defaultValue, index = 0) {
    if (this.images.length > index) {
      const img = this.images[index];
      return img.settings;
    }
    return defaultValue;
  }
}
