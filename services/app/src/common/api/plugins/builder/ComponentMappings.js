import ComponentService from "../ComponentService";

const camelCase = (str) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '');

/**
 * Base class used for various dynamic component mappings, such as templating and data building.
 */
export class ComponentMappings {

  constructor() {
    const { components } = ComponentService.instance();
    this.mappings = {};
    components.forEach((component) => {
      const { command, type, builder } = component;
      if (command && builder) {
        const syntax = camelCase(command);
        this.mappings[syntax] = { builder, type };
      }
    });
    return this;
  }
}
