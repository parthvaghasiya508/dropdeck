import { componentCode } from "../transforms/encodeContent";
import { Matcher } from "./Matcher";
import { Occurring } from "./Occurring";

const typePattern = (type) => {
  if (Array.isArray(type)) {
    return type.map((t) => `(?:\\[${componentCode(t)}#[0-9]+\\])`).join('|');
  }
  return `\\[${componentCode(type)}#[0-9]+\\]`;
};

export class ComponentMatcher extends Matcher {
  constructor(type, occurrence = Occurring.once) {
    super(occurrence !== Occurring.once ? `(?:${typePattern(type)})${occurrence}` : `(?:${typePattern(type)})`);
    this.type = type;
  }
}
