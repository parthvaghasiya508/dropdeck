import { Editor, Transforms } from 'slate';
import { Objects } from "../../../../../../../common/util/Objects";

/**
 * Commands to write, read and remove custom settings on a Slate element.
 *
 * @param editor Slate editor
 * @returns {*} A modified Slate editor, with commands and constraints for working custom element properties.
 */
export const withSettings = (editor) => {

  editor.settings = (path) => ({
    get: (key) => {
      const [node,] = Editor.node(editor, path);
      if (node && node.settings !== undefined) {
        return node.settings[key];
      }
      return undefined;
    },

    setAll: (settings) => {
      const [node,] = Editor.node(editor, path);
      if (node) {
        Transforms.setNodes(editor, { settings }, { at: path });
      }
    },

    set: (key, value) => {
      const [node,] = Editor.node(editor, path);
      if (node) {
        const { settings } = node;
        const newSettings = settings ? Objects.fastClone(settings) : {};
        newSettings[key] = value;
        Transforms.setNodes(editor, { settings: newSettings }, { at: path });
      }
    },

    remove: (key) => {
      const [node,] = Editor.node(editor, path);
      if (node) {
        const { settings } = node;
        const newSettings = settings ? Objects.fastClone(settings) : {};
        delete newSettings[key];
        Transforms.setNodes(editor, { settings: newSettings }, { at: path });
      }
    },

    clear: () => {
      const [node,] = Editor.node(editor, path);
      if (node) {
        Transforms.unsetNodes(editor, 'settings', { at: path });
      }
    },

  });

  return editor;
};
