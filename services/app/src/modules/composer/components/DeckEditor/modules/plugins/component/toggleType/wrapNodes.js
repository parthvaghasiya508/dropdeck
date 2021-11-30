import { Transforms } from "slate";
import { unhangRange } from "./unhangRange";

export const wrapNodes = (
  editor,
  element,
  options = {}
) => {
  unhangRange(editor, options);
  Transforms.wrapNodes(editor, element, options);
};
