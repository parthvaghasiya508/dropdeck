export default class SlideComponent {

  /**
   * Builds a new SlideComponent instance.
   *
   * @param node
   * @param view
   * @param monitor
   * @param deckId
   * @param themeName
   * @param slideSettings
   */
  constructor({ node, view, monitor, deckId, themeName, slideSettings } = {}) {
    this.html = undefined;
    this.component = undefined;
    this.data = {};
    this.markupType = undefined;
  }

  setMarkupType(markupType) {
    this.markupType = markupType;
  }

  setHtml(html) {
    this.html = html;
  }

  setComponent(component) {
    this.component = component;
  }

}
