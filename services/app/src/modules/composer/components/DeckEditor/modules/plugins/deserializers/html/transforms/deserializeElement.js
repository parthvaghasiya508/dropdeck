import { jsx } from 'slate-hyperscript';

export const deserializeElement = ({
  plugins,
  el,
  children,
}) => {
  const type = el.getAttribute('data-slate-type') || el.nodeName;

  const elementDeserializers = plugins.reduce(
    (obj, { deserialize: deserializePlugin }) => {
      if (deserializePlugin?.element) {
        obj = { ...obj, ...deserializePlugin.element };
      }
      return obj;
    },
    {}
  );

  if (elementDeserializers[type]) {
    const attrs = elementDeserializers[type](el);

    return jsx('element', attrs, children);
  }
};
