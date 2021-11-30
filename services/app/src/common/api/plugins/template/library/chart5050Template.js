import Palette from "../../../../../theme/Palette";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { DataProvider } from "../DataProvider";
import { textChartColumnRemix } from "../../../../remix/rules/charts/textChartColumn/textChartColumns";

export const chart5050Template = () => {
  const template = componentBuilder().template({
    name: 'Pie Chart',
    remix: textChartColumnRemix,
    palette: new Palette("#9600FF", "#f4f4f4", "#222222", "#222222", "#666666"), // Acc. BG. H1. H2. P.
  });
  return template
    .title('One apple a day keeps the doctor away?')
    .paragraph('Based on a sample of 100 respondents.')
    .pieChart("Agree, 60", "Disagree, 30", "Not Sure, 10");
};
