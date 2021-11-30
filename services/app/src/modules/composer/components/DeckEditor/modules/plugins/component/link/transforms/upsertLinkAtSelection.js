import { unwrapNodesByType, wrapLink } from "@udecode/slate-plugins";
import { Transforms } from "slate";
import { LINK } from "../type";
import { isCollapsed } from "../../../handlers/autoformat/queries/isCollapsed";

/**
 * Unwrap link at a location (default: selection).
 * Then, the focus of the location is set to selection focus.
 * Then, wrap the link at the location.
 */
export const upsertLinkAtSelection = (
  editor,
  url,
  text = 'link',
  {
    wrap,
  } = {}
) => {
  if (!editor.selection) return;

  if (!wrap && isCollapsed(editor.selection)) {
    return Transforms.insertNodes(editor, {
      type: LINK,
      url,
      children: [{ text }],
    });
  }

  unwrapNodesByType(editor, LINK, { at: editor.selection });

  wrapLink(editor, url, {
    LINK,
    at: editor.selection,
  });

  Transforms.collapse(editor, { edge: 'end' });
};
