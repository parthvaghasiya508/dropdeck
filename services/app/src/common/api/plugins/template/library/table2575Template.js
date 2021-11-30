import { componentBuilder } from "../../builder/ComponentBuilder";
import { DataProvider } from "../DataProvider";
import Palette from "../../../../../theme/Palette";
import { textImages2575FullBleedRemix } from "../../../../remix/rules/textImage/fullBleed/25-75/textImages2575FullBleed/textImages2575FullBleed";
import { TemplateRanking } from "../TemplateRanking";
import { tableBuilder } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/table/tableBuilder";
import { FROM_UNSPLASH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageEditorElement";

export const table2575Template = (dataProvider = new DataProvider()) => {
  const template = componentBuilder().template({
    name: 'Table + Image',
    remix: textImages2575FullBleedRemix,
    palette: new Palette("#FF3D00", "#ffffff", "#FF3D00", "#000000", "#000000"), // Acc. BG. H1. H2. P.
    ranking: () => TemplateRanking.HIGH,
  });
  return template
    .title('Healthy Eating')
    .paragraph('When buying fruit and vegetables, variety will help ensure both nutrients and appeal.')
    .table(
      tableBuilder.row("Group A", "Group B", "Group C"),
      tableBuilder.row("Apple", "Banana", "Cherry"),
      tableBuilder.row("Apricot", "Blackberry", "Cantaloupe"),
      tableBuilder.row("Avocado", "Blueberry", "Cucumber"),
    )
    .image({
      from: FROM_UNSPLASH,
      label: "mango",
      url: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
      links: {
        download_location: "https://api.unsplash.com/photos/5sF6NrB1MEg/download?ixid=MnwxOTEwMjl8MHwxfGFsbHx8fHx8fHx8fDE2MTk3MDAxODY",
      }
    });
};
