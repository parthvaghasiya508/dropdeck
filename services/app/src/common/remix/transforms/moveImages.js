import { applyClustering, nodesToTrees } from "../../slide/transforms/clustering/clustering";
import { skipEmptyParagraphs } from "../RemixEngine";
import { IMAGE } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";

const sortImages = (markup, direction = -1) => {
  const nodes = nodesToTrees(markup);
  const sorted = [...nodes].sort((first, second) => {
    if (first.type === IMAGE) {
      return (second.type === IMAGE) ? 0 : direction;
    }
    return 1;
  });
  return applyClustering(sorted, skipEmptyParagraphs, false); // don't re-assemble tree structure!
};

export const moveImagesFirst = (markup) => sortImages(markup, -1);
