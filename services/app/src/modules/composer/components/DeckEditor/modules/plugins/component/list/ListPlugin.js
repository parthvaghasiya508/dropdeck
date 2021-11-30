import { deserializeList } from "@udecode/slate-plugins";
import { renderElementListItem } from "./renderElementListItem";
import { onKeyDownList } from "./onKeyDownList";
import { BULLETED_LIST } from "./bulleted/type";
import { NUMBERED_LIST } from "./numbered/type";
import { LIST_ITEM } from "./type";
import { PARAGRAPH } from "../paragraph/type";

/**
 * Plugin for common list functionality. See BulletedListPlugin and NumberedListPlugin for specific list features.
 *
 * @param options
 * @returns {{onKeyDown: (e: KeyboardEvent, editor: Editor) => void, deserialize: DeserializeHtml}}
 * @constructor
 */
export const listTypes = { typeUl: BULLETED_LIST, typeOl: NUMBERED_LIST, typeP: PARAGRAPH, typeLi: LIST_ITEM };

export const ListPlugin = (nestedTypes) => ({
  renderElement: renderElementListItem,
  deserialize: deserializeList(listTypes),
  onKeyDown: onKeyDownList({ ...listTypes, nestedTypes }),
});
