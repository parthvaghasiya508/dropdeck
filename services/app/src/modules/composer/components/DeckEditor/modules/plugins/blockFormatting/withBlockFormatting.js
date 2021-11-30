import { Editor, Transforms } from 'slate';
import { unwrapList } from "@udecode/slate-plugins";
import { BULLETED_LIST } from "../component/list/bulleted/type";
import { NUMBERED_LIST } from "../component/list/numbered/type";
import { LIST_ITEM } from "../component/list/type";
import { PARAGRAPH } from "../component/paragraph/type";

export const listOptions = { typeUl: BULLETED_LIST, typeOl: NUMBERED_LIST, typeLi: LIST_ITEM, typeP: PARAGRAPH };

export const withBlockFormatting = (listTypes) => (editor) => {
  editor.formatBlock = (format) => {
    const isActive = isBlockActive(editor, format);
    const isList = listTypes.includes(format);

    unwrapList(editor, listOptions);
    Transforms.setNodes(editor, {
      type: isActive ? PARAGRAPH : isList ? LIST_ITEM : format,
    });

    if (!isActive && isList) {
      Transforms.wrapNodes(editor, { type: format, children: [] });
    }
  };

  return editor;
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
    mode: 'all',
  });
  return !!match;
};
