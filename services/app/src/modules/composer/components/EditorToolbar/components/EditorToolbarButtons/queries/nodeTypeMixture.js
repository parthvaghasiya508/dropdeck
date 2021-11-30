import { getComponentElements } from "../../../../DeckEditor/modules/plugins/component/toggleType/getComponentElements";
import { isPlainList } from "../../../../DeckEditor/modules/plugins/core/withCoreEditing";
import { isText } from "../../../../DeckEditor/modules/plugins/deserializers/transforms/isText";
import { ContainerTransforms } from "../../../../DeckEditor/services/transforms/ContainerTransforms";
import { COMPONENT_IN_GROUP_DEPTH } from "../../../../DeckEditor/services/transforms/GroupTransforms";
import { COMPONENT_IN_SLIDE_DEPTH } from "../../../../DeckEditor/services/transforms/SlideTransforms";

const isMixed = (voids, lists, text, collections, other) => {
  let n = 0;
  if (voids) n++;
  if (lists) n++;
  if (text) n++;
  if (other) n++;
  return n > 1;
};

export const nodeTypeMixture = (editor) => {
  const blockElements = getComponentElements(editor);
  let voids = false;
  let lists = false;
  let text = false;
  let grouped = false;
  let ungrouped = false;
  let other = false;
  if (blockElements) {
    for (let i = 0; i < blockElements.length; i++) {
      const [node, path] = blockElements[i];

      if (path.length === COMPONENT_IN_GROUP_DEPTH) {
        grouped = true;
      } else if (path.length === COMPONENT_IN_SLIDE_DEPTH) {
        ungrouped = true;
      }

      if (editor.isVoid(node)) {
        voids = true;
      } else if (isPlainList(node)) {
        lists = true;
      } else if (isText(node)) {
        text = true;
      } else {
        other = true;
      }
    }
  }
  const mixed = isMixed(voids, lists, text, other) || (grouped && ungrouped);
  return { lists, voids, text, other, mixed, grouped, ungrouped };
};
