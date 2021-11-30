import {
  BOLD,
  CODE_MARK,
  EMPHASIS,
  ITALIC,
  MATH_MARK,
  STRIKETHROUGH,
  UNDERLINE
} from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/marks/Marks";
import { linkBuilder } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/link/linkBuilder";

export const Format = {
  bold: (text) => ({ text, [BOLD]: true }),
  underline: (text) => ({ text, [UNDERLINE]: true }),
  emphasis: (text) => ({ text, [EMPHASIS]: true }),
  italic: (text) => ({ text, [ITALIC]: true }),
  strikethrough: (text) => ({ text, [STRIKETHROUGH]: true }),
  math: (text) => ({ text, [MATH_MARK]: true }),
  code: (text) => ({ text, [CODE_MARK]: true }),
  link: (text, url) => linkBuilder(url, text),
};
