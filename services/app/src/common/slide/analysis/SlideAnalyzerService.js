import { GROUP_COLLECTION } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/groups/type";
import { GROUP } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/groups/components/group/type";

export default class SlideAnalyzerService {

  static process(analyzer, slideNode) {

    const iterateNodes = (nodes) => {
      for (let j = 0; j < nodes.length; j++) {
        const child = nodes[j];
        if ((child.type === GROUP_COLLECTION || child.type === GROUP) && child.children) {
          iterateNodes(child.children);
        } else if (!analyzer.type || (analyzer.type && analyzer.type === child.type)) {
          analyzer.add(child);
        }
      }
    };

    /**
     * Analysing all children or only the ones that match the analyzers type.
     */
    iterateNodes(slideNode.children);

    return analyzer.process();
  }

}
