import { Editor } from "slate";
import { PARAGRAPH } from "../../component/paragraph/type";

export const wrapVoidNodes = (editor, content) => {

  if (!content || !content.length) {
    return content;
  }

  // if the content to be inserted ends on a void node, we add an empty
  // paragraph at the end to work around a boundary issue in Slate
  if (Editor.isVoid(editor, content[content.length - 1])) {
    return [...content, {
      type: PARAGRAPH,
      children: [{ text: '' }]
    }];
  }

  return content;

};
