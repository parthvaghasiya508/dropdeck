import TrieSearch from "trie-search";
import { Node } from "slate";
import TemplateFactory from "./TemplateFactory";
import { isDynamicTemplate } from "./queries/isDynamicTemplate";
import { nodesToTrees } from "../../../slide/transforms/clustering/clustering";
import { logger } from "../../../util/logger";
import TemplateRuleMatch from "./TemplateRuleMatch";
import { withNumbering } from "../../../slide/transforms/clustering/withNumbering";
import { evaluateRules } from "../../../remix/match/queries/evaluateRules";
import { isPlainText } from "../../../../modules/composer/components/DeckEditor/modules/plugins/deserializers/transforms/isPlainText";
import { sortTemplateResults } from "./transforms/sortTemplateResults";
import { TemplateRanking } from "./TemplateRanking";

/**
 * Prepare an index document representation of a template.
 *
 * @param template
 */
const documentFor = (template) => {
  let templateBuild = template();
  if (isDynamicTemplate(templateBuild)) {
    templateBuild = templateBuild();
  }
  const { name, rule, ranking = () => TemplateRanking.DEFAULT } = templateBuild;
  return { name, rule, template, ranking };
};

const skipEmptyText = (node) => isPlainText(node) && Node.string(node).length === 0;

/**
 * Service for handling slide templates.
 */
export default class TemplateService {

  constructor() {
    TemplateService.__singleton = this;
    this.templates = [];
    this.templateEngine = new TrieSearch(['name'], { min: 1, idFieldOrFunction: 'name' });
  }

  /**
   * Search for matching templates, for the given query and optional Slate slide node.
   * The position is the 0-based index of the slide node.
   *
   * @param query
   * @param slideNode
   * @param slidePosition
   * @returns {[]}
   */
  search(query = '', slideNode, slidePosition) {
    const t0 = new Date().getTime();
    const entries = query.length > 0 ? this.templateEngine.get(query) : this.templates;
    if (slideNode && slideNode.children && slideNode.children.length > 0) {
      const slideEncoding = withNumbering(nodesToTrees(slideNode.children, skipEmptyText));
      const matchingTemplates = [];
      entries.forEach(({ name, rule, ranking, template }) => {
        if (rule) {
          const [score, labels] = evaluateRules(slideEncoding, rule);
          if (score > 0) {
            matchingTemplates.push({
              name,
              ranking,
              template: template(new TemplateRuleMatch(labels, slideNode)),
            });
          }
        }
      });
      const t1 = new Date().getTime();
      logger.trace(`Searching for template matches took ${t1 - t0} ms`);
      return sortTemplateResults(matchingTemplates, slidePosition);
    }

    const matchingTemplates = [];
    const slideEncoding = withNumbering(nodesToTrees([], skipEmptyText));
    entries.forEach(({ name, rule, ranking, template }) => {
      if (rule) {
        const [score, labels] = evaluateRules(slideEncoding, rule);
        if (score > 0) {
          matchingTemplates.push({
            name,
            ranking,
            template: template(new TemplateRuleMatch(labels, slideNode)),
          });
        }
      } else {
        matchingTemplates.push({
          name,
          ranking,
          template: template(),
        });
      }
    });
    const t1 = new Date().getTime();
    logger.trace(`Searching for template matches took ${t1 - t0} ms`);
    return sortTemplateResults(matchingTemplates, slidePosition);
  }

  /**
   * Add a template to the engine.
   *
   * @param component
   */
  install(template) {
    const doc = documentFor(template);
    const { name, rule, ranking } = doc;
    this.templates.push({ name, template, rule, ranking });
    this.templateEngine.add(doc);
  }

  static instance() {
    return TemplateService.__singleton === undefined ? TemplateFactory.install(new TemplateService()) : TemplateService.__singleton;
  }
}
