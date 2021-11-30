import { Editor, Transforms } from 'slate';
import { MAP } from "../type";

export const mapConfigurator = (location) => (editor, node, path, resolve) => {
  Editor.withoutNormalizing(editor, () => {
    Transforms.setNodes(editor, { type: MAP, settings: { location } }, { at: path });
    resolve();
  });
};
