import { Path } from "slate";

export const targetDropPath = (editor, editorElement) => {
  // The data-path property is set in DraggableEditorElement
  const pathJson = editorElement.getAttribute("data-path");
  if (pathJson) {
    const path = JSON.parse(pathJson);
    if (path && Path.isPath(path)) {
      return path;
    }
  }
};
