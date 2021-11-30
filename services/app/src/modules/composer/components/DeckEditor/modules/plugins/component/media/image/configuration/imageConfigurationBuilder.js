import { insertUnsplashImages } from "../transforms/insertUnsplashImages";

export const imageConfigurationBuilder = ({ image, query }) => (editor, node, path, resolve) => {
  insertUnsplashImages({
    editor,
    image,
    query,
    path,
    callback: resolve,
  });
};
