import { templateLabel } from "./transforms/templateLabel";

export const template = () => new Template();

class Template {
  constructor() {
    this.id = '';
    this.nodes = [];
  }

  with(type, count = 1) {
    const term = (`${type}-${count}`).toLowerCase();
    if (this.id.length > 0) {
      this.id = `${this.id}_${term}`;
    } else {
      this.id = term;
    }
    this.nodes.push({ type, count });
    return this;
  }

  name() {
    return templateLabel(this);
  }
}
