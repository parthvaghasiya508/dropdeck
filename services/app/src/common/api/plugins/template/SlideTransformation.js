/**
 * Transformation applied to a whole slide.
 */
export default class SlideTransformation {
  constructor({ remixName, remix, palette, id }) {
    this.id = id || remixName;
    this.remixName = remixName;
    if (!this.remixName && remix) {
      this.remixName = remix.name();
    }
    this.palette = palette;
  }
}
