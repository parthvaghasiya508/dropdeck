/**
 * A class that supports properties whose names, as well as values, may be dynamically declared. An instance of the
 * Dyno class is initialised with a list of types, or properties, that should be declared on the class, as well as a
 * generic (obj, prop, arg) handler for processing a dynamic property call.
 */
export class Dyno {

  constructor(types, handler) {
    const mappings = {};
    for (let i = 0; i < types.length; i++) {
      if (Array.isArray(types[i])) {
        // eslint-disable-next-line prefer-destructuring
        mappings[types[i][0]] = types[i][1];
      } else {
        mappings[types[i]] = types[i];
      }
    }

    const instance = new Proxy(this, {
      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        }
        return (arg) => {
          if (!mappings.hasOwnProperty(prop) || !instance[prop]) {
            throw new Error(`${prop} is not a valid type`);
          }

          const propToUse = mappings[prop];
          handler(obj, propToUse, arg);

          return instance;
        };
      }
    });

    return instance;
  }
}
