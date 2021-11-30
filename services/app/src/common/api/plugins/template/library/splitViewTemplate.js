import { Node } from "slate";
import TemplateRuleMatch from "../TemplateRuleMatch";
import { DataProvider } from "../DataProvider";
import { clustersText5050Remix } from "../../../../remix/rules/clusters/clustersText5050/clustersText5050";
import Palette from "../../../../../theme/Palette";
import { when } from "../../../../remix/match/RemixRule";
import { label, list, plainText } from "../../../../remix/match/Matchers";
import { once, optional } from "../../../../remix/match/expressions/Occurring";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { FROM_UNSPLASH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageEditorElement";

const builder = componentBuilder();
export const splitViewTemplate = (ruleMatch = new TemplateRuleMatch()) => (dataProvider = new DataProvider()) => {

  const template = builder.template({
    name: 'Split View',
    remix: clustersText5050Remix,
    palette: new Palette("#4e4e4e", "#f6f6f4", "#000000", "#000000", "#414141"),
    rule: [

      // First rule: up to two text elements
      when(
        label(
          plainText(optional),
          "first-text"
        ),
        label(
          plainText(optional),
          "second-text"
        ),
      ),

      // Second rule: a list
      when(
        label(
          list(once),
          "list"
        ),
      )
    ],
  });

  // Check which rule matched this template: either text elements or a bullet list.
  let leftTitle;
  let rightTitle;
  const listNode = ruleMatch.node("list");
  if (listNode !== undefined) {
    const entries = listNode.children;
    if (entries.length > 0) {
      leftTitle = Node.string(entries[0]);
    }
    if (entries.length > 1) {
      rightTitle = Node.string(entries[1]);
    } else {
      rightTitle = leftTitle;
    }
  } else {
    leftTitle = ruleMatch.text("first-text");
    rightTitle = ruleMatch.text("second-text") || leftTitle;
  }

  const hasMatch = leftTitle || rightTitle;

  template.collection(
    builder.group()
      .subtitle(leftTitle || "Compare")
      .image(dataProvider.image({
        from: FROM_UNSPLASH,
        label: "abstract",
        url: "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?ixlib=rb-1.2.1",
        links: {
          download_location: "https://api.unsplash.com/photos/Xh6BpT-1tXo/download?ixid=MnwxOTEwMjl8MHwxfGFsbHx8fHx8fHx8fDE2MTk2OTc2NDM",
        }
      }, 0))
      .paragraph(!hasMatch ? "Spot the similarities between two or more things." : "")
      .build(),

    builder.group()
      .subtitle(rightTitle || "Contrast")
      .image(dataProvider.image({
        from: FROM_UNSPLASH,
        label: "abstract",
        url: "https://images.unsplash.com/photo-1502622796232-e88458466c33?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
        links: {
          download_location: "https://api.unsplash.com/photos/DIewyzpUbRc/download?ixid=MnwxOTEwMjl8MHwxfGFsbHx8fHx8fHx8fDE2MTk2OTg4MjE",
        }
      }, 1))
      .paragraph(!hasMatch ? "And note the obvious differences between them." : "")
      .build(),
  );
  return template;
};
