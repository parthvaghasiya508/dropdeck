import Palette from "../../../../../theme/Palette";
import { textImages5050FullBleedRemix } from "../../../../remix/rules/textImage/fullBleed/50-50/textImages5050FullBleed/textImages5050FullBleed";
import { componentBuilder } from "../../builder/ComponentBuilder";
import TemplateRuleMatch from "../TemplateRuleMatch";
import { DataProvider } from "../DataProvider";
import { when } from "../../../../remix/match/RemixRule";
import { allText, label } from "../../../../remix/match/Matchers";
import { atMost } from "../../../../remix/match/expressions/Occurring";
import { getPaletteForImage } from "./queries/getPaletteForImage";
import { TemplateRanking } from "../TemplateRanking";
import { FROM_UNSPLASH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageEditorElement";

const captureGroupLabel = "text";
const defaultPalette = new Palette("#00A788", "#ffffff", "#00A788", "#00A788", "#000");

export const textImages5050SlideTemplate = (ruleMatch = new TemplateRuleMatch()) => (dataProvider = new DataProvider()) => {
  const template = componentBuilder().template({
    name: '50 / 50',
    ranking: () => TemplateRanking.HIGHER,
    remix: textImages5050FullBleedRemix,
    palette: getPaletteForImage(dataProvider.image(), dataProvider.theme, defaultPalette, false),
    rule: when(
      label(
        allText(atMost(5)),
        captureGroupLabel
      ),
    ),
  });

  // If we match existing text elements on the slide, we copy these across.
  if (ruleMatch.found) {
    template.add(...ruleMatch.nodes(captureGroupLabel));
  } else {
    template
      .title('Fifty Fifty')
      .paragraph('One half is the fraction resulting from dividing one by two, or from dividing any number by its double.')
      .subtitle('One Half')
      .paragraph('Half can also be described as one part of something divided into two equal parts.');
  }

  template.image(dataProvider.image({
    from: FROM_UNSPLASH,
    label: "office",
    url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
    links: {
      download_location: "https://api.unsplash.com/photos/FV3GConVSss/download?ixid=MnwxOTEwMjl8MHwxfGFsbHx8fHx8fHx8fDE2MTk2OTkwMDk",
    },
  }));

  return template;
};
