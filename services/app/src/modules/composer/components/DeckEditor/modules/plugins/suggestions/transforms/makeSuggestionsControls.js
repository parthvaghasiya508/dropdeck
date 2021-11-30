import { Editor, Node } from "slate";
import { SuggestedMatch } from "../SuggestedMatch";

export const makeSuggestionsControls = (editor, setMatch) => ({
  show: (path, anchor, context) => {
    if (path) {
      const [leaf, leafPath] = Editor.last(editor, path);
      if (leaf) {
        const len = Node.string(leaf).length;
        const target = {
          anchor: {
            path: leafPath,
            offset: 0,
          },
          focus: {
            path: leafPath,
            offset: 0,
          },
        };
        const focus = {
          anchor: {
            path: leafPath,
            offset: len,
          },
          focus: {
            path: leafPath,
            offset: len,
          },
        };
        const match = new SuggestedMatch({
          target,
          focus,
          search: '/',
          anchor,
          context
        });
        setMatch(match);
      }
    }
  }
});
