import isHotkey from 'is-hotkey';
import { getBlockAbove, isNodeType } from "@udecode/slate-plugins";

export const onKeyDownSoftBreak = ({
  rules = [{ hotkey: 'shift+enter' }],
}) => (event, editor) => {
  const entry = getBlockAbove(editor);
  rules.forEach(({ hotkey, query }) => {
    if (isHotkey(hotkey, event) && isNodeType(entry, query)) {
      event.preventDefault();
      editor.insertText('\n');
    }
  });
};
