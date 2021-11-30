import { Editor, Path, Point, Range, Transforms } from 'slate';
import { isRangeAtRoot, withDeleteStartReset } from "@udecode/slate-plugins";
import { logger } from "../../../../../../../common/util/logger";
import { LIST_ITEM } from "../component/list/type";
import { PARAGRAPH } from "../component/paragraph/type";
import { withBreakEmptyReset } from "./withBreakEmptyReset";

export const withList = (listTypes) => (editor) => {

  const { insertBreak } = editor;

  /**
   * Add a new list item if selection is in a LIST_ITEM > typeP.
   */
  editor.insertBreak = () => {
    if (editor.selection && !isRangeAtRoot(editor.selection)) {
      try {
        const [paragraphNode, paragraphPath] = Editor.parent(
          editor,
          editor.selection
        );
        if (paragraphNode.type === PARAGRAPH) {
          const [listItemNode, listItemPath] = Editor.parent(
            editor,
            paragraphPath
          );

          if (listItemNode.type === LIST_ITEM) {
            if (!Range.isCollapsed(editor.selection)) {
              Transforms.delete(editor);
            }

            const start = Editor.start(editor, paragraphPath);
            const end = Editor.end(editor, paragraphPath);

            const isStart = Point.equals(editor.selection.anchor, start);
            const isEnd = Point.equals(editor.selection.anchor, end);

            const nextParagraphPath = Path.next(paragraphPath);
            const nextListItemPath = Path.next(listItemPath);

            /**
             * If start, insert a list item before
             */
            if (isStart) {
              Transforms.insertNodes(
                editor,
                {
                  type: LIST_ITEM,
                  children: [{ type: PARAGRAPH, children: [{ text: '' }] }],
                },
                { at: listItemPath }
              );
              return;
            }

            /**
             * If not end, split nodes, wrap a list item on the new paragraph and move it to the next list item
             */
            if (!isEnd) {
              Transforms.splitNodes(editor, { at: editor.selection });
              Transforms.wrapNodes(
                editor,
                {
                  type: LIST_ITEM,
                  children: [],
                },
                { at: nextParagraphPath }
              );
              Transforms.moveNodes(editor, {
                at: nextParagraphPath,
                to: nextListItemPath,
              });
            } else {
              /**
               * If end, insert a list item after and select it
               */
              Transforms.insertNodes(
                editor,
                {
                  type: LIST_ITEM,
                  children: [{ type: PARAGRAPH, children: [{ text: '' }] }],
                },
                { at: nextListItemPath }
              );
              Transforms.select(editor, nextListItemPath);
            }

            /**
             * If there is a list in the list item, move it to the next list item
             */
            if (listItemNode.children.length > 1) {
              Transforms.moveNodes(editor, {
                at: nextParagraphPath,
                to: nextListItemPath.concat(1),
              });
            }

            return;
          }
        }
      } catch (e) {
        logger.error(`Unable to find the parent of editor selection:`);
        logger.error(editor.selection);
        logger.error(e);
      }
    }
    insertBreak();
  };

  const withBreakEmptyList = () => {
    Transforms.unwrapNodes(editor, {
      match: (n) => n.type === LIST_ITEM,
      split: true,
    });
    Transforms.unwrapNodes(editor, {
      match: (n) => listTypes.includes(n.type),
      split: true,
    });
  };

  let e = withBreakEmptyReset({
    defaultType: PARAGRAPH,
    types: [LIST_ITEM],
    onUnwrap: withBreakEmptyList,
  })(editor);

  e = withDeleteStartReset({
    defaultType: PARAGRAPH,
    types: [LIST_ITEM],
    onUnwrap: withBreakEmptyList,
  })(e);

  return e;
};
