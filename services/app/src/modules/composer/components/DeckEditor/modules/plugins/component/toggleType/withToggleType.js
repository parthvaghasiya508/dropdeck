import { isNodeTypeIn, unwrapList } from "@udecode/slate-plugins";
import { Range, Transforms } from "slate";
import { isList } from "../../core/withCoreEditing";
import { toggleList } from "./toggleList";
import { BULLETED_LIST } from "../list/bulleted/type";
import { NUMBERED_LIST } from "../list/numbered/type";
import { LIST_ITEM } from "../list/type";
import { PARAGRAPH } from "../paragraph/type";
import { SegmentTransforms } from "../../../../services/transforms/SegmentTransforms";

const labels = {
  void: 1,
  list: 2,
  text: 3,
};

const toggleListOptions = {
  typeUl: BULLETED_LIST,
  typeOl: NUMBERED_LIST,
  typeLi: LIST_ITEM,
  typeP: PARAGRAPH,
};

/**
 * Toggle the type of the selected node with a configurable default type.
 * @param defaultType
 */
export const withToggleType = ({
  defaultType: type = PARAGRAPH,
}) => (editor) => {

  editor.toggleType = (targetType, defaultType = type) => {

    const categories = (node) => {
      if (editor.isVoid(node)) {
        return labels.void;
      }
      if (isList(node)) {
        return labels.list;
      }
      return labels.text;
    };

    const { selection = {} } = editor;
    if (selection !== null && Range.isRange(selection)) {
      const rangeSegments = SegmentTransforms.segment(editor, selection, categories);
      if (rangeSegments) {
        rangeSegments.forEach((segment) => {
          const { category, range } = segment;

          // We skip voids!
          if (category !== labels.void) {

            // If we are toggling a list, then we handle specifically.
            const listToggle = isList({ type: targetType });
            if (listToggle) {
              toggleList(editor, {
                ...toggleListOptions,
                typeList: targetType,
                at: range,
              });
            } else {

              // The target range contains only text elements.
              // eslint-disable-next-line no-lonely-if
              if (category === labels.text) {
                const isActive = isNodeTypeIn(editor, targetType, { at: range });
                Transforms.setNodes(editor, {
                  type: isActive ? defaultType : targetType,
                }, { at: range });

                // The target range contains only text elements.
              } else if (category === labels.list) {

                // First we toggle the list "off" and then we apply the new type transformation.
                unwrapList(editor, toggleListOptions);
                Transforms.setNodes(editor, {
                  type: targetType,
                }, { at: range });
              }
            }
          }
        });
      }
    }
  };

  return editor;
};
