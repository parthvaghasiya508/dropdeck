import { Editor, Path, Point, Range, Transforms } from 'slate';
import { EditorTransforms } from "../../../services/transforms/EditorTransforms";
import { TextTransforms } from "../../../services/transforms/TextTransforms";
import { SelectionTransforms } from "../../../services/transforms/SelectionTransforms";
import { logger } from "../../../../../../../common/util/logger";
import { TITLE } from "../component/heading/one/type";
import { BULLETED_LIST } from "../component/list/bulleted/type";
import { NUMBERED_LIST } from "../component/list/numbered/type";
import { LOGO_LIST } from "../component/media/logoList/type";
import { PARAGRAPH } from "../component/paragraph/type";

export const isList = (node) => node.type !== undefined &&
  (node.type === BULLETED_LIST || node.type === NUMBERED_LIST || node.type === LOGO_LIST);

export const isPlainList = (node) => node.type !== undefined &&
  (node.type === BULLETED_LIST || node.type === NUMBERED_LIST);

/**
 * Handle core interactions:
 *
 * - Escape a block node when typing in a line break in an empty child element (e.g. bullet list item).
 * - Remove formatting from a block node (that is, default to a paragraph node) when entering backspace in an
 *  empty block.
 *
 * @param editor Slate editor
 * @returns {*} A modified Slate editor, with basic line break/backspace interactions.
 */
export const withCoreEditing = (editor) => {

  const { deleteBackward, deleteForward, insertBreak, isInline, isVoid } = editor;

  // Nodes marked as 'void' should be rendered as such.
  editor.isVoid = (element) => (element && element.isVoid !== undefined && element.isVoid) || isVoid(element);

  // Nodes marked as 'inline' should be rendered as such.
  editor.isInline = (element) => (element && element.inline !== undefined && element.inline) || isInline(element);

  // Override line break handling: When entering a line break at the end of a empty non-paragraph element, we switch type to
  // paragraph. This allows the user to easily "escape" from a chosen formatting/type and matches the UX of common
  // editing applications.
  editor.insertBreak = () => {

    const { selection } = editor;
    if (Range.isCollapsed(selection) && Range.start(selection) && Range.start(selection).path) {
      const lastLocation = SelectionTransforms.lastLocation(editor, selection);
      const atEndOfLeaf = lastLocation && Point.isPoint(lastLocation) && Point.equals(lastLocation, Range.start(selection));
      if (atEndOfLeaf) {
        const [activeElement] = EditorTransforms.componentElement(editor);
        const nested = EditorTransforms.isCurrentElementNested(editor);

        // Here we distinguish between nested nodes and top-level nodes.
        if (activeElement !== undefined && activeElement.type !== PARAGRAPH) {

          // Top-level nodes that are not paragraphs: On hard-return we revert to a paragraph type.
          if (!nested) {
            try {
              editor.insertParagraph();
            } catch (e) {
              logger.error(`Error when inserting paragraph at the top of a slide`);
              logger.error(e);
            }
            return;
          }

          // Nested nodes that are not paragraphs: We revert to a paragraph type if and only if the current node is empty.
          if (EditorTransforms.isNodeEmpty(editor, activeElement)) {
            Transforms.setNodes(editor, {
              type: PARAGRAPH,
            });

            // The current node is nested, and we lift it to the top of the document tree.
            Transforms.liftNodes(editor);

            return;
          }
        }
      }

    } else {
      logger.warn(`Current selection is invalid: ${selection}`);
    }
    insertBreak();
  };

  // Overwrite the default `defaultFragment` implementation by ensuring that we delete trailing void elements.
  editor.deleteFragment = () => {
    const { selection } = editor;
    if (selection && Range.isExpanded(selection)) {
      Transforms.delete(editor, { voids: false, hanging: true });
    }
  };

  // Overwrite the default deleteBackward implementation.
  editor.deleteBackward = (unit) => {
    const proceed = TextTransforms.delete(editor, unit, true);
    if (proceed) {
      deleteBackward(unit); // delegate to the original implementation
    }
  };

  // Overwrite the default deleteBackward implementation.
  editor.deleteForward = (unit) => {
    const proceed = TextTransforms.delete(editor, unit, false);
    if (proceed) {
      deleteForward(unit); // delegate to the original implementation
    }
  };

  // Command to insert a new paragraph.
  editor.insertParagraph = () => {
    const path = SelectionTransforms.componentElementPath(editor);
    if (path && path.length) {
      Transforms.insertNodes(editor, {
        type: PARAGRAPH,
        children: [{ text: '' }],
      }, { at: Path.next(path), select: true });
    }
  };

  // Command to insert a new title element.
  editor.insertTitle = () => {
    const path = SelectionTransforms.componentElementPath(editor);
    if (path) {
      Editor.insertNode(editor, {
        type: TITLE,
        children: [{ text: '' }],
      }, { at: path });
    }
  };

  // Command to insert a soft line break.
  editor.insertSoftBreak = () => {
    editor.insertText('\n');
  };
  return editor;
};
