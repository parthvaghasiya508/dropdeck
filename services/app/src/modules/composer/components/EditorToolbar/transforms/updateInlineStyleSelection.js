import { Editor } from "slate";
import difference from "lodash.difference";
import { currentMarks } from "./currentMarks";

export const updateInlineStyleSelection = (editor) => (event, selection) => {
  event.preventDefault();
  const currentStyles = currentMarks(editor);
  if (currentStyles !== null) {
    const remove = difference(currentStyles, selection);
    remove.forEach((style) => Editor.removeMark(editor, style));
  }
  selection.forEach((style) => Editor.addMark(editor, style, true));
};
