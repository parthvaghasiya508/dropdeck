import { createEditor, Editor, Node } from "slate";
import { withSettings } from "./withSettings";
import { PARAGRAPH } from "../component/paragraph/type";

it('sets a data property', () => {
  const editor = withSettings(createEditor());
  Editor.insertNode(editor, {
    type: PARAGRAPH,
    children: [{ text: '' }],
  });
  const path = [editor.children.length - 1];
  expect(editor.settings(path).get('foo')).toBeUndefined();
  editor.settings(path).set('foo', 'bar');
  expect(editor.settings(path).get('foo')).toEqual('bar');

});
