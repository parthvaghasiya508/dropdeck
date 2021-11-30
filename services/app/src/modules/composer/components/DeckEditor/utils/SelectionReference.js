export default class SelectionReference {
  constructor(domRange) {
    this.rect = domRange.getBoundingClientRect();
  }

  getBoundingClientRect() {
    return this.rect;
  }

  get clientWidth() {
    return this.rect.width;
  }

  get clientHeight() {
    return this.rect.height;
  }
}
