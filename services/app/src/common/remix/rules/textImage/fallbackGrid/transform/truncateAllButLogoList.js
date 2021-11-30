import { applySequencing } from "../../../../../slide/transforms/clustering/clustering";
import { skipEmptyParagraphs } from "../../../../RemixEngine";
import { logger } from "../../../../../util/logger";
import { LOGO_LIST } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logoList/type";

export const truncateAllButLogoList = (max) => (nodes) => {
  const truncated = [];
  let c = 0;
  let lastType;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    truncated.push(node);
    if (node.type && node.type === LOGO_LIST) {
      if (lastType !== LOGO_LIST) {
        c++; // count a sequence of logo-list as one component
      }
    } else {
      c++;
    }
    lastType = node.type;
    if (c === max) {
      break;
    }
  }
  logger.debug(`Truncated a list of ${nodes.length} elements to ${truncated.length} elements`);
  return applySequencing(truncated, skipEmptyParagraphs);
};
