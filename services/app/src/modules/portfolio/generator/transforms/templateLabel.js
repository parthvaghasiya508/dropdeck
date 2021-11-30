import { TemplateTypes } from "../TemplateTypes";

export const templateLabel = (template) => {
  let deckLabel = '';
  template.nodes.forEach((node, index) => {
    const { type, count } = node;
    const { labelPlural, labelSingular } = TemplateTypes[type];
    if (deckLabel.length > 0) {
      if (index === template.nodes.length - 1) {
        deckLabel = count > 1 ? `${deckLabel} and ${count} ${labelPlural}` : `${deckLabel} and ${labelSingular}`;
      } else {
        deckLabel = count > 1 ? `${deckLabel}, ${count} ${labelPlural}` : `${deckLabel}, ${labelSingular}`;
      }
    } else {
      const label = count > 1 ? `${count} ${labelPlural}` : labelSingular;
      deckLabel = label.charAt(0).toUpperCase() + label.substring(1);
    }
  });
  return deckLabel;
};
