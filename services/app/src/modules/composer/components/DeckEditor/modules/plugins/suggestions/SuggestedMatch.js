import ComponentService from "../../../../../../../common/api/plugins/ComponentService";

export class SuggestedMatch {
  constructor({ target = null, focus = null, search = '', index = 0, expression = null, currentType = null, keyboardIndex = -1, anchor = null }) {
    this.target = target;
    this.search = search;
    this.focus = focus;
    this.index = index;
    this.keyboardIndex = keyboardIndex;
    this.expression = expression;
    this.currentType = currentType;
    this.service = ComponentService.instance();
    this.anchor = anchor;
  }

  reset() {
    this.target = null;
    this.focus = null;
    this.search = '';
    this.index = 0;
    this.expression = null;
    this.currentType = null;
    this.anchor = null;
  }

  /**
   * Indicates whether the currently has an active type-ahead match.
   *
   * @returns {null|boolean}
   */
  isActive() {
    return this.target && this.suggestions().length > 0;
  }

  suggestions() {
    return this.search !== null ? this.service.suggest(this.search.toLowerCase(), this.currentType) : [];
  }
}
