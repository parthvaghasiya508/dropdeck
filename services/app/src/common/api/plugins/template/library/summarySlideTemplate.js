import { componentBuilder } from "../../builder/ComponentBuilder";
import TemplateRuleMatch from "../TemplateRuleMatch";
import { DataProvider } from "../DataProvider";
import { when } from "../../../../remix/match/RemixRule";
import { label, list, plainText } from "../../../../remix/match/Matchers";
import { once, optional } from "../../../../remix/match/expressions/Occurring";

export const summarySlideTemplate = (ruleMatch = new TemplateRuleMatch()) => (dataProvider = new DataProvider()) => {
  const template = componentBuilder().template({
    name: 'Summary',

    // Up to 3 text elements
    rule: when(
      label(
        plainText(optional),
        "title"
      ),
      label(
        plainText(optional),
        "first-point"
      ),
      label(
        plainText(optional),
        "second-point"
      ),
    ),
  });

  template
    .title(ruleMatch.text("title") || 'Summary')
    .bulletList(
      ruleMatch.text("first-point") || 'First point',
      ruleMatch.text("second-point") || 'Second point',
    );
  return template;
};
