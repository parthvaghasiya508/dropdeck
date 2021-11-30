import { simpleComponentBuilder } from "./simpleComponentBuilder";
import { renderElementWithGutter } from "../../../modules/composer/components/DeckEditor/modules/gutter/renderElementWithGutter";
import { PARAGRAPH } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

/**
 * Base class for all _component plugins_ in the system. Defines the following set of properties:
 *
 * ## Mandatory properties
 *
 * - `type` - component type, unique across all components.
 * - `editorComponent` - React component to render an element in the Slate editor.
 * - `icon` - icon to show in the editor gutter, when `showGutter = true`.
 * - `slideComponent` - React component to render an element on a slide.
 *
 * ## Optional properties
 *
 * - `onKeyDown` - custom key-down handling.
 * - `showGutter` - whether to show an icon for the element in the editor gutter.
 */
export default class ComponentPlugin {

  static Category = {
    LIST: 'list',
    NESTED: 'nested',
    CHART: 'chart',
    TEXT: 'text',
  };

  constructor({
    type,
    editorComponent,
    renderLeaf,
    onKeyDown,
    icon,
    command,
    metadata = {},
    editable = true,
    deserialize,
    slideComponent,
    contextMenuComponent,
    configuration,
    pasteHandler,
    canBeChildOf,
    decorate,
    isVoid = false,
    isInline = false,
    showGutter = true,
    builder,
    styling,
  }) {
    const {
      name,
      keywords,
      description,
      ranking,
      categories = [],
    } = metadata;
    this.type = type;
    this.description = description;
    this.slideComponent = slideComponent;
    this.contextMenuComponent = contextMenuComponent;
    this.renderLeaf = renderLeaf;
    this.decorate = decorate;
    this.onKeyDown = onKeyDown;
    this.icon = icon;
    this.ranking = ranking;
    this.name = name;
    this.command = command || name;
    this.editable = editable;
    this.keywords = keywords;
    this.deserialize = deserialize;
    this.configuration = configuration;
    this.canBeChildOf = canBeChildOf;
    this.pasteHandler = pasteHandler;
    this.isVoid = isVoid;
    this.isInline = isInline;
    this.categories = categories;
    this.renderElement = showGutter ? renderElementWithGutter(editorComponent, icon, PARAGRAPH, contextMenuComponent) : editorComponent;
    this.builder = builder || simpleComponentBuilder(type);
    this.styling = styling;
  }
}
