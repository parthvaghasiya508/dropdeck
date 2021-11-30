import { Editor, Path, Transforms } from "slate";

export const componentConfigurator = (builder) => (editor, node, path) => {
  Editor.withoutNormalizing(editor, () => {
    Transforms.insertNodes(editor, builder(), {
      at: path,
      hanging: true,
      select: true,
    });
    Transforms.removeNodes(editor, { at: Path.next(path) });
  });
};
