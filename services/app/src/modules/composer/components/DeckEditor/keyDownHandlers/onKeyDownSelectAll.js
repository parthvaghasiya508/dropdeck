import { isKeyHotkey } from "is-hotkey";
import { Transforms } from "slate";
import { EditorTransforms } from "../services/transforms/EditorTransforms";

const isCtrlAHotKey = (event) => isKeyHotkey('mod+a')(event);
const isModKey = (event) => isKeyHotkey('mod')(event);

export const onKeyDownSelectAll = (selectAllCount, setSelectAllCount) => (event, editor) => {
  if (isCtrlAHotKey(event)) {
    event.preventDefault();
    if (selectAllCount < 1) {
      const [currentSlide, slidePath] = EditorTransforms.currentSlide(editor);

      if (slidePath) {
        if (EditorTransforms.isSlideEmpty(editor, currentSlide)) {
          Transforms.select(editor,[]);
        } else {
          Transforms.select(editor, slidePath);
        }
      }
      setSelectAllCount(selectAllCount + 1);
    } else if (selectAllCount >= 1) {
      Transforms.select(editor,[]);
    }
  } else if (!isModKey(event)) {
    setSelectAllCount(0);
  }
};
