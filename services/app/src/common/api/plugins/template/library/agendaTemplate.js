import Palette from "../../../../../theme/Palette";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { DataProvider } from "../DataProvider";
import { olBoldNumberRemix } from "../../../../remix/rules/lists/olBoldNumber/olBoldNumber";
import { TemplateRanking } from "../TemplateRanking";

export const agendaTemplate = (dataProvider = new DataProvider()) => {
  const template = componentBuilder().template({
    name: 'Agenda',
    remix: olBoldNumberRemix,
    ranking: () => TemplateRanking.HIGH,
    palette: new Palette("#93C4FF", "#09264A", "#FFFFFF", "#368FFF", "#FFFFFF"), // Acc. BG. H1. H2. P.
  });
  return template
    .title('Today’s Agenda')
    .subtitle('Thank you for coming')
    .numberedList("Introductions", "Planning", "Coffee");
};
