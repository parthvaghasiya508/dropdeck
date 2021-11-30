import { getNodesByType, isNodeTypeIn } from "@udecode/slate-plugins";
import { Transforms } from "slate";
import { wrapNodes } from "./wrapNodes";
import { unwrapList } from "./unwrapList";

export const toggleList = (editor, {
  at,
  typeList,
  typeUl,
  typeOl,
  typeLi,
  typeP,
}) => {
  if (!at) return;

  const isActive = isNodeTypeIn(editor, typeList, { at });

  unwrapList(editor, { typeUl, typeOl, typeLi, at });

  Transforms.setNodes(editor, {
    type: typeP,
  }, { at });

  if (!isActive) {
    const list = { type: typeList, children: [] };
    wrapNodes(editor, list, { at });

    const nodes = [...getNodesByType(editor, typeP, { at })];

    const listItem = { type: typeLi, children: [] };

    for (const [, path] of nodes) {
      Transforms.wrapNodes(editor, listItem, {
        at: path,
      });
    }
  }
};
