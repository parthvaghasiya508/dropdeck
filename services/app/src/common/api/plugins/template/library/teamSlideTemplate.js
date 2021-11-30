import { clustersRoundedImageRemix } from "../../../../remix/rules/clusters/clustersRoundedImage/clustersRoundedImage";
import Palette from "../../../../../theme/Palette";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { FROM_UPLOAD } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/transforms/insertImage";
import TemplateRuleMatch from "../TemplateRuleMatch";
import { DataProvider } from "../DataProvider";
import { when } from "../../../../remix/match/RemixRule";
import { label, plainText } from "../../../../remix/match/Matchers";
import { optional } from "../../../../remix/match/expressions/Occurring";

const builder = componentBuilder();

export const teamSlideTemplate = (ruleMatch = new TemplateRuleMatch()) => (dataProvider = new DataProvider()) => {

  const template = componentBuilder().template({
    name: 'Team',
    remix: clustersRoundedImageRemix,
    palette: new Palette("#4e4e4e", "#f6f6f4", "#000000", "#000000", "#414141"),
    rule: when(
      label(
        plainText(optional),
        "title"
      )
    ),
  });

  template
    .title(ruleMatch.text("title") || 'Team')
    .collection(
      builder.group()
        .image({
          from: FROM_UPLOAD,
          label: "portrait",
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1",
          thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
        })
        .paragraph("Alice")
        .build(),
      builder.group()
        .image({
          from: FROM_UPLOAD,
          label: "portrait",
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
          thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
        })
        .paragraph("Christoph")
        .build(),
      builder.group()
        .image({
          from: FROM_UPLOAD,
          label: "portrait",
          url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1",
          thumbnail: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
        })
        .paragraph("Eve")
        .build()
    );
  return template;
};
