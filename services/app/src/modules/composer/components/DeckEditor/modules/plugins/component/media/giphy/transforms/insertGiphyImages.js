import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { insertImages } from "../../image/transforms/insertImage";
import { processGiphyResults } from "./processGiphyResults";

export const insertGiphyImages = ({ editor, path, image, query, callback }) => {
  processGiphyResults(image, query)
    .then((imageNodes) => {
      if (imageNodes) {

        const nodesAdded = insertImages(editor, imageNodes, {
          at: path,
          select: true
        });
        const newPath = path.length === 2 ? [path[0], path[1] + nodesAdded] : path;

        // Path of the original paragraph where the image was triggered from.
        Transforms.select(editor, newPath);
        ReactEditor.focus(editor);
      }
      callback();
    });
};
