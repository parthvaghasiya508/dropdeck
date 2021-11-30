import { isEditorFragment } from "./transforms/isEditorFragment";

export const parseHtml = (html) => {
  if (html) {
    const { body } = new DOMParser().parseFromString(html, 'text/html');
    if (body) {
      const fromEditor = isEditorFragment(body);
      return { body, fromEditor };
    }
  }
  return {};
};
