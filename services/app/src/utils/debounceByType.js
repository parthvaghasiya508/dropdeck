import debounce from "lodash.debounce";

export const debounceByType = (func, wait, options) => {
  const memory = {};

  return (...args) => {

    // use first argument as a key
    // its possible to use all args as a key - e.g JSON.stringify(args) or hash(args)
    const [searchTypeArg] = args;
    const searchType = `${searchTypeArg}`;

    if (typeof memory[searchType] === 'function') {
      return memory[searchType](...args);
    }

    memory[searchType] = debounce(func, wait, { ...options });
    return memory[searchType](...args);
  };
};
