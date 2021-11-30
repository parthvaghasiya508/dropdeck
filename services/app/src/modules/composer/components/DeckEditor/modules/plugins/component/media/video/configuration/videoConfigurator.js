import { Editor, Transforms } from 'slate';
import { fetchVideoMetadata } from "../queries/fetchVideoMetadata";
import { buildVideoNode } from "../transforms/buildVideoNode";

export const videoConfigurator = (url) => (editor, node, path, resolve) => {
  fetchVideoMetadata(url)
    .then((settings) => {
      if (!settings) {
        resolve();
      }
      Editor.withoutNormalizing(editor, () => {
        Transforms.setNodes(editor, buildVideoNode(settings), { at: path });
        resolve();
      });
    });
};
