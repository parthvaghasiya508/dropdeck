/**
 * Find matching template and remix suggestions for a slide structure. When there are minTemplates or more,
 * we don't return remix suggestions.
 *
 * @param query
 * @param slideNode
 */
import TemplateService from "../../../../../../../common/api/plugins/template/TemplateService";
import { RemixEngine, skipEmptyParagraphs } from "../../../../../../../common/remix/RemixEngine";
import { withNumbering } from "../../../../../../../common/slide/transforms/clustering/withNumbering";
import { nodesToTrees } from "../../../../../../../common/slide/transforms/clustering/clustering";
import SlideTransformation from "../../../../../../../common/api/plugins/template/SlideTransformation";

const templateService = TemplateService.instance();
const remixEngine = RemixEngine.instance;

/**
 * Fetch a set of transformation suggested for the current slide. These can be templates or applications
 * of a remix or palette.
 *
 * @param query text of the current slide.
 * @param slideNode Slate data structure of the current slide; undefined if empty.
 * @param position the position of the current slide, indexed from 0.
 * @param minTemplates
 * @returns {*}
 */
export const getTransformationsForSlide = (query = '', slideNode, position, minTemplates = 5) => {
  const templateMatches = templateService.search(query, slideNode, position);
  const remixTransformations = [];
  if (templateMatches.length < minTemplates && slideNode && slideNode.children.length > 0) {
    const slideEncoding = withNumbering(nodesToTrees(slideNode.children, skipEmptyParagraphs));
    const matchingRemixes = remixEngine.matches(slideEncoding, true);
    if (matchingRemixes && matchingRemixes.length > 0) {
      const currentRemix = slideNode.settings?.remix;
      matchingRemixes.forEach(({ name, remix }, i) => {
        if ((!currentRemix && i > 0) || (currentRemix && name !== currentRemix)) {
          remixTransformations.push({
            id: `remix-${name}`,
            template: new SlideTransformation({ remixName: name })
          });
        }
      });
    }
  }
  return remixTransformations.length > 0 ? [...templateMatches, ...remixTransformations] : templateMatches;
};
