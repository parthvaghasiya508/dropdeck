import { imageFullBleedTextGradientRemix } from "../../../../remix/rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { DataProvider } from "../DataProvider";
import { FROM_UNSPLASH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageEditorElement";
import { when } from "../../../../remix/match/RemixRule";
import { label, plainText } from "../../../../remix/match/Matchers";
import { optional } from "../../../../remix/match/expressions/Occurring";
import TemplateRuleMatch from "../TemplateRuleMatch";
import { TemplateRanking } from "../TemplateRanking";

export const titleImageTemplate = (ruleMatch = new TemplateRuleMatch()) => (dataProvider = new DataProvider()) => {
  const template = componentBuilder().template({
    name: 'Image and title',
    remix: imageFullBleedTextGradientRemix,
    ranking: () => TemplateRanking.HIGHEST,
    rule: when(
      label(
        plainText(optional),
        "first"
      ),
      label(
        plainText(optional),
        "second"
      ),
    ),
  });
  template.title(ruleMatch.text("first") || 'Title and Image');

  const additionalText = ruleMatch.text("second");
  if (additionalText) {
    template.subtitle(additionalText);
  }

  return template.image(dataProvider.image({
    from: FROM_UNSPLASH,
    label: "desert cave",
    swatch: [
      "#cc4525",
      "#28080c",
      "#fbbb89",
      "#5f050c",
      "#ec8484"
    ],
    url: "https://images.unsplash.com/photo-1600564405648-371e6ebcaca5?ixlib=rb-1.2.1",
    links: {
      download_location: "https://api.unsplash.com/photos/LHRzMsO1iz8/download?ixid=MnwxOTEwMjl8MHwxfGFsbHx8fHx8fHx8fDE2MTk2OTc3NzU",
    },
  }));
};
