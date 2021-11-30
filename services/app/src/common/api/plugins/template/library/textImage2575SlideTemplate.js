import Palette from "../../../../../theme/Palette";
import { textImages2575FullBleedRemix } from "../../../../remix/rules/textImage/fullBleed/25-75/textImages2575FullBleed/textImages2575FullBleed";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { TemplateRanking } from "../TemplateRanking";
import TemplateRuleMatch from "../TemplateRuleMatch";
import { DataProvider } from "../DataProvider";
import { getPaletteForImage } from "./queries/getPaletteForImage";
import { when } from "../../../../remix/match/RemixRule";
import { allText, label } from "../../../../remix/match/Matchers";
import { atMost } from "../../../../remix/match/expressions/Occurring";
import { FROM_UNSPLASH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageEditorElement";

const defaultPalette = new Palette("#3D4A53", "#fff", "#000000", "#3D4A53", "#3D4A53");
const captureGroupLabel = "text";

export const textImages3070SlideTemplate = (ruleMatch = new TemplateRuleMatch()) => (dataProvider = new DataProvider()) => {
  const template = componentBuilder()
    .template({
      name: '25 / 75',
      ranking: () => TemplateRanking.HIGHER,
      remix: textImages2575FullBleedRemix,
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
      .title('Four Quarters')
      .paragraph('Four is the smallest squared prime number. It is also the only even number in this form.');

  }

  template.image(dataProvider.image({
    from: FROM_UNSPLASH,
    label: "interior",
    url: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
    links: {
      download_location: "https://api.unsplash.com/photos/rSpMla5RItA/download?ixid=MnwxOTEwMjl8MHwxfGFsbHx8fHx8fHx8fDE2MTk2OTkyNjg"
    },
  }));

  return template;
};
