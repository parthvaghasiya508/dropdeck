/**
 * Extends the editor by registering void and inline elements.
 *
 * @param editor Slate editor instance.
 */
export const withInlineVoids = (plugins) => (editor) => {

  const voidTypes = plugins
    .map((plugin) => (plugin.isVoid === true && plugin.type ? plugin.type : null))
    .filter((entry) => entry !== null);

  const inlineTypes = plugins
    .map((plugin) => (plugin.isInline === true && plugin.type ? plugin.type : null))
    .filter((entry) => entry !== null);

  const { isVoid, isInline } = editor;

  editor.isVoid = (element) => (element.type && voidTypes.includes(element.type)) || isVoid(element);

  editor.isInline = (element) => (element.type && inlineTypes.includes(element.type)) || isInline(element);

  return editor;
};
