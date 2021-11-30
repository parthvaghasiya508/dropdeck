import { Path } from "slate";
import { getTypeAheadQuery } from "../queries/getTypeAheadQuery";

/**
 * Handle editor type-ahead.
 */
export const updateSuggestions = (editor, match, promptSession) => {
  const { history } = editor;
  if (history && history.undos && history.undos.length > 0) {
    const ops = history.undos[history.undos.length - 1];
    if (ops && ops.length > 0) {
      const op = ops[ops.length - 1];
      const { type, path: pathOfLastOp } = op;
      if (type === 'remove_text' || type === 'insert_text') {
        if (pathOfLastOp) {
          const query = getTypeAheadQuery(editor, promptSession);
          if (query) {
            const { search, target, currentNode } = query;
            if (search && target && Path.equals(pathOfLastOp, target.anchor ? target.anchor.path : target)) {
              match.target = target;
              match.search = search;
              match.index = 0;
              match.currentType = currentNode.type;
              return;
            }
            match.reset();
          }
        }
      }
    }
  }
};
