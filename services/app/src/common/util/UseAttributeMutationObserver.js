import useMutationObserver from "@rooks/use-mutation-observer";

/**
 * Listen for attribute changes in the DOM.
 *
 * @param ref
 * @param attribute
 * @param callback    Called with the `target`, and the mutation record.
 * @param values      Filter attributes recursively, with the last element optionally being the value.
 */
export const useAttributeMutationObserver = (ref, callback, ...values) => {
  const options = {
    attributes: true,
    childList: false,
    subtree: false
  };
  if (values && values.length > 0) {
    options.attributeFilter = [values[0]];
  }

  useMutationObserver(ref, (mutationList) => {
    for (let i = 0; i < mutationList.length; i++) {
      const mutation = mutationList[i];

      // Attribute matches
      if (mutation.type === "attributes") {
        if (values && values.length > 0) {
          let obj = mutation.target;
          for (let v = 0; v < values.length; v++) {
            const value = values[v];
            if (v === values.length - 1) {
              if (obj[value] || obj === value) {
                callback(mutation.target, mutation);
                break;
              }
            } else if (obj[value]) {
              obj = obj[value];
            }
          }
        } else {
          callback(mutation.target, mutation);
          break;
        }
      }
    }
  }, options);
};
