import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { BoldPlugin, ItalicPlugin, StrikethroughPlugin, UnderlinePlugin, } from '@udecode/slate-plugins';
import { withImages } from '../modules/plugins/component/media/image/withImages';
import { withBlockFormatting } from '../modules/plugins/blockFormatting/withBlockFormatting';
import { withCoreEditing } from '../modules/plugins/core/withCoreEditing';
import { withSlides } from '../modules/plugins/slide/withSlides';
import { withSuggestions } from "../modules/plugins/suggestions/withSuggestions";

import { withSettings } from "../modules/plugins/settings/withSettings";
import { withList } from "../modules/plugins/lists/withList";
import { SlidePlugin } from "../modules/plugins/component/slide/SlidePlugin";
import { HeadingDeserializePlugin } from "../modules/plugins/component/heading/HeadingDeserializePlugin";
import { ListPlugin } from "../modules/plugins/component/list/ListPlugin";
import { withDeserializeHtml } from "../modules/plugins/deserializers/html/withDeserializeHtml";
import { withPasteUrls } from "../modules/plugins/deserializers/url/withPasteUrls";
import { withAutoformat } from "../modules/plugins/handlers/autoformat/withAutoformat";
import { autoformatRules } from "../modules/plugins/handlers/autoformat/config/autoformatRules";
import { withDeserializeMarkdown } from "../modules/plugins/deserializers/markdown/withDeserializeMarkdown";
import { InlineCodePlugin } from "../modules/plugins/component/marks/code/InlineCodePlugin";
import { withTable } from "../modules/plugins/component/table/withTable";
import { withSurroundingParagraphs } from "../modules/plugins/layout/withSurroundingParagraphs";
import { InlineMathPlugin } from "../modules/plugins/component/marks/math/InlineMathPlugin";
import { ChartDataPlugin } from "../modules/plugins/component/chart/ChartDataPlugin";
import { withHistory } from "../modules/plugins/history/withHistory";
import { withInlineVoids } from "../modules/plugins/component/withInlineVoids";
import { EmphasisPlugin } from "../modules/plugins/component/marks/emphasis/EmphasisPlugin";
import { withToggleType } from "../modules/plugins/component/toggleType/withToggleType";
import ComponentService from "../../../../../common/api/plugins/ComponentService";
import ComponentPlugin from "../../../../../common/api/plugins/ComponentPlugin";
import { TableType } from "../modules/plugins/component/table/type";
import { PARAGRAPH } from "../modules/plugins/component/paragraph/type";
import { withGroups } from "../modules/plugins/component/groups/withGroups";
import { GROUP_COLLECTION } from "../modules/plugins/component/groups/type";

/**
 * Preparation of a Deck editor.
 */
export default class EditorFactory {

  constructor(materialTheme = {}) {
    EditorFactory.__singleton = this;

    const componentPlugins = ComponentService.instance().components;

    this.listTypes = componentPlugins.filter((plugin) => plugin.categories.includes(ComponentPlugin.Category.LIST)).map((plugin) => plugin.type);
    this.nestedListTypes = componentPlugins.filter(
      (plugin) => plugin.categories.includes(ComponentPlugin.Category.NESTED) && plugin.categories.includes(ComponentPlugin.Category.LIST)
    ).map((plugin) => plugin.type);
    this.chartTypes = componentPlugins.filter((plugin) => plugin.categories.includes(ComponentPlugin.Category.CHART)).map((plugin) => plugin.type);

    this.plugins = [
      ...componentPlugins,
      ChartDataPlugin(this.chartTypes, materialTheme),
      SlidePlugin(),
      BoldPlugin(),
      EmphasisPlugin(),
      InlineCodePlugin(),
      InlineMathPlugin(),
      ItalicPlugin(),
      UnderlinePlugin(),
      HeadingDeserializePlugin(),
      ListPlugin(this.nestedListTypes),
      StrikethroughPlugin(),
    ];

  }

  static instance(materialTheme) {
    return EditorFactory.__singleton === undefined ? new EditorFactory(materialTheme) : EditorFactory.__singleton;
  }

  /**
   * Create an instance of the Slate editor with all of the Dropdeck plugins, in the right order.
   */
  createEditor = (id, editor, options = {}) => {
    const { setPasteHandler } = options;
    if (editor === undefined || editor === null) {
      editor = createEditor();
    }

    // Note: The ordering here is important - we want withImages to be called before withDeserializeHtml
    return withSlides(
      withGroups(
        withSettings(
          withSurroundingParagraphs([TableType.TABLE, GROUP_COLLECTION])(
            withTable()(
              withList(this.listTypes)(
                withInlineVoids(this.plugins)(
                  withImages(id)(
                    withAutoformat(autoformatRules)(
                      withPasteUrls(this.plugins, setPasteHandler)(
                        withDeserializeHtml(this.plugins)(
                          withDeserializeMarkdown(this.plugins)(
                            withToggleType({ defaultType: PARAGRAPH })(
                              withSuggestions(
                                withBlockFormatting(this.listTypes)(
                                  withCoreEditing(
                                    withHistory(
                                      withReact(editor)
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  };
}
