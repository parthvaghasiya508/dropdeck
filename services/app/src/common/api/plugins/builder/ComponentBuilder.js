import uuid from "react-uuid";
import { ComponentMappings } from "./ComponentMappings";
import { SLIDE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/slide/type";
import { DynamicArgs } from "./DynamicArgs";
import { groupBuilder } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/groups/components/group/groupBuilder";
import { RemixRule } from "../../../remix/match/RemixRule";
import SlideTransformation from "../template/SlideTransformation";

const evaluate = (builder, args, slide) => {
  if (!args || args.length === 0) {
    return new Promise((resolve) => resolve(builder()));
  }
  if (args.length === 1) {
    const [dyna] = args;
    if (dyna instanceof DynamicArgs) {
      return dyna.evaluate().then((dynaArgs) => builder(...dynaArgs));
    }
  }
  return new Promise((resolve) => resolve(builder(...args)));
};

export class ComponentBuilder extends ComponentMappings {

  constructor() {
    super();
    const instance = new Proxy(this, {
      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        }
        const { builder } = obj.mappings[prop];
        return builder;
      }
    });
    ComponentBuilder.__singleton = instance;
    return instance;
  }

  /**
   * Build a slide template.
   *
   * @param settings template settings
   * @returns {TemplateBuilder}
   */
  template = (settings) => new TemplateBuilder(this.mappings, settings);

  /**
   * Build a slide component.
   *
   * @param settings slide settings
   * @returns {SlideBuilder}
   */
  slide = (settings = {}, children = []) => new SlideBuilder(this.mappings, settings, children);

  /**
   * Build a group container.
   *
   * @returns {GroupBuilder}
   */
  group = (children = []) => new GroupBuilder(this.mappings, children);

  static instance() {
    return ComponentBuilder.__singleton === undefined ? new ComponentBuilder() : ComponentBuilder.__singleton;
  }
}

/**
 * Wrapper for building a slide container.
 */
class SlideBuilder {

  constructor(mappings, settings = {}, children = []) {
    this.settings = settings;
    this.children = children;
    const instance = new Proxy(this, {
      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        }
        return (...args) => {
          if (!mappings.hasOwnProperty(prop)) {
            throw new Error(`${prop} is not a valid type`);
          }
          const { builder } = mappings[prop];
          const value = builder(...args);
          if (value) {
            obj.children.push(value);
          }
          return instance;
        };
      }
    });
    return instance;
  }

  build = () => {
    const slide = {
      type: SLIDE,
      id: uuid(),
      children: this.children,
    };
    if (this.settings) {
      slide.settings = this.settings;
    }
    return slide;
  };
}

/**
 * Wrapper for building a group container.
 */
class GroupBuilder extends SlideBuilder {

  constructor(mappings, children = []) {
    super(mappings, undefined, children);
  }

  build = () => groupBuilder(...this.children);
}

/**
 * Wrapper for building a table row container.
 */
class TableRowBuilder extends SlideBuilder {

  constructor(mappings, children = []) {
    super(mappings, undefined, children);
  }

  build = () => groupBuilder(...this.children);
}

/**
 * Wrapper for building a slide template, a list of slide elements.
 */
class TemplateBuilder extends SlideTransformation {

  constructor(mappings, { name, remix, palette, rule, featured = false, ranking }) {
    super({ remix, palette, id: name });
    this.name = name;
    this.builders = [];
    this.rule = rule;
    this.featured = featured;
    this.ranking = ranking;
    const instance = new Proxy(this, {
      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        }
        return (...args) => {
          if (!mappings.hasOwnProperty(prop)) {
            throw new Error(`${prop} is not a valid type`);
          }
          const { builder, type } = mappings[prop];
          const value = builder(...args);
          if (value) {
            obj.builders.push({ builder, args });
          }
          return instance;
        };
      }
    });
    return instance;
  }

  /**
   * Copy nodes across to the template.
   *
   * @param nodes
   */
  add(...nodes) {
    this.builders.push({ builder: () => nodes, args: [] });
  }

  /**
   * Evaluate the set of builders for extending the given slide node up to this template. Some of the
   * builder evaluation may be asynchronous, so this function accepts a resolve callback.
   */
  extendFrom() {
    return Array.prototype.concat.apply([], this.builders.map(({ builder, args }) => builder(...args)));
  }

  /**
   * Add a conditional rule for matching against an existing slide.
   *
   * @param matchers
   */
  when = (...matchers) => {
    this.rule = new RemixRule(...matchers);
    return this;
  }
}

/**
 * Utility to instantiate a component builder.
 */
export const componentBuilder = () => ComponentBuilder.instance();
