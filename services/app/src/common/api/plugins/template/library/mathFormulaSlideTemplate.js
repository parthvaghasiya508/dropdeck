import { textMathColumnsRemix } from "../../../../remix/rules/text/textMathColumns/textMathColumns";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { Format } from "../../builder/Format";

const builder = componentBuilder();
export const mathFormulaTemplate = () => builder
  .template({
    name: 'Mathematics',
    remix: textMathColumnsRemix,
  })
  .title('Mathematical ', Format.link('notation', 'https://katex.org/docs/supported.html'), ' in ', Format.math('\\LaTeX'))
  .paragraph('For example, when ', Format.math('a \\neq 0'), ' there are either one or two unique solutions to the quadratic equation ', Format.math('ax^2 + bx + c = 0'), ':')
  .math('x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}');
