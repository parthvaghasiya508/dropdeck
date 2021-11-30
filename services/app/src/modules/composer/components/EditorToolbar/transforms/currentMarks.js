import { Editor } from "slate";

export const currentMarks = (editor) => {
  if (editor.selection && editor.selection !== null) {
    try {
      const currentMarks = Editor.marks(editor);
      if (currentMarks !== null) {
        return Object.keys(currentMarks);
      }
    } catch (e) {
      return null;
    }
  }
  return null;
};
