import { insertGiphyImages } from "../transforms/insertGiphyImages";

export const giphyConfigurationBuilder = ({ image, query }) => (editor, node, path, callback) => {
  insertGiphyImages({
    editor,
    image,
    query,
    path,
    callback,
  });
};
