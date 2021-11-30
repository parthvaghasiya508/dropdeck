/**
 * Base matcher class with a function to check if a slide matches a particular pattern.
 */
import { encodeContent, extractIndices } from "../transforms/encodeContent";
import { decodeLabel } from "../transforms/encodeLabel";

/**
 * The evaluate() method executes a search for a match in a specified slide. Returns a label map, or undefined when
 * there is no match.
 */
export class Matcher {

  constructor(pattern, captureGroups) {
    this.pattern = pattern;
    this.expression = new RegExp(pattern);
    this.captureGroups = captureGroups || [];
  }

  evaluate = (slide) => {
    const nodes = slide.markup || slide;

    // If the content has already been string encoded, we don't have to do it again.
    const enc = (typeof nodes === 'string') ? nodes : encodeContent(nodes);
    // console.log(`enc = ${enc} and regexp = ${this.expression}`);
    const result = this.expression.exec(enc);
    if (!result) {
      return undefined;
    }
    const labels = {};
    // Check if we have all of our capture groups.
    if (result.length - 1 === this.captureGroups.length) {
      for (let i = 1; i < result.length; i++) {
        const groupName = this.captureGroups[i - 1]; // shift by 1
        const stringMatch = result[i];
        if (stringMatch) {
          const label = decodeLabel(groupName);
          const matches = extractIndices(stringMatch);
          if (matches) {
            matches.forEach((index) => {
              if (labels[index]) {
                const existingGroups = labels[index];
                if (Array.isArray(existingGroups)) {
                  labels[index] = [...existingGroups, label];
                } else {
                  labels[index] = [existingGroups, label];
                }
              }
              labels[index] = label;
            });
          }
        }
      }
    }
    return labels;
  }
}
