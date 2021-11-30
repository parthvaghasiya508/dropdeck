import {
  isFirstChild,
  isList,
  isNodeTypeIn,
  isRangeAtRoot,
  ListHotkey
} from "@udecode/slate-plugins";
import { Editor, Path, Transforms } from "slate";
import { EditorTransforms } from "../../../../services/transforms/EditorTransforms";
import { logger } from "../../../../../../../../common/util/logger";
import { BULLETED_LIST } from "./bulleted/type";
import { NUMBERED_LIST } from "./numbered/type";
import { LIST_ITEM } from "./type";
import { PARAGRAPH } from "../paragraph/type";

export const onKeyDownList = ({
  nestedTypes = [BULLETED_LIST, NUMBERED_LIST],
  typeUl = BULLETED_LIST,
  typeOl = NUMBERED_LIST,
  typeLi = LIST_ITEM,
  typeP = PARAGRAPH,
}) => (e, editor) => {

  const options = { typeUl, typeOl, typeLi, typeP };

  if (Object.values(ListHotkey).includes(e.key)) {
    if (
      editor.selection &&
      isNodeTypeIn(editor, typeLi) &&
      !isRangeAtRoot(editor.selection)
    ) {
      if (e.key === ListHotkey.TAB) {
        e.preventDefault();
      }

      // If selection is in li > p

      if (editor.selection && !(Path.isPath(editor.selection) && editor.selection.length === 0) && !isRangeAtRoot(editor.selection)) {
        try {
          const [paragraphNode, paragraphPath] = Editor.parent(
            editor,
            editor.selection
          );

          if (paragraphNode.type !== typeP) return;
          const [listItemNode, listItemPath] = Editor.parent(editor, paragraphPath);
          if (listItemNode.type !== typeLi) return;
          const [listNode, listPath] = Editor.parent(editor, listItemPath);

          // move up
          const shiftTab = e.shiftKey && e.key === ListHotkey.TAB;
          if (shiftTab && !nestedTypes.includes(listNode.type)) return;

          const deleteOnEmptyBlock =
            [ListHotkey.ENTER, ListHotkey.DELETE_BACKWARD].includes(e.key) &&
            EditorTransforms.isNodeEmpty(editor, paragraphNode);

          if (shiftTab || deleteOnEmptyBlock) {

            const [listParentNode,] = Editor.parent(editor, listPath);
            if (listParentNode.type !== options.typeLi) {
              // Only delete a node if it is empty and has only empty children.
              if (e.key === ListHotkey.DELETE_BACKWARD && EditorTransforms.isNodeEmpty(editor, listItemNode)) {
                // Delete a list item but only if it is not the only member of a list.
                if (listNode.children.length > 1) {
                  Transforms.removeNodes(editor, {
                    at: listItemPath,
                  });
                  e.preventDefault();
                }
              }

            } else {
              const moved = moveUp(editor, listNode, listPath, listItemPath, options);
              if (moved) e.preventDefault();
            }
          }

          // move down
          const tab = !e.shiftKey && e.key === ListHotkey.TAB;
          if (tab && !nestedTypes.includes(listNode.type)) return;
          if (tab && !isFirstChild(listItemPath)) {
            moveDown(editor, listNode, listItemPath, options);
          }
        } catch (err) {
          logger.error(err);
        }

      }
    }
  }
};

/**
 * Move a list item next to its parent.
 * The parent should be a list item.
 */
const moveUp = (
  editor,
  listNode,
  listPath,
  listItemPath,
  options
) => {

  const [listParentNode, listParentPath] = Editor.parent(editor, listPath);
  if (listParentNode.type !== options.typeLi) return;

  const newListItemPath = Path.next(listParentPath);

  // Move item one level up
  Transforms.moveNodes(editor, {
    at: listItemPath,
    to: newListItemPath,
  });

  /**
   * Move the next siblings to a new list
   */
  const listItemIdx = listItemPath[listItemPath.length - 1];
  const siblingPath = [...listItemPath];
  const newListPath = newListItemPath.concat(1);
  let siblingFound = false;
  let newSiblingIdx = 0;
  listNode.children.forEach((n, idx) => {
    if (listItemIdx < idx) {
      if (!siblingFound) {
        siblingFound = true;

        Transforms.insertNodes(
          editor,
          {
            type: listNode.type,
            children: [],
          },
          { at: newListPath }
        );
      }

      siblingPath[siblingPath.length - 1] = listItemIdx;
      const newSiblingsPath = newListPath.concat(newSiblingIdx);
      newSiblingIdx++;
      Transforms.moveNodes(editor, {
        at: siblingPath,
        to: newSiblingsPath,
      });
    }
  });

  // Remove sublist if it was the first list item
  if (!listItemIdx) {
    Transforms.removeNodes(editor, {
      at: listPath,
    });
  }

  return true;
};

const moveDown = (
  editor,
  listNode,
  listItemPath,
  options
) => {

  // Previous sibling is the new parent
  const previousSiblingItem = Editor.node(
    editor,
    Path.previous(listItemPath)
  );

  if (previousSiblingItem) {
    const [previousNode, previousPath] = previousSiblingItem;

    const sublist = previousNode.children.find(isList(options));
    const newPath = previousPath.concat(
      sublist ? [1, sublist.children.length] : [1]
    );

    if (!sublist) {
      // Create new sublist
      Transforms.wrapNodes(
        editor,
        { type: listNode.type, children: [] },
        { at: listItemPath }
      );
    }

    // Move the current item to the sublist
    Transforms.moveNodes(editor, {
      at: listItemPath,
      to: newPath,
    });
  }
};
