import { unwrapNodesByType } from "@udecode/slate-plugins";

export const unwrapList = (
  editor,
  {
    at,
    typeUl,
    typeOl,
    typeLi,
  } = {}
) => {
  unwrapNodesByType(editor, typeLi, { at });
  unwrapNodesByType(editor, [typeUl, typeOl], { split: true, at });
};
