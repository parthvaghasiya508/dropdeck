import { Node } from "slate";
import { clustersPanelFixedImageRemix } from "../../../../remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import Palette from "../../../../../theme/Palette";
import { componentBuilder } from "../../builder/ComponentBuilder";
import TemplateRuleMatch from "../TemplateRuleMatch";
import { DataProvider } from "../DataProvider";
import { when } from "../../../../remix/match/RemixRule";
import { label, list, plainText } from "../../../../remix/match/Matchers";
import { once, optional } from "../../../../remix/match/expressions/Occurring";

const builder = componentBuilder();
export const compareTwoSlideTemplate = (ruleMatch = new TemplateRuleMatch()) => (dataProvider = new DataProvider()) => {
  const template = builder.template({
    name: 'Side-by-Side Compare',
    remix: clustersPanelFixedImageRemix,
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
    }
  } else {
    leftTitle = ruleMatch.text("first-text");
    rightTitle = ruleMatch.text("second-text");
  }

  template
    .title('Side-by-Side Comparison')
    .paragraph("Overview of the comparison you’re making")
    .collection(

      builder.group()
        .subtitle(leftTitle || "Item One")
        .paragraph("Details of the first item being compared.")
        .bulletList("Pro", "Con")
        .build(),

      builder.group()
        .subtitle(rightTitle || "Item Two")
        .paragraph("Details of the second item being compared.")
        .bulletList("Pro", "Con")
        .build(),
    );
  return template;
};
