import { componentBuilder } from "../../builder/ComponentBuilder";
import { DataProvider } from "../DataProvider";
import { tableChartDefaultRemix } from "../../../../remix/rules/charts/tableChartDefault/tableChartDefault";
import { TemplateRanking } from "../TemplateRanking";
import { tableBuilder } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/table/tableBuilder";
import { FROM_UNSPLASH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageEditorElement";

export const simpleTableTemplate = (dataProvider = new DataProvider()) => {
  const template = componentBuilder().template({
    name: 'Table',
    remix: tableChartDefaultRemix,
    ranking: () => TemplateRanking.HIGH,
  });
  return template
    .title('New Staff')
    .subtitle('Joining Us This Week Are...')
    .table(
      tableBuilder.row("Name", "Team", "Location", "Pets"),
      tableBuilder.row("Andrew", "Sales", "New York", "Dog"),
      tableBuilder.row("Bridget", "Product", "Los Angeles", "Cat"),
      tableBuilder.row("Chris", "Marketing", "San Diego", "Parrot"),
    );
};
