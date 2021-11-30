import { isKeyHotkey } from "is-hotkey";
import { Editor, Point, Range } from "slate";
import { EditorTransforms } from "../../../services/transforms/EditorTransforms";
import { SelectionTransforms } from "../../../services/transforms/SelectionTransforms";
import { hasActivePrompt } from "../../prompt/transforms/hasActivePrompt";
import { TITLE } from "../component/heading/one/type";
import { insertSlideBreak } from "./insertSlideBreak";
import { splitSlide } from "../slide/splitSlide";
import { getSearchTerm } from "../suggestions/components/queries/getSearchTerm";

export const isLineBreakHotKey = (event) => isKeyHotkey('Enter')(event) || event.key === 'Enter';
const isCommandBreakHotKey = (event) => isKeyHotkey('Mod+Enter')(event);
const LINE_BREAK_THRESHOLD = 3;

export const onKeyDownSlideBreaks = (lineBreaks, setLineBreaks, promptSession, excludedTypes, openTemplateMenu) => (event, editor) => {
  const split = splitSlide(editor, openTemplateMenu);
  if (isCommandBreakHotKey(event) || hasDoubleDash(event, editor, promptSession, openTemplateMenu)) {
    setLineBreaks(0);
    split({ openingElement: TITLE });
  } else if (isLineBreakHotKey(event)) {
    lineBreakEvent(event, lineBreaks, setLineBreaks, promptSession, excludedTypes, openTemplateMenu, editor);
  } else {
    setLineBreaks(0);
  }
};

const hasDoubleDash = (event, editor, promptSession, toggleTemplateMenu) => {
  const { key } = event;
  if (key === '-') {
    // Check if we have another leading '--':
    const prefix = getSearchTerm(editor, promptSession);
    const path = SelectionTransforms.componentElementPath(editor);
    if (prefix && prefix === '--') {
      Editor.withoutNormalizing(editor, () => {
        // Remove the '--' prefix and then split
        insertSlideBreak(editor, path, splitSlide(editor, toggleTemplateMenu));
      });
      event.preventDefault();
    }
  }
};

const lineBreakEvent = (event, lineBreaks, setLineBreaks, promptSession, excludedTypes, toggleTemplateMenu, editor) => {
  const node = EditorTransforms.activeElementNode(editor);
  const path = EditorTransforms.activeElementPath(editor);
  const split = splitSlide(editor, toggleTemplateMenu);
  if (node && !hasActivePrompt(node, path, promptSession) && !SelectionTransforms.isCurrentSelectionNested(editor) && !excludedTypes.includes(node.type)) {

    const newLineBreaks = lineBreaks + 1;
    if (newLineBreaks >= LINE_BREAK_THRESHOLD) {

      // Delete the preceding LINE_BREAK_THRESHOLD - 1 empty paragraphs and split the slide.
      const { selection } = editor;
      if (Range.isRange(selection)) {
        const { anchor } = selection;
        if (Point.isPoint(anchor)) {
          Editor.withoutNormalizing(editor, () => {

            // Revert the line breaks that lead to this operation being triggered.
            for (let i = 0; i < LINE_BREAK_THRESHOLD - 1; i++) {
              editor.deleteBackward();
              const [, activeElementPath] = SelectionTransforms.componentElement(editor);
              if (activeElementPath.length < 2 || activeElementPath[1] === 0) {
                break;
              }
            }

            if (SelectionTransforms.isCurrentSelectionNested(editor)) {
              editor.insertParagraph(); // insert paragraph prior to splitting in a nested node -- this shouldn't happen
            }

            split({ openingElement: TITLE });
          });
        }
      }
      event.preventDefault();
      setLineBreaks(0);
    } else {
      setLineBreaks(newLineBreaks);
    }
  } else {
    setLineBreaks(0);
  }
};
