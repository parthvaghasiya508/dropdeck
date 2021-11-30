import TrieSearch from 'trie-search';
import ComponentFactory from "./ComponentFactory";
import { Objects } from "../../util/Objects";

const CMD_PREFIX = '/';

const compareSuggestions = (withRanking = false, prefix) => (a, b) => {
  if (prefix !== null) {
    const aStartsWithPrefix = a.displayName.startsWith(prefix);
    const bStartsWithPrefix = b.displayName.startsWith(prefix);
    if (aStartsWithPrefix && !bStartsWithPrefix) {
      return -1;
    }
    if (bStartsWithPrefix && !aStartsWithPrefix) {
      return 1;
    }
  }

  let rankedResult = 0;
  if (withRanking) {
    const rankingA = a.ranking || 0;
    const rankingB = b.ranking || 0;
    if (rankingA > rankingB) {
      rankedResult = -1;
    }
    if (rankingA < rankingB) {
      rankedResult = 1;
    }
  }
  return rankedResult !== 0 ? rankedResult : a.displayName.localeCompare(b.displayName);
};

const prefixed = (component) => ({ ...component, prefixCommand: `/${component.name ? component.name : ''}` });

/**
 * Single registry for all component plugins in the system.
 */
export default class ComponentService {
  constructor() {
    ComponentService.__singleton = this;
    this.componentsByType = {};
    this.components = [];
    this.keywordEngine = new TrieSearch(['name', 'keywords'], { min: 2, idFieldOrFunction: 'name', splitOnRegEx: /,/g });
    this.commandEngine = new TrieSearch(['prefixCommand', 'name', 'keywords'], { min: 1, idFieldOrFunction: 'name', splitOnRegEx: /,/g });
    this.componentStyling = {};
  }

  static instance() {
    return ComponentService.__singleton === undefined ? ComponentFactory.install(new ComponentService()) : ComponentService.__singleton;
  }

  /**
   * Add a component to the engine.
   *
   * @param component
   */
  install(component) {
    if (component) {
      if (component.type && !this.has(component.type)) {
        this.componentsByType[component.type] = component;
        this.components.push(component);
        if (component.styling) {
          const { styling, type } = component;
          this.componentStyling[`&.container-${type}`] = styling;
        }
      }
      if (component.name && component.name.length > 0 && component.keywords && component.keywords.length > 0) {
        this.keywordEngine.add(component);
        this.commandEngine.add(prefixed(component));
      }
    }
  }

  /**
   * Return an aggregate summary of all default component styling for slides.
   *
   * @returns {{}}
   */
  styling() {
    return this.componentStyling;
  }

  /**
   * Suggest components that may match the given prefix query. This looks for matches in the component's name or keywords.
   *
   * @param query
   * @param exclude
   * @returns {*}
   */
  suggest = (query, exclude) => {
    let matches;
    const isCommand = query && query.length > 0 && query[0] === CMD_PREFIX;
    const allCommands = (query === CMD_PREFIX);
    if (isCommand) {
      if (!allCommands) {
        query = query.substr(1); // remove the / prefix
      }
      matches = this.commandEngine.get(query).filter((component) => exclude === null || exclude !== component.type);
    } else {
      matches = this.keywordEngine.get(query, TrieSearch.UNION_REDUCER, 10).filter((component) => exclude === null || exclude !== component.type);
    }
    const suggestions = [];
    let prefix = null;
    if (query !== null && query.length > 0) {
      prefix = query.toLowerCase();
      if (matches !== null && matches.length > 0) {
        // eslint-disable-next-line no-unused-vars
        for (const component of matches) {
          if (allCommands) {
            suggestions.push({
              icon: component.icon ? component.icon : undefined,
              displayName: component.name,
              description: component.description,
              ranking: component.ranking,
              highlight: component.ranking > 0,
              link: component.link,
              component,
            });
          } else {

            const keywords = component.keywords.split(/,/g);
            const commandLower = component.name.toLowerCase();
            keywords.push(commandLower);

            // eslint-disable-next-line no-unused-vars
            for (const keyword of keywords) {
              const keywordLower = keyword.toLowerCase();
              if (keywordLower.startsWith(prefix)) {
                const suggestion = {
                  icon: component.icon ? component.icon : undefined,
                  displayName: component.name,
                  description: component.description,
                  ranking: component.ranking,
                  highlight: false,
                  link: component.link,
                  component,
                };
                const isCommand = keywordLower === commandLower;
                if (!isCommand) {
                  suggestion.synonym = {
                    prefix,
                    suffix: keywordLower.substr(prefix.length),
                  };
                }
                suggestions.push(suggestion);
                break; // we only want one instance of a component
              }
            }

          }
        }
      }
    }
    return suggestions.sort(compareSuggestions(true, prefix)); // always sort with ranking
  };

  /**
   * Get component with parameters.
   *
   * @param type
   * @returns {*}
   */
  get = (type) => this.componentsByType[type];

  /**
   * Check if we have a component or handler for a given block type.
   *
   * @param type
   * @returns {boolean}
   */
  has = (type) => this.componentsByType.hasOwnProperty(type);
}
